import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })


import {Card, Button, Container, Row, Col} from 'react-bootstrap'
export default function Home() {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Exhibition data browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
       <link rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                        crossOrigin="anonymous"
                    ></link>
      </Head>
      <main>

        
        
          <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
         
         
        

        
 
        <Container>

          <Row>
            <Col>
            <p>This application provides a browsable HTML interface to an art exhibition dataset provided by MoMA, serialized as Linked Art JSON-LD.
</p></Col>
          </Row>
      <Row>
        <Col>

{process.env.top_level_entry.map((entry) => (


<Card key={entry.path} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{entry.label}</Card.Title>
        <Card.Text>
         {entry.desc}
        </Card.Text>
        <Button href="datasets" variant="primary">Go</Button>
      </Card.Body>
    </Card>
  

))}

</Col>
      </Row>
    </Container>
       
      </main>
    </>
  )
}
