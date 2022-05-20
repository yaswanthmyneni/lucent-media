import { MdSearch } from "assets/icons/icons";
import { ProfileCard } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "redux-management";

const AsideBarRight = () => {
  const { foundUser } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    allUsers?.length === 0 && dispatch(getAllUsers());
  }, [dispatch, allUsers]);

  return (
    <aside className="w-11/12 p-2 mx-auto col-start-7 col-end-9">
      <label
        htmlFor="search"
        className="px-2 py-1 flex gap-2 items-center border border-solid border-slate-400"
      >
        <MdSearch />
        <input
          type="text"
          id="search"
          placeholder="search anything"
          className="w-3/4 outline-none"
        />
      </label>
      <div className="px-3 py-4 mt-4 border border-solid border-slate-400">
        <div className="flex flex-wrap justify-between items-center">
          <b>Who to Follow?</b>
          <b className="text-sm text-green-600 cursor-not-allowed">Show More</b>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {allUsers.map((user) => {
            if (user._id === foundUser?._id) {
              return "";
            }
            return <ProfileCard key={user._id} user={user} />;
          })}
        </div>
      </div>
    </aside>
  );
};

export { AsideBarRight };
