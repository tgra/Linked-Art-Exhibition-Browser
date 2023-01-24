import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'

import { ParsedUrlQuery } from 'querystring'

import React from 'react'


import {Accordion, ListGroup, Container, Row, Col,  Breadcrumb} from 'react-bootstrap';



import { GetPersonSummary, GetPerson, GetPersonIDs } from '/lib/person'


var personid = ""




export const getStaticPaths = async () => {
    let ids = await GetPersonIDs()
    

    let ids_filtered = []

    ids.forEach(function (id) {
        if (id != "") {
            ids_filtered.push(id)
        }

    })

    return {
        paths: ids_filtered.map((id) => {
            return { params: { id: id } }
        }),
        fallback: true,
    }
}

export const getStaticProps = async (
    context
) => {
    const { id } = context.params
    const personData = await GetPerson(id)

    let personSummary = await GetPersonSummary(id)

    return {
        props: {
            personData, personSummary
        },
    }
}





const Person = ({ personData, personSummary }) => {

    
    let names = []
    let identifiers = []

    if (personData == undefined) {
        return false
    }

    personid = personData.id

    let total_exhibitions = personSummary[0].total_exhibitions
    let exhibitions = personSummary[0].exhibitions


    let exDecades = {};

    exhibitions.forEach(function (ex) {
        let start_year = ex.start.split("-")[0]
        let decade = start_year.substring(0, 3)

        if (exDecades[decade] == undefined) {
            exDecades[decade] = []
        }
        exDecades[decade].push(ex)
    });

    for (const decade in exDecades){
        exDecades[decade]  = exDecades[decade].sort((a, b) => (a.start > b.start) ? 1 : -1)
    }

  
    

    if ("identified_by" in personData) {
        let ids = personData.identified_by
        for (var idx in ids) {
            switch (ids[idx].type) {
                case "Name":
                    names.push(ids[idx])
                    break
                case "Identifier":
                    identifiers.push(ids[idx])
                    break
            }
        }
    }

    let personal_name = personData._label
    let nationality = ""
    if ("classified_as" in personData) {

        nationality = personData.classified_as[0]._label
    }
    let born = ""
    if ("born" in personData) {
        born = personData.born.timespan.begin_of_the_begin.split("-")[0]
    }

    let died = ""
    if ("died" in personData) {
        died = personData.died.timespan.begin_of_the_begin.split("-")[0]
    }



    return (
        <div>
            <Head>
                <title> Alternative New York Exhibition - Person</title>
                <script src="https://unpkg.com/react/umd/react.production.min.js"  async></script>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                    integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                    crossOrigin="anonymous" />
            </Head>
            <Container>
                <Row>
                    <Col> <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active href="#">Person</Breadcrumb.Item>
                        <Breadcrumb.Item active href="#">{personal_name}</Breadcrumb.Item>
                    </Breadcrumb></Col>
                </Row>

                <Row>

                    <Col>


                        <h2>{personal_name}</h2>



                        <ListGroup>

                            {personData.referred_to_by?.map((statement) => (<ListGroup.Item variant="dark" key={statement.id}>{statement.classified_as[0]._label} - {statement.content}</ListGroup.Item>))}

                            <ListGroup.Item variant="dark">Born: {born}</ListGroup.Item>
                            <ListGroup.Item variant="dark">Died: {died}</ListGroup.Item>
                            <ListGroup.Item variant="dark">{nationality}</ListGroup.Item>
                        </ListGroup>

                        <br />
                        <h3>Exhibitions</h3>
                        <p>Total number of exhibitions: {total_exhibitions}</p>
                    

                       
                            
                                
                                <Accordion alwaysOpen >
                                {Object.entries(exDecades).map(([decade, exhibitions]) => (
                                    
                                    <Accordion.Item key={"section_" + decade} eventKey={"section_" + decade}>
                                        <Accordion.Header>{decade}0s ({exhibitions && Array.isArray(exhibitions) ? exhibitions.length : ""})</Accordion.Header>
                                        <Accordion.Body>
                                       
                                           
                                        <ListGroup numbered>
                                   {
                                exhibitions?.map((ex) => (
                                    <ListGroup.Item variant="dark" key={'influenced' + ex.id} action href={'/exhibition/' + ex.id.split("/").pop()}>&nbsp;&nbsp;{ex.start.split("T")[0]} &nbsp;&nbsp;&nbsp; {ex._label} </ListGroup.Item>
                                ))}
                                 </ListGroup>

                               
                                
                                 </Accordion.Body>
                                 </Accordion.Item>

))
}
                                 </Accordion>
                                 

                           
<br/>
                        <h3>Identifiers</h3>



                        <ListGroup>
                            {personData.equivalent?.map((eq) => (
                                <ListGroup.Item variant="dark" key={"eq" + eq.id} action href={eq.id}>{eq.id}</ListGroup.Item>))}

                        </ListGroup>





                    </Col>
                </Row>
            </Container>




        </div >
    )
}

export default Person



function personEventsInfluenced(e) {

    if ("influenced_by" in ev == undefined) {
        return {}
    }
    let influencers = ev.influenced_by

    if (influencers.includes(personid)) {
        return <p key={ev.id}><Link href={'/exhibition/' + ev.id.split('/').pop()}>{ev._label}</Link>   ({new Date(ev.start).toDateString()}-{new Date(ev.end).toDateString()})</p>
    } else {
        return ""
    }
}


function personEventsCarriedOutBy(ev) {

    if ("carried_out_by" in ev == undefined) {
        return {}
    }
    let c = ev.carried_out_by
    if (c.includes(personid)) {
        return <p key={ev.id}><Link href={'/exhibition/' + ev.id.split('/').pop()}>{ev._label}</Link>   ({new Date(ev.start).toDateString()}-{new Date(ev.end).toDateString()})</p>
    } else {
        return ""
    }
}