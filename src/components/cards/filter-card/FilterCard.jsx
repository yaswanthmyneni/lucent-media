import { useDispatch, useSelector } from "react-redux";
import {
  setTrending,
  setDate,
} from "redux-management/slices/postSlice/postSlice";

const FilterCard = () => {
  const { sortByDate, filterByLikes } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  return (
    <div className="p-2 w-fit mb-4 border border-slate-400">
      <h3 className="font-medium mb-2 text-xl">Filter by:</h3>
      <div className='flex gap-2'>
        <select
          name="filterByLikes"
          id="filterByLikes"
          className="bg-red-500 px-1 py-2 cursor-pointer outline-none rounded "
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
          className="bg-red-500 px-1 py-2 cursor-pointer outline-none rounded"
          value={sortByDate}
          onChange={(e) => {
            dispatch(setDate(e.target.value));
          }}
        >
          <option value="new">New</option>
          <option value="old">Old</option>
        </select>
      </div>
    </div>
  );
};

export { FilterCard };
