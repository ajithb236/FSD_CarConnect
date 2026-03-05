import Herocar from "../../Assets/homepage_car_copy.jpeg";
import CarSearch from "./CarSearch";
import { HeroParallax } from "../../components/ui/Paralax";
import { useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsSweetAlert } from "../../redux/user/userSlice";
import Footers from "../../components/Footer";


function Home() {
  const ref = useRef(null);
  const { isSweetAlert } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const sweetalert = () => {
    Swal.fire({
      
      show: true,
      title: "",
      text: "Vehicle Booked Successfully",
      icon: "success",
      showDenyButton: true,
      confirmButtonText: "Go to Home",
      confirmButtonColor:"#22c55e",
      denyButtonColor:'black',
      denyButtonText: `See Orders`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/')
      }
      else if(result.isDenied){
        navigate('/profile/orders')
      }
    })
    dispatch(setIsSweetAlert(false))
  };

  return (
    <>
      {isSweetAlert && sweetalert()}

      {/* This is div is the container for the dot background */}
      <Container fluid className="position-relative bg-white" style={{ minHeight: "75vh", padding: "0" }}>
        <Container className="position-absolute top-0 start-50 translate-middle-x z-1 w-100 pt-5 mt-md-5">
          <Row className="align-items-center mt-5 pt-md-5">
            <Col md={6}>
              <p className="text-secondary small fw-bold text-uppercase mb-2">
                Plan your trip now
              </p>
              <h1 className="display-4 fw-bold mb-4" style={{ lineHeight: "1.2" }}>
                Save <span className="text-success">big</span> with our <br />
                car rental
              </h1>
              <p className="text-secondary mb-4 text-justify" style={{ maxWidth: "500px" }}>
                Rent the car of your dreams. Unbeatable prices, unlimited miles,
                flexible pick-up options and much more.
              </p>
              <div className="d-flex gap-3 mt-4">
                <Button
                  variant="success"
                  size="lg"
                  className="fw-semibold px-4 text-dark"
                  onClick={() => {
                    ref.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  Book Ride <i className="bi bi-check-circle-fill ms-2"></i>
                </Button>
                <Button
                  variant="dark"
                  size="lg"
                  className="fw-semibold px-4"
                  onClick={() => {
                    ref.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                >
                  Learn More <i className="bi bi-chevron-right ms-1"></i>
                </Button>
              </div>
            </Col>
            <Col md={6} className="d-none d-md-block text-center mt-5 mt-md-0">
              <img src={Herocar} alt="car" className="img-fluid" />
            </Col>
          </Row>
        </Container>
        <div style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 50% 50% at 50% 50%, #000 70%, transparent 100%)"
        }}></div>
      </Container>

      <div ref={ref}>
        <CarSearch />
      </div>

      <HeroParallax />
      <Footers/>
    </>
  );
}

export default Home;
