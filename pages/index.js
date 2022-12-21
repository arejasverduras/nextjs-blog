import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';
import { getPageData, getSortedPageData } from '../lib/page';


export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  const allPagesData = getSortedPageData();
  const homepageData = await getPageData('home');

  return {
    props: {
      allPostsData: JSON.parse(JSON.stringify(allPostsData)),
      allPagesData: JSON.parse(JSON.stringify(allPagesData)),
      homepageData: JSON.parse(JSON.stringify(homepageData))
    },
  };
}


export default function Home({allPostsData, allPagesData, homepageData}) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1>{homepageData.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: homepageData.contentHtml }}>
          
          </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Pages</h2>
        <ul className={utilStyles.list}>
          {allPagesData.map(({ pageId, date, title }) => {
            if (pageId === 'home') return;
            return (
             <li className={utilStyles.listItem} key={pageId}>
                <Link href={`/${pageId}`}>{title}</Link>
              <br />

            </li>)
            }
          )}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}