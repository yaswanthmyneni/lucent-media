import { FaGithub, FaLinkedin, FaTwitter, AiFillHeart } from "assets/icons/icons";

const Footer = () => {
  return (
    <footer className="py-4 flex flex-col items-center text-lg w-full bg-green-300 absolute bottom-0">
      <p>Made with <AiFillHeart className='inline-block text-red-600'/> by Yaswanth Myneni</p>
      <div className="flex gap-4 mt-4">
        <a
          target="_blank"
          href="https://github.com/yaswanthmyneni/"
          rel="noreferrer"
        >
          <FaGithub />
        </a>
        <a
          target="_blank"
          href="https://linkedin.com/in/yaswanth-myneni-a0a7261b1"
          rel="noreferrer"
        >
          <FaLinkedin />
        </a>
        <a
          target="_blank"
          href="https://twitter.com/yaswanthtweets"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
      </div>
    </footer>
  );
};

export { Footer };
