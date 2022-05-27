import {
  AsideBarLeft,
  AsideBarRight,
  Avatar,
  CommentCard,
  CommentModal,
  DeleteModal,
  EditPostCard,
  PostCard,
} from "components";
import { FaArrowLeft } from "assets/icons/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  addCommentToAPost,
  getCommentsOfAPost,
  getPostById,
} from "redux-management";

const CommentPage = () => {
  const [text, setText] = useState("");
  const [isEditComment, setIsEditComment] = useState(false);

  // from react-router-dom
  const {
    state: {
      from: { pathname },
      postId,
    },
  } = useLocation();
  const navigate = useNavigate();

  // from react-redux
  const dispatch = useDispatch();

  // from store
  const { singlePost, commentsForAPost, allPosts, isEdit, isDelete, status } =
    useSelector((state) => state.post);
  const { foundUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPostById(postId));
    dispatch(getCommentsOfAPost(postId));
  }, [dispatch, postId]);

  const reversedComments = [...commentsForAPost]?.reverse();
  const post = allPosts?.find((post) => post._id === singlePost?._id);

  return (
    <div className="px-2 flex flex-col gap-2 w-full lg:items-start lg:gap-0 lg:grid lg:grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      {status === "loading" ? (
        <main>
          <p>Loading...</p>
        </main>
      ) : status === "rejected" ? (
        <main>
          <p>Error Occurred, check console!</p>
        </main>
      ) : (
        <main className="flex flex-col gap-1 sm:bg-gray-200 sm:pl-2 mx-auto w-full sm:w-5/6 xl:w-full sm:p-4 lg:mx-auto lg:col-start-3 lg:col-end-9 xl:col-end-7">
          <AsideBarRight className="block mb-4 bg-white xl:hidden" />
          <div className="mb-1 flex gap-6 items-center">
            <FaArrowLeft
              className="text-xl cursor-pointer"
              onClick={() => navigate(pathname)}
            />
            <h2 className="font-medium text-2xl">Post</h2>
          </div>
          {post?._id && <PostCard post={post} />}
          <div className="flex flex-wrap justify-around py-2 border border-zinc-400 bg-slate-50">
            <Avatar className="h-10 w-10" image={foundUser?.image} />
            <input
              className="outline-none px-1 py-2 w-8/12 sm:w-9/12 bg-slate-200 "
              type="text"
              placeholder="comment your reply"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <button
              className="px-2 sm:px-4 py-1 rounded text-green-50 bg-green-600 hover:bg-green-700"
              onClick={() => {
                if (text !== "" && text.match(/^\s*$/) === null) {
                  dispatch(addCommentToAPost({ postId, text }));
                  setText("");
                }
              }}
            >
              POST
            </button>
          </div>
          {reversedComments.length > 0 &&
            reversedComments?.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                post={singlePost}
                setIsEditComment={setIsEditComment}
              />
            ))}
        </main>
      )}
      <AsideBarRight className="hidden xl:block" />
      {isEditComment && (
        <CommentModal setIsEditComment={setIsEditComment} postId={postId} />
      )}
      {isEdit && <EditPostCard />}
      {isDelete && <DeleteModal />}
    </div>
  );
};

export { CommentPage };
