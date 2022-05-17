import { AsideBarLeft, PostCard, NewPostCard, EditPostCard } from "components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers } from "redux/slices/postSlice";
import { useEffect } from "react";

const HomePage = () => {
  const { allPosts, status, error, isEdit } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    if (status === "idle") {
      dispatch(getAllPosts());
    }
  }, [dispatch, status]);

  return (
    <div className="grid grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      <main className="col-start-3 col-end-7">
        <NewPostCard />
        <h3 className="font-medium leading-tight text-2xl mt-1 mb-4">
          Latest Posts
        </h3>
        {status === "loading" ? (
          <p>loading...</p>
        ) : status === "rejected" ? (
          <p>{error}</p>
        ) : (
          <>
            {allPosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </>
        )}
      </main>
      {isEdit && <EditPostCard />}
    </div>
  );
};

export { HomePage };
