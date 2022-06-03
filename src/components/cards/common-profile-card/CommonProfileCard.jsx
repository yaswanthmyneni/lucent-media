const { Avatar } = require("components");
const { useNavigate } = require("react-router-dom");

const CommonProfileCard = ({ user, setIsFollowing, setIsFollowers }) => {
  const { _id, image, username, firstName, lastName } = user;
  const navigate = useNavigate();
  
  return (
    <div
      key={_id}
      className="flex flex-wrap gap-4 mt-2 py-2 px-8 items-center bg-green-200"
    >
      <Avatar
        className="w-9 h-9 cursor-pointer"
        image={image}
        onClickHandle={() => {
          setIsFollowing?.following && setIsFollowing.setIsFollowing(false);
          setIsFollowers?.followers && setIsFollowers.setIsFollowers(false);
          navigate("/profile", { state: { userId: _id } });
        }}
      />
      <div>
        <b
          className="cursor-pointer"
          onClick={() => {
            setIsFollowing?.following && setIsFollowing.setIsFollowing(false);
            setIsFollowers?.followers && setIsFollowers.setIsFollowers(false);
            navigate("/profile", { state: { userId: _id } });
          }}
        >{`${firstName} ${lastName}`}</b>
        <p
          className="text-xs cursor-pointer"
          onClick={() => {
            setIsFollowing?.following && setIsFollowing.setIsFollowing(false);
            setIsFollowers?.followers && setIsFollowers.setIsFollowers(false);
            navigate("/profile", { state: { userId: _id } });
          }}
        >
          @{username}
        </p>
      </div>
    </div>
  );
};

export { CommonProfileCard };
