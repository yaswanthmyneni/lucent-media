import { IoCloseSharp } from "assets/icons/icons";
import { useState } from "react";
import { setFoundUser, editUserProfile } from "redux-management";
import { useDispatch } from "react-redux";

const EditProfile = ({ setIsEditProfile }) => {
  const [profileData, setProfileData] = useState({
    image: "",
    bio: "",
    portfolioLink: "",
  });

  const dispatch = useDispatch();

  const editProfile = () => {
    dispatch(editUserProfile({ profileData, setFoundUser }));
    setIsEditProfile(false);
  };

  return (
    <>
      <div className="fixed inset-0 opacity-75 bg-gray-300"></div>
      <div className="px-8 py-4 mb-4 w-5/12 flex flex-col fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-slate-200 border-2 border-slate-400">
        <IoCloseSharp
          className="text-2xl absolute top-3 right-4 cursor-pointer"
          onClick={() => setIsEditProfile(false)}
        />
        <label className="mb-2 block">Upload image:</label>
        <input
          type="file"
          className="mb-4"
          onChange={(e) => {
            setProfileData((prev) => ({
              ...prev,
              image: URL.createObjectURL(e.target.files[0]),
            }));
          }}
        />
        <label htmlFor="bio" className="block">
          Bio:
        </label>
        <textarea
          id="bio"
          rows="5"
          className="p-1 mb-4 outline-none bg-slate-100"
          onChange={(e) =>
            setProfileData((prev) => ({ ...prev, bio: e.target.value }))
          }
        />
        <label htmlFor="portfolio-url">
          Portfolio Url:
          <input
            type="text"
            id="portfolio-url"
            className="p-1 ml-4 outline-none border border-blue-500 rounded bg-slate-100"
            onChange={(e) => {
              setProfileData((prev) => ({
                ...prev,
                portfolioLink: e.target.value,
              }));
            }}
          />
        </label>

        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-1 bg-green-600 text-green-50 rounded block"
            onClick={editProfile}
          >
            Edit profile
          </button>
        </div>
      </div>
    </>
  );
};

export { EditProfile };
