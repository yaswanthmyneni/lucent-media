import { Avatar } from "components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment, setCommentId, setContent } from "redux-management";

const CommentModal = ({ setIsEditComment, postId }) => {
  const [text, setText] = useState("");
  
  // from react-redux
  const dispatch = useDispatch();

  // from store
  const { foundUser } = useSelector((state) => state.auth);
  const { commentId, content } = useSelector((state) => state.post);

  useEffect(() => {
    setText(content);
  }, [content]);

  const handleEditComment = (
    postId,
    commentId,
    text,
    editComment,
    setIsEditComment
  ) => {
    dispatch(editComment({ postId, commentId, text }));
    setIsEditComment(false);
  };

  const cancleEditingComment = (
    dispatch,
    setIsEditComment,
    setCommentId,
    setContent
  ) => {
    setIsEditComment(false);
    dispatch(setCommentId(null));
    dispatch(setContent(""));
  };

  return (
    <>
      <div className="fixed inset-0 opacity-75 bg-gray-200"></div>
      <div className="px-2 lg:px-8 py-4 mb-4 w-3/4 lg:w-1/2 flex flex-col gap-4 fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-zinc-300  border-2 border-slate-400">
        <p>Edit Comment:</p>
        <div className="flex flex-wrap gap-2 w-full">
          <Avatar className="h-10 w-10" image={foundUser?.image} />
          <textarea
            className="outline-none px-1 py-2 w-9/12 md:w-10/12 bg-slate-100"
            type="text"
            placeholder="comment your reply"
            rows='5'
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-4 justify-end">
          <button
            className="px-4 py-1 rounded text-green-50 bg-green-600 hover:bg-green-700"
            onClick={() =>
              handleEditComment(
                postId,
                commentId,
                text,
                editComment,
                setIsEditComment
              )
            }
          >
            EDIT
          </button>
          <button
            className="px-4 py-1 rounded text-green-50 bg-green-600 hover:bg-green-700"
            onClick={() =>
              cancleEditingComment(
                dispatch,
                setIsEditComment,
                setCommentId,
                setContent
              )
            }
          >
            CANCEL
          </button>
        </div>
      </div>
    </>
  );
};

export { CommentModal };
