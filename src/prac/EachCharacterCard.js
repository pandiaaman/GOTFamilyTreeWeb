import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import base_url_server from "../api/bootapi";

export default function EachCharacterCard({ characterProp }) {
  const navigate = useNavigate();
  const errornotify = () => {
    toast.error("Oh! seems like there is an error!", {
      position: "top-center",
    });
  };

  //mark/unmark favourite character
  const markCharFav = async (character) => {
    await axios
      .put(`${base_url_server}${character.characterId}/favourite`)
      .then(
        (response) => {
          toast.success("char marked successfully!");
          navigate(`/allfavourites`);
        },
        (error) => {
          errornotify();
        }
      );
  };

  return (
    <div>
      <Link to={`/characterinfo/${characterProp.characterId}`}>
        <div className="container w-4/5 rounded-md mx-auto py-8 my-6 shadow-lg bg-[#301934]">
          <div className=" mx-2 my-2 bg-[#301934] rounded-md">
            <div>
              <img
                src={characterProp.characterImageThumb}
                className="w-36 h-36 mb-4 flex justify-center m-auto align-middle "
              />
            </div>
          </div>
          <div className="h-1/8">
            <h1 className="text-center text-xl font-bold text-gray-100">
              {characterProp.characterName}
            </h1>
            <p className="text-center text-lg text-gray-300">
              {characterProp.houseName}
            </p>
            <p className="text-center text-lg text-gray-300">
              {characterProp.nickname}
            </p>
            <p className="text-center text-lg text-gray-300">
              {characterProp.royal}
            </p>
          </div>
          {/* <div className="container grid grid-cols-2 mt-4">
            <Link
              className="px-4 py-2 mt-4 mx-4 rounded-md shadow-lg bg-pink-400 text-center text-gray-200 hover:scale-110 hover:bg-pink-300"
              to={`/editcourse/${characterProp.courseId}`}
            >
              Edit
            </Link>

            <button
              onClick={() => deleteCourse(characterProp.courseId)}
              className="px-4 py-2 mt-4 mx-4 rounded-md shadow-lg bg-pink-400 text-center text-gray-200 hover:scale-110 hover:bg-pink-300"
            >
              Delete
            </button>
          </div> */}
          <button
            onClick={() => markCharFav(characterProp)}
            className="px-4 py-2 mt-4 mx-4 rounded-md shadow-lg bg-gray-500 text-center text-gray-200 hover:scale-110 hover:bg-blue-300"
          >
            {characterProp.favourite == true ? "Remove Fav" : "Add Fav"}
          </button>
        </div>
      </Link>
    </div>
  );
}
