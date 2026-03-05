import { useSelector, useDispatch } from "react-redux";

import UserProfileSidebar from "../../components/UserProfileSidebar";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Link, Route, Routes } from "react-router-dom";
import Orders from "./Orders";
import UserProfileContent from "../../components/UserProfileContent";
import Favorites from "./Favorites";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { showSidebarOrNot } from "../../redux/adminSlices/adminDashboardSlice/DashboardSlice";
import { IoMenu } from "react-icons/io5";

function Profile() {
  const { isError } = useSelector((state) => state.user);
  const { activeMenu } = useSelector((state) => state.adminDashboardSlice);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="text-danger">{isError ? isError.message : " "}</div>
      <div className="position-fixed top-0 end-0 p-3 z-3">
        <TooltipComponent content={"back"} position="BottomCenter">
          <Link to={"/"} className="text-dark text-decoration-none">
            <IoArrowBackCircleSharp
              style={{ fontSize: "40px" }}
              className="text-primary-hover"
            />
          </Link>
        </TooltipComponent>
      </div>

      <div className="container-fluid p-0">
        <div className="d-flex position-relative">
          
          {/* Sidebar */}
          {activeMenu ? (
            <div className="bg-white position-fixed h-100 shadow-sm z-3" style={{ width: "280px", transition: "all 0.3s" }}>
              <UserProfileSidebar />
            </div>
          ) : (
            <div className="position-fixed h-100 z-3" style={{ width: "0px", overflow: "hidden", transition: "all 0.3s" }}>
              <UserProfileSidebar />
            </div>
          )}

          {/* hamburger icon */}
          {!activeMenu && (
            <TooltipComponent
              content={"menu"}
              position="BottomCenter"
            >
              <button
                className="btn btn-light rounded-circle p-2 m-3 position-absolute z-2"
                onClick={() => {
                  dispatch(showSidebarOrNot(true));
                }}
              >
                <IoMenu className="fs-4" />
              </button>
            </TooltipComponent>
          )}

          {/* Main Content Area */}
          <div
            className="flex-grow-1 bg-white min-vh-100 mx-auto transition-all"
            style={{ 
              marginLeft: activeMenu ? "280px" : "0", 
              transition: "margin-left 0.3s",
              maxWidth: "1000px",
              padding: "20px"
            }}
          >
            <div className="w-100">
              <Routes>
                <Route path="/" element={<UserProfileContent />} />
                <Route path="/profiles" element={<UserProfileContent />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
