import { useState } from "react";
import styles from "../../index";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//zod validation schema
const schema = z.object({
  username: z.string().min(3, { message: "minimum 3 characters required" }),
  email: z
    .string()
    .min(1, { message: "email required" })
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: "Invalid email address",
    }),
  password: z.string().min(4, { message: "minimum 4 characters required" }),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Mock signup success
      setTimeout(() => {
        setLoading(false);
        setError(false);
        navigate("/signin");
      }, 800);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="card shadow mt-5 mx-auto border-0" style={{ maxWidth: "500px" }}>
          <div className="card-header bg-success bg-gradient text-white px-4 py-3 d-flex justify-content-between align-items-center">
            <h1 className="h3 mb-0">Sign Up</h1>
            <Link to={"/"} className="text-white text-decoration-none">
              <div className="btn btn-outline-light btn-sm fw-bold border-0">
                x
              </div>
            </Link>
          </div>

          <div className="card-body p-4 p-md-5">
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
              <div>
                <input
                  type="text"
                  id="username"
                  className={`form-control ${errors.username ? 'is-invalid' : ''} bg-light`}
                  placeholder="UserName"
                  {...register("username")}
                />
                {errors.username && (
                  <div className="invalid-feedback" style={{ fontSize: "12px" }}>
                    {errors.username.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''} bg-light`}
                  placeholder="Email"
                  {...register("email")}
                />
                {errors.email && (
                  <div className="invalid-feedback" style={{ fontSize: "12px" }}>
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''} bg-light`}
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <div className="invalid-feedback" style={{ fontSize: "12px" }}>
                    {errors.password.message}
                  </div>
                )}
              </div>

              <button
                className="btn btn-success mt-2"
                disabled={isLoading}
              >
                {isLoading ? "Loading ..." : "Register"}
              </button>
              
              <div className="d-flex justify-content-between mt-2">
                <p className="small mb-0">
                  Have an account?{" "}
                  <Link to={`/signin`} className="text-primary text-decoration-none">
                    Sign in
                  </Link>
                </p>
                {isError && (
                  <p className="small text-danger mb-0">
                    something went wrong
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
