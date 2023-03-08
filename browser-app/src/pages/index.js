import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { Card, CardGroup, Button, Container, Row, Col } from 'react-bootstrap'
import {
  GetPersonsByNationalityBirthYear, GetPersonsByNationality, GetPersonsByBirthYear,
  GetPersonsSurnameLetterNonUS, GetPersonsSurnameLetterUS, GetPersonSurnamesFirstLetter, GetPersonsByDatasetBirthYear

} from '/lib/person'
import Footer from '/components/footer'

import { GetExsOrganisation, GetExsStartdateMoma, GetExsStartdateNonmoma, GetExsStartDate } from '/lib/exhibition'

import 'chart.js/auto';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';

import Navbar from '/components/navbar';


export const getStaticProps = async (context) => {
  let result = await GetPersonsByNationalityBirthYear("us")
  let result2 = await GetPersonsByNationalityBirthYear("nonus")

  let result_nonusnat = await GetPersonsByNationality()

  let result_birthyearall = await GetPersonsByBirthYear("")

  let result_nonus_surname = await GetPersonsSurnameLetterNonUS()
  let result_us_surname = await GetPersonsSurnameLetterUS()

  let result_ex_org = await GetExsOrganisation()

  let result_ex_moma_startdate = await GetExsStartdateMoma()
  let result_ex_nonmoma_startdate = await GetExsStartdateNonmoma()
  let result_ex_startdate = await GetExsStartDate()

  let result_index_surname = await GetPersonSurnamesFirstLetter()





  let result_nonmoma_birthyear = await GetPersonsByDatasetBirthYear("nonmoma")


  return {
    props: {
      years_us: result.count, years_nonus: result2.count, nonus_nat: result_nonusnat.count,
      birthyear_all: result_birthyearall, nonus_surname: result_nonus_surname.count, ex_org: result_ex_org.counter,
      us_surname: result_us_surname.count, ex_moma_date: result_ex_moma_startdate.counter,
      ex_nonmoma_date: result_ex_nonmoma_startdate.counter,
      index_surname: result_index_surname.count, ex_startdate: result_ex_startdate.counter,

      nonmoma_birthyear: result_nonmoma_birthyear.count
    }
  }
}


export default function Home({
  years_us, years_nonus, nonus_nat, birthyear_all, nonus_surname, us_surname, ex_org, ex_moma_date, ex_nonmoma_date, index_surname, ex_startdate, nonmoma_birthyear
}) {




  const data_index_surname = {
    labels: Object.keys(index_surname).sort(),
    datasets: [{
      label: '# of Persons',
      data: Object.values(index_surname),
      borderWidth: 1
    }]
  }

  let org_moma = ["The Museum of Modern Art", "MoMA PS1"]
  let ex_org_moma = {}
  let ex_org_nonmoma = {}
  org_moma.forEach(function (org) {
    ex_org_moma[org] = ex_org[org]
  })

  Object.keys(ex_org).forEach(function (org) {
    if (org_moma.includes(org) == false) {
      ex_org_nonmoma[org] = ex_org[org]
    }
  })


  const data_ex_org_all = {
    labels: Object.keys(ex_org).sort(),
    datasets: [{
      label: '# of Exhibitions',
      data: Object.values(ex_org),
      borderWidth: 1
    }]
  }


  const data_ex_org_moma = {
    labels: Object.keys(ex_org_moma).sort(),
    datasets: [{
      label: '# of Exhibitions',
      data: Object.values(ex_org_moma),
      borderWidth: 1
    }]
  }

  const data_ex_org_nonmoma = {
    labels: Object.keys(ex_org_nonmoma).sort(),
    datasets: [{
      label: '# of Exhibitions',
      data: Object.values(ex_org_nonmoma),
      borderWidth: 1
    }]
  }


  const data_ex_moma_date = {
    labels: Object.keys(ex_moma_date).sort(),
    datasets: [{
      label: '# of Exhibitions',
      data: Object.values(ex_moma_date),
      borderWidth: 1
    }]

  }

  const data_ex_nonmoma_date = {
    labels: Object.keys(ex_nonmoma_date).sort(),
    datasets: [{
      label: '# of Exhibitions',
      data: Object.values(ex_nonmoma_date),
      borderWidth: 1
    }]
  }

  const data_ex_date = {
    labels: Object.keys(ex_startdate).sort(),
    datasets: [{
      label: '# of Exhibitions',
      data: Object.values(ex_startdate),
      borderWidth: 1
    }]
  }

  const data_nonus_surname = {
    labels: Object.keys(nonus_surname).sort(),
    datasets: [{
      label: '# of Persons',
      data: Object.values(nonus_surname),
      borderWidth: 1
    }]
  }



  const data_us_surname = {
    labels: Object.keys(us_surname).sort(),
    datasets: [{
      label: '# of Persons',
      data: Object.values(us_surname),
      borderWidth: 1
    }]
  }

  const data_birthyear_nonmoma = {
    labels: Object.keys(nonmoma_birthyear),
    datasets: [{
      label: '# of Persons',
      data: Object.values(nonmoma_birthyear),
      borderWidth: 1
    }]

  }
  
  const data_birthyearall = {
    labels: Object.keys(birthyear_all),
    datasets: [{
      label: '# of Persons',
      data: Object.values(birthyear_all),
      borderWidth: 1
    }]
  }

  const data_us = {
    labels: Object.keys(years_us),
    datasets: [{
      label: '# of Persons',
      data: Object.values(years_us),
      borderWidth: 1
    }]
  }

  const data_nonus = {
    labels: Object.keys(years_nonus),
    datasets: [{
      label: '# of Persons',
      data: Object.values(years_nonus),
      borderWidth: 1
    }]
  }

  const data_nonusnat = {
    labels: Object.keys(nonus_nat),
    datasets: [{
      label: '# of Persons',
      data: Object.values(nonus_nat),
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
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="description" content="Exhibition data browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <main>
        <Container fluid>
          <Navbar />






          <Row>

            <Col>

              <a name="all" />
              <h3>Dataset: All</h3>

            </Col>
          </Row>


          <h5>Exhibitions</h5>

          <Row xs={1} md={2} lg={2}>
            <Col key="moma-org6">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Start date</Card.Title>
                  <Card.Text>
                    Explore via exhibition <b>start date</b>
                    <Bar data={data_ex_date} />
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/combined/exhibitions/start_date">Explore</Button></Card.Footer>
              </Card>
            </Col>

            <Col key="moma-org41">


              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Organisation</Card.Title>
                  <Card.Text>
                    Explore via <b>organisation</b>
                    <Doughnut data={data_ex_org_all} options={options_hor} />
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button size="sm" variant="link" href="datasets/combined/exhibitions/organisation/start_date">Explore</Button></Card.Footer>
              </Card>
            </Col>
          </Row>

          <br />
          <h5>Persons </h5>
          <h6>US Nationality</h6>
          <p>The following entry points into the exhibition data relate to people who have been identified as influencing the exhibitions in the dataset.</p>

          <Row  xs={1} md={2} lg={2}>

            <Col key="moma-or7g">
              <Card bg="dark" >
                <Card.Body>
                  <Card.Title>Name</Card.Title>
                  <Card.Text>
                    Explore exhibitions via <b>surname</b>

                    <Doughnut data={data_us_surname} />


                  </Card.Text>

                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/combined/persons/nationality/us/surname_letter">Explore</Button></Card.Footer>
              </Card>


            </Col>

            <Col key="moma-org2">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Birth year</Card.Title>
                  <Card.Text>
                    Explore exhibitions via <b>birth year</b>
                    <Bar data={data_us}  />

                  </Card.Text>

                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/combined/persons/nationality/us/birth_year">Explore</Button></Card.Footer>

              </Card>


            </Col>


          </Row>



          <br />



          <h6>non-US Nationality</h6>
          <p>The following entry points into the exhibition data relate to people who have been identified as influencing the exhibitions in the dataset.</p>

          <Row xs={1} md={2} lg={2}>
            <Col key="moma-start2">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Name</Card.Title>
                  <Card.Text>
                    Explore exhibitions via <b>surname</b>

                    <Doughnut data={data_nonus_surname} />


                  </Card.Text>

                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/combined/persons/nationality/nonus/surname_letter">Explore</Button></Card.Footer>

              </Card>


            </Col>

            <Col key="moma-start">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Birth year</Card.Title>
                  <Card.Text>
                    Explore exhibitions via <b>birth year</b>
                    <Bar data={data_nonus}  />

                  </Card.Text>

                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/combined/persons/nationality/nonus/birth_year">Explore</Button></Card.Footer>

              </Card>


            </Col>
            <Col key="moma-org">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Nationality</Card.Title>
                  <Card.Text>
                    Explore exhibitions via <b>nationality</b>
                    <Pie data={data_nonusnat} options={options_hor} />
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/combined/persons/nationality/nonus/nationality">Explore</Button></Card.Footer>
              </Card>
            </Col>
          </Row>

          <br />
          <Row>

            <Col class="bg-dark">
              <br />
            </Col>
          </Row>
          <br />


          <a name="moma" />
          <h3>Dataset: MoMA</h3>
          <p>The following entry points into the exhibition data relate to exhibitions organised by MoMA.</p>

<h4>Exhibitions</h4>
          <Row xs={1} md={2} lg={2}>
            <Col key="moma-org3">
              <Card bg="dark">
                <Card.Body>
                  <Card.Title>Organisation</Card.Title>
                  <Card.Text>
                    Explore via <b>organisation</b>
                    <Doughnut data={data_ex_org_moma} options={options_hor} />
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Button size="sm" variant="link" href="datasets/moma/exhibitions/organisation">Explore</Button>
                </Card.Footer>
              </Card>
            </Col>

            <Col key="moma-start">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Start date</Card.Title>
                  <Card.Text>
                    Explore via <b>start date</b>
                    <Bar data={data_ex_moma_date}  />
                  </Card.Text>

                </Card.Body>
                <Card.Footer><Button size="sm" variant="link" href="datasets/moma/exhibitions/start_date">Explore</Button></Card.Footer>

              </Card>


            </Col>

          </Row>
          <br />
          <Row>

            <Col class="bg-dark">
              <br />
            </Col>
          </Row>


          <br />
          <a name="nonmoma" />
          <h3>Dataset: non-MoMA</h3>
          <h4>Exhibitions</h4>
          <Row xs={1} md={2} lg={2}>
            <Col key="moma-org4">


              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Organisation</Card.Title>
                  <Card.Text>
                    Explore via <b>organisation</b>
                    <Doughnut data={data_ex_org_nonmoma} options={options_hor} />
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button size="sm" variant="link" href="datasets/nonmoma/exhibitions/organisation/start_date">Explore</Button></Card.Footer>
              </Card>
            </Col>
            <Col key="moma-org6">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Start date</Card.Title>
                  <Card.Text>
                    Explore via <b>start date</b>
                    <Bar data={data_ex_nonmoma_date} />
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/nonmoma/exhibitions/start_date">Explore</Button></Card.Footer>
              </Card>
            </Col>
            
          </Row>
          <br/>
<h4>Persons</h4>
<Row xs={1} md={2} lg={2}><Col key="nonmoma-birthyear">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Birth year</Card.Title>
                  <Card.Text>
                    Explore via <b>birth year</b>
                    <Bar data={data_birthyear_nonmoma}  />
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/nonmoma/persons/birth_year">Explore</Button></Card.Footer>
              </Card>
            </Col>
</Row>

          <br />
          <Row>

            <Col class="bg-dark">
              <br />
            </Col>
          </Row>
          <br />




          <Row><Col>

            <a name="indexes" />
            <h3>Indexes</h3>
            <h4>Persons</h4>
          </Col></Row>
          <Row xs={1} md={2} lg={2}>
            <Col key="moma-org5">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Personal name</Card.Title>
                  <Card.Text>
                    Explore via <b>surname</b>
                    <Doughnut data={data_index_surname} />
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button size="sm" variant="link" href="datasets/combined/indexes/person/surname_letter">Explore</Button></Card.Footer>
              </Card>
            </Col>

            <Col key="moma-start">
              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Birth year</Card.Title>
                  <Card.Text>
                    Explore via <b>birth year</b>
                    <Bar data={data_birthyearall}  />
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button variant="link" size="sm" href="datasets/combined/indexes/person/birth_date_all">Explore</Button></Card.Footer>
              </Card>
            </Col>

          </Row>


          <br />
          <Row>

            <Col class="bg-dark">
              <br />
            </Col>
          </Row>
          <br />


          <Row  ><Col>


            <a name="about" />
            <h3>About the Linked Art Exhibition Browser</h3>
          </Col></Row>
          <Row >
            <Col>
              <Card bg="dark">
                <Card.Body>
                  <Card.Title>MoMA data</Card.Title>
                  <Card.Text>
                    The exhibition browser visualises data in a Linked Art JSON-LD dataset provided by the Museum of Modern Art.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>  <Button target="_new" href="https://tgra.github.io/exhibition-browser-static-demo/" variant="secondary">Website</Button></Card.Footer>
              </Card>
            </Col>
            <Col>
              <Card bg="dark">
                <Card.Body>
                  <Card.Title>Data analysis</Card.Title>
                  <Card.Text>
                    The entry pages into the data as well as the design of the exhibition pages and the organisation of the website, have been determined via a data analysis using Jupyter Notebooks, available on 
                    <a href="https://github.com/tgra/linked-art-data-analysis-app" target="_new">GitHub</a>.

                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button variant="secondary" href="https://github.com/tgra/linked-art-data-analysis-app" target="_new">Data analysis app</Button></Card.Footer>
              </Card>
            </Col>
            <Col>

              <Card bg="dark"  >
                <Card.Body>
                  <Card.Title>Static HTML app</Card.Title>
                  <Card.Text>
                    The static HTML web pages have been generated using a custom app developed with React and NextJS, available on <a variant="link" target="_new" href="https://github.com/tgra/exhibition-browser">GitHub</a>.
                    The files are published to a 
                    <a href="https://github.com/tgra/exhibition-browser-static-demo">GitHub repository</a> and then GitHub pages is used to deploy them to <a target="_new" href="https://tgra.github.io/exhibition-browser-static-demo/" variant="link">GitHub Pages</a>.
                  </Card.Text>
                </Card.Body>
                <Card.Footer><Button variant="secondary" target="_new" href="https://github.com/tgra/exhibition-browser">Static HTML app</Button> <Button target="_new" variant="secondary" href="https://tgra.github.io/exhibition-browser-static-demo/" >Website</Button>

                </Card.Footer>
              </Card>


            </Col>
          </Row>

          <Footer />


        </Container>

      </main >
    </>
  )
}
