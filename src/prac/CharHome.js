import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import base_url_server from "../api/bootapi";

export default function CharHome() {
  const navigate = useNavigate();

  console.log("inside charHome");

  const { characterId } = useParams();
  console.log("characterId :" + characterId);

  const [character, setCharacter] = useState({});

  useEffect(() => {
    console.log("charhome useEffect");
    document.title = `GOT Character`;
    loadCharacter();
  }, []);

  const loadCharacter = async () => {
    //http://localhost:8081/gotbak/api/characters/82f0f562-aa85-4566-a533-26f329185863
    const url = `${base_url_server}${characterId}`;
    console.log(url);
    await axios.get(url).then(
      (response) => {
        console.log(response.data);
        console.log(response.length);
        setCharacter(response.data);
        toast.success("Character loaded", { position: "bottom-left" });
      },
      (error) => {
        console.log(error);
        toast.error("something went wrong!!!");
      }
    );
  };

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
          navigate(`/housetree/${character.houseName}`);
        },
        (error) => {
          errornotify();
        }
      );
  };

  return (
    <div className="h-screen mt-16">
      <div className="container m-auto mt-24 p-6 rounded-md bg-[#301934] text-white w-1/2 flex flex-row z-10 gap-8 mb-16">
        <div className="w-1/4">
          <img
            src={character.characterImageThumb}
            className="w-36 h-36 mb-4 flex justify-center m-auto align-middle "
          />

          <button
            onClick={() => markCharFav(character)}
            className="px-4 py-2 mt-4  rounded-md shadow-lg  text-center bg-purple-900 text-gray-200 hover:scale-110 hover:bg-purple-700"
          >
            {character.favourite == true ? "Remove Fav" : "Add Fav"}
          </button>
        </div>
        <div className="flex flex-col justify-center ml-16">
          {/* <div>{character.characterId}</div> */}
          <div className="font-bold text-xl">{character.characterName}</div>
          <div className="font-bold"> House : {character.houseName}</div>
          <div className="text-sm mt-2">Parents</div>
          {character.parents?.map((val) => (
            <div className="font-bold" key={val}>
              {val}
            </div>
          ))}
          <div className="text-sm mt-2">Siblings</div>
          {character.siblings?.map((val) => (
            <div className="font-bold" key={val}>
              {val}
            </div>
          ))}
          <div className="text-sm mt-2">Children</div>
          {character.parentOf?.map((val) => (
            <div className="font-bold" key={val}>
              {val}
            </div>
          ))}
          <div className="text-sm mt-2">Married To</div>
          {character.marriedEngaged?.map((val) => (
            <div className="font-bold" key={val}>
              {val}
            </div>
          ))}

          <div className="text-sm mt-2">Nickname</div>
          <div className="font-bold">{character.nickname}</div>
          <div className="text-sm mt-2">Royal</div>
          <div className="font-bold">{character.royal}</div>
          <div className="text-sm mt-2">Killed</div>
          {character.killed?.map((val) => (
            <div className="font-bold" key={val}>
              {val}
            </div>
          ))}
          <div className="text-sm mt-2">Killed By</div>
          {character.killedBy?.map((val) => (
            <div className="font-bold" key={val}>
              {val}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div class="fire" className="-z-10 sticky">
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
          <div class="particle"></div>
        </div>
      </div>
    </div>
  );
}
