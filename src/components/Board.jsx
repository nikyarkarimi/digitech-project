import { useRef, useEffect } from "react";
import { useCable } from "../contexts/CableContext.jsx";
import { initialDependencies, initialForwardDependencies } from "./LogicMaps.jsx";

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
  const dependenciesRef = useRef(initialDependencies)
  const forwardDependenciesRef = useRef(initialForwardDependencies)

  for (const [target, sources] of initialDependencies.entries()) {
    const flatSources = sources.flat(); // In case sources contain arrays of nodes
    for (const source of flatSources) {
      if (!forwardDependenciesRef.current.has(source)) {
        forwardDependenciesRef.current.set(source, []);
      }
      forwardDependenciesRef.current.get(source).push(target);
    }
  }

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
    const inputs = dependenciesRef.current.get(nodeId) || []; // which nodes does the selected nodeId depend on?
    let inputValues = []
    if (Array.isArray(inputs[0])) {
      inputValues[0] = inputs[0].some(id => usedNodesRef.current.get(id)) || false;
      inputValues[1] = inputs[1].some(id => usedNodesRef.current.get(id)) || false;
    } else {
      inputValues = inputs.map((id) => usedNodesRef.current.get(id)); // ensures single input still is an array
    }
    const splitNodeId = nodeId.split(/_/)


    // we don't need breaks within this switch as we return out of the function
    switch (splitNodeId[0]) {
      case "in": {
        switch (splitNodeId[2]) {
          case "a": return userInputRef.current.get("inputA")
          case "b": return userInputRef.current.get("inputB")
          case "c": return userInputRef.current.get("inputC")
          case "d": return userInputRef.current.get("inputD")
        }
      }
      case "g": {
        // deal with input/gnd/vcc first, as it's the same for all nodes
        switch (splitNodeId[2]) {
          case "in": return usedNodesRef.current.get(inputs[0]) == true ? true : false
          case "gnd": return false
          case "vcc": return true
        }
        // differentiating between gates
        switch (splitNodeId[1]) {
          case "and": return inputValues.every(Boolean)
          case "or": return inputValues.some(Boolean)
          //important not and nand HERE
          case "not": return !inputValues[0];
          case "nand": return !(Boolean(inputValues[0]) && Boolean(inputValues[1]));
          case "xor": return inputValues[0] !== inputValues[1];
        }
      }
      case "out": {
        lightLED(splitNodeId[3], shouldLEDBeLit(splitNodeId[3]))
        return usedNodesRef.current.get(inputs[0])
      }
        return false; // fallback for unknown node
    }
  }

  function shouldLEDBeLit(currentNode) {
    const inputs = dependenciesRef.current.get(`out_led_out_${currentNode}`) || []; // which nodes does the selected nodeId depend on?
    let inputValues = inputs.map((id) => usedNodesRef.current.get(id));
    if (inputValues.some(Boolean)) return true
    else return false
  }

  function lightLED(nodeId, on) {
    if (on) document.getElementById(`out_led_out_${nodeId}`)?.setAttribute("class", "led-lit")
    else document.getElementById(`out_led_out_${nodeId}`)?.removeAttribute("class", "led-lit")
  }

  function previousNodeIsToId(previousId) {
    const splitNodeId = previousId.split(/_/)
    if (splitNodeId[0] === "out" || splitNodeId[2] === "in") return true
    else return false
  }

  function propagateChanges(nodeId, visited) {
    console.log("we check changes for", nodeId)
    if (!forwardDependenciesRef.current.get(nodeId)) return
    for (const dep of forwardDependenciesRef.current.get(nodeId)) {
      if (visited.has(dep)) return
      if (usedNodesRef.current.get(dep) != null) {
        usedNodesRef.current.set(dep, getNodeOutput(dep))
      }
      visited.add(dep);

      if (nodeId.includes("led")) {
        const splitNodeId = nodeId.split(/_/)
        lightLED(splitNodeId[3], shouldLEDBeLit(splitNodeId[3]))
      }
      propagateChanges(dep, visited);
    }
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
        console.log("selected nodes were empty. Our output is", usedNodesRef.current.get(id))
      } else {
        let toId, fromId
        if (!previousNodeIsToId(selectedNodeRef.current)) {
          fromId = selectedNodeRef.current;
          toId = id;
          dependenciesRef.current.get(toId) ? dependenciesRef.current.get(toId).push(fromId) : dependenciesRef.current.set(toId, [fromId])
        } else {
          fromId = id;
          toId = selectedNodeRef.current;
          console.log("To and from were switched. Our current ids were: ",)

          dependenciesRef.current.get(toId) ? dependenciesRef.current.get(toId).push(fromId) : dependenciesRef.current.set(toId, [fromId])
          usedNodesRef.current.set(fromId, getNodeOutput(fromId));
        }

        forwardDependenciesRef.current.get(fromId) ? forwardDependenciesRef.current.get(fromId).push(toId) : forwardDependenciesRef.current.set(fromId, [toId])
        const colorClass = getColorClass(); // Read current colour

        if (!colorClass) {
          console.warn("No valid cable color = no connection...");
          usedNodesRef.current.delete(fromId); // Removes selected nodes if no line can be drawn
          usedNodesRef.current.delete(toId);
          selectedNodeRef.current = null;
          return;
        }

        usedNodesRef.current.set(toId, getNodeOutput(toId))
        drawLineBetween(fromId, toId, colorClass);
        if (toId.includes("led")) {
          const splitNodeId = toId.split(/_/)
          lightLED(splitNodeId[3], shouldLEDBeLit(splitNodeId[3]))
        }

        selectedNodeRef.current = null;
      }
    };

    // If an existing line is clicked, it is deleted
    const handleLineClick = (lineId) => {
      const [_, fromId, toId] = lineId.split("-");
      document.getElementById(lineId)?.remove();
      document.getElementById(`v_line-${fromId}-${toId}`)?.remove();
      dependenciesRef.current.get(toId)?.length > 1 ? dependenciesRef.current.get(toId).pop() : dependenciesRef.current.delete(toId)
      forwardDependenciesRef.current.get(fromId)?.length > 1 ? forwardDependenciesRef.current.get(fromId).pop() : forwardDependenciesRef.current.delete(fromId)
      usedNodesRef.current.delete(fromId);
      usedNodesRef.current.delete(toId);

      if (toId.includes("led")) {
        const splitNodeId = toId.split(/_/)
        lightLED(splitNodeId[3], shouldLEDBeLit(splitNodeId[3]))
      }

      propagateChanges(toId, new Set())
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

      svg.appendChild(visibleLine);
      svg.appendChild(invisibleLine);
    };

    // Finds out which element is clicked and runs the corresponding click handler
    const handleClick = (event) => {

      const inputKeys = ["inputA", "inputB", "inputC", "inputD"];
      const clickedInput = event.target.closest("[id]");



      if (clickedInput && inputKeys.includes(clickedInput.id)) {
        const key = clickedInput.id;
        const currentValue = userInputRef.current.get(key);
        const newValue = !currentValue;

        userInputRef.current.set(key, newValue);

        clickedInput.setAttribute("class", newValue ? "signal-true" : "signal-false");
        propagateChanges(clickedInput.id, new Set())
        return;
      }

      // Input Button on Board
      const inputButton = event.target.closest("#inputButton");
      if (inputButton) {
        alert("InputButton wurde gedrückt!");
        return;
      }



      const line = event.target.closest("line[id]");
      if (line) {
        handleLineClick(line.id);
        return;
      }


      const circle = event.target.closest("circle[id]");
      if (circle) {
        handleNodeClick(circle.id);
        propagateChanges(clickedInput.id, new Set())
      }
    };

    // Fetches the SVG, adds its content to the DOM & makes the whole thing clickable
    fetch("src/assets/Digitech.svg")
      .then((res) => res.text())
      .then((svg) => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = svg;
        svgElement = containerRef.current;

        // set initial input colors
        ["inputA", "inputB", "inputC", "inputD"].forEach((key) => {
          const el = containerRef.current.querySelector(`#${key}`);
          const value = userInputRef.current.get(key);
          if (el) {
            el.setAttribute("class", value ? "signal-true" : "signal-false");
          }
        });


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
