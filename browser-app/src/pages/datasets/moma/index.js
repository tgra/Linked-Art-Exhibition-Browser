import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

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
        <Container>

          <Row>
            <Col>
              <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
              <Breadcrumb>
                <Breadcrumb.Item href="../../">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                <Breadcrumb.Item href="../">Datasets</Breadcrumb.Item>
                <Breadcrumb.Item >MoMA</Breadcrumb.Item>
              </Breadcrumb>








              <h1>MoMA Dataset</h1>
            </Col>
          </Row>

          <Row>

            <Col>

            </Col>
          </Row>

<Row><Col>


          <h2>Exhibitions</h2>

          <CardGroup>
            <Card bg="light">
              <Card.Body>
                <Card.Title>Organisation / Start date</Card.Title>
                <Card.Text>
                  View MoMA exhibitions ordered by organisation and start date.
                </Card.Text>
                <Button href="exhibitions/organisation/start_date" variant="primary">Go</Button>
              </Card.Body>
            </Card>
          
            <Card bg="light">
              <Card.Body>
                <Card.Title>Start date</Card.Title>
                <Card.Text>
                  View MoMA exhibitions ordered by start date.
                </Card.Text>
                <Button href="exhibitions/start_date" variant="primary">Go</Button>
              </Card.Body>
            </Card>
            </CardGroup>
            </Col></Row>
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