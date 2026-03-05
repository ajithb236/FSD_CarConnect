import { useDispatch, useSelector } from "react-redux";
import { FaCarSide } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";

import CarNotFound from "./CarNotFound";
import { useNavigate } from "react-router-dom";

import { setVariants } from "../../redux/user/listAllVehicleSlice";
import { setFilteredData } from "../../redux/user/sortfilterSlice";

const AvailableVehiclesAfterSearch = () => {
  const { availableCars } = useSelector((state) => state.selectRideSlice);
  const { pickup_district, pickup_location, pickupDate, dropoffDate } =
    useSelector((state) => state.bookingDataSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showVarients = async (model) => {
    try {
      const datas = {
        pickUpDistrict: pickup_district,
        pickUpLocation: pickup_location,
        pickupDate: pickupDate.humanReadable,
        dropOffDate: dropoffDate.humanReadable,
        model,
      };
      const res = await fetch("/api/user/getVehiclesWithoutBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datas),
      });
      if (!res.ok) {
        console.log("not success");
      }
      if (res.ok) {
        const data = await res.json();
        dispatch(setVariants(data));
        dispatch(setFilteredData(data));
        navigate("/allVariants");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      {availableCars && availableCars.length > 0 && (
        <div className="text-center d-flex flex-column justify-content-center align-items-center mx-auto" style={{ maxWidth: "500px" }}>
          <h2 className="fs-5 fs-lg-4">Choose From Options</h2>
          <p className="text-center small px-3 text-muted" style={{ maxWidth: "550px" }}>
            Choose from our modern variety vehicles colllection . Feel like home
            just like your own car Our clients have experienced our service and
            results, and they are eager to share their positive experiences with
            you.
          </p>
        </div>
      )}

      <div className="row justify-content-center mt-5 row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mx-auto" style={{ maxWidth: "1000px" }}>
        {availableCars &&
          availableCars.map(
            (cur, idx) =>
              cur.isDeleted === "false" && (
                <div className="col" key={idx}>
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={`${cur.image[0]}`}
                      className="card-img-top object-fit-contain p-3"
                      alt={cur.name}
                      style={{ height: '250px' }}
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <h5 className="card-title text-capitalize mb-0 fs-6 fw-bold">
                          {cur.name}
                        </h5>
                        <div className="text-end">
                          <p className="fw-bold mb-0">${cur.price}</p>
                          <small className="text-muted" style={{ fontSize: "10px" }}>Per Day</small>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-3 text-secondary small">
                        <span className="d-flex align-items-center gap-2">
                          <FaCarSide /> {cur.company}
                        </span>
                        <span className="d-flex align-items-center gap-2">
                          <MdAirlineSeatReclineNormal /> {cur.seats} Seats
                        </span>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3 text-secondary small">
                        <span className="d-flex align-items-center gap-2">
                          <FaCarSide /> {cur.car_type}
                        </span>
                         <button
                           className="btn btn-success btn-sm px-4"
                           onClick={() => {
                             showVarients(cur.model);
                           }}
                         >
                           Select
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
      {(!availableCars || availableCars.length === 0) && <CarNotFound />}
    </div>
  );
};

export default AvailableVehiclesAfterSearch;
