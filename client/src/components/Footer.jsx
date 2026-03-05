
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Container, Row, Col } from "react-bootstrap";
  
const Footers  = () =>  {
  return (
    <footer className="bg-dark text-white pt-5 pb-5 mt-5">
      <Container>
        <Row className="gy-4 pb-4">
          <Col md={4} className="mb-4 mb-md-0">
            <h1 className="fw-bold fs-3 mb-3 text-white">Car Connect</h1>
            <p className="text-secondary">Your reliable partner for car rentals. Find the best vehicles at the most affordable prices anywhere, anytime.</p>
          </Col>
          
          <Col md={2} sm={4} className="mt-4 mt-sm-0">
            <h5 className="text-uppercase mb-3 mt-md-0">About</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none">Car Connect</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none">Car rental</a></li>
            </ul>
          </Col>
          
          <Col md={3} sm={4}>
            <h5 className="text-uppercase mb-3">Follow Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="https://github.com/jeevan-aj" className="text-secondary text-decoration-none">Github</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none">Discord</a></li>
            </ul>
          </Col>
          
          <Col md={3} sm={4}>
            <h5 className="text-uppercase mb-3">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="text-secondary text-decoration-none">Terms & Conditions</a></li>
            </ul>
          </Col>
        </Row>
        
        <hr className="bg-secondary" />
        
        <Row className="align-items-center mt-4">
          <Col sm={6} className="text-center text-sm-start mb-3 mb-sm-0">
            <span className="text-secondary">© 2024 <a href="#" className="text-white text-decoration-none">Car Connect</a>. All rights reserved.</span>
          </Col>
          <Col sm={6} className="d-flex justify-content-center justify-content-sm-end gap-3">
            <a href="https://www.linkedin.com/in/jeevan-joji-25b799275/" className="text-secondary fs-5"><BsLinkedin /></a>
            <a href="https://github.com/jeevan-aj" className="text-secondary fs-5"><BsGithub /></a>
            <a href="#" className="text-secondary fs-5"><BsInstagram /></a>
            <a href="#" className="text-secondary fs-5"><BsTwitter /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footers