import { Avatar } from "components";
import {
  AiOutlineLike,
  AiOutlineDislike,
  MdOutlineModeEdit,
  MdDeleteOutline,
  AiTwotoneLike,
  AiTwotoneDislike,
} from "assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  downVoteComment,
  setCommentId,
  setContent,
  upVoteComment,
} from "redux-management";

const CommentCard = ({ comment, post, setIsEditComment }) => {
  const {
    _id,
    text,
    username,
    votes: { downvotedBy, upvotedBy },
  } = comment;

  const dispatch = useDispatch();
  const { allUsers } = useSelector((state) => state.user);
  const { foundUser } = useSelector((state) => state.auth);

  const commentedUser = allUsers?.find((user) => user.username === username);
  const { firstName, lastName, image } = commentedUser;

  return (
    <div className="flex flex-wrap gap-2 px-6 py-2 border border-zinc-400 bg-slate-50">
      <Avatar size="w-10 h-10" image={image} />
      <div className="w-11/12">
        <div className="flex gap-2 items-center">
          <b>{`${firstName} ${lastName}`}</b>
          <p className="text-gray-400">@{username}</p>
        </div>
        <p>
          <span className="text-gray-400">Replying to</span> @{post.username}
        </p>
        <p>{text}</p>
        <div
          className={`mt-4 flex flex-wrap ${
            foundUser.username === username
              ? "justify-between"
              : "justify-end gap-12"
          }  text-2xl`}
        >
          {upvotedBy?.find((user) => user._id === foundUser._id) ? (
            <AiTwotoneLike />
          ) : (
            <AiOutlineLike
              className="cursor-pointer"
              onClick={() => {
                dispatch(upVoteComment({ commentId: _id, postId: post._id }));
              }}
            />
          )}
          {downvotedBy?.find((user) => user._id === foundUser._id) ? (
            <AiTwotoneDislike />
          ) : (
            <AiOutlineDislike
              className="cursor-pointer"
              onClick={() => {
                dispatch(downVoteComment({ commentId: _id, postId: post._id }));
              }}
            />
          )}
          {foundUser.username === username && (
            <MdOutlineModeEdit
              className="cursor-pointer"
              onClick={() => {
                setIsEditComment(true);
                dispatch(setCommentId(_id));
                dispatch(setContent(text));
              }}
            />
          )}
          {foundUser.username === username && (
            <MdDeleteOutline
              className="cursor-pointer"
              onClick={() => {
                dispatch(deleteComment({ commentId: _id, postId: post._id }));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { CommentCard };