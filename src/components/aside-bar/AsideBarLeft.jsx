import { AiFillHome, MdExplore, FaBookmark } from "assets/icons/icons";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const AsideBarLeft = () => {
  return (
    <aside className="p-2 w-52 text-lg fixed left-0">
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx("flex items-center gap-3 py-2 pl-10 my-2 hover:bg-slate-400", {
            "bg-slate-400": isActive,
          })
        }
      >
        <AiFillHome />
        Home
      </NavLink>
      <NavLink
        to="/explore"
        className={({ isActive }) =>
          clsx("flex items-center gap-3 py-2 pl-10 my-2 hover:bg-slate-400", {
            "bg-slate-400": isActive,
          })
        }
      >
        <MdExplore />
        Explore
      </NavLink>
      <NavLink
        to="/bookmark"
        className={({ isActive }) =>
          clsx("flex items-center gap-3 py-2 pl-10 my-2 hover:bg-slate-400", {
            "bg-slate-400": isActive,
          })
        }
      >
        <FaBookmark />
        Bookmark
      </NavLink>
    </aside>
  );
};

export { AsideBarLeft };
