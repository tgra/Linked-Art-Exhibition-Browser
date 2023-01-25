import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'

import { ParsedUrlQuery } from 'querystring'

import { Accordion, Row, Col, ListGroup, CardGroup, Card, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';

import Person from '/components/personlistgroup'

import { GetPersonsSurnameLetter } from '/lib/person'


export const getStaticProps = async (context) => {


  const persons = await GetPersonsSurnameLetter()

  return {
    props: {
      personSummaryDataList: persons
      
    },
  }
}



const IndexPage = ({
  personSummaryDataList
}) => {

  if (personSummaryDataList == undefined) {
    personSummaryDataList = {}
  }


  return (
    <SSRProvider>
      <div>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
            integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
            crossOrigin="anonymous"
          ></link>
          <script src="https://unpkg.com/react/umd/react.production.min.js"  async></script>

        </Head>

        <main>


          <Container>
          <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
            
            <Row>
              <Col>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                 
                 <Breadcrumb.Item href="/datasets">Datasets</Breadcrumb.Item>
                 <Breadcrumb.Item href="/datasets/combined">Combined</Breadcrumb.Item>
                 <Breadcrumb.Item>Persons</Breadcrumb.Item>
                 <Breadcrumb.Item>Nationality</Breadcrumb.Item>
                 <Breadcrumb.Item>US</Breadcrumb.Item>
                 <Breadcrumb.Item>Surname letter</Breadcrumb.Item>
                </Breadcrumb>

                
                <h1>Persons - ordered by surname letter  </h1>
                      <ul>
                        <li>Dataset:Combined</li>
                        <li>Nationality:US</li>
                        </ul>       
               

              </Col>
            </Row>
            <Row>
<Accordion>
              {
                Object.entries(personSummaryDataList).sort().map(([letter, person_list]) => (

                    <Accordion.Item key={"section_" + letter} eventKey={"section_" + letter}>
                    <Accordion.Header>{letter}</Accordion.Header>
                    <Accordion.Body>
                 
                    <ListGroup numbered>
                      { Array.isArray(person_list) ?  person_list.map((person) => (<Person {...person} key={person.id} />) ) :""}
                    </ListGroup>
                   
                  </Accordion.Body>
                  </Accordion.Item>

                 
                ))
              }
              </Accordion>





            </Row>


          </Container>
        </main>

      </div>
    </SSRProvider>
  )
}

export default IndexPage

/*
 {
            personSummaryDataList?.map((person) => (
 
            <Person {...person} key={person.id} />
            
            ))
            }


*/


