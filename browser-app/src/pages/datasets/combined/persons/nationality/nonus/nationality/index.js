import Head from 'next/head'

import { ParsedUrlQuery } from 'querystring'

import Person from '/components/personlistgroup'

import { Accordion, ListGroup, Container, Row, Col, SSRProvider, Breadcrumb } from 'react-bootstrap';


import { GetPersonsByNationality } from '/lib/person'





export const getStaticProps = async (context) => {


  const persons = await GetPersonsByNationality()

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
          <script src="https://unpkg.com/react/umd/react.production.min.js" async></script>

        </Head>

        <main>


          <Container>

            <Row>
              <Col>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>

                  <Breadcrumb.Item active >{process.env.NEXT_PUBLIC_PERSON_BREADCRUMB_PLURAL}</Breadcrumb.Item>
                  <Breadcrumb.Item active >Dataset:Combined  - Nationality:Non-US</Breadcrumb.Item>

                </Breadcrumb>

                <h3>Non-US Persons</h3>
                <a id="top" />


                <Accordion>

                  {Object.entries(personSummaryDataList).sort().map(([country, person_list]) => (

                    <Accordion.Item key={"section_" + country} eventKey={"section_" + country}>
                      <Accordion.Header>{country}</Accordion.Header>
                      <Accordion.Body>
                        <ListGroup>

                          {Array.isArray(person_list) ? person_list.map((person) => (<Person {...person} key={person.id} />)) : ""}

                        </ListGroup>

                      </Accordion.Body>

                    </Accordion.Item>

                  ))}
                </Accordion>
              </Col>
            </Row>
            <Row>










            </Row>


          </Container>
        </main>

      </div>
    </SSRProvider>
  )
}

export default IndexPage
