import { AsideBarLeft, AsideBarRight, PostCard } from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookmarkedPosts } from "redux-management";

const BookmarkPage = () => {
  const { bookmarkedPosts } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookmarkedPosts());
  }, [dispatch]);

  const reversePosts = [...bookmarkedPosts].reverse();

  return (
    <div className="grid grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      <main className="col-start-3 col-end-7 flex flex-col gap-2">
        <h2 className="font-medium leading-tight text-3xl my-2">
          Bookmarked Posts:
        </h2>
        {reversePosts.length > 0 ? (
          reversePosts?.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <h3 className="font-medium text-center leading-tight text-2xl mt-6">
            No Bookmarks Yet!!!
          </h3>
        )}
      </main>
      <AsideBarRight />
    </div>
  );
};

export { BookmarkPage };
