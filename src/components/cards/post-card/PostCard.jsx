import { Avatar } from "components";
import {
  AiFillHeart,
  AiOutlineHeart,
  FiMessageSquare,
  MdOutlineShare,
  BsBookmark,
  BiDotsHorizontalRounded,
  MdModeEdit,
  MdDelete,
} from "assets/icons/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPostId,
  setIsEdit,
  deletePost,
  setContent,
} from "redux/slices/postSlice";

const PostCard = (props) => {
  const [isDelete, setIsDelete] = useState(false);
  const [isPostOptions, setIsPostOptions] = useState(false);
  const encodedToken = localStorage.getItem("token");

  const { isEdit, postId } = useSelector((state) => state.post);
  const { allUsers } = useSelector((state) => state.user);
  const { foundUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    post: { _id, content, username, likes },
  } = props;

  const userDetails = allUsers.find((user) => user.username === username);
  const { image, firstName, lastName } = userDetails;

  return (
    <div className="flex flex-wrap gap-4 justify-center p-2 mb-4 border-2 border-zinc-400 relative">
      <Avatar
        size="w-16 h-16"
        image={`${username === userDetails.username ? image : ""}`}
      />
      <div className="w-10/12">
        <div className="flex flex-wrap gap-2 items-center">
          <b>{`${firstName} ${lastName}`}</b>
          <p className="text-sm text-slate-500">@{username} . time</p>
          {foundUser?.username === username && encodedToken && (
            <BiDotsHorizontalRounded
              className="ml-auto text-xl cursor-pointer"
              onClick={() => {
                setIsPostOptions(!isPostOptions);
              }}
            />
          )}
        </div>
        <p>{content}</p>
        <div className="flex flex-wrap justify-between items-center mt-3 mb-1">
          {foundUser?.username ===
            likes.likedBy.filter(
              (likedUser) => likedUser?.username === foundUser.username
            )[0]?.username && foundUser._id ? (
            <AiFillHeart className={`text-2xl text-red-700 cursor-pointer`} />
          ) : (
            <AiOutlineHeart className={`text-2xl cursor-pointer`} />
          )}
          <FiMessageSquare className="text-xl cursor-pointer" />
          <MdOutlineShare className="text-xl cursor-not-allowed" />
          <BsBookmark className="text-xl cursor-pointer" />
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
              setIsDelete(!isDelete);
              dispatch(setPostId(_id));
              setIsPostOptions(!isPostOptions);
            }}
          >
            <MdDelete />
            Delete
          </div>
        </div>
      )}
      {isDelete && (
        <>
          <div className="fixed inset-0 opacity-75 bg-gray-300"></div>
          <div className="p-2 mb-4 fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center gap-4 bg-slate-400">
            <div className="p-8 bg-slate-50 flex flex-col gap-3">
              <p>Are you sure, you want to delete the post?</p>
              <div className="flex justify-end gap-2">
                <button
                  className="py-1 px-4 border border-red-600 text-red-600 rounded"
                  onClick={() => {
                    dispatch(deletePost(postId));
                    setIsDelete(!isDelete);
                  }}
                >
                  delete
                </button>
                <button
                  className="py-1 px-4 bg-green-600 text-white rounded"
                  onClick={() => {
                    setIsDelete(!isDelete);
                    dispatch(setPostId(null));
                  }}
                >
                  cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export { PostCard };
