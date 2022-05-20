import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleRight } from "assets/icons/icons";
import { useState, Fragment } from "react";
import { signUpUser, setAllUsers } from "redux-management";
import { useDispatch } from "react-redux";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const { password, confirmPassword } = userDetails;

  // from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const inputFields = [
    "firstName",
    "lastName",
    "username",
    "password",
    "confirmPassword",
  ];

  const handleSignUp = (e, userDetails, setAllUsers, location) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signUpUser({userDetails, setAllUsers}));
      setUserDetails({ username: "", password: "" });
      navigate(location?.state?.from?.pathname, { replace: true });
    } else {
      setError("passwords are not matched");
    }
  };

  return (
    <main className="pt-8 pb-40">
      <div className="w-96 py-4 px-8 m-auto border-2 rounded border-green-300">
        <h2 className="text-3xl font-medium text-center">SignUp</h2>
        <form className="mt-4 flex flex-col">
          {inputFields.map((field, index) => (
            <Fragment key={index}>
              <label htmlFor={field}>{field}:</label>
              <input
                className="p-1 mb-2 outline-none border border-gray-400"
                type={index >= 3 ? "password" : "text"}
                id={field}
                name={field}
                value={userDetails[field]}
                required
                onChange={(e) => {
                  if (error) {
                    setError("");
                  }
                  setUserDetails((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }));
                }}
              />
            </Fragment>
          ))}
          <p className="text-red-600">{error}</p>
          <button
            className="px-12 py-1 mt-4 bg-green-600 hover:bg-green-800 text-gray-50"
            onClick={(e) => handleSignUp(e, userDetails,setAllUsers, location)}
          >
            SignUp
          </button>
        </form>
        <p
          className="text-lg cursor-pointer mt-4 flex flex-wrap items-center justify-center"
          onClick={() =>
            navigate("/signin", { state: { from: { pathname: "/" } } })
          }
        >
          Already have an account? <FaAngleRight />
        </p>
      </div>
    </main>
  );
};

export { SignUpPage };
