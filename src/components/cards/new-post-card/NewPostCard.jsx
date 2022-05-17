import {
  BiImageAdd,
  AiOutlineFileGif,
  BsEmojiSunglasses,
} from "assets/icons/icons";
import { Avatar } from "components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "redux/slices/postSlice";

const NewPostCard = () => {
  const [content, setContent] = useState("");
  const encodedToken = localStorage.getItem("token");

  const { foundUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlePost = (encodedToken, content, setContent) => {
    if (encodedToken) {
      dispatch(createNewPost(content));
      setContent("");
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
        <div className="flex flex-wrap items-start text-slate-600">
          <div className="flex flex-wrap gap-4 items-center">
            <BiImageAdd className="text-3xl cursor-not-allowed" />
            <AiOutlineFileGif className="text-2xl cursor-not-allowed" />
            <BsEmojiSunglasses className="text-2xl cursor-not-allowed" />
          </div>
          <button
            className={`px-8 py-2 ml-auto rounded bg-green-600 hover:bg-green-700 text-slate-100`}
            onClick={() => handlePost(encodedToken, content, setContent)}
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