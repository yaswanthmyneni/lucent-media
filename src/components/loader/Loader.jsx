import loader from "assets/images/loader.svg";

const Loader = () => {
  return (
    <section className="w-full text-center">
      <img
        src={loader}
        className="h-24 w-24 mx-auto"
        alt="Animated loader"
      />
    </section>
  );
};

export { Loader };
