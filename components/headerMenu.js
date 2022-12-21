import Link from 'next/link';
import { getSortedPageData } from '../lib/page';
import { useEffect } from 'react';

// export async function getStaticProps(){
//     const allPagesData = await getSortedPageData();
  
//     return {
//       props: {
//         allPagesData: JSON.parse(JSON.stringify(allPagesData))
//       },
// }
// }

export default async function HeaderMenu (){
    let allPagesData = await getSortedPageData();

    useEffect(()=>{
        allPagesData = getSortedPageData();
    },[])
    
    
    return (
        <div className='HeaderMenu'>
            <nav>
                {allPagesData.map(({pageId, title}) => 
                    <li key={pageId}>
                        <Link href={`/${pageId}`} />
                    </li>
                )}
            </nav>
        </div>
    )
};
