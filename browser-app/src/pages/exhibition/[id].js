import Link from 'next/link'
import Head from 'next/head'


import { Tab, Row, Col, Accordion, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/personlistgrouptab'
import TabPanePerson from '/components/tabpaneperson'

import React from 'react'

import { GetExs, GetEx } from '/lib/exhibition'
import { GetPersonsByEx } from '/lib/person'

import Map from '/components/Map';



function extractNumber(str) {
    return str.id.split("/").pop()
}


export const getStaticPaths = async () => {
    const exList = await GetExs()
    let ids = exList.map(extractNumber)
    return {
        paths: ids.map((id) => {
            return {
                params: {
                    id: id
                },
            }
        }),
        fallback: true,
    }
}

export const getStaticProps = async (
    context
) => {
    const { id } = context.params
    const exData = await GetEx(parseInt(id))
    const person_list = await GetPersonsByEx(id)
   
    return {
        props: {
            exData, person_list
        },
    }
}



const Ex = ({ exData, person_list }) => {

    if (exData == undefined) {
        return <div>processing...</div>
    }

    let DEFAULT_CENTER = exData.took_place_at[0].defined_by
    DEFAULT_CENTER = DEFAULT_CENTER.split("POINT(")[1]
    DEFAULT_CENTER = DEFAULT_CENTER.split(")")[0]
    DEFAULT_CENTER = DEFAULT_CENTER.split(" ")

    return (
        <SSRProvider>
            <Head>
                <title> Alternative New York Exhibition - Exhibition</title>
                <script src="https://unpkg.com/react/umd/react.production.min.js" async></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                    crossOrigin="anonymous" />

            </Head>

            <main>

                <Container>

                    <Row>
                        <Col>
                            <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1> 

           
         
            

                        <Breadcrumb>
                            <Breadcrumb.Item href={process.env.basePath }>Home</Breadcrumb.Item>

                            <Breadcrumb.Item >Exhibition</Breadcrumb.Item>
                            
                        </Breadcrumb>
                   
                   </Col>
                   </Row>
                <Row>

                    <Col>

                        <h2>Title: {exData._label}</h2>


                        <h3>Date</h3>

                        <p>{new Date(exData.timespan?.begin_of_the_begin).toDateString()}  until {new Date(exData.timespan?.end_of_the_end).toDateString()}
                        </p>

                        <h3>Location</h3>
                        <p>Venue: {exData.took_place_at[0]._label}</p>
                        <h3>Artists and other Influencers</h3>
                       


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


                       
                       



</Col>


                   
           
            </Row>
            </Container>
            </main>
        </SSRProvider>
    )
}

export default Ex


/*
  
                   
                    
 
                
                    <Card bg="warning" text="dark" key="c5">
                        <Card.Header>Carried out by  </Card.Header>
                        <Card.Body>
                            <Card.Title></Card.Title>
                            <Card.Text>
                                {exData.carried_out_by?.map((agent) => (
                                    <p key={agent.id}><Link key={agent.id} href={"/" + agent.type.toLowerCase() + "/" + agent.id.split("/").pop()}>{agent._label}</Link></p>

                                ))}
                            </Card.Text>
                        </Card.Body>
                    </Card>

*/


/*


let influencers = exData.influenced_by
    influencers = influencers.sort(function(first, second) {
    
        let a = second._label 
        let b = first._label
    
        if (a > b) {
          return -1;
      }
      if (b > a) {
          return 1;
      }
      return 0;
       })

 <h3>Artists and other Influencers</h3>
                <ListGroup numbered>
                {
                
                
                influencers.map((agent) => (
                      <ListGroup.Item variant="dark" key={"agent" + agent.id} action href={"/person/" + agent.id.split("/").pop()}>{agent._label}
    </ListGroup.Item> ))}
                            
                                    </ListGroup>

                                    <p>Coordinates: {exData.took_place_at[0].defined_by}</p>
                        <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={15}>
                            {({ TileLayer, Marker, Popup }) => (
                                <div>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                                    />
                                    <Marker position={DEFAULT_CENTER}>
                                        <Popup>
                                            Exhibition
                                        </Popup>
                                    </Marker>
                                </div>
                            )}
                        </Map>
*/