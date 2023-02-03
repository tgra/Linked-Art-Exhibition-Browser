

import ListGroup from 'react-bootstrap/ListGroup';

export default function Ex({ id, _label}) {

  let idx =  process.env.basePath +  "/exhibition/" + id.split("/").pop()
  

  return (
    
      <ListGroup.Item variant="dark" action href={idx}>{_label}</ListGroup.Item>
     
  )
}

