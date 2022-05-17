import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-96 mt-36  m-auto text-center">
      <h1 className="font-medium text-3xl mb-4">Successfully logged out!!!</h1>
      <div className="flex justify-center gap-2">
        <button
          className="px-8 py-1 text-xl rounded text-green-50 bg-green-600 hover:bg-green-800"
          onClick={() => {
            navigate("/signin", { state: { from: { pathname: "/" } } });
          }}
        >
          login
        </button>
        <button
          className="px-8 py-1 text-xl rounded text-green-50 bg-green-600 hover:bg-green-800"
          onClick={() => {
            navigate("/");
          }}
        >
          home
        </button>
      </div>
    </div>
  );
};

export { LogoutPage };
