import {
  AsideBarLeft,
  PostCard,
  NewPostCard,
  EditPostCard,
  AsideBarRight,
} from "components";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { allPosts, status, error, isEdit } = useSelector(
    (state) => state.post
  );
  const { foundUser } = useSelector((state) => state.auth);
  const { username, following } = foundUser;

  // The below filter is used for displaying only the following user's posts
  let userFollowing = following?.map((user) => user.username);
  userFollowing?.push(username);
  const followingUsersPost = allPosts
    .filter((post) => userFollowing?.includes(post.username))
    .reverse();

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
            {followingUsersPost?.map((post) => (
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
