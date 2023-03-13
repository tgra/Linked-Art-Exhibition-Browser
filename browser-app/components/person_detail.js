import { Button, Table, Tab, ListGroup, Accordion, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link'
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import randomColor from "randomcolor";
import Image from 'next/image'

/*
Summary.
HTML containing detailed information about a person including an exhibition list and associated histogram

*/



export default function TabPanePerson({ id, _label, born, died, total_exhibitions, nationality, exhibitions, gender, equivalent, image_url, bio }) {

  // assign exhibitions to decade dict
  let exDecades = {};

  exhibitions?.forEach(function (ex) {
    let decade = ex.start.split("-")[0].substring(0, 3)
    if (exDecades[decade] == undefined) {
      exDecades[decade] = []
    }
    exDecades[decade].push(ex)
  })

  // iterate over dict and sort exhibitions within each decade by start date
  for (const decade in exDecades) { exDecades[decade] = exDecades[decade].sort((a, b) => (a.start > b.start) ? 1 : -1) }

  // create dictionary containing decade label and exhibition count
  let dictVis = {}
  Object.entries(exDecades).map(([decade, exs]) => (dictVis[decade + "0s"] = exs.length))

  let labels = Object.keys(dictVis)
  let count = Object.values(dictVis)

  // calculate decade(s) with most exhibitions - returns list
  let maxDecade = Object.keys(dictVis).filter(x => { return dictVis[x] == Math.max.apply(null, Object.values(dictVis)) })
  var maxDecadeCount = dictVis[maxDecade[0]]

  // calculate decade(s) with least exhibitions - returns list
  let minDecade = Object.keys(dictVis).filter(x => { return dictVis[x] == Math.min.apply(null, Object.values(dictVis)) })
  var minDecadeCount = dictVis[minDecade[0]]

  const data_bar = {
    labels: labels,
    datasets: [{ label: '# of exhibitions', data: count, borderWidth: 1, }]
  }

  // calculate exhibition count per decade per location
  let exDecadesOrg = {};

  exhibitions?.forEach(function (ex) {
    let decade = ex.start.split("-")[0].substring(0, 3) + "0s"
    let org = ex.location

    if (exDecadesOrg[org] == undefined) { exDecadesOrg[org] = [] }
    if (exDecadesOrg[org][decade] == undefined) { exDecadesOrg[org][decade] = [] }
    exDecadesOrg[org][decade].push(ex)
  });


  Object.entries(exDecadesOrg).map(([org, decade]) => (
    Object.entries(decade).map(([dec, exs]) => (
      exDecadesOrg[org][dec] = exs.length
    ))
  ))


  let datasetsOrg = []
  Object.entries(exDecadesOrg).map(([org, decades]) => (
    datasetsOrg.push({ label: org, data: labels.map((dec) => (decades[dec] ? decades[dec] : 0)), borderWidth: 1, backgroundColor: randomColor({ luminosity: "dark", seed: org }), })
  ))

  const options_stacked = {
    plugins: { title: { display: true, text: 'Number of exhibitions', }, },
    responsive: true,
    maintainAspectRatio: true,
    scales: { x: { stacked: false, }, y: { stacked: true, }, },
  };

  let data_stacked = {
    labels: labels,
    datasets: datasetsOrg
  }

  return (
    <Tab.Pane key={"#link" + id.split("/").pop()} eventKey={"#link" + id.split("/").pop()}>
      <h3>{_label}</h3>
      <Container className="bio">
        <Row>
          <Col>
            <p><b>Biographical statement</b> {bio}</p>
            <b>Born</b> {born != undefined ? String(born).split('T')[0].split("-")[0] : ""} <sup><Link href={"/datasets/combined/indexes/person/birth_date/" + born}>(click to view other people born in this year)</Link></sup>
            <p><b>Died</b> {died != null ? String(died).split('T')[0].split("-")[0] : ""} </p>
            <p>
              <b>Nationality</b> {nationality}</p>
            <p>
              <b>Gender</b> {gender}</p>
            <p>
              <b>External information resources for {_label}</b></p>
            <ol>{equivalent?.map((url) => (
              <li key={url}><Link href={url} target="_new">{String(url).split("/")[2]}</Link></li>
            ))}
            </ol>
          </Col>
          <Col>
            <div className='image'>
              {
                image_url && image_url.includes(".tif") == false ? <img key={image_url} src={image_url} height="100%" alt={"Picture of " + _label} /> : ""
              }
            </div>
          </Col>

        </Row>
      </Container>
      <br />
      <h4>Exhibitions</h4>
      <p>In this dataset, <b>{_label}</b> was involved in <b>{total_exhibitions}</b> exhibitions across <b>{Object.entries(exDecades).length}</b> decades.</p>
      <ul>
        <li>Decade(s) with the most number of exhibitions was the <b>{maxDecade.toString()}</b> with <b>{maxDecadeCount}</b> exhibitions.</li>
        <li>Decade with the least number of exhibitions was the <b>{minDecade.toString()}</b> with <b>{minDecadeCount}</b> exhibitions.</li>
      </ul>
      <Bar data={data_stacked} width="200" height="50" options={options_stacked} />
      <br />
      <Accordion alwaysOpen >
        {Object.entries(exDecades).map(([decade, exhibitions]) => (
          <Accordion.Item key={"section_" + decade} eventKey={"section_" + decade}>
            <Accordion.Header>{decade}0s ({exhibitions && Array.isArray(exhibitions) ? exhibitions.length : ""})</Accordion.Header>
            <Accordion.Body>
              <Table key={"decade" + decade} bordered hover size="sm" striped="columns">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Location</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    exhibitions?.map((ex, index) => (
                      <tr key={'influenced' + ex.id}>
                        <td><Button variant="primary" href={process.env.basePath + '/exhibition/' + ex.id.split("/").pop()}>{index + 1}</Button></td>
                        <td><nobr>{ex.start?.split('T')[0].slice(0, -3)}</nobr></td>
                        <td><nobr>{ex.end?.split('T')[0].slice(0, -3)}</nobr></td>
                        <td><nobr>{ex.location}</nobr></td>
                        <td><Link href={'/exhibition/' + ex.id.split("/").pop()}>{ex._label}</Link></td>
                      </tr>
                    ))
                  }

                </tbody></Table>
            </Accordion.Body></Accordion.Item>
        ))}
      </Accordion>














    </Tab.Pane>


  )
}

