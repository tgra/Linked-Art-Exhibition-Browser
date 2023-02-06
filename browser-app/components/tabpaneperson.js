import { Tab, ListGroup, Accordion } from 'react-bootstrap';
import Link from 'next/link'


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




  return (


    <Tab.Pane key={"#link" + id.split("/").pop()} eventKey={"#link" + id.split("/").pop()}>


      <h1>{_label}</h1>



      <ListGroup>


        <ListGroup.Item variant="dark"><h5>Born</h5>{born} <sup><Link href={"/datasets/combined/indexes/person/birth_date/" + born}>(click to view other people born in this year)</Link></sup></ListGroup.Item>
        <ListGroup.Item variant="dark"><h5>Died</h5>{died}</ListGroup.Item>
        <ListGroup.Item variant="dark"><h5>Nationality</h5>{nationality}</ListGroup.Item>
        <ListGroup.Item variant="dark"><h5>Gender</h5>{gender}</ListGroup.Item>
      </ListGroup>

      <br />
      <h4>Exhibitions</h4>
      <p>In this dataset, <b>{_label}</b> was involved in <b>{total_exhibitions}</b> exhibitions across <b>{Object.entries(exDecades).length}</b> decades.</p>
<ul>
      <li>Decade with the most number of exhibitions was the <b>{maxDecade}0s</b> with <b>{maxDecadeCount}</b> exhibitions.</li>
      <li>Decade with the least number of exhibitions was the <b>{minDecade}0s</b> with <b>{minDecadeCount}</b> exhibitions.</li>
      </ul>

      <Accordion alwaysOpen >
        {Object.entries(exDecades).map(([decade, exhibitions]) => (

          <Accordion.Item key={"section_" + decade} eventKey={"section_" + decade}>
            <Accordion.Header>{decade}0s ({exhibitions && Array.isArray(exhibitions) ? exhibitions.length : ""})</Accordion.Header>
            <Accordion.Body>
              <ListGroup numbered >
                {
                  exhibitions?.map((ex) => (
                    <ListGroup.Item variant="light" key={'influenced' + ex.id} action href={process.env.basePath + '/exhibition/' + ex.id.split("/").pop()}>
                      {ex.start.split("T")[0]}<h5>{ex._label}</h5></ListGroup.Item>
                  ))}
              </ListGroup>

            </Accordion.Body></Accordion.Item>
        ))}
      </Accordion>














    </Tab.Pane>


  )
}




