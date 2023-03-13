import Link from 'next/link';
import {Nav, Container, Row, Col } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

/*

Summary.
Top-level navigation bar for website.

@return HTML navigation bar for the website. Uses Bootstrap navbar.
*/

function Navtop() {
    return (
   
       
   
       <Navbar bg="dark" variant="light" >
      
        <Container fluid>
        <h6><Link href="/">{process.env.NEXT_PUBLIC_APP_TITLE}</Link></h6>
        <Nav> 
            <Nav.Link href={process.env.basePath + "/#all"}>Dataset: All</Nav.Link>
            <Nav.Link eventKey="link-1" href={process.env.basePath + "/#moma"}>Dataset: MoMA</Nav.Link>
            <Nav.Link eventKey="link-2" href={process.env.basePath + "/#nonmoma"}>Dataset: non-MoMA</Nav.Link>
            <Nav.Link eventKey="link-3" href={process.env.basePath + "/#indexes"} >Indexes</Nav.Link>
            <Nav.Link eventKey="link-4" href={process.env.basePath + "/#about"} >About</Nav.Link>

          </Nav>
          </Container>
      </Navbar>
     
     
    );
  }
  
  export default Navtop;
