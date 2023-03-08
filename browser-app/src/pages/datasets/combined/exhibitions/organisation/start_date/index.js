import Head from 'next/head'

import Link from 'next/link'

import { Accordion, ListGroup, Container, Row, Col, SSRProvider, Breadcrumb } from 'react-bootstrap';

import Ex from '/components/ex'
import Navbar from '/components/navbar';
import Footer from '/components/footer';
// api
import { GetExsOrganisation } from '/lib/exhibition'



// getstaticprops
export const getStaticProps = async (
    context
) => {

    const exs = await GetExsOrganisation()

    return {
        props: {
            exSummaryDataList: exs



        },
    }
}

const IndexPage = ({
    exSummaryDataList
}) => {

    if (exSummaryDataList == undefined) {
        return (<SSRProvider><div></div></SSRProvider>)
    }
    if (Object.keys(exSummaryDataList).includes("events")) {

        var events = Object.keys(exSummaryDataList["events"]).sort()

   

     

    } else {
        return (<SSRProvider><div></div></SSRProvider>)

    }


    var mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


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

                <Container fluid>
                <Navbar/>
                <Breadcrumb>
                                <Breadcrumb.Item href={process.env.basePath}>{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                               <Breadcrumb.Item >Dataset:All</Breadcrumb.Item>
                              
                               <Breadcrumb.Item>Organisation : Start date</Breadcrumb.Item>
                               
                            </Breadcrumb>
                <h1>Organisation: Start date</h1>
                <p>Explore exhibitions by organisation and then start date.</p>
               
                 
                
                    <Row>
                        <Accordion alwaysOpen>
                            {events.map((org) => (
                                <Accordion.Item key={"section_" + org} eventKey={"section_" + org}>
                                    <Accordion.Header>{org} ({exSummaryDataList["counter"][org]} exhibition)</Accordion.Header>
                                    <Accordion.Body>

                                    <Link href={"/datasets/combined/exhibitions/" + org + "/"}>View the exhibitions carried out by <i>{org}</i> on a separate page</Link>
                                 
                                        <Container fluid>
                                            <Accordion alwaysOpen>
                                                {
                                                    Object.keys(exSummaryDataList["events"][org]).sort().map((year) => (

                                                        <Accordion.Item key={"section_" + org + year} eventKey={"section_" + org + year}>
                                                            <Accordion.Header>{year}</Accordion.Header>
                                                            <Accordion.Body>
                                                                {
                                                                    Object.keys(exSummaryDataList["events"][org][year]).sort().map((month) => (
                                                                        <Row key={"month" + month} >
                                                                            <Col>

                                                                                <h6>{mL[parseInt(month) - 1]} {year} </h6>

                                                                                <ListGroup>
                                                                                    {
                                                                                        exSummaryDataList["events"][org][year][month].map((ex) => (<Ex {...ex} key={"ex_" + ex.id} />))
                                                                                    }
                                                                                </ListGroup>


                                                                            </Col>
                                                                        </Row>

                                                                    ))
                                                                }
                                                            </Accordion.Body>
                                                        </Accordion.Item>

                                                    ))


                                                }
                                            </Accordion>

                                        </Container>



                                    </Accordion.Body>
                                </Accordion.Item>

                            ))}
                        </Accordion>



                    </Row>
                    
                    <Footer/></Container>





            </div>
        </SSRProvider>
    )
}

export default IndexPage





/*




{  exSummaryDataList.map((ex) => ( <Ex {...ex} key={ex.id} />   ))   }




{"exSummaryDataList":[{"id":"https://www.moma.org/data/Activity/1","label":"Cézanne, Gauguin, Seurat, Van Gogh","start":"1929-11-07T00:00:00Z","end":"1929-12-07T23:59:59Z","location":"POINT(40.76314 -73.97446)","org":"","_label":"Cézanne, Gauguin, Seurat, Van Gogh","identified_by":[],"timespan":[],"carried_out_by":["https://www.moma.org/data/Group/inst3","https://www.moma.org/data/Person/8462"],"influenced_by":["https://www.moma.org/data/Person/5152","https://www.moma.org/data/Person/2013","https://www.moma.org/data/Person/2117","https://www.moma.org/data/Person/1012"]},{"id":"https://www.moma.org/data/Activity/2","label":"Paintings by 19 Living Americans","start":"1929-12-12T00:00:00Z","end":"1930-01-12T23:59:59Z","location":"POINT(40.76314 -73.97446)","org":"","_label":"Paintings by 19 Living Americans","identified_by":[],"timespan":[],"carried_out_by":["https://www.moma.org/data/Group/inst3"],"influenced_by":["https://www.moma.org/data/Person/4331","https://www.moma.org/data/Person/3157","https://www.moma.org/data/Person/4188","https://www.moma.org/data/Person/5258","https://www.moma.org/data/Person/5342","https://www.moma.org/data/Person/3617","https://www.moma.org/data/Person/2937","https://www.moma.org/data/Person/2876","https://www.moma.org/data/Person/3828","https://www.moma.org/data/Person/3150","https://www.moma.org/data/Person/5433","https://www.moma.org/data/Person/5994","https://www.moma.org/data/Person/27507","https://www.moma.org/data/Person/837","https://www.moma.org/data/Person/2615","https://www.moma.org/data/Person/1751","https://www.moma.org/data/Person/2418","https://www.moma.org/data/Person/1422","https://www.moma.org/data/Person/1466"]}
*/



