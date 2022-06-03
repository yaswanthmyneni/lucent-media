import { IoCloseSharp } from "assets/icons/icons";
import { useState } from "react";
import { setFoundUser, editUserProfile } from "redux-management";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import dummyDp from "assets/images/dummyDpImage.jpeg";
import dummyBg from "assets/images/dummyBgImage.jpeg";

const EditProfile = ({ setIsEditProfile }) => {
  const [profileData, setProfileData] = useState({
    image: "",
    bio: "",
    portfolioLink: "",
    backgroundImage: "",
  });
  const { bio, portfolioLink } = profileData;

  const dispatch = useDispatch();

  const editProfile = (e, isDummy) => {
    e.preventDefault();
    if (isDummy) {
      const profileData = {
        bio: "dummy bio",
        portfolioLink: "dummylink.com",
        image: dummyDp,
        backgroundImage: dummyBg,
      };
      dispatch(editUserProfile({ profileData, setFoundUser }));
      setIsEditProfile(false);
      return toast.success("Profile edited successfully");
    }
    if (bio.match(/^\s*$/) !== null || portfolioLink.match(/^\s*$/) !== null) {
      toast.warn("enter all inputs");
    }
    dispatch(editUserProfile({ profileData, setFoundUser }));
    setIsEditProfile(false);
    toast.success("Profile edited successfully");
  };

  return (
    <>
      <div className="fixed inset-0 opacity-75 bg-gray-300"></div>
      <form className="px-8 py-4 mb-4 w-11/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 flex flex-col fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 bg-slate-200 border-2 border-slate-400">
        <IoCloseSharp
          className="text-2xl absolute top-3 right-4 cursor-pointer"
          onClick={() => setIsEditProfile(false)}
        />
        <label className="mb-2 block">Upload Profile dp:</label>
        <input
          required
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => {
            setProfileData((prev) => ({
              ...prev,
              image: URL.createObjectURL(e.target.files[0]),
            }));
          }}
        />
        <label className="mb-2 block">Upload background image:</label>
        <input
          required
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => {
            setProfileData((prev) => ({
              ...prev,
              backgroundImage: URL.createObjectURL(e.target.files[0]),
            }));
          }}
        />
        <label htmlFor="bio" className="block">
          Bio:
        </label>
        <textarea
          required
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
            required
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

        <div className="flex justify-around mt-4">
          <button
            className="px-4 py-1 bg-green-600 text-green-50 rounded block"
            onClick={editProfile}
          >
            Edit
          </button>
          <button
            className="px-4 py-1 bg-green-600 text-green-50 rounded block"
            onClick={(e) => editProfile(e, true)}
          >
            dummy
          </button>
        </div>
      </form>
    </>
  );
};

export { EditProfile };
