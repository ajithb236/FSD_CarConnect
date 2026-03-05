import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { GoPlus } from "react-icons/go";

import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredData } from "../redux/user/sortfilterSlice";
import { useState } from "react";


const Filter = () => {
  const { control, handleSubmit } = useForm();
  const { userAllVehicles, allVariants } = useSelector(
    (state) => state.userListVehicles
  );
  const { variantMode } = useSelector((state) => state.sortfilterSlice);

  const[filterOpen,setFilterOpen]  =  useState(false)

  const dispatch = useDispatch();

  const handleData = (data) => {
    const selectedFilters = Object.entries(data)
      .filter(([key, value]) => value === true)
      .map(([key]) => key);

    // If no filters selected, show all vehicles
    if (selectedFilters.length === 0) {
      dispatch(setFilteredData(userAllVehicles));
      return;
    }

    // Local filtering logic - only by car type
    const filteredVehicles = userAllVehicles.filter((vehicle) => {
      const vehicleCarType = vehicle.car_type?.toLowerCase();

      // Check if vehicle matches any selected filter
      const matchesFilter = selectedFilters.some((filter) => {
        const filterLower = filter.toLowerCase();
        return vehicleCarType === filterLower;
      });

      return matchesFilter;
    });

    // Filter by allVariants if in variant mode (for homepage search results)
    if (allVariants && allVariants.length > 0) {
      const variantIds = allVariants.map((v) => v._id);
      const finalFiltered = filteredVehicles.filter((vehicle) =>
        variantIds.includes(vehicle._id)
      );
      dispatch(setFilteredData(finalFiltered));
      return;
    }

    // Update filtered data
    dispatch(setFilteredData(filteredVehicles));
  };

  const handleClick =()=> {
    if (window.innerWidth <= 924) {
      // Only execute on mobile and tablet views
      setFilterOpen(!filterOpen);
    }

  }

  
  return (
    <div className="bg-white sticky-top pt-3">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: '350px' }}>
        <div className="card-header bg-white d-flex align-items-center justify-content-between py-3">
          <h2 className="h5 mb-0 text-dark">Filters</h2>
          <button
            type="button"
            className="btn btn-light btn-sm d-flex align-items-center justify-content-center"
            onClick={() => setFilterOpen(!filterOpen)}
            style={{ width: '40px', height: '40px' }}
          >
            <GoPlus className={`fs-4 ${filterOpen ? 'text-danger' : 'text-secondary'}`} style={{ transform: filterOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        </div>

        {/* <!-- Filters form --> */}
        <div className={`collapse ${filterOpen ? 'show' : ''}`} id="filterCollapse">
          <div className="card-body">
            <form className="w-100" onSubmit={handleSubmit(handleData)}>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="fw-medium">Type</span>
                  <GoPlus className="text-secondary" />
                </div>
                <div>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Controller
                          name="suv"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              {...field}
                              checked={field["value"] ?? false}
                            />
                          )}
                        />
                      }
                      label="Suv"
                    />
                    <FormControlLabel
                      control={
                        <Controller
                          name="sedan"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              {...field}
                              checked={field["value"] ?? false}
                            />
                          )}
                        />
                      }
                      label="Sedan"
                    />
                    <FormControlLabel
                      control={
                        <Controller
                          name="hatchback"
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              {...field}
                              checked={field["value"] ?? false}
                            />
                          )}
                        />
                      }
                      label="Hatchback"
                    />
                  </FormGroup>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top">
                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  onClick={handleClick}
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
