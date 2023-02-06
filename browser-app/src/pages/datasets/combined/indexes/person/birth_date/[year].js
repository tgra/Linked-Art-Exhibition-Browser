import Head from 'next/head'

import { Tab, Row, Col, Accordion, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/personlistgrouptab'
import TabPanePerson from '/components/tabpaneperson'


import { GetPersonsByBirthYear, GetPersonsBirthYearAll } from '/lib/person'


export const getStaticPaths = async () => {

  let years = await GetPersonsBirthYearAll()

  years = Array.from(years)

  return {
    paths: years.map((year) => {
      return { params: { year: year } }
    }),
    fallback: true,
  }
}



export const getStaticProps = async (context) => {

  const { year } = context.params

  let persons = await GetPersonsByBirthYear(year)

  if (persons == undefined) {
    persons = {}
  }

  return {
    props: {
      persons: persons,
      year: year

    },
  }
}



const IndexPage = ({
  persons, year
}) => {


  if (persons == undefined) {
    return (<SSRProvider><div /></SSRProvider>)
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
                  <Breadcrumb.Item>Indexes</Breadcrumb.Item>
                  <Breadcrumb.Item>Persons</Breadcrumb.Item>
                  <Breadcrumb.Item>Birth year</Breadcrumb.Item>
                  <Breadcrumb.Item>{year}</Breadcrumb.Item>
                </Breadcrumb>

                <h3>Birth year: {year} </h3>


              </Col>
            </Row>
            <Row>
<p>In this dataset, there were <b>{Object.keys(persons).length}</b> people born in <b>{year}</b>.</p>
              <Accordion alwaysOpen>
                {
                  Object.entries(persons).sort().map(([letter, persons]) => (

                    <Accordion.Item key={"section_" + letter} eventKey={"section_" + letter}>
                      <Accordion.Header>{letter}</Accordion.Header>
                      <Accordion.Body>



                      

                        <Tab.Container id="list-group-tabs" >
                                                    <Row>
                                                        <Col sm={4}>
                                                            <ListGroup numbered>
                                                                {Array.isArray(persons) ? persons.map((person) => (<Person {...person} key={person.id} />)) : ""}
                                                            </ListGroup>
                                                        </Col>
                                                        <Col sm={8}>
                                                            <Tab.Content>
                                                                {Array.isArray(persons) ? persons.map((personData) => (<TabPanePerson {...personData} key={"#link" + personData.id.split("/").pop()} />)) : ""
                                                                }
                                                            </Tab.Content>
                                                        </Col>
                                                    </Row>
                                                </Tab.Container>
                      </Accordion.Body>
                    </Accordion.Item>

                  ))}
              </Accordion>




            </Row>


          </Container>
        </main>

      </div>
    </SSRProvider>
  )
}

export default IndexPage




