import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../../../styles/Home.module.css'

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
          <h1>Dataset:MoMA</h1>
         
        </div> 

      
 
<h1>Exhibitions</h1>
<div className={styles.grid}>


<a
            href="moma/exhibitions/organisation/start_date"
            className={styles.card}
            
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Exhibitions
            </h2>
            <p>Browse via organisation and exhibition start date</p>
          </a>

</div>
       
      </main>
    </>
  )
}
