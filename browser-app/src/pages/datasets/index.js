import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Exhibition data browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
      </Head>
      <main className={styles.main}>

        
        <div className={styles.description}>
          <h1>Datasets</h1>
         
         
        </div> 

        <div className={styles.center}>
        
         
        </div>
 
<div className={styles.grid}>

{process.env.datasets.map((entry) => (<a
            href={entry.path} key={entry.path}
            className={styles.card}
            
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {entry.label} <span>-&gt;</span>
            </h2>
            <p>Browse the data via the {entry.label} dataset.</p>
          </a>))}

</div>
       
      </main>
    </>
  )
}
