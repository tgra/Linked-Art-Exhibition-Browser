import Head from 'next/head'

import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })


import { Tab, Row, Col, Accordion, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/personlistgrouptab'
import TabPanePerson from '/components/tabpaneperson_no_histogram'
import Navbar from '/components/navbar';
import Footer from '/components/footer';

import { GetPersonsByNationalityBirthYear } from '/lib/person'
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';



export const getStaticProps = async (context) => {
    let result = await GetPersonsByNationalityBirthYear("nonus")

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


    var labels = Object.keys(years)
    var count = Object.values(years)

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


                    <Container fluid>
                        <Navbar />
                        <Breadcrumb>
                            <Breadcrumb.Item href={process.env.basePath}>{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                            <Breadcrumb.Item >Dataset: All</Breadcrumb.Item>
                            <Breadcrumb.Item>Nationality: non-US</Breadcrumb.Item>
                            <Breadcrumb.Item>Birth year</Breadcrumb.Item>
                        </Breadcrumb>

                       

                        
                        
                        <Row lg={2}>
                            <Col>
                            <h1>Persons : Birth year  </h1>
                            <p>A list of persons of non-United States nationality who influenced all exhibitions, ordered by birth year. Persons without a birth year in the record have been omitted.</p>
</Col>
                            <Col>


                                <Bar data={data} options={{ maintainAspectRatio: true }} />

</Col>
</Row>
<Row><Col>
                                <Accordion alwaysOpen>

                                    {
                                        Object.entries(years).map(([year, count]) => (

                                            <Accordion.Item key={year} eventKey={"year" + year}>
                                                <Accordion.Header key={"born_" + year}>
                                                    {year == "" ? "no year recorded" : year} ({count})
                                                </Accordion.Header>
                                                <Accordion.Body>
                                                    {

                                                        Object.entries(persons[year]).sort().map(([letter, person_list]) => (

                                                            <div key={year + letter}><h5>{letter}</h5>

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




                                                            </div>))

                                                    }



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




