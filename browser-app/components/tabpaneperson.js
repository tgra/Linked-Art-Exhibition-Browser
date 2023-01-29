import { Tab, ListGroup, Accordion} from 'react-bootstrap';



export default function TabPanePerson({ id, _label, name, born, died, total_exhibitions, nationality, exhibitions }) {

    
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

    for (const decade in exDecades){
        exDecades[decade]  = exDecades[decade].sort((a, b) => (a.start > b.start) ? 1 : -1)
    }






  return (


<Tab.Pane key={"#link" + id.split("/").pop()} eventKey={"#link" + id.split("/").pop()}>
             

             <h1>{_label}</h1>
            
            
            
                       <ListGroup horizontal>
            
                          
                           <ListGroup.Item variant="dark"><h5>Born</h5>{born}</ListGroup.Item>
                           <ListGroup.Item variant="dark"><h5>Died</h5>{died}</ListGroup.Item>
                           <ListGroup.Item variant="dark"><h5>Nationality</h5>{nationality}</ListGroup.Item>
                       </ListGroup>
            
                      <br/>
                       <h4>Exhibitions</h4>
                       <p>Total number of exhibitions: {total_exhibitions}</p>
                    
                                          
                       <Accordion alwaysOpen >
                                {Object.entries(exDecades).map(([decade, exhibitions]) => (
                                    
                                    <Accordion.Item key={"section_" + decade} eventKey={"section_" + decade}>
                                        <Accordion.Header>{decade}0s ({exhibitions && Array.isArray(exhibitions) ? exhibitions.length : ""})</Accordion.Header>
                                        <Accordion.Body>
                                       
                                           
                                       

                                       <ListGroup numbered >
                                  {
                               exhibitions?.map((ex) => (
                                   <ListGroup.Item variant="light" key={'influenced' + ex.id} action href={'/exhibition/' + ex.id.split("/").pop()}>
                                       {ex.start.split("T")[0]}<h5>{ex._label}</h5></ListGroup.Item>
                               ))}
                                </ListGroup>
            
            </Accordion.Body></Accordion.Item>
                                ))}
            </Accordion>
                              
                               
            
            
            
                                
                          
            
                     
            
            
               
            
            
            </Tab.Pane>
   
          
  )
}




