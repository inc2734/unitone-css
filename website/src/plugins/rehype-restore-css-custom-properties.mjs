const SKIP_TAGS = new Set(['code', 'pre', 'script', 'style']);

function shouldRestoreDoubleHyphen(value) {
  return (
    /(^|[\s("'`])—(?=[A-Za-z0-9_-])/.test(value) ||
    /(?<=[A-Za-z0-9_-])—(?=[A-Za-z0-9_-])/.test(value)
  );
}

function restoreDoubleHyphen(value) {
  return value
    .replace(/(^|[\s("'`])—(?=[A-Za-z0-9_-])/g, '$1--')
    .replace(/(?<=[A-Za-z0-9_-])—(?=[A-Za-z0-9_-])/g, '--');
}

function walk(node, parentTagName = '') {
  if (!node || SKIP_TAGS.has(parentTagName)) {
    return;
  }

  if (
    node.type === 'text' &&
    typeof node.value === 'string' &&
    shouldRestoreDoubleHyphen(node.value)
  ) {
    node.value = restoreDoubleHyphen(node.value);
  }

  if (!Array.isArray(node.children)) {
    return;
  }

  const nextParentTagName = typeof node.tagName === 'string' ? node.tagName : parentTagName;

  node.children.forEach((child) => {
    walk(child, nextParentTagName);
  });
}

export default function rehypeRestoreCssCustomProperties() {
  return function transformer(tree) {
    walk(tree);
  };
}
