import { CgProfile } from "assets/icons/icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFoundUser } from "redux-management";

const Header = () => {
  const [isShowUserOptions, setIsShowUserOptions] = useState(false);

  const encodedToken = localStorage.getItem("token");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { foundUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { _id } = foundUser;

  const handleLogout = () => {
    setIsShowUserOptions(!isShowUserOptions);
    localStorage.clear();
    dispatch(setFoundUser({}));
  };

  const handleNavigateToProfile = (
    encodedToken,
    setIsShowUserOptions,
    isShowUserOptions,
    navigate
  ) => {
    if (!encodedToken) {
      setIsShowUserOptions(!isShowUserOptions);
      return navigate("/signin", {
        state: { from: { pathname: "/profile" } },
      });
    }
    navigate("/profile", { state: { userId: _id } });
    setIsShowUserOptions(!isShowUserOptions);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center w-full p-4 bg-green-600 text-slate-50">
      <NavLink to="/">
        <h1 className="text-4xl">Lucent Media</h1>
      </NavLink>
      {pathname !== "/logout" &&
        pathname !== "/signin" &&
        pathname !== "/signup" && (
          <CgProfile
            className="text-3xl ml-auto cursor-pointer"
            onClick={() => setIsShowUserOptions(!isShowUserOptions)}
          />
        )}
      {isShowUserOptions && (
        <div className="text-black text-lg cursor-pointer bg-slate-100 absolute top-11 right-8 border-2 border-gray-400 ">
          <div
            className="py-1 px-10 hover:bg-lime-400 block border-b-2 border-gray-400 text-center"
            onClick={() => {
              handleNavigateToProfile(
                encodedToken,
                setIsShowUserOptions,
                isShowUserOptions,
                navigate
              );
            }}
          >
            Profile
          </div>
          {encodedToken ? (
            <NavLink
              to="/logout"
              className="py-1 px-8 hover:bg-lime-400 block text-center"
              onClick={handleLogout}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/signin"
              className="py-1 px-8 hover:bg-lime-400 block text-center"
              onClick={() => setIsShowUserOptions(!isShowUserOptions)}
              state={{ from: { pathname } }}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </header>
  );
};

export { Header };
