import { Routes, Route } from "react-router-dom";
import { Navbar, SideBar } from "../components/index.jsx";
import {
  AllVehicles,
  AllUsers,
  AllVendors,
  Calender,
  ColorPicker,
  Customers,
  Editor,
  VenderVehicleRequests,
} from "../pages";
import { useSelector } from "react-redux";
import AdminHomeMain from "../pages/AdminHomeMain.jsx";
import Bookings from "../components/Bookings.jsx";

function AdminDashNew() {
  const { activeMenu } = useSelector((state) => state.adminDashboardSlice);

  return (
    <div className="container-fluid p-0">
      <div className="d-flex position-relative bg-light">
      
        {/* Sidebar */}
        <div 
          className="bg-white position-fixed h-100 shadow-sm z-3" 
          style={{ 
            width: activeMenu ? "250px" : "0px",
            overflow: "hidden",
            transition: "all 0.3s" 
          }}
        >
          <SideBar />
        </div>

        {/* Main Content Area */}
        <div
          className="flex-grow-1 bg-white min-vh-100"
          style={{ 
            marginLeft: activeMenu ? "250px" : "0px",
            transition: "margin-left 0.3s",
            width: activeMenu ? "calc(100% - 250px)" : "100%"
          }}
        >
          <div className="w-100 position-sticky top-0 z-2 bg-white">
            <Navbar />
          </div>

          <div className="p-4 w-100" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
            <Routes>
              <Route path="/" element={<AdminHomeMain/>}/>
              <Route path="/adminHome" element={<AdminHomeMain />} />
              <Route path="/allProduct" element={<AllVehicles />} />
              <Route path="/allUsers" element={<AllUsers />} />
              <Route path="/allVendors" element={<AllVendors />} />
              <Route path="/calender" element={<Calender />} />
              <Route path="/colorPicker" element={<ColorPicker />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/vendorVehicleRequests" element={<VenderVehicleRequests />} />
              <Route path="/orders" element={<Bookings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashNew;
