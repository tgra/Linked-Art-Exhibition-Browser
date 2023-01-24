import Link from 'next/link'
import Head from 'next/head'

import {Row, Col, ListGroup, CardGroup, Card, Breadcrumb,Container } from 'react-bootstrap';

import React from 'react'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { GetExs, GetEx } from '/lib/exhibition'
import ExNav from '/components/exnav'

import Map from '/components/Map';
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
    return {
        props: {
            exData,
        },
    }
}



const Ex = ({ exData }) => {

    if (exData == undefined) {
        return <div>processing...</div>
    }

    let DEFAULT_CENTER = exData.took_place_at[0].defined_by
    DEFAULT_CENTER = DEFAULT_CENTER.split("POINT(")[1]
    DEFAULT_CENTER = DEFAULT_CENTER.split(")")[0]
    DEFAULT_CENTER = DEFAULT_CENTER.split(" ")

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

    console.log(exData.influenced_by)
    
    

    return (
        <div>
            <Head>
                <title> Alternative New York Exhibition - Exhibition</title>
                <script src="https://unpkg.com/react/umd/react.production.min.js"  async></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                    crossOrigin="anonymous" />
                    
            </Head>
            <Container>
                <Row>
                    <Col>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

                    <Breadcrumb.Item active href="#">Exhibition</Breadcrumb.Item>
                    <Breadcrumb.Item active href="#">{exData._label}</Breadcrumb.Item>
                </Breadcrumb>
                </Col>
                </Row>
                <Row>
                   
                    <Col>

                <h2>Exhibition: {exData._label}</h2>


                <h3>Exhibition Dates</h3>

                <p>{new Date(exData.timespan?.begin_of_the_begin).toDateString()}  to  {new Date(exData.timespan?.end_of_the_end).toDateString()}
                      </p>   
                      
                      <h3>Location</h3>
<p>Venue: {exData.took_place_at[0]._label}</p>
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
                <h3>Artists and other Influencers</h3>
                <ListGroup numbered>
                {
                
                
                influencers.map((agent) => (
                      <ListGroup.Item variant="dark" key={"agent" + agent.id} action href={"/person/" + agent.id.split("/").pop()}>{agent._label}
    </ListGroup.Item> ))}
                            
                                    </ListGroup>
                
        <br/><br/>
                                
                           
                       



                    
                    
                    </Col>
                    </Row>
            </Container>
        </div>
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