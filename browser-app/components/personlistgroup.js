
import { ListGroup} from 'react-bootstrap';



export default function Person({ id, _label, name, born, died, total_exhibitions, nationality }) {

  let idx = "/person/"
  const arr = id?.match(/[0-9]+$/);
  if (arr !== null) {
    idx += arr[0];
  }

  born = born.split('T')[0].split("-")[0]
  died = died.split('T')[0].split("-")[0]


  return (

<ListGroup.Item variant="dark" action key={id} href={idx}>{_label} {born == ""? "" : '(' + born + '-' + died + ')'}</ListGroup.Item>





   
          
  )
}