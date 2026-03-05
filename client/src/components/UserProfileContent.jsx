import { useDispatch, useSelector } from "react-redux";
import ProfileEdit from "../pages/user/ProfileEdit";
import toast, { Toaster } from "react-hot-toast";
import { setUpdated } from "../redux/user/userSlice";
import { useEffect } from "react";

const UserProfileContent = () => {
  const { email, username, profilePicture, phoneNumber, adress } = useSelector(
    (state) => state.user.currentUser
  );
  const dispatch = useDispatch();
  const isUpdated = useSelector((state) => state.user.isUpdated);
  
  useEffect(() => {
    if (isUpdated) {
      toast.success("Successfully updated");
      dispatch(setUpdated(false));
    }
  }, [isUpdated, dispatch]);

  return (
    <div className="container px-3 px-md-4 mt-5 bg-white w-100">
      <Toaster />
      <div className="card shadow-sm w-100 overflow-hidden border-0">
        <div 
          className="bg-primary bg-gradient" 
          style={{ height: '140px' }}
        ></div>
        <div className="card-body px-4 py-3 d-flex flex-column gap-3 pb-4">
          <div className="position-relative shadow-sm rounded-circle border border-white border-4" style={{ width: '90px', height: '90px', marginTop: '-60px' }}>
            <img
              src={profilePicture}
              alt="profile_picture"
              className="w-100 h-100 rounded-circle w-100 h-100 object-fit-cover"
            />
            <div className="position-absolute bottom-0 start-100 translate-middle-x z-3">
              <div type="button" className="p-1">
                <ProfileEdit />
              </div>
            </div>
          </div>
          <div>
            <h3 className="h4 text-dark position-relative fw-bold lh-sm mb-1 mt-2">
              {username}
            </h3>
            <p className="small text-muted">{email}</p>
          </div>
          <div>
            <h4 className="small fw-medium mb-2 mt-3">
              User Informations
            </h4>
            <div className="d-flex flex-column gap-2">
              <p className="small text-muted mb-0">
                Phone: {(phoneNumber && phoneNumber) || ""}
              </p>
              <p className="small text-muted mb-0" style={{ maxWidth: '250px' }}>
                Address: {(adress && adress) || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileContent;
