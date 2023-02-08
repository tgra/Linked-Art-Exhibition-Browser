import { Tab, ListGroup, Accordion, Row, Col, Container } from 'react-bootstrap';
import Link from 'next/link'
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';



export default function TabPanePerson({ id, _label, name, born, died, total_exhibitions, nationality, exhibitions, gender }) {

 

  let idx = "/person/"
  const arr = id?.match(/[0-9]+$/);
  if (arr !== null) {
    idx += arr[0];
  }

  born = born.split('T')[0].split("-")[0]
  died = died.split('T')[0].split("-")[0]


  let exDecades = {};

  exhibitions.forEach(function (ex) {
    let start_year = ex.start.split("-")[0]
    let decade = start_year.substring(0, 3)

    if (exDecades[decade] == undefined) {
      exDecades[decade] = []
    }
    exDecades[decade].push(ex)
  });


  
  for (const decade in exDecades) {
    exDecades[decade] = exDecades[decade].sort((a, b) => (a.start > b.start) ? 1 : -1)
  }

  var maxDecade = 0
  var maxDecadeCount = 0
  var minDecade = 0
  var minDecadeCount = 10000000000000


for (const decade in exDecades){

  var numDecadeCount = exDecades[decade].length

  if (numDecadeCount > maxDecadeCount) {
      maxDecadeCount = numDecadeCount
      maxDecade = decade
  }

if (numDecadeCount < minDecadeCount) {
    minDecade = decade
    minDecadeCount = numDecadeCount
  }
}

var keys = Object.keys(exDecades)
var labels = []
for(var i=0; i<keys.length; i++) {
  labels.push(keys[i] + "0s")
}


var count = []
var values = Object.values(exDecades)

for(var i=0; i<values.length; i++) {
    count.push(values[i].length)
}

const data = {
  labels: labels,
  datasets: [{
      label: '# of Exhibitions',
      data: count,
      borderWidth: 1
  }]
}



  return (


    <Tab.Pane key={"#link" + id.split("/").pop()} eventKey={"#link" + id.split("/").pop()}>


      <h3>{_label}</h3>
<Container className="bio">
<Row>
  <Col><b>Born</b> {born} <sup><Link href={"/datasets/combined/indexes/person/birth_date/" + born}>(click to view other people born in this year)</Link></sup></Col>
  <Col><b>Died</b> {died}</Col>
</Row>
<Row>
  <Col><b>Nationality</b> {nationality}</Col>
  <Col><b>Gender</b> {gender}</Col>
</Row>
</Container>
   

      <br/>
      <h4>Exhibitions</h4>
      <p>In this dataset, <b>{_label}</b> was involved in <b>{total_exhibitions}</b> exhibitions across <b>{Object.entries(exDecades).length}</b> decades.</p>
<ul>
      <li>Decade with the most number of exhibitions was the <b>{maxDecade}0s</b> with <b>{maxDecadeCount}</b> exhibitions.</li>
      <li>Decade with the least number of exhibitions was the <b>{minDecade}0s</b> with <b>{minDecadeCount}</b> exhibitions.</li>
      </ul>
      <Bar data={data} options={{ maintainAspectRatio: true }} />
      <br/>
      <Accordion alwaysOpen >
        {Object.entries(exDecades).map(([decade, exhibitions]) => (

          <Accordion.Item key={"section_" + decade} eventKey={"section_" + decade}>
            <Accordion.Header>{decade}0s ({exhibitions && Array.isArray(exhibitions) ? exhibitions.length : ""})</Accordion.Header>
            <Accordion.Body>
            
              <ListGroup>
                {
                  exhibitions?.map((ex) => (
                    <ListGroup.Item variant="light" key={'influenced' + ex.id} action href={process.env.basePath + '/exhibition/' + ex.id.split("/").pop()}>
                      {ex.start.split("-")[0]} : {ex._label}</ListGroup.Item>
                  ))}
              </ListGroup>

            </Accordion.Body></Accordion.Item>
        ))}
      </Accordion>














    </Tab.Pane>


  )
}




