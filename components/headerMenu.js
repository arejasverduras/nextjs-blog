import Link from 'next/link';
import styles from './headerMenu.module.css';

export default function HeaderMenu ({allPagesData}){
    console.log(allPagesData);
    return (
        <div className={styles.HeaderMenu}>
            <ul>
                {allPagesData.map(({pageId, title}) => 
                    <li key={pageId}>
                        <Link href={`/${pageId}`} >{title}</Link>
                    </li>
                )}
            </ul>
        </div>
    )
};
