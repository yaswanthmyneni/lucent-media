import { CgProfile } from "assets/icons/icons";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setFoundUser } from "redux/slices/authSlice";

const Header = () => {
  const [isShowUserOptions, setIsShowUserOptions] = useState(false);

  const encodedToken = localStorage.getItem("token");
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    setIsShowUserOptions(!isShowUserOptions);
    localStorage.clear();
    dispatch(setFoundUser({}));
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
          <NavLink
            to="/profile"
            className="py-1 px-10 hover:bg-lime-400 block border-b-2 border-gray-400 text-center"
            onClick={() => setIsShowUserOptions(!isShowUserOptions)}
          >
            Profile
          </NavLink>
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
