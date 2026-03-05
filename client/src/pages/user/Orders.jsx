import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MdCurrencyRupee } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { CiCalendarDate } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import UserOrderDetailsModal from "../../components/UserOrderDetailsModal";
import {
  setIsOrderModalOpen,
  setSingleOrderDetails,
} from "../../redux/user/userSlice";



export default function Orders() {
  const { _id } = useSelector((state) => state.user.currentUser);
  const [bookings, setBookings] = useState("");
  const dispatch = useDispatch();

  const fetchBookings = async () => {
    // MOCK DATA
    const mockBookings = [
      {
        _id: "65ab123",
        vehicleDetails: {
          name: "Hyundai Creta",
          image: ["https://imgd.aeplcdn.com/370x208/n/cw/ec/141115/creta-exterior-right-front-three-quarter.jpeg?isig=0&q=80"],
        },
        bookingDetails: {
          _id: "ORD-9876",
          totalPrice: 120,
          pickUpLocation: "Downtown Hub",
          dropOffLocation: "Airport Terminal 1",
          pickupDate: new Date().toISOString(),
          dropOffDate: new Date(new Date().getTime() + 86400000).toISOString()
        }
      }
    ];

    setBookings(mockBookings);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDetailsModal = (bookingDetails, vehicleDetails) => {
    dispatch(setIsOrderModalOpen(true));
    dispatch(setSingleOrderDetails(bookingDetails, vehicleDetails));
  };

  return (
    <div className="container py-5" style={{ maxWidth: '900px' }}>
      <UserOrderDetailsModal />
      <h1 className="display-5 fw-semibold mb-2">Your Bookings</h1>
      <div className="small text-muted mb-4">
        {bookings && bookings.length > 0 ? "Check out all of your Bookings" :  <div className="fw-bold text-dark d-flex justify-content-center align-items-center" style={{ minHeight: '500px' }}>No Bookings Yet</div>}
      </div>
      <div className="mb-5">
        {bookings && bookings.length > 0
          && bookings.map((cur, idx) => {
              const pickupDate = new Date(cur.bookingDetails.pickupDate);
              const dropoffDate = new Date(cur.bookingDetails.dropOffDate);

              return (
                <div
                  className="card shadow-sm mb-4 border"
                  key={idx}
                >
                  <div className="row g-0 p-3 p-md-4">
                    <div className="col-12 col-md-4 mb-3 mb-md-0 d-flex align-items-center justify-content-center bg-light rounded">
                    <img
                      alt={cur.vehicleDetails.name}
                      className="img-fluid"
                      height="200"
                      src={cur.vehicleDetails.image[0]}
                      style={{
                        objectFit: "contain",
                        maxHeight: '200px'
                      }}
                      width="200"
                    />
                    </div>
                    
                    <div className="col-12 col-md-8 ps-md-4">
                      <h3 className="h5 fw-semibold mb-1">{cur._id}</h3>
                      <p className="text-muted mb-2">
                        <span className="fw-bold">Id</span> :{" "}
                        {cur.bookingDetails._id}
                      </p>
                      <p className="h5 fw-semibold mb-4 d-flex align-items-center">
                        <MdCurrencyRupee />
                        {cur.bookingDetails.totalPrice}
                      </p>
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="mt-2 fw-medium text-decoration-underline mb-3">
                            Pick up
                          </div>
                          <div className="mt-2 text-capitalize">
                            <p className="text-dark small mt-2 d-flex align-items-center gap-2">
                              <CiLocationOn />
                              {cur.bookingDetails.pickUpLocation}
                            </p>

                            <div className="small d-flex flex-column gap-2 mt-2">
                              <div className="d-flex gap-2 align-items-center">
                                <CiCalendarDate style={{ fontSize: 15 }} />
                                <span> {pickupDate.getDate()}: {pickupDate.getMonth() + 1}: {pickupDate.getFullYear()} </span>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <IoMdTime style={{ fontSize: 16 }} />
                                <span>{pickupDate.getHours()}:{pickupDate.getMinutes()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mt-2 fw-medium text-decoration-underline mb-3">
                            Drop off
                          </div>

                          <div className="mt-2 text-capitalize">
                            <p className="text-dark small mt-2 d-flex align-items-center gap-2">
                              <CiLocationOn />
                              {cur.bookingDetails.dropOffLocation}
                            </p>

                            <div className="small d-flex flex-column gap-2 mt-2">
                              <div className="d-flex gap-2 align-items-center">
                                <CiCalendarDate style={{ fontSize: 15 }} />
                                <span>{dropoffDate.getDate()}: {dropoffDate.getMonth() + 1}: {dropoffDate.getFullYear()} </span>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <IoMdTime style={{ fontSize: 16 }} />
                                <span>{dropoffDate.getHours()}:{dropoffDate.getMinutes()} </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          className="btn btn-dark btn-sm px-4 py-2"
                          onClick={() => handleDetailsModal(cur)}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          }
      </div>
    </div>
  );
}
