import React, { useState } from "react";

import * as Yup from "yup";
import { Validators } from "../utils";
import { connect } from "react-redux";
import * as Requests from "../utils/Requests";
import { Formik, Field } from "formik";
import { login, startLoading, stopLoading } from "../store/actions";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [error, setError] = useState(null);

  const validate = Yup.object({
    email: Validators.emailRequired,
    password: Validators.stringRequired,
  });

  return props.isAuthenticated ? (
    <Navigate to={"/"}></Navigate>
  ) : (
    <div className=" w-96 mx-auto bg-gray-100 p-4 py-8 my-10">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validate}
        onSubmit={async (values) => {
          props.startLoading();
          setError(null);
          Requests.login(values)
            .then((res) => {
              res = res.data;
              if (res.success) {
                localStorage.setItem("investify", res.data.token);
                props.login(res.data);
              } else {
                setError(res.error);
              }
              props.stopLoading();
            })
            .catch((err) => {
              console.log(err);
              props.stopLoading();
            });
        }}
      >
        {(formik) => (
          <div className="p-2 space-y-4 tracking-wider">
            <h1 className="text-2xl font-bold text-center">Sign In</h1>
            <div className="">
              <Field
                className="w-full rounded border bg-white border-gray-200 p-2"
                placeholder={"Email"}
                name={"email"}
                type={"text"}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <div className="text-red-500">{formik.errors.email}</div>
              )}
            </div>
            <div className="">
              <Field
                className="w-full rounded border bg-white border-gray-200 p-2"
                placeholder={"Password"}
                name={"password"}
                type={"password"}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>
            <div className="flex items-baseline justify-between">
              <button
                className="px-6 py-2 text-white bg-cyan-500 rounded-lg hover:bg-cyan-800"
                type="button"
                onClick={formik.handleSubmit}
              >
                Login
              </button>
            </div>
            {error && <div className="text-red-500 font-bold">{error}</div>}
          </div>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
    startLoading: () => dispatch(startLoading()),
    stopLoading: () => dispatch(stopLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
