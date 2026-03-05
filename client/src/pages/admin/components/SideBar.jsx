import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { links } from "../data/SidebarContents.jsx";
import { CiLogout } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../redux/user/userSlice.jsx";
import { showSidebarOrNot } from "../../../redux/adminSlices/adminDashboardSlice/DashboardSlice.jsx";

const SideBar = () => {
  const { activeMenu, screenSize } = useSelector(
    (state) => state.adminDashboardSlice
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeLink =
    "d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-dark bg-primary bg-opacity-10 text-decoration-none mb-2";
  const normalLink =
    "d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-secondary text-decoration-none mb-2 hover-bg-light";

  //SignOut
  const handleSignout = async () => {
    // MOCK SIGN OUT
      dispatch(signOut());
      navigate("/signin");
      localStorage.removeItem("userRole");
  };

  return (
    <div className="vh-100 overflow-auto pb-5 px-3 bg-white border-end">
      {activeMenu && (
        <>
          <div className="d-flex justify-content-between align-items-center pt-3">
            <Link
              to={`/adminDashboard`}
              className="d-flex align-items-center gap-2 mt-2 text-primary fs-5 fw-bold text-decoration-none tracking-tight"
            >
              <SiShopware />
              Rent a Ride
            </Link>
            <TooltipComponent content={"menu"} position="BottomCenter">
              <button
                className="btn btn-light rounded-circle p-2 mt-2 d-md-none"
                onClick={() => {}}
              >
                <MdOutlineCancel className="fs-5" />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-4">
            {links.map((cur, idx) => (
              <div key={idx}>
                <p className="text-secondary small fw-bold text-uppercase mt-4 mb-2 px-3">{cur.title}</p>
                {cur.links.map((link) => (
                  <NavLink
                    to={`/adminDashboard/${link.name}`}
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
                    <span className="text-capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
            
            <div className="mt-4 px-3">
              <button
                type="button"
                className="btn btn-outline-danger d-flex align-items-center gap-2 justify-content-start border-0 text-start px-0 py-2 w-100"
                onClick={handleSignout}
              >
                <CiLogout className="fs-5" />
                SignOut
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
