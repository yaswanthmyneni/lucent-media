import {
  AsideBarLeft,
  PostCard,
  NewPostCard,
  EditPostCard,
  AsideBarRight,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "redux/slices/postSlice";
import { useEffect } from "react";

const HomePage = () => {
  const { allPosts, status, error, isEdit } = useSelector(
    (state) => state.post
  );
  const { foundUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { username, following } = foundUser;

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllPosts());
    }
  }, [dispatch, status]);

  // The below filter is used for displaying only the following user's posts
  let userFollowing = following?.map((user) => user.username);
  userFollowing?.push(username);
  const followingUsersPost = allPosts.filter((post) =>
    userFollowing?.includes(post.username)
  );

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
            {followingUsersPost?.reverse()?.map((post) => (
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

export { HomePage };
