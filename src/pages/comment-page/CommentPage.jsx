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
  const { singlePost, commentsForAPost, allPosts, isEdit, isDelete } =
    useSelector((state) => state.post);
  const { foundUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPostById(postId));
    dispatch(getCommentsOfAPost(postId));
  }, [dispatch, postId]);

  const reversedComments = [...commentsForAPost]?.reverse();
  const post = allPosts?.find((post) => post._id === singlePost?._id);

  return (
    <div className="grid grid-cols-8 mt-4 pb-36">
      <AsideBarLeft />
      <main className="p-4 bg-gray-200 col-start-3 col-end-7 flex flex-col gap-1">
        <div className="mb-1 flex gap-6 items-center">
          <FaArrowLeft
            className="text-xl cursor-pointer"
            onClick={() => navigate(pathname)}
          />
          <h2 className="font-medium text-2xl">Post</h2>
        </div>
        {post?._id && <PostCard post={post} />}
        <div className="flex flex-wrap justify-between px-6 py-2 border border-zinc-400 bg-slate-50">
          <Avatar size="h-10 w-10" image={foundUser?.image} />
          <input
            className="outline-none px-1 py-2 w-9/12 bg-slate-200 "
            type="text"
            placeholder="comment your reply"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <button
            className="px-4 py-1 rounded text-green-50 bg-green-600 hover:bg-green-700"
            onClick={() => {
              if (text !== "" && text.match(/^\s+$/) === null) {
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
      <AsideBarRight />
      {isEditComment && (
        <CommentModal setIsEditComment={setIsEditComment} postId={postId} />
      )}
      {isEdit && <EditPostCard />}
      {isDelete && <DeleteModal />}
    </div>
  );
};

export { CommentPage };
