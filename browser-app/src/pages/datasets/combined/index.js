import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

import { CardGroup, Breadcrumb, Button, Container, Card, Row, Col } from 'react-bootstrap'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Exhibition data browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
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
                <Breadcrumb.Item >Combined</Breadcrumb.Item>
              </Breadcrumb>
              <div>
                <h1>Dataset: Combined</h1>
              </div>
              <h2>Persons</h2>
</Col>
</Row>

<Row>
<Col>
<h4>Nationality</h4>
<CardGroup>
{process.env.nationality.map((entry) => (


<Card bg="light" text="dark" key={entry.path} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{entry.label}</Card.Title>
        <Card.Text>
         {entry.desc}
        </Card.Text>
        <Button href={entry.path} variant="primary">Go</Button>
      </Card.Body>
    </Card>
   
    ))}
    </CardGroup>
        </Col>     
</Row>

<Row>
  <Col>
  <h2>Exhibitions</h2>
  <CardGroup>
  <Card bg="light" >
      <Card.Body>
        <Card.Title>Start date</Card.Title>
        <Card.Text>
         
        </Card.Text>
        <Button href="exhibitions/start_date" variant="primary">Go</Button>
      </Card.Body>
    </Card>
    </CardGroup>
  </Col>
</Row>

<Row><Col>

             
              <h2>Indexes</h2>
             
<CardGroup>

                {process.env.indexes.map((entry) => (
<Card  bg="light" key={entry.path} >
      <Card.Body>
        <Card.Title>{entry.label}</Card.Title>
        <Card.Text>
         {entry.desc}
        </Card.Text>
        <Button href={entry.path} variant="primary">Go</Button>
      </Card.Body>
    </Card>
    ))}

    </CardGroup>
            </Col></Row>
        </Container>
      </main>
    </div>
  )
}
