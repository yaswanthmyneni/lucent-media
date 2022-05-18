import { AiFillHome, MdExplore, FaBookmark } from "assets/icons/icons";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const AsideBarLeft = () => {
  return (
    <aside className="p-2 mx-auto w-2/3 text-lg col-start-1 col-end-3">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          clsx("flex flex-wrap items-center gap-3 py-2 pl-10 my-2 hover:bg-slate-400", {
            "bg-slate-400": isActive,
          })
        }
      >
        <AiFillHome />
        Home
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx("flex flex-wrap items-center gap-3 py-2 pl-10 my-2 hover:bg-slate-400", {
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
          clsx("flex flex-wrap items-center gap-3 py-2 pl-10 my-2 hover:bg-slate-400", {
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
