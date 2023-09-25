import React from "react";
import { useForm } from "react-hook-form";
import "./auth.scss";
import { Link } from "react-router-dom";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({ defaultValues: { email: "", username: "", password: "" } });

    const onSubmit = async (data) => {
        console.log(data);
    };
    return (
        <>
            <div className="login_card">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title d-flex justify-content-md-center mb-4">TeamBook Signup</div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row gap-3">
                                    <div className="col-md-12">
                                        <div className="input-group has-validation">
                                            <input
                                                type="text"
                                                className={errors?.email?.message ? "form-control is-invalid" : "form-control"}
                                                id="email"
                                                placeholder="Email"
                                                {...register("email", {
                                                    required: { value: true, message: "Email is required" },
                                                })}
                                            />
                                            <div id="emailFeedback" className="invalid-feedback">
                                                {errors?.email?.message}
                                            </div>
                                        </div>
                                    </div>
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
                                        <input type="submit" value="Submit" className="form-control bg-primary text-light mb-2" />
                                        <div className="d-flex justify-content-md-center">
                                            <Link to="/login" style={{ textDecoration: "none" }}>
                                                Already User! Login
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

export default Signup;
