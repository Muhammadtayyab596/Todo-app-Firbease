import React, { useState } from "react";
import TextField from "../../Components/TextField/index";
import CustomButton from "../../Components/Button/index";
import { Link } from "react-router-dom";
import { signup, setProfileData } from "../../services/authServices";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
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

    if (!formData.username || !formData.email || !formData.password) {
      setShowAlert("Please fill in all fields.");
      return;
    }

    signup(formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential?.user;
        setProfileData(user?.uid, {
          email: formData.email,
          username: formData.username,
          userId: user?.uid,
        })
          .then((res) => {
            resetFiled();
            navigate("/auth/login");
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
                Register
              </h1>
              <form
                className="space-y-4 md:space-y-6 text-left"
                onSubmit={handleSubmit}
              >
                <div>
                  <TextField
                    placeholder="Enter Username"
                    type="text"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextField
                    placeholder="Enter Email"
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <TextField
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
                <CustomButton
                  type="submit"
                  label="Register"
                  loading={loading}
                />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="font-medium text-blue-600 hover:underline dark:text-primary-500"
                  >
                    Login
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

export default Register;
