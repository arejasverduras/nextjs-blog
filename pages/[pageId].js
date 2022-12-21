import Head from 'next/head';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getAllPageIds, getPageData } from '../lib/page';

export async function getStaticPaths() {
    const paths = getAllPageIds();
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps({ params }) {
  const pageData = await getPageData(params.pageId);
  return {
    props: {
      pageData: JSON.parse(JSON.stringify(pageData))
    },
  };
}

export default function Page({ pageData }) {
    return (
      <Layout>
        <Head>
          <title>{pageData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{pageData.title}</h1>
          <div className={utilStyles.lightText}>
            <h2>{pageData.subTitle}</h2>
          </div>
          <div dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
        </article>
      </Layout>
    );
  }