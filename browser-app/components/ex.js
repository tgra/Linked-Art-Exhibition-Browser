import ListGroup from 'react-bootstrap/ListGroup';

/*
Summary.
Returns Listgroup item for exhibition with a link to the exhibition page


@return Listgroup item for exhibition with link to the exhibition page.
*/

export default function Ex({ id, _label}) {
  let idx =  process.env.basePath +  "/exhibition/" + id.split("/").pop()
  
  return (
      <ListGroup.Item variant="dark" action href={idx}>{_label}</ListGroup.Item> 
  )
}

