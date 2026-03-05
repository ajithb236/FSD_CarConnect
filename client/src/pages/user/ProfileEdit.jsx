import { useState } from "react";
import Modal from "../../components/CustomModal";
import { TbEditCircle } from "react-icons/tb";

//mui

import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { editUserProfile, setUpdated } from "../../redux/user/userSlice";
import { useForm } from "react-hook-form";

const ProfileEdit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { username, email, phoneNumber, adress, _id } = useSelector(
    (state) => state.user.currentUser
  );

  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const editProfileData = async (data, id) => {
    try {
      if (data) {
        const formData = data;
        dispatch(editUserProfile({ ...formData }));
        // Mock fetch
        setTimeout(() => {
          dispatch(setUpdated(true));
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button type="button" className="btn btn-light btn-sm rounded-circle p-1 d-flex align-items-center justify-content-center" onClick={() => setIsModalOpen(true)}>
        <TbEditCircle className="fs-5" />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="modal-dialog modal-dialog-centered"
      >
        <div className="modal-content border-0 shadow" style={{ minWidth: '360px', maxWidth: '600px', backgroundColor: 'white', borderRadius: '8px' }}>
          <form onSubmit={handleSubmit((data) => editProfileData(data, _id))}>
            <div className="modal-body p-4 p-md-5">
              <h4 className="fw-bold mb-4">Make changes to your profile</h4>
              {/* mui components */}

              <div className="d-flex flex-column mx-auto gap-4 mb-4">
                <TextField
                  id="username"
                  label="Name"
                  variant="outlined"
                  {...register("username")}
                  defaultValue={username}
                  fullWidth
                />

                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  defaultValue={email}
                  {...register("email")}
                  fullWidth
                />
                <TextField
                  id="phoneNumber"
                  label="Phone"
                  type="Number"
                  variant="outlined"
                  defaultValue={phoneNumber}
                  {...register("phoneNumber")}
                  fullWidth
                />

                <TextField
                  id="adress"
                  label="Address"
                  multiline
                  rows={4}
                  defaultValue={adress}
                  {...register("adress")}
                  fullWidth
                />
              </div>

              {/* mui text feild end here */}

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-danger px-4"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-success px-4"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ProfileEdit;
