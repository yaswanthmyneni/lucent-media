import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost, setIsDelete, setPostId } from "redux-management";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isDelete, postId } = useSelector((state) => state.post);
  return (
    <>
      <div className="fixed inset-0 opacity-75 bg-gray-300"></div>
      <div className="p-2 mb-4 fixed top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 flex flex-wrap justify-center gap-4 bg-slate-400">
        <div className="p-8 bg-slate-50 flex flex-col gap-3">
          <p>Are you sure, you want to delete the post?</p>
          <div className="flex justify-end gap-2">
            <button
              className="py-1 px-4 border border-red-600 text-red-600 rounded"
              onClick={() => {
                if (pathname === "/comment") {
                  navigate("/");
                }
                dispatch(deletePost(postId));
                dispatch(setIsDelete(!isDelete));
              }}
            >
              delete
            </button>
            <button
              className="py-1 px-4 bg-green-600 text-white rounded"
              onClick={() => {
                dispatch(setIsDelete(!isDelete));
                dispatch(setPostId(null));
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { DeleteModal };
