import {
  AsideBarLeft,
  AsideBarRight,
  Avatar,
  PostCard,
  EditProfile,
  EditPostCard,
  DeleteModal,
  CommonProfileCard,
  Loader,
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
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowers, setIsFollowers] = useState(false);
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
  const { user, userStatus } = useSelector((state) => state.user);
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
    if (user._id !== userId && userId) {
      dispatch(getUserDetails(userId));
    }
    if (user._id === userId) {
      dispatch(getPostsByUsername(user.username));
    }
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
    <div className="flex flex-col gap-2 items-center xl:w-full lg:items-start lg:gap-0 lg:grid  lg:grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      {userStatus === "loading" ? (
        <Loader />
      ) : userStatus === "rejected" ? (
        <p>Error Occurred!</p>
      ) : (
        <main className="px-3 w-full sm:pl-2 sm:w-5/6 lg:mx-auto lg:col-start-3 lg:col-end-9 xl:col-end-7">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-full relative">
              <div className="w-full h-56">
                <img
                  src={`${
                    userId === _id ? backgroundImage : user.backgroundImage
                  }`}
                  alt="backgroundImage"
                  className="w-full h-full object-cover"
                />
              </div>
              <Avatar
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 shadow-sm shadow-gray-700 border-white absolute -bottom-14 left-0 sm:-bottom-24 sm:left-4"
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
                className="text-white bg-green-600 hover:bg-green-700 px-6 py-2 rounded"
                onClick={() => setIsEditProfile(!isEditProfile)}
              >
                Edit Profile
              </button>
            ) : (
              <button
                className="text-white bg-green-600 hover:bg-green-700  px-6 py-2 rounded"
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
            <p>{`${userId === _id ? bio : user.bio}`}</p>
            <a
              href={`https://${
                userId === _id ? portfolioLink : user.portfolioLink
              }`}
              target="_blank"
              rel="noreferrer"
              className="text-green-600 hover:underline cursor-pointer"
            >
              {`${userId === _id ? portfolioLink : user.portfolioLink}`}
            </a>
            <div className="flex flex-col gap-1">
              <div className="flex gap-12 px-8 py-2 mt-4 bg-slate-300">
                <div className="flex flex-col gap-2 items-center">
                  <b>
                    {user.following?.length > 0 ? user.following.length : "0"}
                  </b>
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      setIsFollowing(!isFollowing);
                      setIsFollowers(false);
                    }}
                  >
                    Following
                  </p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <b>{userPosts?.length > 0 ? userPosts.length : "0"}</b>
                  <p>Posts</p>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <b>
                    {user.followers?.length > 0 ? user.followers.length : "0"}
                  </b>
                  <p
                    className="cursor-pointer hover:underline"
                    onClick={() => {
                      setIsFollowers(!isFollowers);
                      setIsFollowing(false);
                    }}
                  >
                    Followers
                  </p>
                </div>
              </div>
              {isFollowing && (
                <div className="p-2 h-36 overflow-scroll rounded border-2 border-green-600">
                  <h2 className="font-medium text-2xl">Following:</h2>
                  {user.following?.length > 0 ? (
                    user.following?.map((user) => (
                      <CommonProfileCard
                        key={user._id}
                        user={user}
                        setIsFollowing={{ setIsFollowing, following: "true" }}
                      />
                    ))
                  ) : (
                    <p className="mt-2">Nobody is following!</p>
                  )}
                </div>
              )}
              {isFollowers && (
                <div className="p-2 h-36 overflow-scroll rounded border-2 border-green-600">
                  <h2 className="font-medium text-2xl">Followers:</h2>
                  {user.followers?.length > 0 ? (
                    user.followers?.map((user) => (
                      <CommonProfileCard
                        key={user._id}
                        user={user}
                        setIsFollowers={{ setIsFollowers, followers: "true" }}
                      />
                    ))
                  ) : (
                    <p className="mt-2">No followers!</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <h4 className="font-medium leading-tight text-xl mt-4 mb-4">
            Your Posts
          </h4>
          {status === "rejected" ? (
            <p>{error}</p>
          ) : (
            <div className="flex flex-col gap-2">
              {userPosts[0]?.username === user?.username &&
                reversedUserPosts?.map((post) => (
                  <PostCard key={post._id} post={post} userId={userId}/>
                ))}
            </div>
          )}
          {isEditProfile && <EditProfile setIsEditProfile={setIsEditProfile} />}
        </main>
      )}
      <AsideBarRight className="hidden xl:block" />
      {isEdit && <EditPostCard />}
      {isDelete && <DeleteModal />}
    </div>
  );
};

export { ProfilePage };
