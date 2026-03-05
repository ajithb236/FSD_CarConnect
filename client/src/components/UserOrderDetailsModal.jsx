import { useDispatch, useSelector } from "react-redux";
import { setIsOrderModalOpen } from "../redux/user/userSlice";

const UserOrderDetailsModal = () => {
  const { isOrderModalOpen, singleOrderDetails: cur } = useSelector(
    (state) => state.user
  );





  const dispatch = useDispatch();

  const pickupDate = new Date(cur && cur.bookingDetails.pickupDate);
  const dropOffDate = new Date(cur && cur.bookingDetails.dropOffDate);

  

  const closeModal = () => {
    dispatch(setIsOrderModalOpen(false));
  };
  return (
    <>
      {isOrderModalOpen ? (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(2px)' }}
          tabIndex="-1"
          onClick={closeModal}
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content shadow-lg border-0 rounded-3">
              <div className="modal-body p-4 text-capitalize fw-medium">
                <div className="mb-4">
                  <div className="mb-2 fw-bold fs-5">Booking Details</div>
                  <hr />
                  <div className="mb-3 mt-3 d-flex flex-column gap-2">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted">Booking Id</div>
                      <div className="fw-semibold">{cur.bookingDetails._id}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted">Total Amount</div>
                      <div className="fw-semibold">{cur.bookingDetails.totalPrice}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted">Pickup Location</div>
                      <div className="fw-semibold">{cur.bookingDetails.pickUpLocation}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted">Pickup Date</div>
                      <div className="fw-semibold">
                        <span>{pickupDate.getDate()}</span>-<span>{pickupDate.getMonth() + 1}</span>-<span>{pickupDate.getFullYear()}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted">Pickup Time</div>
                      <div className="fw-semibold">
                        <span>{pickupDate.getHours()}</span>:<span>{pickupDate.getMinutes().toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted">Dropoff Location</div>
                      <div className="fw-semibold">{cur.bookingDetails.dropOffLocation}</div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted">Dropoff Date</div>
                      <div className="fw-semibold">
                        <span>{dropOffDate.getDate()}</span>-<span>{dropOffDate.getMonth() + 1}</span>-<span>{dropOffDate.getFullYear()}</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="text-muted">Dropoff Time</div>
                      <div className="fw-semibold">
                        <span>{dropOffDate.getHours()}</span>:<span>{dropOffDate.getMinutes().toString().padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 fw-bold fs-5">Vehicle Details</div>
                <hr className="mt-2 mb-3" />
                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted">Vehicle Number</div>
                    <div className="fw-semibold">{cur.vehicleDetails.registeration_number}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted">Model</div>
                    <div className="fw-semibold">{cur.vehicleDetails.model}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted">Company</div>
                    <div className="fw-semibold">{cur.vehicleDetails.company}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted">Vehicle Type</div>
                    <div className="fw-semibold">{cur.vehicleDetails.car_type}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted">Seats</div>
                    <div className="fw-semibold">{cur.vehicleDetails.seats}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted">Fuel Type</div>
                    <div className="fw-semibold">{cur.vehicleDetails.fuel_type}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted">Transmission</div>
                    <div className="fw-semibold">{cur.vehicleDetails.transmition}</div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="text-muted">Manufacturing Year</div>
                    <div className="fw-semibold">{cur.vehicleDetails.year_made}</div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-success px-4 bg-gradient shadow-sm"
                  onClick={closeModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserOrderDetailsModal;
