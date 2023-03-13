
import { ListGroup} from 'react-bootstrap';

/*
Summary.
provides a listgroup item for a person with a link that will open up a detailed information panel for the selected person.
*/

export default function Person({ id, _label,  born, died,  }) {

  let idx = "/person/"
  const arr = id?.match(/[0-9]+$/);
  if (arr !== null) {
    idx += arr[0];
  }

  born = born.split('T')[0].split("-")[0]
  died = died.split('T')[0].split("-")[0]


  return (

<ListGroup.Item variant="dark" action key={id} href={"#link" + id.split("/").pop()}>{_label} </ListGroup.Item>





   
          
  )
}