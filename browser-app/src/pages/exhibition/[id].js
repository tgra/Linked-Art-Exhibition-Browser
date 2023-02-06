import Link from 'next/link'
import Head from 'next/head'


import { Tab, Row, Col, ListGroup, Breadcrumb, Container, SSRProvider } from 'react-bootstrap';
import Person from '/components/personlistgrouptab'
import TabPanePerson from '/components/tabpaneperson'



import { GetExs, GetEx } from '/lib/exhibition'
import { GetPersonsByEx } from '/lib/person'

import React from "react";

import Map from '../../../components/Map';
import styles from '../../styles/Home.module.css';


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
                    <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
            </Head>
            <main>
                <Container>
                    <Row>
                        <Col>
                            <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href={process.env.basePath}>Home</Breadcrumb.Item>
                                <Breadcrumb.Item >Exhibition</Breadcrumb.Item>
                                <Breadcrumb.Item>{exData._label}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Title: {exData._label}</h2>


                        </Col>
                    </Row>

                    <div className="ex_summary">
                        <Row><Col>
                            {exData.timespan?.begin_of_the_begin ?
                                <div key={exData.timespan.begin_of_the_begin + exData.timespan.end_of_the_end}>
                                    <h5>Date</h5>
                                    <p>{new Date(exData.timespan?.begin_of_the_begin).toDateString()}  until {new Date(exData.timespan?.end_of_the_end).toDateString()}
                                    </p>
                                </div>

                                : ""}

                        </Col>
                            <Col>


                                {

                                    exData.took_place_at ?
                                        <div>
                                            <h5>Location</h5>
                                            <ul>
                                                {
                                                    exData.took_place_at.map((loc) => (
                                                        <li key={loc._label}>{loc._label} {loc.classified_as ? <sup>type:<i>{loc.classified_as[0]._label}</i></sup> : ""}</li>

                                                    ))

                                                }</ul>
                                        </div>

                                        : ""}

                              

    





                                {

                                    (exData.subject_of && exData.subject_of[0].digitally_carried_by[0]?.classified_as[0].id == 'http://vocab.getty.edu/aat/300264578') ?
                                        <div>
                                            <h5>External web page for the exhibition</h5>
                                            <p>
                                                <Link href={exData.subject_of[0]?.digitally_carried_by[0]?.access_point[0]?.id} target="_new">
                                                    {exData.subject_of[0]?.digitally_carried_by[0]?.access_point[0]?.id.split("//")[1].split("/")[0]}
                                                </Link></p>
                                        </div>
                                        : ""

                                }

                            </Col></Row>

                        <Row>
                            <Col>
                                {exData.carried_out_by[0] ?
                                    <div>
                                        <h5>Carried out by</h5>
                                        <p>{exData.carried_out_by[0]._label}</p>

<p><Link href={"../datasets/combined/exhibitions/" + exData.carried_out_by[0]._label + "/"}>Browse other exhibitions carried out by <i>{exData.carried_out_by[0]._label}</i></Link></p>

                                    </div>
                                    : ""}

                            </Col>
                            <Col>
                                {exData.carried_out_by[0] ?
                                    <div>

                                        <h6>Authority files for <i>{exData.carried_out_by[0]._label}</i></h6>
                                        <ul>
                                            {exData.carried_out_by[0].equivalent.map((ex_link) => (
                                                <li key={ex_link.id}><Link href={ex_link.id} target="_new">{ex_link.id.split("//")[1].split("/")[0]}</Link></li>
                                            ))
                                            }</ul>
                                    </div>
                                    : ""}

                            </Col>

                        </Row>
                    </div>

                   <Row><Col>
                   <br/>
                    <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={20}>
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
</Col></Row>
                   
                    <Row><Col>


                        <h5>Artists and other Influencers</h5>
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


/*

<!-- "subject_of": [
        {
            "type": "LinguisticObject",
            "digitally_carried_by": [
                {
                    "type": "DigitalObject",
                    "classified_as": [
                        {
                            "id": "http://vocab.getty.edu/aat/300264578",
                            "type": "Type",
                            "_label": "Web Page"
                        }
                    ],
                    "access_point": [
                        {
                            "id": "http://www.moma.org/calendar/exhibitions/1767",
                            "type": "DigitalObject"
                        }
                    ]
                }
            ]
        }-->

*/