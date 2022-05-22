import { Avatar, EmojiPicker } from "components";
import { useEffect, useState } from "react";
import { BsEmojiSunglasses } from "assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { editPost, setIsEdit } from "redux-management";

const EditPostCard = () => {
  const [editedContent, setEditedContent] = useState("");
  const [img, setImg] = useState("");
  const [isEmoji, setIsEmoji] = useState(false);
  const dispatch = useDispatch();

  const { postId, content } = useSelector((state) => state.post);
  const { foundUser } = useSelector((state) => state.auth);
  const { image } = foundUser;

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleEditPost = (
    editedContent,
    img,
    editPost,
    setEditedContent,
    dispatch
  ) => {
    if (editedContent === "") {
      // TODO - will implement toast here
      return console.log("please enter any input");
    }
    dispatch(editPost({ editedContent, img, postId }));
    setEditedContent("");
  };

  const cancelEditPost = (dispatch, setEditedContent, setIsEdit) => {
    dispatch(setIsEdit(false));
    setEditedContent("");
  };

  return (
    <>
      <div className="fixed inset-0 opacity-75 bg-gray-300"></div>
      <div className="py-4 px-2 mb-4 w-8/12 max-h-96 overflow-scroll fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center gap-4 bg-slate-400">
        <Avatar className="w-16 h-16" image={image} />
        <div className="w-10/12">
          <textarea
            className="p-1 w-full bg-slate-100 focus:outline-none"
            rows="5"
            placeholder="what's in your mind?"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          ></textarea>
          <p>Image:</p>
          <label htmlFor="image-update">
            <input
              className="mb-4"
              type="file"
              onChange={(e) => {
                const image = URL.createObjectURL(e.target.files[0]);
                setImg(image);
              }}
            />
          </label>
          {isEmoji && <EmojiPicker setContent={setEditedContent} />}
          <div className="flex gap-2 items-center mt-2">
            <BsEmojiSunglasses
              className="text-2xl cursor-pointer"
              onClick={() => setIsEmoji(!isEmoji)}
            />
            <button
              className={`px-6 py-1 ml-auto text-lg rounded ${
                editedContent === "" ? "cursor-not-allowed" : ""
              } bg-green-600 hover:bg-green-700 text-slate-100`}
              onClick={() =>
                handleEditPost(
                  editedContent,
                  img,
                  editPost,
                  setEditedContent,
                  dispatch
                )
              }
            >
              Edit post
            </button>
            <button
              className={`px-6 py-1 text-lg rounded border-2 border-green-600 text-green-600 bg-slate-50`}
              onClick={() =>
                cancelEditPost(dispatch, setEditedContent, setIsEdit)
              }
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { EditPostCard };
