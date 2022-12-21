import fs from 'fs';
import path from 'path';
//markdown specific
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const pageDirectory = path.join(process.cwd(), 'pageContent');

export function getSortedPageData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(pageDirectory);
  const allPagesData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const pageId = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(pageDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      pageId,
      ...matterResult.data,
    };
  });
  // Sort posts by date
//   return allPagesData.sort((a, b) => {
//     if (a.date < b.date) {
//       return 1;
//     } else {
//       return -1;
//     }
//   });
return allPagesData;
};

export function getAllPageIds() {
  const fileNames = fs.readdirSync(pageDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        pageId: fileName.replace(/\.md$/, ''),
      },
    };
  });
};

export async function getPageData(pageId) {
  const fullPath = path.join(pageDirectory, `${pageId}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  const processedContent = await remark()
  .use(html)
  .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the pageId
  return {
    pageId,
    contentHtml,
    ...matterResult.data,
  };
};
