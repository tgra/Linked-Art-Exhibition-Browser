import Link from 'next/link'
import Head from 'next/head'


import { Table, Nav, Button, Tab, Row, Col, ListGroup, Breadcrumb, Container, SSRProvider, Accordion } from 'react-bootstrap';
import Person from '/components/person_exhibition_list'
import TabPanePerson from '/components/person_exhibition_detail'
import randomColor from "randomcolor";

import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

import Navbar from '/components/navbar';
import Footer from '/components/footer';

import { GetExs, GetEx, GetExsSameDate, GetExInfluencers, GetExInfluencersIds } from '/lib/exhibition'
import {  GetExInfluencersSummaryData } from '/lib/person'

import React from "react";

import Map from '../../../components/Map';
import styles from '../../styles/Home.module.css';


import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { exit } from 'process';



function extractNumber(str) {
    return str.id.split("/").pop()
}


export const getStaticPaths = async () => {

    // get list of all exhibition identifers
    const exList = await GetExs()

    // get list of exhibition ids by calling extractNumber()
    let ids = exList.map(extractNumber)

    // map list of ids to parameter that will be used to create file paths
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
    // exhibition id passed as url parameter
    const { id } = context.params

    
    // get exhibition data using exhibition id
    const exData = await GetEx(parseInt(id))

    // get list of persons who influenced the exhibition
    const person_list = await GetExInfluencers(parseInt(id))

    const id_list = await GetExInfluencersIds(parseInt(id))

    const person_list_summary = await GetExInfluencersSummaryData(id_list)

    // get list of exhibitions that happened at time that overlaps with this exhibition
    const exs_samedate = await GetExsSameDate(id)
   
  
  
    return {
        props: {
            exData, person_list, exs_samedate, id, person_list_summary, id_list
        },
    }
}



const Ex = ({ exData, person_list, exs_samedate, id, person_list_summary, id_list  }) => {



   

    if (exData == undefined) {
        return <div>processing...</div>
    }

     
     let DEFAULT_CENTER = exData.took_place_at ? exData.took_place_at[0].defined_by : "POINT(0 0)"
    DEFAULT_CENTER = DEFAULT_CENTER.split("POINT(")[1]
    DEFAULT_CENTER = DEFAULT_CENTER.split(")")[0]
    DEFAULT_CENTER = DEFAULT_CENTER.split(" ")

    let person_count = 0

    person_count = exData.influenced_by.length


   
    let orgs = Object.keys(exs_samedate)

    const groups = [{
        id: "selected",
        title: "Selected Exhibition",
    }]

    const items = [
        {
            id: 1,
            group: "selected",
            title: exData._label,
            height: 30,

            start_time: moment(exData.timespan.begin_of_the_begin, 'YYYY-MM-DD').format('x'),
            end_time: moment(exData.timespan.end_of_the_end, 'YYYY-MM-DD').format('x'),
            itemProps: {
                style: {
                    borderRadius: 10,
                    color: "black",
                    background: randomColor({ luminosity: "light", seed: "selected" })
                }
            }
        }
    ]

    // exhibition timeline data
    orgs.forEach(function (org) {
        groups.push({
            id: org,
            title: org,
            stackItems: true,
        })
    })



    let sorted_exs_samedate = {}
    Object.entries(exs_samedate).forEach(([org, exlist]) => {

        let sorted_exlist = exlist.sort(function(a,b) {

            let  a_start = new Date(a.start)
            let b_start = new Date(b.start)
            
            return (a_start - b_start)
        })

        sorted_exs_samedate[org] = sorted_exlist

    }
    )

 

    Object.entries(exs_samedate).forEach(([org, exlist]) => {


     
        

        exlist.forEach(function (ex) {
            items.push(
                {
                    id: ex.id,
                    group: org,
                    canMove: true,
                    title: ex._label,
                    start_time: parseInt(moment(ex.start, 'YYYY-MM-DD').format('x')),
                    end_time: parseInt(moment(ex.end, 'YYYY-MM-DD').format('x')),
                    itemProps: {
                        onDoubleClick: () => { window.location.href = "../" + (ex.id.split("/").pop()) },
                        style: {
                            borderRadius: 10,
                            color: "black",
                            background: randomColor({ luminosity: "light", seed: ex._label }),

                        }

                    },

                }

            )

        })


    })

    // TITLE
    let exhibition_title = exData._label

    // DATES
    let start_date = exData.timespan?.begin_of_the_begin ? exData.timespan?.begin_of_the_begin : ""
    let start_date_string = start_date !== "" ? new Date(start_date).toDateString() : ""
    let end_date = exData.timespan?.end_of_the_end ? exData.timespan?.end_of_the_end : ""
    let end_date_string = end_date !== "" ? " until " + new Date(end_date).toDateString() : "until [not recorded]"

    // SECTION_DATES
    let section_dates = (start_date != "") ?
        <div key={start_date + end_date}>
            <h5>Date</h5>
            <p>{start_date_string}  {end_date_string}</p>
        </div>
        : ""

   


        
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
                    crossOrigin=""
                />
            </Head>
            <main>
                <Container fluid>
                    <Navbar/>
              
         
                    <Row>
                        <Col>
                            
                            <Breadcrumb>
                                <Breadcrumb.Item href={process.env.basePath}>Home</Breadcrumb.Item>
                                <Breadcrumb.Item >Exhibition</Breadcrumb.Item>
                                <Breadcrumb.Item>{exhibition_title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h1>{exhibition_title}</h1>
                        </Col>
                    </Row>

                    <h3>Summary information</h3>
                    <div className="ex_summary">
                        <Row>
                          

                        
                            <Col>
                            {section_dates} 

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
                            
                            {exData.carried_out_by[0] ?
                                <div>
                                    <h5>Carried out by</h5>
                                   <p>{exData.carried_out_by[0]._label}</p>
                                    
                                    <ol>
                                        {exData.carried_out_by[0].equivalent.map((ex_link) => (
                                            <li key={ex_link.id}><Link href={ex_link.id} target="_new">{ex_link.id.split("//")[1].split("/")[0]}</Link></li>
                                        ))}
                                    </ol>
                                </div>
                                : ""}
{
                                    (exData.subject_of && exData.subject_of[0].digitally_carried_by[0]?.classified_as[0].id == 'http://vocab.getty.edu/aat/300264578') ?
                                        <div>
                                            
                                            <p>
                                                <Button variant="secondary" href={exData.subject_of[0]?.digitally_carried_by[0]?.access_point[0]?.id} target="_new">
                                                Further exhibition information at {exData.subject_of[0]?.digitally_carried_by[0]?.access_point[0]?.id.split("//")[1].split("/")[0]}
                                                </Button>
                                                </p>
                                                <p>
                                                <Button variant="secondary" href={process.env.basePath + "/datasets/combined/exhibitions/" + exData.carried_out_by[0]._label + "/"}>View other exhibitions carried out by {exData.carried_out_by[0]._label}</Button>
                                                </p>
                                        </div>
                                        : ""
                                }
                                </Col>
                                <Col>
                                


                                <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={20}>
                                    {({ TileLayer, Marker, Popup }) => (
                                        <div>
                                            <TileLayer  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={DEFAULT_CENTER}>
                                                <Popup>
                                                    {exData.took_place_at ? exData.took_place_at[0]._label : ""} : {exData._label}
                                                </Popup>
                                            </Marker>
                                           
                                        </div>
                                    )}
                                </Map>
                                    </Col>
                        </Row>
                    </div>

                    <Row>
                        <Col >
                        
                        <hr/>
                            <h3>Concurrent exhibitions</h3>

                            <p>Exhibitions that overlap with this exhibition, in this dataset. <i>Double-click an item in the timeline to view the corresponding exhibition page.</i></p>

                            <Timeline
                                groups={groups}
                                items={items}
                                width={600}
                                height={400}
                                sidebarWidth={200}
                                defaultTimeStart={new Date(exData.timespan.begin_of_the_begin)}
                                defaultTimeEnd={new Date(exData.timespan.end_of_the_end)}
                            />
<br/>
                        </Col>

                    </Row>
                   
                    <Row><Col >
                        

                       
                                    <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12}>
                                        {({ TileLayer, Marker, Popup }) => (
                                            <div>
                                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                <Marker position={DEFAULT_CENTER}>
                                                    <Popup>
                                                        {exData.took_place_at ? exData.took_place_at[0]._label : ""} : {exData._label}
                                                    </Popup>
                                                </Marker>
                                                {
                                                    Object.keys(exs_samedate).map((org) => (
                                                        <Marker key={org} position={String(exs_samedate[org][0].coords.split("POINT(")[1]).split(")")[0].split(" ")}>
                                                            <Popup> <h6>{org}</h6>
                                                                <ol>
                                                                    {exs_samedate[org].map((ex) =>
                                                                        <li key={"m" + ex.id}><Link href={"" + String(ex.id).split("/").pop()}>{ex._label}</Link></li>
                                                                    )}
                                                                </ol>
                                                            </Popup>
                                                        </Marker>
                                                    ))}
                                            </div>
                                        )}
                                    </Map>
</Col><Col>
<h5>Concurrent exhibitions grouped by organisation</h5>
<Accordion alwaysOpen className="accordion_orgs">
                            {Object.keys(exs_samedate).map((org,index) => (
                                 <Accordion.Item  key={"section_org_" + org} eventKey={"section_org_" + org}>
                                 <Accordion.Header>{org}</Accordion.Header>
                                 <Accordion.Body>
                                   
                                 <Table key={"concurrent" + index}  bordered hover size="sm" striped="columns">
      <thead>
        <tr>  
          <th>#</th>
          <th>Start</th>
          <th>End</th>
          <th>Title</th>
         
        </tr>
      </thead>
      <tbody>

      {exs_samedate[org].map((ex, index) => (

<tr key={ex.id}>
<td><Button variant="info" href={process.env.basePath + "/exhibition/" + ex.id.split("/").pop()}>{index +1}</Button></td>
<td><nobr>{ex.start.slice(0,-3)}</nobr></td>
<td><nobr>{ex.end.slice(0,-3)}</nobr></td>
<td><Button variant="link" href={process.env.basePath + "/exhibition/" + ex.id.split("/").pop()}>{ex._label}</Button></td>

</tr>
      ))}                            
            </tbody></Table>
                                   
                                </Accordion.Body></Accordion.Item>
                            ))}
</Accordion>

                    </Col>
                    </Row>
                    

                   
<hr/>
                        <h3>Artists</h3>

                        <p>There were <b>{person_count}</b> persons who influenced this exhibition.</p>
                        <p>Persons are ordered alphabetically by surname. Select a letter in the concertina to continue. Click on the person&apos;s name to view further information.</p>

                       

                    <Accordion alwaysOpen>
                
                  {Object.entries(person_list).map(([letter, persons]) => (
                    <Accordion.Item key={"abv" + letter} eventKey={"abv" + letter}>
                      <Accordion.Header>{letter}</Accordion.Header>
                      <Accordion.Body>
                        <Tab.Container id="list-group-tabs" >
                          <Row>
                            <Col sm={3}>
                              <ListGroup numbered>
                                {Array.isArray(persons) ? persons.map((person) => (<Person {...person} key={person.id} />)) : ""}
                              </ListGroup>
                            </Col>
                            <Col sm={8}>
                              <Tab.Content>
                              {
                                           
                                           person_list_summary[letter]?.map((personData) => (<TabPanePerson {...personData} key={"#link" + personData.id.split("/").pop()} />
                                           ))
                                     
                                       
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


                    <Footer />
                </Container>
            </main>
        </SSRProvider>
    )
}

export default Ex



/*

{
    exs_samedate.map((ex) => (

        <Marker position={ex.coords.split("POINT(")[1]}>
                                        <Popup>
                                            Exhibition: {ex._label} {ex.coords.split("POINT(")[1]}
                                        </Popup>
                                    </Marker>
     ))


}

*/

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
        }
        
        <img width="1200" height="974" data-src="https://format.creatorcdn.com/e95ceda3-bf56-4b10-9a29-58edab2ea8ee/0/0/0/0,0,1200,974,1200,1200/0-0-0/6e3543cc-d3d7-4897-9678-ee672c277dcf/1/1/057_FEB_23_SK.jpg?fjkss=exp=1993062056~hmac=b971b7c1987c598f859d7987fb00a4fdf08fab6f2aa4fb0570c2187c41beec55" alt="" class=" ls-is-cached lazyloaded" src="https://format.creatorcdn.com/e95ceda3-bf56-4b10-9a29-58edab2ea8ee/0/0/0/0,0,1200,974,1200,1200/0-0-0/6e3543cc-d3d7-4897-9678-ee672c277dcf/1/1/057_FEB_23_SK.jpg?fjkss=exp=1993062056~hmac=b971b7c1987c598f859d7987fb00a4fdf08fab6f2aa4fb0570c2187c41beec55">
        
        <img width="1200" height="974" data-src="https://format.creatorcdn.com/e95ceda3-bf56-4b10-9a29-58edab2ea8ee/0/0/0/0,0,1200,974,1200,1200/0-0-0/6e3543cc-d3d7-4897-9678-ee672c277dcf/1/1/057_FEB_23_SK.jpg?fjkss=exp=1993062056~hmac=b971b7c1987c598f859d7987fb00a4fdf08fab6f2aa4fb0570c2187c41beec55" alt="" class=" ls-is-cached lazyloaded" src="https://format.creatorcdn.com/e95ceda3-bf56-4b10-9a29-58edab2ea8ee/0/0/0/0,0,1200,974,1200,1200/0-0-0/6e3543cc-d3d7-4897-9678-ee672c277dcf/1/1/057_FEB_23_SK.jpg?fjkss=exp=1993062056~hmac=b971b7c1987c598f859d7987fb00a4fdf08fab6f2aa4fb0570c2187c41beec55">
        -->

*/