
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

export default function Ex({ id, _label, org, location}) {

  let idx = "/datasets/combined/exhibition/"
  idx = idx + id.split("/").pop()
  

  return (
    
      <ListGroup.Item variant="dark" action href={idx}>{_label}</ListGroup.Item>
     
  )
}

