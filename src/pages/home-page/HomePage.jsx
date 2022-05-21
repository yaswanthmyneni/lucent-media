import {
  AsideBarLeft,
  PostCard,
  NewPostCard,
  EditPostCard,
  AsideBarRight,
  FilterCard,
  DeleteModal,
} from "components";
import { useSelector } from "react-redux";

const HomePage = () => {
  const {
    allPosts,
    status,
    error,
    isEdit,
    isDelete,
    sortByDate,
    filterByLikes,
  } = useSelector((state) => state.post);
  const { foundUser } = useSelector((state) => state.auth);
  const { username, following } = foundUser;
console.log(isDelete);
  const filterByTrending = (array, value) => {
    const posts = [...array];
    if (value === "trending") {
      return posts.filter((post) => post.likes.likeCount > 5);
    }
    return posts;
  };

  const sortByDateCreated = (array, value) => {
    const posts = [...array];
    if (value === "new") {
      return posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else {
      return posts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
  };

  // The below filter is used for displaying only the following user's posts
  let userFollowing = following?.map((user) => user.username);
  userFollowing?.push(username);
  const followingUsersPost = allPosts
    .filter((post) => userFollowing?.includes(post.username))
    .reverse();

  // filtering posts of likes above 5
  const trendingPosts = filterByTrending(followingUsersPost, filterByLikes);
  // sorting posts using date and time created
  const sortedByDate = sortByDateCreated(trendingPosts, sortByDate);

  return (
    <div className="grid grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      <main className="col-start-3 col-end-7">
        <NewPostCard />
        <FilterCard />
        <h3 className="font-medium leading-tight text-2xl mt-1 mb-4">
          Latest Posts
        </h3>
        {status === "loading" ? (
          <p>loading...</p>
        ) : status === "rejected" ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {sortedByDate?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
      <AsideBarRight />
      {isEdit && <EditPostCard />}
      {isDelete && <DeleteModal />}
    </div>
  );
};

export { HomePage };
