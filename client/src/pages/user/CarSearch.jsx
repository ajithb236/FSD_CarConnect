import { IconCalendarEvent, IconMapPinFilled, IconX } from "@tabler/icons-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";

//reducers
import { setAvailableCars, setLocationsOfDistrict, setSelectedDistrict } from "../../redux/user/selectRideSlice";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { setSelectedData } from "../../redux/user/BookingDataSlice";
import dayjs from "dayjs";
import useFetchLocationsLov from "../../hooks/useFetchLocationsLov";

const schema = z.object({
  dropoff_location: z.string().min(1, { message: "Dropoff location needed" }),
  pickup_district: z.string().min(1, { message: "Pickup District needed" }),
  pickup_location: z.string().min(1, { message: "Pickup Location needed" }),

  pickuptime: z.object({
    $d: z.instanceof(Date).refine((date) => date !== null && date !== undefined, {
      message: "Date is not selected",
    }),
  }),

  dropofftime: z.object(
    {
      $L: z.string(), // Language code
      $d: z.date(), // Date object
      $y: z.number(), // Year
      $M: z.number(), // Month (0-indexed)
      $D: z.number(), // Day of month
      $W: z.number(), // Day of week (0-indexed, starting from Sunday)
      $H: z.number(), // Hour
      $m: z.number(), // Minute
      $s: z.number(), // Second
      $ms: z.number(), // Millisecond
      $isDayjsObject: z.boolean(), // Indicator for Day.js object
    },
    { message: "drop-off time is required" }
  ),
});

const CarSearch = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      pickup_district: "",
      pickup_location: "",
      dropoff_location: "",
      pickuptime: null,
      dropofftime: null,
    },
  });

  const navigate = useNavigate();
  const { districtData } = useSelector((state) => state.modelDataSlice);
  const { fetchLov, isLoading } = useFetchLocationsLov();
  const uniqueDistrict = districtData?.filter((cur, idx) => {
    return cur !== districtData[idx + 1];
  });
  const { selectedDistrict, wholeData, locationsOfDistrict } = useSelector((state) => state.selectRideSlice);

  const [pickup, setPickup] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  //useEffect to fetch data from backend for locations
  useEffect(() => {
    // fetchModelData(dispatch);
    fetchLov();
  }, []);

  //for showing appropriate locations according to districts
  useEffect(() => {
    if (selectedDistrict !== null) {
      const showLocationInDistrict = wholeData
        .filter((cur) => {
          return cur.district === selectedDistrict;
        })
        .map((cur) => cur.location);
      dispatch(setLocationsOfDistrict(showLocationInDistrict));
    }
  }, [selectedDistrict]);

  //search cars
  const hanldeData = async (data) => {
    try {
      if (data) {
        //preserving the selected data for later use
        dispatch(setSelectedData(data));

        const pickupDate = data.pickuptime.$d;
        const dropOffDate = data.dropofftime.$d;
        const datas = {
          pickupDate,
          dropOffDate,
          pickUpDistrict: data.pickup_district,
          pickUpLocation: data.pickup_location,
        };

        const res = await fetch("api/user/showSingleofSameModel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datas),
        });

        if (!res.ok) {
          const data = await res.json();
          setError(data.message);
          return;
        }

        if (res.ok) {
          const result = await res.json();
          dispatch(setAvailableCars(result));
          navigate("/availableVehicles");
        }

        if (res.ok) {
          reset({
            pickuptime: null, // Reset pickuptime to null
            dropofftime: null, // Reset dropofftime to null
          });

          const pickupDistrictElement = document.getElementById("pickup_district");
          const pickupLocationElement = document.getElementById("pickup_location");
          const dropoffLocationElement = document.getElementById("dropoff_location");

          if (pickupDistrictElement) {
            pickupDistrictElement.innerHTML = "";
          }
          if (pickupLocationElement) {
            pickupLocationElement.innerHTML = "";
          }
          if (dropoffLocationElement) {
            dropoffLocationElement.innerHTML = "";
          }
        }
      }
    } catch (error) {
      console.log("Error  : ", error);
    }
  };

  //this is to ensure there will be 1 day gap between pickup and dropoff date

  const oneDayGap = pickup && pickup.add(1, "day");

  return (
    <>
      <section id="booking-section" className="position-relative z-1 mt-5 mx-auto bg-white" style={{ maxWidth: '1500px' }}>
        {/* overlay */}

        <div className="container bg-white shadow-sm p-4 rounded mt-4 mb-5 border">
          <div className="book-content">
            <div className="book-content__box">
              <h2 className="mb-4 fw-bold">Book a car</h2>

              <p className="d-none text-danger fw-bold align-items-center gap-1 mb-3">
                All fields required! <IconX width={20} height={20} />
              </p>

              <form onSubmit={handleSubmit(hanldeData)}>
                <div className="row g-4">
                  <div className="col-md-4">
                    <label htmlFor="pickup_district" className="form-label fw-semibold">
                      <IconMapPinFilled className="text-warning mb-1" /> &nbsp; Pick-up District{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="pickup_district"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="pickup_district"
                          className="w-100 text-capitalize"
                          select
                          // required
                          error={Boolean(errors.pickup_district)}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                            dispatch(setSelectedDistrict(e.target.value));
                          }}
                        >
                          {isLoading == true && (
                            <MenuItem value="">
                              <span>Loading</span> <span>...</span>
                            </MenuItem>
                          )}
                          {!isLoading && <MenuItem value="">Select a Place</MenuItem>}
                          {uniqueDistrict?.map((cur, idx) => (
                            <MenuItem value={cur} key={idx}>
                              {cur}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    {errors.pickup_district && <p className="text-danger small mt-1">{errors.pickup_district.message}</p>}
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="pickup_location" className="form-label fw-semibold">
                      <IconMapPinFilled className="text-warning mb-1" /> &nbsp; Pick-up Location{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <Controller
                      name="pickup_location"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="pickup_location"
                          select
                          // required
                          className="w-100 text-capitalize"
                          placeholder={"pick up location"}
                          onChange={(e) => field.onChange(e.target.value)}
                          error={Boolean(errors.pickup_location)}
                        >
                          {isLoading && (
                            <MenuItem value="">
                              <span>Loading</span> <span>...</span>
                            </MenuItem>
                          )}
                          {!isLoading && <MenuItem value="">Select a specific location</MenuItem>}
                          {/* conditionaly rendering options based on district selected or not */}
                          {locationsOfDistrict &&
                            locationsOfDistrict.map((availableLocations, idx) => (
                              <MenuItem value={availableLocations} key={idx}>
                                {availableLocations}
                              </MenuItem>
                            ))}
                        </TextField>
                      )}
                    />
                    {errors.pickup_location && <p className="text-danger small mt-1">{errors.pickup_location.message}</p>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">
                      <IconMapPinFilled className="text-warning mb-1" /> &nbsp; Drop-of Location{" "}
                      <span className="text-danger">*</span>
                    </label>

                    <Controller
                      name="dropoff_location"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          select
                          // required
                          error={Boolean(errors.dropoff_location)}
                          id="dropoff_location"
                          className="w-100 text-capitalize"
                          placeholder={"pick up location"}
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {isLoading && (
                            <MenuItem value="">
                              <span>Loading</span> <span>...</span>
                            </MenuItem>
                          )}
                          {!isLoading && <MenuItem value="">Select a specific location</MenuItem>}
                          {/* conditionaly rendering options based on district selected or not */}
                          {locationsOfDistrict &&
                            locationsOfDistrict.map((availableLocations, idx) => (
                              <MenuItem value={availableLocations} key={idx}>
                                {availableLocations}
                              </MenuItem>
                            ))}
                        </TextField>
                      )}
                    />
                    {errors.dropoff_location && <p className="text-danger small mt-1">{errors.dropoff_location.message}</p>}
                  </div>

                  <div className="col-md-4 mt-4">
                    <label htmlFor="picktime" className="form-label fw-semibold d-flex align-items-center">
                      <IconCalendarEvent className="text-warning me-2" /> Pick-up Date{" "}
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <Controller
                      name={"pickuptime"}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]} sx={{ pt: 0 }}>
                            <DateTimePicker
                              label="Pickup time"
                              className="w-100"
                              {...field}
                              value={field.value}
                              minDate={dayjs()}
                              onChange={(newValue) => {
                                field.onChange(newValue); // Update the form field value
                                setPickup(newValue); // Update the pickup state
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      )}
                    />
                    {errors.pickuptime && <p className="text-danger small mt-1">{errors.pickuptime.message}</p>}
                  </div>

                  <div className="col-md-4 mt-4">
                    <label htmlFor="droptime" className="form-label fw-semibold d-flex align-items-center">
                      <IconCalendarEvent className="text-warning me-2" /> Drop-of Date{" "}
                      <span className="text-danger ms-1">*</span>
                    </label>
                    <Controller
                      name={"dropofftime"}
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DateTimePicker"]} sx={{ pt: 0 }}>
                            <DateTimePicker className="w-100" label="Dropoff time" {...field} value={field.value} minDate={pickup ? oneDayGap : dayjs()} />
                          </DemoContainer>
                        </LocalizationProvider>
                      )}
                    />
                    {errors.dropofftime && <p className="text-danger small mt-1">{errors.dropofftime.message}</p>}
                    {error && <p className="text-danger small mt-1">{error}</p>}
                  </div>

                  <div className="col-md-4 mt-4 d-flex align-items-end mb-2">
                    <button type="submit" className="btn btn-success btn-lg w-100 fw-bold shadow-sm">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CarSearch;
