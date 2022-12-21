import Link from 'next/link';
import styles from './headerMenu.module.css';

export default function HeaderMenu ({allPagesData, posts}){
    console.log(posts);
    return (
        <div className={styles.HeaderMenu}>
            <ul>
                {allPagesData.map(({pageId, title}) => 
                    <li key={pageId}>
                        <Link href={`/${pageId}`} >{title}</Link>
                    </li>
                )}
            </ul>
            <ul>
                {posts.map(({id, title}) => 
                    <li key={id}>
                        <Link href={`/posts/${id}`} >{title}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
};
