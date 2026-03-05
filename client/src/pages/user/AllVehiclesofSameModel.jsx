import { useDispatch, useSelector } from "react-redux";
import { FaCarSide } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { onVehicleDetail } from "./Vehicles";
import CarNotFound from "./CarNotFound";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import Header from "../../components/Header";
import { setVariantModeOrNot } from "../../redux/user/sortfilterSlice";
import { useEffect } from "react";

const AllVehiclesofSameModel = () => {
  const { allVariants } = useSelector((state) => state.userListVehicles);
  const { filterdData } = useSelector((state) => state.sortfilterSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // Set variant mode to true when all variants are available
    if (allVariants) {
      dispatch(setVariantModeOrNot(true));
    }
  }, [allVariants, dispatch]);

  //i made this allVariant state to show is filter currently used by search from home page or by AllListed Vehicles in Navbar
  // if (allVariants) dispatch(setVariantModeOrNot(true));

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <Filter />
          </div>
          <div className="col-12 col-lg-9">
            <div className="mb-4 position-relative z-3">
              <Sort />
            </div>

            {filterdData && filterdData.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {filterdData.map(
                  (cur, idx) =>
                    cur.isDeleted === "false" && (
                      <div className="col" key={idx}>
                        <div className="card h-100 shadow-sm border-0">
                          <img
                            src={`${cur.image[0]}`}
                            className="card-img-top object-fit-contain p-3"
                            alt={cur.name}
                            style={{ height: '200px' }}
                          />
                          <div className="card-body d-flex flex-column">
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
                              <span className="d-flex align-items-center gap-2">
                                <BsFillFuelPumpFill /> {cur.fuel_type}
                              </span>
                            </div>

                            <hr className="my-2" />

                            <div className="d-flex justify-content-center gap-2 mt-auto pt-2">
                              <button
                                className="btn btn-success btn-sm px-3 flex-grow-1"
                                onClick={() =>
                                  onVehicleDetail(cur._id, dispatch, navigate)
                                }
                              >
                                Book Ride
                              </button>

                              <button
                                className="btn btn-dark btn-sm px-3 flex-grow-1"
                                onClick={() =>
                                  onVehicleDetail(cur._id, dispatch, navigate)
                                }
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            ) : (
              <div className="text-center mt-5">
                <img
                  src="https://d310a92p0we78s.cloudfront.net/illustration/premium/additional-file/2829991/1.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkMzEwYTkycDB3ZTc4cy5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTcxNTY4Nzk0MiwicSI6bnVsbCwiaWF0IjoxNzE1NDI4NzQyfQ__.d4e4b015139247a901a11eeb00ef35e524acf56eaf251e07c1c468a9ebdf089e"
                  alt="No car found"
                  style={{ maxWidth: '300px' }}
                  className="img-fluid mb-4"
                />
                <h4 className="fw-bold">No car found</h4>
              </div>
            )}

            {!allVariants || (allVariants.length === 0 && <CarNotFound />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllVehiclesofSameModel;
