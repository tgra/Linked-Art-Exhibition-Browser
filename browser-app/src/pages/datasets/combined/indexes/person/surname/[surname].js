import Head from 'next/head'



import { Row, Col, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';


import Person from '/components/personlistgroup'

import { GetPersonSurnamesAll, GetPersonsBySurname } from '/lib/person'


export const getStaticPaths = async () => {

  
  let surnames_all = GetPersonSurnamesAll()
  let surnames = Object.keys(surnames_all)

  return {
    paths: surnames.map((surname) => {
      return { params: { surname: surname } }
    }),
    fallback: true,
  }
}



export const getStaticProps = async (context) => {

  const { surname } = context.params

  let surname_upper = surname.toString().toUpperCase()
  const persons = await GetPersonsBySurname(surname_upper)

  return {
    props: {
      personSummaryDataList: persons,
      surname: surname
      
    },
  }
}



const IndexPage = ({
  personSummaryDataList, surname
}) => {

  if (personSummaryDataList == undefined) {
    let personSummaryDataList = {}
  }

  if (surname != undefined){
    surname = surname.toUpperCase()
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
                  <Breadcrumb.Item active > Surname / {surname} </Breadcrumb.Item>

                </Breadcrumb>

                <h3>Surname / {surname} </h3>
                
                
<ListGroup numbered>
                {personSummaryDataList && personSummaryDataList.length>0 && personSummaryDataList.map(person => (

<Person {...person} key={person.id} />
                ))}
</ListGroup>  
              </Col>
            </Row>
            

          </Container>
        </main>

      </div>
    </SSRProvider>
  )
}

export default IndexPage

