import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Navbar from '/components/navbar';
import Footer from '/components/footer';
const inter = Inter({ subsets: ['latin'] })

import { CardGroup, Breadcrumb, Button, Container, Card, Row, Col } from 'react-bootstrap'
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
        <Container fluid>
<Navbar/>
         
             
              <Breadcrumb>
                <Breadcrumb.Item href={process.env.basePath}>{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                <Breadcrumb.Item>Dataset</Breadcrumb.Item>
                <Breadcrumb.Item >MoMA</Breadcrumb.Item>
              </Breadcrumb>








              <h1>MoMA Dataset</h1>
            

         



       <Footer/>
        </Container>
      </main>
    </>
  )
}

/*
<!--
    <Col>

<Card  style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Start date</Card.Title>
        <Card.Text>
         View MoMA exhibitions ordered by start date.
        </Card.Text>
        <Button href="exhibitions/start_date" variant="primary">Go</Button>
      </Card.Body>
    </Card>
    </Col>  
-->
*/