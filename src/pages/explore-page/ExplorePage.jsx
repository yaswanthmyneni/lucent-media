import {
  AsideBarLeft,
  AsideBarRight,
  EditPostCard,
  PostCard,
} from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "redux/slices/postSlice";

const ExplorePage = () => {
  const { allPosts, status, error, isEdit } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllPosts());
    }
  }, [dispatch, status]);

  const reversePosts = [...allPosts]?.reverse();

  return (
    <div className="grid grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      <main className="col-start-3 col-end-7">
        <h2 className="font-medium leading-tight text-2xl mt-2 mb-4">
          All Posts:
        </h2>
        {status === "loading" ? (
          <p>loading...</p>
        ) : status === "rejected" ? (
          <p>{error}</p>
        ) : (
          <>
            {reversePosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </>
        )}
      </main>
      <AsideBarRight />
      {isEdit && <EditPostCard />}
    </div>
  );
};

export { ExplorePage };
