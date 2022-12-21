import Link from 'next/link';
import styles from './headerMenu.module.css';

export default function HeaderMenu ({allPagesData, posts}){

    const postsList = posts !== undefined? posts.map(({id, title}) => 
    <li key={id}>
        <Link href={`/posts/${id}`}>{title}</Link>
    </li>
    ): null

    return (
        <div className={styles.HeaderMenu}>
            <p>Pages</p>
            <ul>
                {allPagesData.map(({pageId, title}) => 
                    <li key={pageId}>
                        <Link href={`/${pageId}`} >{title}</Link>
                    </li>
                )}
            </ul>
            <br />
            <p>Posts</p>
            
            <ul>
                {postsList}
            </ul>
        </div>

    )
};
