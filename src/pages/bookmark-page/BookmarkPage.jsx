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
    <div className="flex flex-col gap-2 items-center xl:w-full lg:items-start lg:gap-0 lg:grid  lg:grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      <main className="px-3 w-full sm:pl-2 sm:w-2/3  lg:w-3/4 lg:mx-auto lg:col-start-3 lg:col-end-9 xl:col-end-7">
      <AsideBarRight className="block mb-4 xl:hidden" />
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
      <AsideBarRight className="hidden xl:block" />
    </div>
  );
};

export { BookmarkPage };
