import {
  AsideBarLeft,
  AsideBarRight,
  DeleteModal,
  EditPostCard,
  PostCard,
} from "components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "redux-management";

const ExplorePage = () => {
  const { allPosts, status, error, isEdit, isDelete } = useSelector(
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
    <div className="flex flex-col gap-2 items-center xl:w-full lg:items-start lg:gap-0 lg:grid  lg:grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      <main className="p-2 sm:pl-2 md:w-2/3 lg:w-3/4 lg:mx-auto lg:col-start-3 lg:col-end-9 xl:col-end-7">
        <AsideBarRight className="sm:block xl:hidden" />
        <h2 className="font-medium leading-tight text-2xl mt-2 mb-4">
          All Posts:
        </h2>
        {status === "loading" ? (
          <p>loading...</p>
        ) : status === "rejected" ? (
          <p>{error}</p>
        ) : (
          <div className="flex flex-col gap-2">
            {reversePosts?.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </main>
      <AsideBarRight className="hidden xl:block" />
      {isEdit && <EditPostCard />}
      {isDelete && <DeleteModal />}
    </div>
  );
};

export { ExplorePage };
