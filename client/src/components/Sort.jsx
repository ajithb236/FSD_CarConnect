import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";

import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { setData, setFilteredData, setPriceHightoLow, setPriceLowtoHigh, setYearAscending, setYearDecending } from "../redux/user/sortfilterSlice";

const Sort = () => {
  const {userAllVehicles,allVariants} = useSelector(state => state.userListVehicles)
  const dispatch = useDispatch();
  const { handleSubmit, control  } = useForm({
    defaultValues:{
      price:'',
      year:''
      
    }
  });

  const handleInputChange = (e) => {

    if (e === "undefined") {
      dispatch(setData(userAllVehicles))
    }
    else if(e === "lowtohigh"){
        dispatch(setPriceLowtoHigh())
    }
    else if(e ===  "hightolow"){
        dispatch(setPriceHightoLow())
    }
    else if(e === "yearAscending"){
        dispatch(setYearAscending())
    }
    else if(e === "yearDecending"){
        dispatch(setYearDecending())
    }
  };

  useEffect(()=> {
    if(!allVariants){
      dispatch(setFilteredData(userAllVehicles))
    }
  },[])

  return (
    <div className="shadow-sm p-2 mb-3 bg-white rounded">
      <form onSubmit={handleSubmit}>
        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 gap-md-3 mx-auto mx-md-4 mx-lg-0">
  
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="price"
                  select
                  label="Price"
                  // error={Boolean(field.value == "")}
                  sx={{ width: 150 }}
                  size="small"
                  
                  onChange={(event) => {
                    field.onChange(event); // Trigger react-hook-form's onChange function
                    handleInputChange(event.target.value); // Custom function to handle select change
                  }}
                >
                  <MenuItem className="bg-light">None</MenuItem>
                  <MenuItem value={"lowtohigh"}>Low to High</MenuItem>

                  <MenuItem value={"hightolow"}>High to Low</MenuItem>
                </TextField>
              )}
            ></Controller>

            <Controller
              control={control}
              name="year"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="year"
                  select
                  label="Year"
                  // error={Boolean(field.value == "")}
                  sx={{ width: 150 }}
                  size="small"
                  onChange={(event) => {
                    field.onChange(event); // Trigger react-hook-form's onChange function
                    handleInputChange(event.target.value); // Custom function to handle select change
                  }}
                >
                  <MenuItem className="bg-light" >None</MenuItem>
                  <MenuItem value={"yearAscending"}>low to high</MenuItem>

                  <MenuItem value={"yearDecending"}>high to low</MenuItem>
                </TextField>
              )}
            ></Controller>
    
        </div>
      </form>
    </div>
  );
};

export default Sort;
