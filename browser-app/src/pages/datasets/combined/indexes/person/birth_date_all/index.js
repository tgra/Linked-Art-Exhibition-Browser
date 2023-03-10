import Head from 'next/head'

import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })


import { ListGroup, Container, Row, Col, SSRProvider, Breadcrumb } from 'react-bootstrap';

import { GetPersonsByBirthYear } from '/lib/person'
import Navbar from '/components/navbar';
import Footer from '/components/footer';

export const getStaticProps = async (context) => {
    let years = await GetPersonsByBirthYear("")
    return {     props: {  years: years  }, }
}

const IndexPage = ({
    years
}) => {

    if (years == undefined) {
        return (<SSRProvider><div/></SSRProvider>)
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
                    <script src="https://unpkg.com/react/umd/react.production.min.js"  async></script>

                </Head>

                <main >


                    <Container fluid>

                   <Navbar/>

                  

                        
                                <Breadcrumb>
                                <Breadcrumb.Item href={process.env.basePath}>{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
                  <Breadcrumb.Item>Dataset</Breadcrumb.Item>
                  <Breadcrumb.Item>Combined</Breadcrumb.Item>
                  <Breadcrumb.Item>Indexes</Breadcrumb.Item>
                  <Breadcrumb.Item>Persons</Breadcrumb.Item>
                  <Breadcrumb.Item  >Birth year</Breadcrumb.Item>
                  <Breadcrumb.Item>All</Breadcrumb.Item>
            
                                </Breadcrumb>

                                <h1>Index :  Persons : Birth year : All</h1>

                                <p>The following list are birth years with a count of the corresponding persons. Click on an item to view more information.</p>


                            
                        <Row>
                        <ListGroup>
                                {
                                    Object.entries(years).map(([key, value]) => (
                                        <ListGroup.Item key={"born_" + key} variant="dark" action href={"../birth_date/" + key}> {key} ({value})</ListGroup.Item>
                                    ))}

                            </ListGroup>
                           
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

*/