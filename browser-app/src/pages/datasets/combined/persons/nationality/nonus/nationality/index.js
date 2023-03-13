import Head from 'next/head'

import { ParsedUrlQuery } from 'querystring'


import { Tab, Row, Col, Accordion, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/person_list'
import TabPanePerson from '/components/person_detail'
import Navbar from '/components/navbar';
import Footer from '/components/footer';

import 'chart.js/auto';
import {  Pie } from 'react-chartjs-2';


import { GetPersonsByNationality } from '/lib/person'
export const getStaticProps = async (context) => {


  const result = await GetPersonsByNationality()

  
  return {
    props: {
      personSummaryDataList: result.persons, count: result.count
    },
  }
}



const IndexPage = ({
  personSummaryDataList, count
}) => {

  if (personSummaryDataList == undefined) {
    personSummaryDataList = {}
  }

  
  const data_nonusnat = {
    labels: Object.keys(count),
    datasets: [{
      label: '# of Persons',
      data: Object.values(count),
      borderWidth: 1
    }]
  }
 

  let options_hor = {
    indexAxis: 'y',

    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    maintainAspectRatio: true,

  };


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
          <Container fluid>
            <Navbar/>
           
                <Breadcrumb>
                  <Breadcrumb.Item href={process.env.basePath}>{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                  <Breadcrumb.Item >Dataset: All</Breadcrumb.Item>
          
                  <Breadcrumb.Item>Persons</Breadcrumb.Item>
                  <Breadcrumb.Item>Nationality: non-US </Breadcrumb.Item>
                 
                  <Breadcrumb.Item>Nationality</Breadcrumb.Item>
                </Breadcrumb>

<Row leg={2}><Col>

<h1>Persons: Nationality</h1>
<p>Explore persons involved in exhibitions by nationality.</p>
</Col>

<Col>

<Pie data={data_nonusnat}  /></Col></Row>
                
               
               <Row><Col>
               
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
             
           
                </Col></Row>
<Footer/>
          </Container>
        </main>

      </div>
    </SSRProvider>
  )
}

export default IndexPage
