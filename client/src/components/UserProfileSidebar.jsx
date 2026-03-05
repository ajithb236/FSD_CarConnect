import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} from "../redux/user/userSlice";
import { SiShopware } from "react-icons/si";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "./UserSidebarContent";
import { showSidebarOrNot } from "../redux/adminSlices/adminDashboardSlice/DashboardSlice";
import { CiLogout } from "react-icons/ci";


const UserProfileSidebar = () => {
  const { activeMenu, screenSize } = useSelector(
    (state) => state.adminDashboardSlice
  );

  const { currentUser, isLoading } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeLink =
    "d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-dark bg-primary bg-opacity-10 text-decoration-none mb-2";
  const normalLink =
    "d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-secondary text-decoration-none mb-2 hover-bg-light";

  //SignOut
  const handleSignout = async () => {
    // MOCK THIS
      dispatch(signOut());
      navigate("/signin");
      localStorage.removeItem("userRole");
  };

  const handleDelete = async () => {
    // MOCK THIS
      dispatch(deleteUserSuccess({message: "Delete successful"}));
  };

  return (
    <div className="vh-100 overflow-auto pb-5 px-3 bg-white border-end">
      {activeMenu && (
        <>
          <div className="d-flex justify-content-between align-items-center pt-3">
            <Link
              to={`/`}
              className="d-flex align-items-center gap-2 mt-2 text-dark fs-5 fw-bold text-decoration-none tracking-tight"
            >
              <SiShopware />
              Rent a Ride
            </Link>
            {/* hide sidebar button */}
            <TooltipComponent content={"menu"} position="BottomCenter">
              <button
                className="btn btn-light rounded-circle p-2 mt-2"
                onClick={() => {dispatch(showSidebarOrNot(false))}}
              >
                <MdOutlineCancel className="fs-5" />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-4">
            {links.map((cur, idx) => (
              <div key={idx}>
                {cur.links.map((link) => (
                  <NavLink
                    to={`/profile/${link.name}`}
                    key={link.name}
                    onClick={() => {
                      if (screenSize <= 900 && activeMenu) {
                        dispatch(showSidebarOrNot(false));
                      }
                    }}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="text-capitalize">
                      {link.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            ))}

            <div className="d-flex flex-column gap-3 mt-4 px-3">
              <button
                type="button"
                className="btn btn-outline-danger d-flex align-items-center gap-2 justify-content-start border-0 text-start px-0 py-2"
                onClick={handleSignout}
              >
                <CiLogout className="fs-5" />
                SignOut
              </button>
              
              <button
                className="btn btn-outline-danger d-flex align-items-center gap-2 justify-content-start border-0 text-start px-0 py-2"
                onClick={handleDelete}
                type="button"
              >
                {isLoading ? "Loading..." : "Delete User"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfileSidebar;
