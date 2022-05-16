const Avatar = ({ size, image }) => {
  return (
    <div className={`${size}`}>
      <img
        className="w-full h-full object-cover rounded-full bg-white"
        src={image}
        alt="profile"
      />
    </div>
  );
};

export { Avatar };
