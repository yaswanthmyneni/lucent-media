import { Avatar } from "components";
import {
  BiUpvote,
  BiDownvote,
  MdOutlineModeEdit,
  MdDeleteOutline,
  ImArrowUp,
  ImArrowDown,
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

  // from react-redux
  const dispatch = useDispatch();

  // from store
  const { allUsers } = useSelector((state) => state.user);
  const { foundUser } = useSelector((state) => state.auth);

  const commentedUser = allUsers?.find((user) => user.username === username);
  const { firstName, lastName, image } = commentedUser;

  const openEditModal = (
    dispatch,
    setIsEditComment,
    setContent,
    setCommentId
  ) => {
    setIsEditComment(true);
    dispatch(setCommentId(_id));
    dispatch(setContent(text));
  };

  return (
    <div className="flex flex-wrap gap-2 px-6 py-2 border border-zinc-400 bg-slate-50">
      <Avatar className="w-10 h-10" image={image} />
      <div className="w-11/12">
        <div className="flex gap-2 items-center">
          <b>{`${firstName} ${lastName}`}</b>
          <p className="text-gray-400">@{username}</p>
        </div>
        <p>
          <span className="text-gray-400">Replying to</span> @{post.username}
        </p>
        <p>{text}</p>
        <div className={`mt-4 flex flex-wrap items-center gap-8  text-2xl`}>
          <div className="flex items-center  gap-2 w-14">
            {upvotedBy?.find((user) => user._id === foundUser._id) ? (
              <ImArrowUp className='text-xl' />
            ) : (
              <BiUpvote
                className="cursor-pointer"
                onClick={() => {
                  dispatch(upVoteComment({ commentId: _id, postId: post._id }));
                }}
              />
            )}
            <p className="text-xl">{upvotedBy.length}</p>
          </div>
          <div className="flex items-center gap-2 w-14">
            {downvotedBy?.find((user) => user._id === foundUser._id) ? (
              <ImArrowDown className='text-xl'/>
            ) : (
              <BiDownvote
                className="cursor-pointer"
                onClick={() => {
                  dispatch(
                    downVoteComment({ commentId: _id, postId: post._id })
                  );
                }}
              />
            )}
            <p className="text-xl">{downvotedBy.length}</p>
          </div>
          {foundUser.username === username && (
            <MdOutlineModeEdit
              className="cursor-pointer"
              onClick={() =>
                openEditModal(
                  dispatch,
                  setIsEditComment,
                  setContent,
                  setCommentId
                )
              }
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
