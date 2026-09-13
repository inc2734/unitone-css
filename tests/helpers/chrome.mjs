import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

// Use an isolated profile and the built-in Node WebSocket client; no browser test dependency.
export const launchChrome = async () => {
  const profile = await mkdtemp(path.join(tmpdir(), 'unitone-marquee-'));
  const executable =
    process.env.CHROME_BIN ??
    (process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : 'chromium');
  const chrome = spawn(
    executable,
    [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--no-first-run',
      '--no-default-browser-check',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] },
  );
  let socket;
  const close = async () => {
    socket?.close();
    if (chrome.exitCode === null && chrome.signalCode === null) {
      const exited = once(chrome, 'exit');
      chrome.kill();
      await exited;
    }
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  };
  try {
    const endpoint = await new Promise((resolve, reject) => {
      let output = '';
      const timer = setTimeout(() => reject(new Error(`Chrome did not start: ${output}`)), 15000);
      chrome.once('error', (error) => {
        clearTimeout(timer);
        reject(error);
      });
      chrome.once('exit', () => {
        clearTimeout(timer);
        reject(new Error(output));
      });
      chrome.stderr.on('data', (chunk) => {
        output += chunk;
        const match = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
        if (match) {
          clearTimeout(timer);
          resolve(match[1]);
        }
      });
    });
    socket = new WebSocket(endpoint);
    await once(socket, 'open');
    let nextId = 0;
    const pending = new Map();
    socket.addEventListener('message', ({ data }) => {
      const message = JSON.parse(data);
      const request = pending.get(message.id);
      if (request) {
        pending.delete(message.id);
        if (message.error) request.reject(new Error(JSON.stringify(message.error)));
        else request.resolve(message.result);
      }
    });
    const send = (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const id = ++nextId;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params, sessionId }));
      });
    const { targetInfos } = await send('Target.getTargets');
    const { sessionId } = await send('Target.attachToTarget', {
      targetId: targetInfos.find(({ type }) => type === 'page').targetId,
      flatten: true,
    });
    const command = (method, params) => send(method, params, sessionId);
    const evaluate = async (expression) => {
      const response = await command('Runtime.evaluate', {
        expression,
        awaitPromise: true,
        returnByValue: true,
      });
      if (response.exceptionDetails) {
        throw new Error(
          response.exceptionDetails.exception?.description ??
            JSON.stringify(response.exceptionDetails),
        );
      }
      return response.result.value;
    };
    return { command, evaluate, close };
  } catch (error) {
    await close();
    throw error;
  }
};
