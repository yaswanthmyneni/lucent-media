import { BiImageAdd, BsEmojiSunglasses, FaVideo } from "assets/icons/icons";
import { Avatar, EmojiPicker } from "components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createNewPost } from "redux-management";

const NewPostCard = () => {
  const [data, setData] = useState({
    content: "",
    img: null,
    video: null,
    isEmoji: false,
  });
  const { content, img, video, isEmoji } = data;
  const encodedToken = localStorage.getItem("token");

  const { foundUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlePost = (encodedToken, content, setData, img, video) => {
    if (encodedToken && content.match(/^\s*$/) === null) {
      dispatch(createNewPost({ content, img, video }));
      setData((prev) => ({ ...prev, content: "", img: null, video: null }));
      toast.success('added new post');
    }
    if(encodedToken && content.match(/^\s*$/) !== null){
      toast.warn('Enter valid input');
    }
    if(!encodedToken){
      toast.error('login to post!');
    }
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

  const handleVideoUpload = (e, setData, video) => {
    if (e.target.files[0].type.split("/")[0] === "video") {
      const video = URL.createObjectURL(e.target.files[0]);
      setData((prev) => ({
        ...prev,
        video: { video, type: e.target.files[0].type },
      }));
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 py-4 px-2 mb-4 border-2 border-solid border-zinc-400 ">
      <Avatar className="w-16 h-16" image={foundUser.image} />
      <div className="w-9/12">
        <textarea
          className="p-1 w-full bg-slate-200 focus:outline-none"
          rows="5"
          placeholder="what's in your mind?"
          value={content}
          onChange={(e) =>
            setData((prev) => ({ ...prev, content: e.target.value }))
          }
        ></textarea>
        <div className="flex gap-1 flex-wrap">
          {img !== null && (
            <div className="w-56 h-28">
              <img
                src={img}
                alt="post"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {video !== null && (
            <div className="w-64 mb-4">
              <video controls>
                <source src={video.video} type={video.type} />
                Sorry, your browser doesn't support embedded video.
              </video>
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-start text-slate-600">
          <div className="flex flex-wrap gap-4 items-center">
            <label htmlFor="upload-image" className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                id="upload-image"
                className="hidden"
                onChange={(e) => handleImageUpload(e, setData)}
              />
              <BiImageAdd className="text-3xl" />
            </label>
            <label htmlFor="upload-video" className="cursor-pointer">
              <input
                type="file"
                accept="video/*"
                id="upload-video"
                className="hidden"
                onChange={(e) => handleVideoUpload(e, setData)}
              />
              <FaVideo className="text-2xl" />
            </label>
            <BsEmojiSunglasses
              className="text-2xl cursor-pointer"
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  isEmoji: !isEmoji,
                }))
              }
            />
          </div>
          <button
            className={`px-8 py-2 ml-auto rounded bg-green-600 hover:bg-green-700 text-slate-100`}
            onClick={() =>
              handlePost(encodedToken, content, setData, img, video)
            }
          >
            Post
          </button>
        </div>
        {isEmoji && <EmojiPicker setContent={setData} />}
      </div>
    </div>
  );
};

export { NewPostCard };
