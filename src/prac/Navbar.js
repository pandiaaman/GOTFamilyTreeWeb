import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import base_url_server from "../api/bootapi";

export default function Navbar() {
  console.log("navbar function");

  const [isOpen, setIsOpen] = useState(false);

  const [houses, setHouse] = useState([]);

  //useEffect loads the data after the DOM is printed to the browser, it tells browser what to do, here we are calling loadCourses
  useEffect(() => {
    console.log("navbar useEffect");
    loadHouses();
  }, []);

  //loadCourses calls axios api fetching method to get all the courses, we use @CrossOrigin in springboot controller for this to work
  const loadHouses = async () => {
    const url = `${base_url_server}houses`;
    console.log("calling" + url);
    await axios.get(url).then(
      (response) => {
        console.log(response);
        console.log(response.length);
        setHouse(response.data);
        // toast.success("houses are loaded", { position: "bottom-left" });
      },
      (error) => {
        console.log(error);
        // toast.error("something went wrong", { position: "bottom-left" });
      }
    );
  };

  return (
    <div>
      <nav className=" border-gray-200 dark:bg-gray-900 dark:border-gray-700 fixed inset-0 z-10 h-16">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className="flex items-center" to="/gothome">
            {/* <img src={gotlogo} className="h-10 mr-3" alt="GOT Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              GOT Family Tree
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex relative items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  Select House{" "}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  ></svg>
                </button>
                {isOpen && (
                  <div
                    id="dropdownNavbar"
                    className="z-10 absolute font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-400"
                      aria-labelledby="dropdownLargeButton"
                      onClick={() => setIsOpen((prev) => !prev)}
                    >
                      {houses.length > 0 ? (
                        houses.map((house) => (
                          <li>
                            <Link to={`/housetree/${house}`}>
                              <div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                <option key={house} value={house}>
                                  {house}
                                </option>
                              </div>
                            </Link>
                          </li>
                        ))
                      ) : (
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            NO houses available
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link
                  className="flex relative items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  to="/allfavourites"
                >
                  <h3>All Favourites</h3>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
