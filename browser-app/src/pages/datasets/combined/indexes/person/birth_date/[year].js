import Head from 'next/head'

import { ParsedUrlQuery } from 'querystring'

import {Accordion, ListGroup, Container, Row, Col, SSRProvider, Breadcrumb} from 'react-bootstrap';

import Person from '../../../../../../../components/personlistgroup'

import { GetPersonsByBirthYear } from '../../../../../../../lib/person'
 

export const getStaticPaths = async () => {

    const years = ["1979"]

    return {
        paths: years.map((year) => {
            return { params: { year: year} }
        }),
        fallback: true,
    }}



export const getStaticProps = async (context) => {
  
    const {year} = context.params
    let persons = await GetPersonsByBirthYear(year)

    if (persons == undefined){
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
  persons, year, dataset
}) => {

  
  if (persons == undefined){
    return (<SSRProvider><div/></SSRProvider>)
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
<script src="https://unpkg.com/react/umd/react.production.min.js"  async></script>
    
    </Head>

    <main>

    
    <Container>

    <Row>
        <Col>
    <Breadcrumb>
    <Breadcrumb.Item href="/">{process.env.NEXT_PUBLIC_APP_BREADCRUMB_HOME}</Breadcrumb.Item>
    
    <Breadcrumb.Item active >{process.env.NEXT_PUBLIC_PERSON_BREADCRUMB_PLURAL}</Breadcrumb.Item>
    <Breadcrumb.Item active >Born / {year} </Breadcrumb.Item>
   
</Breadcrumb> 

<h3>Born / {year} </h3>


</Col>
      </Row>
     <Row>

     <Accordion alwaysOpen>
                                            {
                                            Object.entries(persons).sort().map(([letter, person_list]) => (
   
                                                <Accordion.Item key={"section_" + letter} eventKey={"section_" + letter}>
                                                <Accordion.Header>{letter}</Accordion.Header>
                                                <Accordion.Body>


                                              
<ListGroup>

{Array.isArray(person_list) ? person_list.map((person) => ( <Person {...person} key={person.id} />)) : ""}

</ListGroup>
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




