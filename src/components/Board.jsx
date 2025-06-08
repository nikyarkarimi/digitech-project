import { useRef, useEffect } from "react";

export default function Board() {
  const containerRef = useRef(null);
  const selectedNodeRef = useRef(null); // currently selected node
  const connectionsRef = useRef([]); // list of [start, end] pairs

  //let count = 0;

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
        selectedNodeRef.current = null;
      console.log("All connections:", connectionsRef.current);
      }
    };

    fetch("src/assets/Digitech.svg")
      .then((res) => res.text())
      .then((svg) => {
        console.log("Baby we're");
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
      <div ref={containerRef} className={"vectorized-board"}/>
    </div>
  );
}
