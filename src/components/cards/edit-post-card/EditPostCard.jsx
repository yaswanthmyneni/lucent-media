import { Avatar } from "components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "redux-management";

const EditPostCard = () => {
  const [editedContent, setEditedContent] = useState("");
  const dispatch = useDispatch();

  const { postId, content } = useSelector((state) => state.post);
  const { foundUser } = useSelector((state) => state.auth);
  const { image } = foundUser;

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleEditPost = (
    editedContent,
    editPost,
    setEditedContent,
    dispatch
  ) => {
    if (editedContent === "") {
      // TODO - will implement toast here
      return console.log("please enter any input");
    }
    dispatch(editPost({ editedContent, postId }));
    setEditedContent("");
  };

  return (
    <>
      <div className="fixed inset-0 opacity-75 bg-gray-300"></div>
      <div className="py-4 px-2 mb-4 w-8/12 fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center gap-4 bg-slate-400">
        <Avatar size="w-16 h-16" image={image} />
        <div className="w-10/12">
          <textarea
            className="p-1 w-full bg-slate-200 focus:outline-none"
            rows="5"
            placeholder="what's in your mind?"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          <div className="text-right">
            <button
              className={`px-8 py-2 ml-auto rounded ${
                editedContent === "" ? "cursor-not-allowed" : ""
              } bg-green-600 hover:bg-green-700 text-slate-100`}
              onClick={() =>
                handleEditPost(
                  editedContent,
                  editPost,
                  setEditedContent,
                  dispatch
                )
              }
            >
              Edit post
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { EditPostCard };
