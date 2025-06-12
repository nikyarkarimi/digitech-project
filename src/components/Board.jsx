import { useRef, useEffect } from "react";
import { useCable } from "../contexts/CableContext.jsx";

/**
 * TODO Unsichtbare Kabel verhindern, wenn keine Kabel-Farbe ausgewählt wurde
 *
 * Tamaras Comments rein geben
 * */


export default function Board() {
  const containerRef = useRef(null);
  const selectedNodeRef = useRef(null);
  const usedNodesRef = useRef(new Map());
  const userInputRef = useRef(new Map([
    ['inputA', true],
    ["inputB", true],
    ["inputC", false],
    ["inputD", false]
  ]))

  // Fill with all the outs on init, add connections as we input lines?
  const dependenciesRef = useRef(new Map([
    ["g_and_out_3_1", ["g_and_in_1_1", "g_and_in_2_1"]], // , "g_and_in_1_2", "g_and_in_2_2" out depends on all those ins
    ["g_or_out_3_1", ["g_or_in_1_1", "g_or_in_2_1"]], // , "g_or_in_1_2", "g_or_in_2_2"
  ]))

  // read current state from Context
  const { selectedCableIndex } = useCable();

  // Ref for selected cable
  const selectedCableRef = useRef(selectedCableIndex);

  // when selectedCableIndex changes selectedCableRef should be updated
  useEffect(() => {
    selectedCableRef.current = selectedCableIndex;
  }, [selectedCableIndex]);

  const colorClasses = [
    "cable-default", "cable-black", "cable-cyan", "cable-blue",
    "cable-green", "cable-brown", "cable-pink", "cable-red", "cable-yellow"
  ];

  // get color from current Ref
  const getColorClass = () => {
    const idx = selectedCableRef.current;
    if (typeof idx === "number" && idx >= 0 && idx < colorClasses.length) {
      return colorClasses[idx];
    }
    return null;
  };

  function getNodeOutput(nodeId) {
    const inputs = [dependenciesRef.current.get(nodeId)] || []; // which nodes does the selected nodeId depend on?
    console.log(inputs)
    const inputValues = inputs.map((id) => usedNodesRef.current.get(id)); // creates an array of corresponding values
    console.log("Checking node output", nodeId)
    const splitNodeId = nodeId.split(/_/)
    if (splitNodeId[0] === "in") {
      if (splitNodeId[2] === "a") { return userInputRef.current.get("inputA") }
      if (splitNodeId[2] === "b") { return userInputRef.current.get("inputB") }
      if (splitNodeId[2] === "c") { return userInputRef.current.get("inputC") }
      if (splitNodeId[2] === "d") { return userInputRef.current.get("inputD") }
    } else if (splitNodeId[0] === "g") {
      if (splitNodeId[1] === "and") { 
        if (splitNodeId[2] === "in") { return usedNodesRef.current.get(inputs[0]) }
        else if (splitNodeId[2] === "out") { return inputValues.every(Boolean) } 
        
      }

    } else if (nodeId.startsWith("g_or_out")) {
      return inputValues.some(Boolean);
    }

    return false; // fallback for unknown node
  }

  useEffect(() => {
    let svgElement;

    const hasNodeBeenUsed = (id) => {
      if (usedNodesRef.current.has(id)) {
        if (selectedNodeRef.current === id) {
          usedNodesRef.current.delete(id);
          selectedNodeRef.current = null;
        }
        return true;
      }
    }

    const handleNodeClick = (id) => {
      if (hasNodeBeenUsed(id)) return

      if (selectedNodeRef.current === null) {
        selectedNodeRef.current = id;
        usedNodesRef.current.set(id, getNodeOutput(id));
      } else {
        const fromId = selectedNodeRef.current;
        const toId = id;

        const colorClass = getColorClass(); // Read current colour

        if (!colorClass) {
          console.warn("No valid cable color = no connection...");
          usedNodesRef.current.delete(fromId); // Removes selected nodes if no line can be drawn
          usedNodesRef.current.delete(toId);
          selectedNodeRef.current = null;
          return;
        }

        drawLineBetween(fromId, toId, colorClass);
        dependenciesRef.current.set(toId, fromId)
        console.log("Dependencies ref value for id: ", dependenciesRef.current.get(id))
        usedNodesRef.current.set(id, getNodeOutput(id));
        console.log(dependenciesRef, usedNodesRef)
        selectedNodeRef.current = null;
      }
    };

    // If an existing line is clicked, it is deleted
    const handleLineClick = (lineId) => {
      const [_, fromId, toId] = lineId.split("-");
      document.getElementById(lineId)?.remove();
      document.getElementById(`v_line-${fromId}-${toId}`)?.remove();
      dependenciesRef.current.delete(fromId)
      usedNodesRef.current.delete(fromId);
      usedNodesRef.current.delete(toId);
    };

    // Draws line between nodes, including the selected css class
    const drawLineBetween = (fromId, toId, colorClass) => {
      const svg = containerRef.current.querySelector("svg");
      const from = svg.querySelector(`#${fromId}`);
      const to = svg.querySelector(`#${toId}`);
      if (!from || !to) return;

      const x1 = parseFloat(from.getAttribute("cx"));
      const y1 = parseFloat(from.getAttribute("cy"));
      const x2 = parseFloat(to.getAttribute("cx"));
      const y2 = parseFloat(to.getAttribute("cy"));

      const visibleLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      visibleLine.setAttribute("x1", x1);
      visibleLine.setAttribute("y1", y1);
      visibleLine.setAttribute("x2", x2);
      visibleLine.setAttribute("y2", y2);
      visibleLine.setAttribute("class", colorClass);
      visibleLine.setAttribute("id", `v_line-${fromId}-${toId}`);

      // Creates invisible line to have a larger clickable area
      const invisibleLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      invisibleLine.setAttribute("x1", x1);
      invisibleLine.setAttribute("y1", y1);
      invisibleLine.setAttribute("x2", x2);
      invisibleLine.setAttribute("y2", y2);
      invisibleLine.setAttribute("class", colorClass + "-invisible");
      invisibleLine.setAttribute("id", `i_line-${fromId}-${toId}`);

      svg.appendChild(invisibleLine);
      svg.appendChild(visibleLine);
    };

    // Finds out which element is clicked and runs the corresponding click handler
    const handleClick = (event) => {
      const line = event.target.closest("line[id]");
      if (line) {
        handleLineClick(line.id);
        return;
      }

      const circle = event.target.closest("circle[id]");
      if (circle) {
        handleNodeClick(circle.id);
      }
    };

    // Fetches the SVG, adds its content to the DOM & makes the whole thing clickable
    fetch("src/assets/Digitech.svg")
      .then((res) => res.text())
      .then((svg) => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = svg;
        svgElement = containerRef.current;

        svgElement.addEventListener("click", handleClick);

        return () => {
          svgElement?.removeEventListener("click", handleClick);
        };
      });
  }, []);

  return (
    <div>
      <div ref={containerRef} className={"vectorized-board"} />
    </div>
  );
}
