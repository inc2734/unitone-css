import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { notFound } from 'next/navigation';
import { useMDXComponents } from '../../mdx-components';

const getMdxPath = (params) => params.mdxPath ?? [];
const shouldIgnorePath = (mdxPath) => mdxPath.some((segment) => segment.startsWith('.'));

export async function generateStaticParams() {
  const params = await generateStaticParamsFor('mdxPath')();

  return params.map((param) => ({
    ...param,
    mdxPath: param.mdxPath.length === 1 && param.mdxPath[0] === '' ? [] : param.mdxPath,
  }));
}

export async function generateMetadata(props) {
  const params = await props.params;
  const mdxPath = getMdxPath(params);

  if (shouldIgnorePath(mdxPath)) {
    notFound();
  }

  const { metadata } = await importPage(mdxPath);
  return metadata;
}

const Wrapper = useMDXComponents().wrapper;

export default async function Page(props) {
  const params = await props.params;
  const mdxPath = getMdxPath(params);

  if (shouldIgnorePath(mdxPath)) {
    notFound();
  }

  const result = await importPage(mdxPath);
  const { default: MDXContent, toc, metadata } = result;
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
