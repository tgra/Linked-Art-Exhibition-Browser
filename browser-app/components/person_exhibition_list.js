
import { ListGroup} from 'react-bootstrap';


export default function Person({ id, _label   }) {

  let idx = "/person/"
  const arr = id?.match(/[0-9]+$/);
  if (arr !== null) {
    idx += arr[0];
  }


  return (

<ListGroup.Item variant="dark" action key={id} href={"#link" + id.split("/").pop()}>{_label} </ListGroup.Item>





   
          
  )
}