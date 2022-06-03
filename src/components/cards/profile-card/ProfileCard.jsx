import { Avatar } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { followUser, setFoundUser } from "redux-management";

const ProfileCard = ({ user }) => {
  const { _id, firstName, lastName, username, image } = user;

  const dispatch = useDispatch();
  const { foundUser } = useSelector((state) => state.auth);
  const { following } = foundUser;

  const encodedToken = localStorage.getItem("token");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <Avatar
        className="w-9 h-9 cursor-pointer"
        image={image}
        onClickHandle={() => navigate("/profile", { state: { userId: _id } })}
      />
      <div>
        <b
          className="cursor-pointer"
          onClick={() => navigate("/profile", { state: { userId: _id } })}
        >{`${firstName} ${lastName}`}</b>
        <p
          className="text-xs cursor-pointer text-slate-400"
          onClick={() => navigate("/profile", { state: { userId: _id } })}
        >
          @{username}
        </p>
      </div>
      {following?.find((user) => user._id === _id) ? (
        <p className="ml-auto text-xs text-green-600">following</p>
      ) : (
        <p
          className="ml-auto text-xs text-green-600 cursor-pointer"
          onClick={() =>
            encodedToken
              ? dispatch(followUser({ userId: _id, setFoundUser }))
              : navigate("/signin", { state: { from: { pathname } } })
          }
        >
          Follow +
        </p>
      )}
    </div>
  );
};

export { ProfileCard };
