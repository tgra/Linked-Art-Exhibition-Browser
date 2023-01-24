import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Exhibition data browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       
      </Head>
      <main className={styles.main}>


        <div className={styles.description}>
          <h1>Datasets:Combined</h1>
         
        </div> 

      
 
<h1>Persons</h1>

<div className={styles.grid}>

{process.env.nationality.map((entry) => (<a
            href={entry.path} key={entry.path}
            className={styles.card}
           
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Nationality: {entry.label} 
            </h2>
            <p>Browse {entry.label} data</p>
          </a>))}

</div>
<h1>Indexes</h1>
<div className={styles.grid}>


{process.env.indexes.map((entry) => (<a
            href={entry.path} key={entry.path}
            className={styles.card}
            
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              {entry.label}
            </h2>
            <p>Browse via the {entry.label}</p>
          </a>))}

</div>
       
      </main>
   </div>
  )
}
