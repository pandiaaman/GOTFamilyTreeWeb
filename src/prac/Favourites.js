import axios from "axios";
import React, { useEffect, useState } from "react";
import base_url_server from "../api/bootapi";
import { toast } from "react-toastify";
import EachCharacterCard from "./EachCharacterCard";
export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  const loadFavourites = async () => {
    await axios.get(`${base_url_server}favourites`).then(
      (response) => {
        console.log(response.data);
        setFavourites(response.data);
        toast.success("favourites are loaded", { position: "bottom-left" });
      },
      (error) => {
        console.log(error);
        toast.error("something went wrong", { position: "bottom-left" });
      }
    );
  };

  useEffect(() => {
    document.title = "GOT | Favourites";
    loadFavourites();
  }, []);
  return (
    <div className="bg-gradient-to-r from-red-800 to-red-900 mt-16">
      <div className="container mx-auto w-full grid grid-cols-3 rounded-md ">
        {favourites.length > 0
          ? favourites.map((fav) => (
              <EachCharacterCard key={fav.characterId} characterProp={fav} />
            ))
          : "No characters Available"}
      </div>
    </div>
  );
}
