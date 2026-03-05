import { GrSecure } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";

import { FaStar } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { GiGearStickPattern } from "react-icons/gi";
import { FaCarSide } from "react-icons/fa";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { BsFillFuelPumpFill } from "react-icons/bs";

import { FaCarAlt } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import styles from "../..";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Link, useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useEffect } from "react";
import { showVehicles } from "../../redux/user/listAllVehicleSlice";
// import { signOut } from "../../redux/user/userSlice";

const VehicleDetails = () => {
  const { singleVehicleDetail } = useSelector(
    (state) => state.userListVehicles
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let refreshToken = localStorage.getItem("refreshToken");
  let accessToken = localStorage.getItem('accessToken');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/user/listAllVehicles", {
          headers: { "Authorization": `Bearer ${refreshToken},${accessToken}` },
        });
        if (!res.ok) {
          console.log("not success");
          return;
        }
        const data = await res.json();
        dispatch(showVehicles(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleBook = async (vehicleId, navigate) => {
    try {
      // const booked = await fetch('/api/auth/refreshToken',{
      //   method: 'POST',
      //   headers: {
      //     'Authorization':`Bearer ${refreshToken},${accessToken}`,
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     vehicleId,

      //   })
      // })

      // if(!booked.ok){
      //   dispatch(signOut())
      //   navigate('/signup')
      //   return
      // }
      // const data = await booked.json();
      // if(data){
      //   navigate('/checkoutPage')
      // }

      navigate("/checkoutPage");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <section className="py-4 py-lg-5">
        <div className="container">
          <div className="row gy-5 gx-lg-5">
            <div className="col-lg-7">
              <div className="position-relative mt-4">
                <div className="mb-4">
                  <div className="rounded overflow-hidden shadow-sm" style={{ maxHeight: '500px' }}>
                    <img
                      className="w-100 h-100 object-fit-cover"
                      src={singleVehicleDetail && singleVehicleDetail.image[0]}
                      alt={singleVehicleDetail.model}
                    />
                  </div>
                </div>
                <div className="position-absolute top-0 start-0 m-3 z-1">
                  <TooltipComponent content={"back"} position="BottomCenter">
                    <Link to={"/vehicles"} className="text-secondary hover-text-dark">
                      <IoArrowBackCircleSharp style={{ fontSize: "40px" }} />
                    </Link>
                  </TooltipComponent>
                </div>
                <div className="d-flex overflow-auto gap-3 pb-2">
                    {singleVehicleDetail &&
                      singleVehicleDetail.succes != false &&
                      singleVehicleDetail.image.map((cur, idx) => (
                        <button
                          type="button"
                          className="btn p-0 border rounded overflow-hidden flex-shrink-0"
                          style={{ width: "80px", height: "80px" }}
                          key={idx}
                        >
                          <img
                            className="w-100 h-100 object-fit-cover"
                            src={cur}
                            alt=""
                          />
                        </button>
                      ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="border-bottom pb-3 mb-4">
                  <nav className="nav">
                    <a
                      href="#"
                      className="nav-link active fw-bold text-dark px-0 text-decoration-underline"
                    >
                      Description
                    </a>
                  </nav>
                </div>

                <div>
                  <h2 className="fw-bold h3 mb-3">
                    {singleVehicleDetail.car_title}
                  </h2>
                  <p className="text-muted" style={{ textAlign: "justify" }}>
                    {singleVehicleDetail.car_description}.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="bg-white p-4 p-lg-5 rounded shadow-sm border h-100">
                <h1 className="h2 fw-bold text-dark text-capitalize mb-4">
                  {singleVehicleDetail.name}
                </h1>

                <div className="d-flex flex-column gap-3 text-secondary font-monospace" style={{ fontSize: "14px" }}>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    <span className="text-primary fs-5"><FaCarAlt /></span>
                    Model - {singleVehicleDetail.model}
                  </div>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    <span className="text-primary fs-5"><FaBuilding /></span>
                    Company - {singleVehicleDetail.company}
                  </div>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    <span className="text-primary fs-5"><CiCalendarDate /></span>
                    Year model : {singleVehicleDetail.year_made}
                  </div>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    <span className="text-primary fs-5"><GiGearStickPattern /></span>
                    Transmission : {singleVehicleDetail.transmition}
                  </div>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    <span className="text-primary fs-5"><FaCarSide /></span>
                    Car Type : {singleVehicleDetail.car_type}
                  </div>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    <span className="text-primary fs-5"><MdAirlineSeatReclineExtra /></span>
                    Seats : {singleVehicleDetail.seats}
                  </div>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    <span className="text-primary fs-5"><BsFillFuelPumpFill /></span>
                    Fuel type : {singleVehicleDetail.fuel_type}
                  </div>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    <span className="text-primary fs-5"></span> 
                    Registeration Number : {singleVehicleDetail.registeration_number}
                  </div>
                  <div className="d-flex align-items-center gap-3 border rounded p-2 text-capitalize">
                    Rating: {singleVehicleDetail.ratting ? singleVehicleDetail.ratting : "5"} 
                    <span className="text-warning ms-1"><FaStar /></span>
                  </div>
                </div>

                <div className="mt-5 border-top border-bottom py-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-4">
                  <div className="d-flex align-items-end">
                    <h2 className="display-6 fw-bold mb-0 d-flex align-items-center">
                      <FaIndianRupeeSign className="fs-3" />
                      {singleVehicleDetail.price}
                    </h2>
                    <span className="text-muted ms-1 mb-1">/Day</span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-dark btn-lg fw-bold px-5 d-flex align-items-center gap-2"
                    onClick={() => {
                      handleBook(singleVehicleDetail._id, navigate, dispatch);
                    }}
                  >
                    <GrSecure className="bg-white rounded-circle p-1" />
                    Book Ride
                  </button>
                </div>

                <ul className="list-unstyled mt-5 space-y-3">
                  <li className="d-flex align-items-center text-muted mb-3">
                    <svg className="me-3 text-secondary" style={{ width: "24px", height: "24px" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Free shipping for selected products
                  </li>

                  <li className="d-flex align-items-center text-muted">
                    <svg className="me-3 text-secondary" style={{ width: "24px", height: "24px" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                    </svg>
                    Cancel Anytime
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VehicleDetails;
