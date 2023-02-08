import Head from 'next/head'

import { ParsedUrlQuery } from 'querystring'


import { Tab, Row, Col, Accordion, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/personlistgrouptab'
import TabPanePerson from '/components/tabpaneperson'


import { GetPersonsByNationality } from '/lib/person'

import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';



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


  var labels = Object.keys(personSummaryDataList)
  var count = []
  var values = Object.values(personSummaryDataList)
  for (var i = 0; i < values.length; i++) {
    count.push(values[i].length)
  }

  const data = {
    labels: labels,
    datasets: [{
      label: '# of Persons',
      data: count,
      borderWidth: 1
    }]
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
            <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
            <Row>
              <Col>
                <Breadcrumb>
                  <Breadcrumb.Item href="../../../../../../">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                  <Breadcrumb.Item href="../../../../../">Datasets</Breadcrumb.Item>
                  <Breadcrumb.Item href="../../../../">Combined</Breadcrumb.Item>
                  <Breadcrumb.Item>Persons</Breadcrumb.Item>
                  <Breadcrumb.Item>Nationality</Breadcrumb.Item>
                  <Breadcrumb.Item>non-US</Breadcrumb.Item>
                  <Breadcrumb.Item>Nationality</Breadcrumb.Item>
                </Breadcrumb>

                <h2>Persons ordered by nationality</h2>
                <ul>
                  <li>Dataset: Combined</li>
                  <li>Nationality: non-United States</li>
                </ul>
                <Bar data={data} options={{ maintainAspectRatio: true }} />

                <Accordion>

                  {Object.entries(personSummaryDataList).sort().map(([country, person_list]) => (

                    <Accordion.Item key={"section_" + country} eventKey={"section_" + country}>
                      <Accordion.Header>{country} ({Object.keys(person_list).length})</Accordion.Header>
                      <Accordion.Body>



                        <Tab.Container id="list-group-tabs" >
                          <Row>
                            <Col sm={4}>
                              <ListGroup numbered>
                                {Array.isArray(person_list) ? person_list.map((person) => (<Person {...person} key={person.id} />)) : ""}
                              </ListGroup>
                            </Col>
                            <Col sm={8}>
                              <Tab.Content>
                                {Array.isArray(person_list) ? person_list.map((personData) => (<TabPanePerson {...personData} key={"#link" + personData.id.split("/").pop()} />)) : ""
                                }
                              </Tab.Content>
                            </Col>
                          </Row>
                        </Tab.Container>


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
