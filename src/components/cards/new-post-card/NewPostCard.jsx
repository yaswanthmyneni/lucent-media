import {
  BiImageAdd,
  AiOutlineFileGif,
  BsEmojiSunglasses,
} from "assets/icons/icons";
import { Avatar } from "components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "redux-management";

const NewPostCard = () => {
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const encodedToken = localStorage.getItem("token");

  const { foundUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlePost = (encodedToken, content, setContent, img, setImg) => {
    if (encodedToken) {
      dispatch(createNewPost({ content, img }));
      setContent("");
      setImg(null);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-4 px-2 mb-4 border-2 border-solid border-zinc-400">
      <Avatar size="w-16 h-16" image={foundUser.image} />
      <div className="w-10/12">
        <textarea
          className="p-1 w-full bg-slate-200 focus:outline-none"
          rows="5"
          placeholder="what's in your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {img !== null && (
          <div className="w-56 h-28">
            <img src={img} alt="post" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex flex-wrap items-start text-slate-600">
          <div className="flex flex-wrap gap-4 items-center">
            <label htmlFor="image-upload-at-post" className="cursor-pointer">
              <input
                type="file"
                id="image-upload-at-post"
                className="hidden"
                onChange={(e) => {
                  const image = URL.createObjectURL(e.target.files[0]);
                  setImg(image);
                }}
              />
              <BiImageAdd className="text-3xl" />
            </label>
            <AiOutlineFileGif className="text-2xl cursor-not-allowed" />
            <BsEmojiSunglasses className="text-2xl cursor-not-allowed" />
          </div>
          <button
            className={`px-8 py-2 ml-auto rounded bg-green-600 hover:bg-green-700 text-slate-100`}
            onClick={() =>
              handlePost(encodedToken, content, setContent, img, setImg)
            }
            disabled={!content}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export { NewPostCard };
