const Avatar = ({ className, image, onClickHandle }) => {
  return (
    <div className={`${className}`}>
      <img
        className="w-full h-full object-cover rounded-full bg-white"
        src={image}
        alt="profile"
        onClick={onClickHandle}
      />
    </div>
  );
};

export { Avatar };
