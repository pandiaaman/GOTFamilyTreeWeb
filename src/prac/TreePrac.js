import React from "react";
import Tree from "react-d3-tree";

export default function TreePrac() {
  // const[tree, setTree] = useState<RawNodeDatum | RawNodeDatum[]>({
  //   name: "root",
  //   children:[]
  // });
  const gotChart = {
    name: "housename",
    children: [
      {
        name: "Elder One",
        attributes: {
          department: "Production",
        },
        children: [
          {
            name: "Foreman",
            attributes: {
              department: "Fabrication",
            },
            children: [
              {
                name: "Worker",
                attributes: {
                  department: "Fabrication",
                },
              },
            ],
          },
          {
            name: "Foreman",
            attributes: {
              department: "Assembly",
            },
            children: [
              {
                name: "Worker",
                attributes: {
                  department: "Fabrication",
                },
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
    <div id="treeWrapper" style={{ width: "80em", height: "40em" }}>
      <Tree data={gotChart} translate={{ x: 200, y: 200 }} />
    </div>
  );
}
