import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

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
          <h1>{process.env.NEXT_PUBLIC_APP_NAME}</h1>
         
         
        </div> 

        <div className={styles.center}>
        <p>This application provides a browsable HTML interface to an art exhibition dataset provided by MoMA, serialized as Linked Art JSON-LD.
</p>
         
        </div>
 
<div className={styles.grid}>

{process.env.top_level_entry.map((entry) => (<a
            href={entry.path} key={entry.path}
            className={styles.card}
          
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {entry.label} <span>-&gt;</span>
            </h2>
            <p>Browse the data via {entry.label}</p>
          </a>))}

</div>
       
      </main>
    </>
  )
}
