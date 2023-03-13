import Head from 'next/head'

import { Nav,Tab, Row, Col, Accordion, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/person_list'
import TabPanePerson from '/components/person_detail'

import Navbar from '/components/navbar';
import Footer from '/components/footer';

import { GetPersonsSurnameLetterUS } from '/lib/person'


export const getStaticProps = async (context) => {


    const result = await GetPersonsSurnameLetterUS()

    return {
        props: {
            personSummaryDataList: result.persons

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
                

                    <Container fluid>
                   
                   <Navbar/>
                       
                   <Breadcrumb>
                                    <Breadcrumb.Item href={process.env.basePath}>{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>

                                    <Breadcrumb.Item >Dataset: All</Breadcrumb.Item>
                                  
                                    <Breadcrumb.Item>Persons</Breadcrumb.Item>
                                    <Breadcrumb.Item>Nationality: US</Breadcrumb.Item>
                                 
                                    <Breadcrumb.Item>Person: Surname</Breadcrumb.Item>
                                </Breadcrumb>
                                

                                <h1>Persons: Surname  </h1>
                               <p>Explore exhibitions by surname</p>
                               

                        <Row>

                      
                            <Accordion>
                                {
                                    Object.entries(personSummaryDataList).sort().map(([letter, person_list]) => (

                                        <Accordion.Item key={"section_" + letter} eventKey={"section_" + letter}>
                                            <Accordion.Header>{letter}</Accordion.Header>
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


                                    ))
                                }
                            </Accordion>





                        </Row>

<Footer/>
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


