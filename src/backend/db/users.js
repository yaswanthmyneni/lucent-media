import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
import adarshbalika from "assets/images/balika.svg";
import shubhamsoni from "assets/images/soni.jpg";
import yaswanth from "assets/images/mock.jpg";

/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "about",
    image: adarshbalika,
    portfolioLink: "adarshbalika.com",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Shubham",
    lastName: "Soni",
    username: "shubhamsoni",
    password: "shubhamsoni123",
    bio: "about",
    image: shubhamsoni,
    portfolioLink: "shubhamsoni.com",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Yaswanth",
    lastName: "Myneni",
    username: "yaswanthmyneni",
    password: "yaswanthmyneni123",
    bio: "about",
    image: yaswanth,
    portfolioLink: "yaswanthmyneni.com",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
