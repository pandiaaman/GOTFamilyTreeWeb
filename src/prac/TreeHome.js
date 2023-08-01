import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./data/got-chart.json";
import { useCenteredTree } from "./helpers";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, IconButton } from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import "./styles.scss";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import base_url_server from "../api/bootapi";

const containerStyles = {
  width: "100vw",
  height: "75vh",
  background: "	#dcf3ff",
  backgroundImage: "linear-gradient(	#fdcf58, 	#800909)",
};

const useStyles = makeStyles(
  createStyles({
    button: {
      boxShadow: "5px 15px 20px black",
      position: "relative",
      paddingBottom: "10px",
      width: "500px",
      height: "300px",
      background: "#301934",
      color: "white",
      "& > span": {
        flexFlow: "column",
      },
      "&:hover": {
        scale: "1.05",
        borderRadius: "30px",
        boxShadow: "10px 10px 20px black",
        background: "#301954",
        color: "white",
      },
    },
    linkBase: {
      stroke: "#ccc",
    },
    name: {
      fontSize: "25px",
      paddingBottom: "15px",
      "&:hover": {
        fontSize: "26px",
      },
    },
    img: {
      paddingBottom: "10px",
    },

    attributes: {
      position: "absolute",
      color: "white",
      bottom: "5px",
      right: "10px",
    },
  })
);

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.

export default function TreeHome() {
  const navigate = useNavigate();

  console.log("inside treehome");

  const { houseName } = useParams();
  console.log("house :" + houseName);

  const [houseMembers, setHouseMembers] = useState({
    name: "",
    attributes: "",
    children: "",
  });

  useEffect(() => {
    console.log("treehome useEffect");
    document.title = `GOT family | ${houseName}`;
    loadHouseMembers();
  }, [houseName]); //use effect needs dependency : house name to load the data, refresh issue

  const loadHouseMembers = async () => {
    //http://localhost:8081/gotbak/api/characters/familytree/Lannister
    const url = `${base_url_server}familytree/${houseName}`;
    console.log(url);
    await axios.get(url).then(
      (response) => {
        console.log(response.data);
        console.log(response.length);
        setHouseMembers(response.data);
        toast.success("house members loaded", { position: "bottom-left" });
      },
      (error) => {
        console.log(error);
        toast.error("something went wrong!!!");
      }
    );
  };

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
    classes,
    markCharFav,
  }) => (
    <>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={toggleNode}
        >
          <div className={classes.name}>{nodeDatum.name}</div>
          <div>
            {nodeDatum.attributes != null ? (
              <div>
                <Link to={`/characterinfo/${nodeDatum.attributes.characterId}`}>
                  <img
                    src={nodeDatum.attributes.characterImageThumb}
                    className="w-12 h-12  mb-4 flex justify-center m-auto align-middle hover:w-14 hover:h-14"
                  />
                  <div>nickname: {nodeDatum.attributes.nickname}</div>

                  <div>
                    Royal: {nodeDatum.attributes.royal === true ? "YES" : "NO"}
                  </div>
                  {/* <div>
                    characterImageFull: {nodeDatum.attributes.characterImageFull}
                  </div> */}
                  {/* <div>parents: {nodeDatum.attributes.parents}</div>
                  <div>siblings: {nodeDatum.attributes.siblings}</div>
                  <div>married to: {nodeDatum.attributes.marriedEngaged}</div>
                  <div>killed: {nodeDatum.attributes.killed}</div>
                  <div>killedBy: {nodeDatum.attributes.killedBy}</div> */}

                  {/* <div>characterlink: {nodeDatum.attributes.characterLink}</div> */}
                  <div>actor Name: {nodeDatum.attributes.actorName}</div>
                  {/* <button
                    onClick={() =>
                      markCharFav(nodeDatum.attributes.characterId)
                    }
                    className="px-4 py-2 mt-4 mx-4 rounded-md shadow-lg bg-fuchsia-950 text-center text-gray-200 hover:scale-110 hover:bg-blue-300"
                  >
                    {nodeDatum.attributes.favourite === true
                      ? "Remove Fav"
                      : "Add Fav"}
                  </button> */}
                  <div className="flex justify-center m-auto mt-4">
                    {nodeDatum.attributes.favourite === true ? (
                      <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="fill-white"
                        >
                          <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
                        </svg>{" "}
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        className="stroke-white"
                      >
                        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181" />
                      </svg>
                    )}
                  </div>
                  {/* <div>actor link: {nodeDatum.attributes.actorLink}</div> */}
                </Link>
              </div>
            ) : (
              ""
            )}{" "}
          </div>
        </Button>
      </foreignObject>
    </>
  );

  //mark/unmark favourite character
  const markCharFav = async (characterId) => {
    await axios.put(`${base_url_server}${characterId}/favourite`).then(
      (response) => {
        toast.success("char marked successfully!");
        Navigate(`/allfavourites`);
      },
      (error) => {
        toast.error("Oh! seems like there is an error!", {
          position: "top-center",
        });
      }
    );
  };

  const classes = useStyles();
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 500, y: 650 };
  const separation = { siblings: 2, nonSiblings: 3 };
  const foreignObjectProps = {
    width: nodeSize.x,
    height: nodeSize.y,
    x: -250,
    y: -50,
  };

  return (
    <div>
      <div style={containerStyles} ref={containerRef}>
        <Tree
          data={houseMembers}
          translate={translate}
          nodeSize={nodeSize}
          separation={separation}
          transitionDuration="1000"
          pathFunc="step" /*diagonal, elbow, straight */
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          renderCustomNodeElement={(rd3tProps) =>
            renderForeignObjectNode({
              ...rd3tProps,
              foreignObjectProps,
              classes,
              markCharFav,
            })
          }
          orientation="vertical"
        />
      </div>
      <div>
        <div class="fire" className="-z-10">
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
