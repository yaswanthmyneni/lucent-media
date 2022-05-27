import { AiFillHome, MdExplore, FaBookmark } from "assets/icons/icons";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const AsideBarBottom = () => {
  return (
    <aside className="py-4 fixed bottom-0 lg:hidden flex w-full justify-around bg-green-200">
      <NavLink
        to="/home"
        className={({ isActive }) =>
          clsx("flex flex-col gap-1 items-center ", {
            "text-green-700": isActive,
          })
        }
      >
        <AiFillHome />
        Home
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          clsx("flex flex-col gap-1 items-center", {
            "text-green-700": isActive,
          })
        }
      >
        <MdExplore />
        Explore
      </NavLink>
      <NavLink
        to="/bookmark"
        className={({ isActive }) =>
          clsx("flex flex-col gap-1 items-center", {
            "text-green-700": isActive,
          })
        }
      >
        <FaBookmark />
        Bookmark
      </NavLink>
    </aside>
  );
};

export { AsideBarBottom };
