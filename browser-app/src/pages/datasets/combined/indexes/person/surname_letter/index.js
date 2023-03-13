import Head from 'next/head'


import { Row, Col, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';


import { GetPersonSurnameFirstLetterAll } from '/lib/person'
import Navbar from '/components/navbar';
import Footer from '/components/footer';

export const getStaticProps = async (context) => {


    const result = await GetPersonSurnameFirstLetterAll()

    return {
        props: {
            alphabet: result.alphabet

        },
    }
}



const IndexPage = ({
    alphabet
}) => {




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
                                   
                                    <Breadcrumb.Item>Indexes</Breadcrumb.Item>
                                    <Breadcrumb.Item >Surname first letter</Breadcrumb.Item>
                                </Breadcrumb>
                                <h1>Index: Surname first letter</h1>
                            
                        <Row>
                            <ListGroup>
                                {
                                    alphabet?.sort().map((key) => (
                                        <ListGroup.Item variant="dark" key={"but" + key} action href={"./letter/" + key + "/"} >{key}</ListGroup.Item>
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

