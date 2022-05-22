import { useDispatch, useSelector } from "react-redux";
import {
  setTrending,
  setDate,
} from "redux-management/slices/postSlice/postSlice";

const FilterCard = () => {
  const { sortByDate, filterByLikes } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  return (
    <div className="p-2 flex gap-4 w-fit border border-slate-400">
      <select
        name="filterByLikes"
        id="filterByLikes"
        className="bg-red-500 text-green-50 py-2 outline-none rounded border-2 border-green-400"
        value={filterByLikes}
        onChange={(e) => {
          dispatch(setTrending(e.target.value));
        }}
      >
        <option value="trending">Trending</option>
        <option value="non-trending">Normal</option>
      </select>
      <select
        name="sortByDate"
        id="sortByDate"
        className="bg-red-500 text-green-50 py-2 outline-none rounded border-2 border-green-400"
        value={sortByDate}
        onChange={(e) => {
          dispatch(setDate(e.target.value));
        }}
      >
        <option value="new">New</option>
        <option value="old">Old</option>
      </select>
    </div>
  );
};

export { FilterCard };
