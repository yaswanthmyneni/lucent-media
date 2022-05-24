const Avatar = ({ className, image }) => {
  return (
    <div className={`${className}`}>
      <img
        className="w-full h-full object-cover rounded-full bg-white"
        src={image}
        alt="profile"
      />
    </div>
  );
};

export { Avatar };
