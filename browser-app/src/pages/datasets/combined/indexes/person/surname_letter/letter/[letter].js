import Head from 'next/head'




import { Tab, Row, Col, Accordion, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/personlistgrouptab'
import TabPanePerson from '/components/person_exhibition_detail'
import Navbar from '/components/navbar';
import Footer from '/components/footer';



import { GetPersonsSurnameByLetter, GetPersonSurnamesFirstLetter } from '/lib/person'



export const getStaticPaths = async () => {

  const result = await GetPersonSurnamesFirstLetter()

  return {
    paths: result.alphabet?.map((letter) => {
      return { params: { letter: letter } }
    }),
    fallback: true,
  }
}


export const getStaticProps = async (context) => {

  const { letter } = context.params
  const persons = await GetPersonsSurnameByLetter(letter)

  return {
    props: {
      personSummaryDataList: persons,
      letter: letter

    },
  }
}



const IndexPage = ({
  personSummaryDataList, letter
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
                 
                  <Breadcrumb.Item>Indexes</Breadcrumb.Item>
                 
                  <Breadcrumb.Item> Surname first letter</Breadcrumb.Item>
                  <Breadcrumb.Item>{letter}</Breadcrumb.Item>
                </Breadcrumb>
                
                <h1>Index : Surname first letter : {letter}</h1>


             
            <Row>
              <Accordion alwaysOpen>
                {
                  Object.entries(personSummaryDataList).sort().map(([abbv, persons]) => (
                    <Accordion.Item key={"abv" + abbv} eventKey={"abv" + abbv}>
                      <Accordion.Header>{abbv}</Accordion.Header>
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



            <p>Click to go to surnames with first three letter:</p>
                {
                Object.entries(personSummaryDataList).sort().map(([abbv, person_list]) => (
                  
                  <span key={"ab_" + abbv}><a href={"#" + abbv}>{abbv}</a> </span>
                ))}
*/


