import React, { useState } from "react";
import TextFiled from "../../Components/TextField/index";
import CustomButton from "../../Components/Button/index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login, getProfileData } from "../../services/authServices";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAlert(null);
    setLoading(true);

    if (!formData.email || !formData.password) {
      setShowAlert("Please Enter Email and Password");
      setLoading(false);
      return;
    }

    login(formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential?.user;
        localStorage.setItem("ACCESSTOKEN", user?.accessToken);
        localStorage.setItem("userUid", user?.uid);
        getProfileData(user?.uid)
          .then((res) => {
            const userData = res.data();
            if (userData) {
              navigate("/dashboard/todo/all");
              dispatch(loginSuccess(userData));
              resetFiled();
            }
          })
          .catch((error) => {
            setShowAlert(error?.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        setShowAlert(error?.message);
        setLoading(false);
      });
  };

  const resetFiled = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form
                className="space-y-4 md:space-y-6 text-left"
                onSubmit={handleSubmit}
              >
                <div>
                  <TextFiled
                    placeholder="Enter Email"
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextFiled
                    placeholder="Enter Password"
                    type="password"
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                {showAlert && (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    <span className="block sm:inline">{showAlert}</span>
                  </div>
                )}
                <CustomButton type="submit" label="Login" loading={loading} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/auth/signup"
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Register
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
