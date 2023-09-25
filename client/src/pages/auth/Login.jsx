import { Link } from "react-router-dom";
import "./auth.scss";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({ defaultValues: { username: "", password: "" } });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.APP_BASE_API + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login_card">
        <div className="container">
          <div className="card">
            <div className="card-body">
              <div className="card-title d-flex justify-content-md-center mb-4">TeamBook Login</div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row gap-3">
                  <div className="col-md-12">
                    <div className="input-group has-validation">
                      <input
                        type="text"
                        className={errors?.username?.message ? "form-control is-invalid" : "form-control"}
                        id="username"
                        placeholder="Username"
                        {...register("username", {
                          required: { value: true, message: "User name is required" },
                          maxLength: { value: "15", message: "Max 15 character allow" },
                        })}
                      />
                      <div id="usernameFeedback" className="invalid-feedback">
                        {errors?.username?.message}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group has-validation">
                      <input
                        type="password"
                        className={errors?.password?.message ? "form-control is-invalid" : "form-control"}
                        placeholder="Password"
                        {...register("password", {
                          required: { value: true, message: "Password is required" },
                        })}
                      />
                      <div id="validationServerUsernameFeedback" className="invalid-feedback">
                        Please enter password.
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button className="btn btn-primary form-control bg-primary text-light mb-2" type="submit" disabled={loading}>
                      {loading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} Submit
                    </button>
                    <div className="d-flex justify-content-md-center">
                      <Link to="/signup" style={{ textDecoration: "none" }}>
                        New User! Sign Up
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
