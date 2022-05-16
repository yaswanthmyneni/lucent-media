import { AsideBarLeft, PostCard, NewPostCard, EditPostCard } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers, logIn } from "redux/slices/postSlice";

const HomePage = () => {
  const { allPosts, status, error, foundUser, isEdit } = useSelector(
    (store) => store.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (foundUser?._id === undefined) {
      dispatch(logIn());
    }
    dispatch(getAllUsers());
    if (status === "idle") {
      dispatch(getAllPosts());
    }
  }, [dispatch, status, foundUser._id]);

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
