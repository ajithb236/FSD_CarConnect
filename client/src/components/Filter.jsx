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
    <div className="bg-white sticky top-5 scroll-m-9">
      <div className="sticky top-0 left-0 right-0  ">
        <div className="filterComponent flex h-full max-w-[320px] lg:max-w-[350px]  flex-col  bg-white  shadow-xl mx-auto">
          <div className="flex items-center justify-between px-4 py-2">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button
              type="button"
              className="-mr-2  flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              onClick={()=> setFilterOpen(!filterOpen) }
            >
             
              <div className={`plusicon ${filterOpen ? 'iconClose' : 'plusiconOpen'}`}><GoPlus className="plusicon"/></div>
            
            </button>
          </div>

          {/* <!-- Filters  form --> */}

         
          <div className={` border-t border-gray-200 dropdown-content ${filterOpen ? 'open opacity-100 fade-in' : 'opacity-0 fade-out'} `}>
            <h3 className="sr-only">Categories</h3>

            <div className="border-t border-gray-200 px-4 py-6">
              <div className="flex flex-col justify-center  items-start gap-y-4 w-full">
                <form className="w-full" onSubmit={handleSubmit(handleData)}>
                  <div className="w-full mb-7 ">
                    <div className="mb-5 flex justify-between items-center">
                      <div>Type</div>{" "}
                      <div>
                        <GoPlus color="gray" />
                      </div>
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

                  <div className="mt-7 pt-7 border-t border-t-gray-300">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-black text-white rounded-md"
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
      </div>
    </div>
  );
};

export default Filter;
