import { Avatar } from "components";
import {
  AiFillHeart,
  AiOutlineHeart,
  FiMessageSquare,
  MdOutlineShare,
  BsBookmark,
  BiDotsHorizontalRounded,
  MdModeEdit,
  BsFillBookmarkFill,
  MdDelete,
} from "assets/icons/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPostId,
  setIsEdit,
  setContent,
  likePost,
  dislikePost,
  bookmarkPost,
  removeBookmark,
  setIsDelete,
} from "redux-management";
import { useLocation, useNavigate } from "react-router-dom";

const PostCard = (props) => {
  const [isPostOptions, setIsPostOptions] = useState(false);
  const encodedToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { isEdit, isDelete } = useSelector((state) => state.post);
  const { allUsers, bookmarkedPosts } = useSelector((state) => state.user);
  const { foundUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    post: { _id, content, username, likes, img },
  } = props;

  const userDetails = allUsers.find((user) => user.username === username);
  const { image, firstName, lastName } = userDetails;
  const isLiked = likes.likedBy.find(
    (likedUser) => likedUser?.username === foundUser.username
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center p-2 bg-slate-50 border-2 border-zinc-400 relative">
      <Avatar
        className="w-16 h-16"
        image={`${
          foundUser.username === userDetails.username ? foundUser.image : image
        }`}
      />
      <div className="w-10/12">
        <div className="flex flex-wrap gap-2 items-center">
          <b>{`${firstName} ${lastName}`}</b>
          <p className="text-sm text-slate-500">@{username}</p>
          {pathname !== "/bookmark" && foundUser?.username === username && (
            <BiDotsHorizontalRounded
              className="ml-auto text-xl cursor-pointer"
              onClick={() => {
                setIsPostOptions(!isPostOptions);
              }}
            />
          )}
        </div>
        <p>{content}</p>
        {img && (
          <div className="w-56 h-28">
            <img src={img} alt="post" className="w-full h-full object-cover" />
          </div>
        )}
        <div
          className={`flex flex-wrap  ${
            pathname === "/bookmark" ? "justify-end" : "justify-between"
          } items-center mt-3 mb-1`}
        >
          {pathname !== "/bookmark" && (
            <div className="flex gap-1 w-16">
              {foundUser?.username === isLiked?.username && foundUser?._id ? (
                <AiFillHeart
                  className={`text-2xl text-red-700 cursor-pointer`}
                  onClick={() => {
                    encodedToken
                      ? dispatch(dislikePost(_id))
                      : navigate("/signin", { state: { from: { pathname } } });
                  }}
                />
              ) : (
                <AiOutlineHeart
                  className={`text-2xl cursor-pointer`}
                  onClick={() => {
                    encodedToken
                      ? dispatch(likePost(_id))
                      : navigate("/signin", { state: { from: { pathname } } });
                  }}
                />
              )}
              <p>{likes.likeCount}</p>
            </div>
          )}
          {pathname !== "/bookmark" && (
            <FiMessageSquare
              className="text-xl cursor-pointer"
              onClick={() => {
                navigate("/comment", {
                  state: { from: { pathname }, postId: _id },
                });
              }}
            />
          )}
          {pathname !== "/bookmark" && (
            <MdOutlineShare className="text-xl cursor-not-allowed" />
          )}
          {bookmarkedPosts?.find((post) => post._id === _id) ? (
            <BsFillBookmarkFill
              className="text-xl cursor-pointer  text-slate-700"
              onClick={() => {
                encodedToken
                  ? dispatch(removeBookmark(_id))
                  : navigate("/signin", { state: { from: { pathname } } });
              }}
            />
          ) : (
            <BsBookmark
              className="text-xl cursor-pointer"
              onClick={() => {
                encodedToken
                  ? dispatch(bookmarkPost(_id))
                  : navigate("/signin", { state: { from: { pathname } } });
              }}
            />
          )}
        </div>
      </div>
      {isPostOptions && (
        <div className="text-black text-lg cursor-pointer bg-slate-100 absolute top-6 right-9 border-2 border-gray-400 ">
          <div
            className="flex gap-3 items-center py-1 px-4 hover:bg-lime-400 border-b-2 border-gray-400"
            onClick={() => {
              dispatch(setPostId(_id));
              dispatch(setIsEdit(!isEdit));
              dispatch(setContent(content));
              setIsPostOptions(!isPostOptions);
            }}
          >
            <MdModeEdit />
            Edit
          </div>
          <div
            className="flex gap-3 items-center py-1 px-4 hover:bg-lime-400"
            onClick={() => {
              dispatch(setIsDelete(!isDelete));
              dispatch(setPostId(_id));
              setIsPostOptions(!isPostOptions);
            }}
          >
            <MdDelete />
            Delete
          </div>
        </div>
      )}
    </div>
  );
};

export { PostCard };
