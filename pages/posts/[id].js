import Layout from '../../components/layout';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { getSortedPageData } from '../../lib/page';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const allPagesData = getSortedPageData();
  return {
    props: {
      postData: JSON.parse(JSON.stringify(postData)),
      allPagesData: JSON.parse(JSON.stringify(allPagesData))
    },
  };
}

export default function Post({ postData, allPagesData }) {
    return (
      <Layout allPagesData={allPagesData}>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }