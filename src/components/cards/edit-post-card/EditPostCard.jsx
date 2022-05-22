import { Avatar, EmojiPicker } from "components";
import { useEffect, useState } from "react";
import { BsEmojiSunglasses } from "assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { editPost, setIsEdit } from "redux-management";

const EditPostCard = () => {
  const [data, setData] = useState({
    content: "",
    img: null,
    video: null,
    isEmoji: false,
  });
  const { img, video, isEmoji } = data;
  const dispatch = useDispatch();

  const { postId, content, status } = useSelector((state) => state.post);
  const { foundUser } = useSelector((state) => state.auth);
  const { image } = foundUser;

  useEffect(() => {
    setData((prev) => ({ ...prev, editedContent: content }));
  }, [content]);

  useEffect(() => {
    if (status === "fulfilled") {
      setData((prev) => ({ ...prev, content: "", img: null, video: null }));
    }
  }, [status]);

  const handleEditPost = (editedContent, img, video, editPost, dispatch) => {
    if (editedContent === "") {
      // TODO - will implement toast here
      return console.log("please enter any input");
    }
    dispatch(editPost({ editedContent, img, postId, video }));
  };

  const cancelEditPost = (dispatch, setData, setIsEdit) => {
    dispatch(setIsEdit(false));
    setData((prev) => ({ ...prev, content: "", img: null, video: null }));
  };

  const handleImageUpload = (e, setData) => {
    if (e.target.files[0].type.split("/")[0] === "image") {
      const image = URL.createObjectURL(e.target.files[0]);
      setData((prev) => ({
        ...prev,
        img: image,
      }));
    }
  };

  const handleVideoUpload = (e, setData) => {
    if (e.target.files[0].type.split("/")[0] === "video") {
      const videoLink = URL.createObjectURL(e.target.files[0]);
      setData((prev) => ({
        ...prev,
        video: { video: videoLink, type: e.target.files[0].type },
      }));
    }
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
            value={data.content}
            onChange={(e) =>
              setData((prev) => ({ ...prev, content: e.target.value }))
            }
          ></textarea>
          <p>Image:</p>
          <label htmlFor="upload-image">
            <input
              id="upload-image"
              className="mb-4"
              type="file"
              onChange={(e) => handleImageUpload(e, setData)}
            />
          </label>
          <p>Video:</p>
          <label htmlFor="upload-video">
            <input
              id="upload-video"
              className="mb-4"
              type="file"
              onChange={(e) => handleVideoUpload(e, setData)}
            />
          </label>
          {isEmoji && <EmojiPicker setContent={setData} />}
          <div className="flex gap-2 items-center mt-2">
            <BsEmojiSunglasses
              className="text-2xl cursor-pointer"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  isEmoji: !isEmoji,
                }))
              }
            />
            <button
              className={`px-6 py-1 ml-auto text-lg rounded ${
                data.content === "" ? "cursor-not-allowed" : ""
              } bg-green-600 hover:bg-green-700 text-slate-100`}
              onClick={() =>
                handleEditPost(data.content, img, video, editPost, dispatch)
              }
            >
              Edit post
            </button>
            <button
              className={`px-6 py-1 text-lg rounded border-2 border-green-600 text-green-600 bg-slate-50`}
              onClick={() => cancelEditPost(dispatch, setData, setIsEdit)}
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
