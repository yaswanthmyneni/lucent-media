import {
  AsideBarLeft,
  AsideBarRight,
  Avatar,
  PostCard,
  EditProfile,
  EditPostCard,
  DeleteModal,
} from "components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  followUser,
  getUserDetails,
  unFollowUser,
  setFoundUser,
  getPostsByUsername,
} from "redux-management";

const ProfilePage = () => {
  const [isEditProfile, setIsEditProfile] = useState(false);
  const encodedToken = localStorage.getItem("token");
  const {
    state: { userId },
    pathname,
  } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { allPosts, isEdit, isDelete, userPosts, status, error } = useSelector(
    (state) => state.post
  );
  const { foundUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const {
    _id,
    image,
    backgroundImage,
    bio,
    username,
    firstName,
    lastName,
    portfolioLink,
    following,
  } = foundUser;

  useEffect(() => {
    if (user._id !== userId) {
      dispatch(getUserDetails(userId));
    }
    dispatch(getPostsByUsername(user.username));
  }, [userId, user.username, user._id, dispatch, allPosts]);

  const reversedUserPosts = [...userPosts]?.reverse();

  const handleUnfollowUser = (userId, setFoundUser, pathname) => {
    encodedToken
      ? dispatch(unFollowUser({ userId, setFoundUser }))
      : navigate("/signin", {
          state: { from: { pathname }, userId },
        });
  };

  const handleFollowUser = (userId, setFoundUser, pathname) => {
    encodedToken
      ? dispatch(followUser({ userId, setFoundUser }))
      : navigate("/signin", {
          state: { from: { pathname }, userId },
        });
  };

  return (
    <div className="grid grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      <main className="col-start-3 col-end-7">
        <div className="flex flex-col gap-2 items-center">
          <div className="w-full relative">
            <div className="w-full h-56">
              <img
                src={backgroundImage}
                alt="backgroundImage"
                className="w-full h-full object-cover"
              />
            </div>
            <Avatar
              className="w-36 h-36 rounded-full border-2 shadow-sm shadow-gray-700 border-white absolute -bottom-24 left-4"
              image={`${userId === _id ? image : user.image}`}
            />
          </div>
          <b className="text-xl">
            {`${
              userId === _id
                ? `${firstName} ${lastName}`
                : `${user.firstName} ${user.lastName}`
            }`}
          </b>
          <p className="text-lg text-slate-500">
            @{`${userId === _id ? username : user.username}`}
          </p>
          {userId === _id ? (
            <button
              className="text-sm  px-6 py-1 border-2 border-gray-300"
              onClick={() => setIsEditProfile(!isEditProfile)}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="text-sm  px-6 py-1 border-2 border-gray-300"
              onClick={
                following?.find((userDetails) => userDetails._id === user._id)
                  ? () => handleUnfollowUser(userId, setFoundUser, pathname)
                  : () => handleFollowUser(userId, setFoundUser, pathname)
              }
            >
              {following?.find((userDetails) => userDetails._id === user._id)
                ? "unfollow"
                : "follow"}
            </button>
          )}
          <p className="text-sm">{bio}</p>
          <a
            href={`https://${
              userId === _id ? portfolioLink : user.portfolioLink
            }`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-green-600 cursor-pointer"
          >
            {`${userId === _id ? portfolioLink : user.portfolioLink}`}
          </a>
          <div className="flex gap-12 px-8 py-2 mt-4 bg-slate-300">
            <div className="flex flex-col gap-2 items-center">
              <b>{user.following?.length > 0 ? user.following.length : "0"}</b>
              <p>Following</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <b>{userPosts?.length > 0 ? userPosts.length : "0"}</b>
              <p>Posts</p>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <b>{user.followers?.length > 0 ? user.followers.length : "0"}</b>
              <p>Followers</p>
            </div>
          </div>
        </div>
        <h4 className="font-medium leading-tight text-xl mt-4 mb-4">
          Your Posts
        </h4>
        {status === "loading" ? (
          <p>loading...</p>
        ) : status === "rejected" ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {reversedUserPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
        {isEditProfile && <EditProfile setIsEditProfile={setIsEditProfile} />}
      </main>
      <AsideBarRight />
      {isEdit && <EditPostCard />}
      {isDelete && <DeleteModal />}
    </div>
  );
};

export { ProfilePage };
