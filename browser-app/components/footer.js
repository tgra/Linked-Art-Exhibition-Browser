import { Container, Row, Col, Button } from 'react-bootstrap';

/*

Summary.
Page footer for use throughout the site.

@return HTML footer containing acknowledgements for the project.
*/

export default function Footer() {
  return (
    <div>
      <br /><br />
      <Container className="footer">
        <Row>
          <Col>
            <h4>Acknowledgements</h4>
            <p> This work was undertaken by the Linked Art II project at the University of Oxford (Principal Investigator: Dr. Kevin Page, Oxford e-Research Centre) funded by the UK Arts and Humanities Research Council (AHRC project reference AH/T013117/1).
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            The project&apos;s Research Software Engineer was <Button variant="secondary" href="https://www.linkedin.com/in/tanyagrayjones/" target="_new">Tanya Gray</Button>.
          </Col>
          <Col>
            We gratefully acknowledge the participation and contributions of our project partners and the wider <Button variant="secondary" href="https://linked.art/">Linked Art community</Button>.
          </Col>
        </Row>
      </Container>
      <br /><br />
    </div>
  );
}
