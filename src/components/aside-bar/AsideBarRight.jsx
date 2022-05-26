import { MdSearch } from "assets/icons/icons";
import { ProfileCard } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, setSearchValue } from "redux-management";

const AsideBarRight = () => {
  const { foundUser } = useSelector((state) => state.auth);
  const { allUsers, searchValue } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    allUsers?.length === 0 && dispatch(getAllUsers());
  }, [dispatch, allUsers]);

  let filteredUsers;
  if (searchValue.match(/^\s*$/) === null) {
    filteredUsers = allUsers.filter((user) =>
      user.username.toLowerCase().includes(searchValue.toLowerCase())
    );
  } else {
    filteredUsers = allUsers;
  }

  return (
    <aside className="w-11/12 p-2 mx-auto col-start-7 col-end-9">
      <label
        htmlFor="search"
        className="px-2 py-1 flex gap-2 items-center border border-solid border-slate-400"
      >
        <MdSearch />
        <input
          className="w-3/4 outline-none"
          type="text"
          id="search"
          placeholder="search anything"
          onChange={(e) => {
            dispatch(setSearchValue(e.target.value));
          }}
        />
      </label>
      <div className="px-3 py-4 mt-4 border border-solid border-slate-400">
        <div className="flex flex-wrap justify-between items-center">
          <b>Whom to Follow?</b>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {filteredUsers.map((user) => {
            if (
              searchValue.match(/^\s*$/) !== null &&
              user._id === foundUser?._id
            ) {
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
