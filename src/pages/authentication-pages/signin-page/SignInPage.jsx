import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaAngleRight } from "assets/icons/icons";
import { useState, Fragment } from "react";
import { logInUser } from "redux/slices/authSlice";
import { useDispatch } from "react-redux";

const SignInPage = () => {
  const [signInDetails, setSignInDetails] = useState({
    username: "",
    password: "",
  });

  // from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const inputFields = ["username", "password"];

  const handleLogin = (e, signInDetails, location) => {
    e.preventDefault();
    dispatch(logInUser(signInDetails));
    setSignInDetails({ username: "", password: "" });
    navigate(location?.state?.from?.pathname, { replace: true });
  };

  return (
    <>
      <main className="pt-16">
        <div className="w-96 py-4 px-8 m-auto border-2 rounded border-green-300">
          <h2 className="text-3xl font-medium text-center">SignIn</h2>
          <form className="mt-4 flex flex-col">
            {inputFields.map((field, index) => (
              <Fragment key={field}>
                <label htmlFor={field}>{field}:</label>
                <input
                  className="p-1 mb-2 outline-none border border-gray-400"
                  type={index === 1 ? "password" : "text"}
                  id={field}
                  name={field}
                  value={signInDetails[field]}
                  required
                  onChange={(e) =>
                    setSignInDetails((prev) => ({
                      ...prev,
                      [field]: e.target.value,
                    }))
                  }
                />
              </Fragment>
            ))}
            <div className="my-2 flex flex-wrap justify-between">
              <label className="cursor-pointer" htmlFor="remember-me">
                <input
                  className="cursor-pointer mr-1"
                  type="checkbox"
                  id="remember-me"
                />
                Remember me
              </label>
              <Link to="/forgot-password" className="cursor-pointer">
                forgot your password?
              </Link>
            </div>
            <button
              className="px-12 py-1 mt-2 bg-green-600 hover:bg-green-800 text-gray-50"
              onClick={(e) => handleLogin(e, signInDetails, location)}
            >
              SignIn
            </button>
            <button
              className="px-12 py-1 mt-2 bg-green-600 hover:bg-green-800 text-gray-50"
              onClick={(e) =>
                handleLogin(
                  e,
                  { username: "adarshbalika", password: "adarshBalika123" },
                  location
                )
              }
            >
              guest sign-in
            </button>
          </form>
          <p
            className="text-lg cursor-pointer mt-4 flex flex-wrap items-center justify-center"
            onClick={() =>
              navigate("/signup", { state: { from: { pathname: "/" } } })
            }
          >
            Create New Account <FaAngleRight />
          </p>
        </div>
      </main>
    </>
  );
};

export { SignInPage };
