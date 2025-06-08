import { useRef, useEffect, useState } from "react";

export default function Board() {
  const containerRef = useRef(null);
  const selectedNodeRef = useRef(null); // currently selected node
  const connectionsRef = useRef([]); // list of [start, end] pairs

  let count = 0;

  useEffect(() => {
    let svgElement;

    const handleNodeClick = (id) => {
      console.log("Clicked:", id);

      if (selectedNodeRef.current === null) {
        console.log("node set");
        selectedNodeRef.current = id;
      } else {
        console.log("New connection set!");
        connectionsRef.current.push([selectedNodeRef.current, id]);
        drawLineBetween(selectedNodeRef.current, id);
        selectedNodeRef.current = null;
        console.log("All connections:", connectionsRef.current);
      }
    };

    const drawLineBetween = (fromId, toId) => {
      const svg = containerRef.current.querySelector("svg");
      const from = svg.querySelector(`#${fromId}`);
      const to = svg.querySelector(`#${toId}`);

      if (!from || !to) return;

      const x1 = parseFloat(from.getAttribute("cx"));
      const y1 = parseFloat(from.getAttribute("cy"));
      const x2 = parseFloat(to.getAttribute("cx"));
      const y2 = parseFloat(to.getAttribute("cy"));

      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", x1);
      line.setAttribute("y1", y1);
      line.setAttribute("x2", x2);
      line.setAttribute("y2", y2);
      line.setAttribute("class", "cable-red");

      // put lines at the top level of the SVG for visibility
      svg.appendChild(line);
    };


    fetch("src/assets/Digitech.svg")
      .then((res) => res.text())
      .then((svg) => {
        console.log("Baby we're onnn");
        // this is the response from the previous block, svg being a variable name
        if (!containerRef.current) return;
        // injects svg as text into the HTML, allowing us to use functions like the query selector - now we can access the paths
        containerRef.current.innerHTML = svg;
        svgElement = containerRef.current;

        const handleClick = (event) => {
          const circle = event.target.closest("circle[id]");
          if (circle) {
            handleNodeClick(circle.id);
            
          }
        };
        svgElement.addEventListener("click", handleClick);

        // Cleanup
        return () => {
          svgElement?.removeEventListener("click", handleClick);
        };
      });
  }, []); // "[] as the second argument to useEffect means this only runs once when the component mounts.", says chat; so it won't run more than once, ever, no condition to rerun

  return (
    <div>
      <div ref={containerRef} />
    </div>
  );
}
