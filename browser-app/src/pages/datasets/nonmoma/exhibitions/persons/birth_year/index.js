import Head from 'next/head'

import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

import Navbar from '/components/navbar';
import Footer from '/components/footer';

import { Tab, Row, Col, Accordion, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/personlistgrouptab'
import TabPanePerson from '/components/tabpaneperson_no_histogram'



import { GetPersonsByDatasetBirthYear } from '/lib/person'


export const getStaticProps = async (context) => {
    let result = await GetPersonsByDatasetBirthYear("nonmoma")

    let persons = ("persons" in result) ? result.persons : []
    let years = ("count" in result) ? result.count : []
    return { props: { persons: persons, years: years }, }
}

const IndexPage = ({
    persons, years
}) => {



    if (persons == undefined) {
        return (<SSRProvider><div /></SSRProvider>)
    }
    return (
        <SSRProvider>
            <div>
                <Head>
                    <title>{process.env.APP_TITLE}</title>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                        crossOrigin="anonymous"
                    ></link>
                    <script src="https://unpkg.com/react/umd/react.production.min.js" async></script>

                </Head>

                <main >


                    <Container>
<Navbar/>
                      
                           
                            <Breadcrumb>
                                <Breadcrumb.Item href={process.env.basePath}>{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                               <Breadcrumb.Item>Dataset</Breadcrumb.Item>
                               <Breadcrumb.Item>non-MoMA</Breadcrumb.Item>
                               <Breadcrumb.Item>Exhibitions</Breadcrumb.Item>
                               <Breadcrumb.Item >Persons</Breadcrumb.Item>
                               <Breadcrumb.Item>Birth year</Breadcrumb.Item>
                            </Breadcrumb>

                               
                                <h1>Persons ordered by birth year</h1>
                               
                                <p>A list of persons who influenced <b>non-MoMA</b> exhibitions, ordered by birth year. Persons without a birth year in the record have been omitted.</p>
                            
                            <Row><Col>
                            
                                <Accordion alwaysOpen>

                                    {
                                        Object.entries(years).map(([year, count]) => (

                                            <Accordion.Item key={year} eventKey={"year" + year}>
                                                <Accordion.Header key={"born_" + year}>
                                                    {year} ({count})
                                                </Accordion.Header>
                                                <Accordion.Body>

                                                <Tab.Container id="list-group-tabs" >
                                                    <Row>
                                                        <Col sm={4}>
                                                            <ListGroup numbered>
                                                                {Array.isArray(persons[year]) ? persons[year].map((person) => (<Person {...person} key={person.id} />)) : ""}
                                                            </ListGroup>
                                                        </Col>
                                                        <Col sm={8}>
                                                            <Tab.Content>
                                                                {Array.isArray(persons[year]) ? persons[year].map((personData) => (<TabPanePerson {...personData} key={"#link" + personData.id.split("/").pop()} />)) : ""
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
                       <Footer/>


                    </Container>
                </main>

            </div>
        </SSRProvider>
    )
}

export default IndexPage




