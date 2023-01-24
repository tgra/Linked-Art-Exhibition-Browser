import Card from 'react-bootstrap/Card';

export default function ExNav() {

  return (
    
 <Card>
 <Card.Body>
   <Card.Title>{process.env.NEXT_PUBLIC_ACTIVITY_TITLE}</Card.Title>
   <Card.Text></Card.Text>
   
   
   <Card.Link href={'./exhibitions/start_date'}>Exhibition:start date</Card.Link>
   <Card.Link href={'./exhibitions/organisation'}>Exhibition:organisation</Card.Link>



</Card.Body>


 </Card>
  )
}


