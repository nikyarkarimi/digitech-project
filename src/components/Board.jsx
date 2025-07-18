/* TODO:
  - Add remaining fixed jumpers to svg
  - Try fixing color on preview line?
  - Add jumper logic
  - Clicking an occupied node - move end of cable
  - 1-in-8 & 7-segment
 */
// const colorClass = getColorClass() // somehow it bugs out once I use this instead of preview-line


import { useRef, useEffect } from "react";
import { useCable } from "../contexts/CableContext.jsx";
import { initialDependencies, initialForwardDependencies, nodeGroups, dffState } from "./LogicMaps.jsx";

export default function Board() {
  const containerRef = useRef(null);
  const selectedNodeRef = useRef(null);
  const usedNodesRef = useRef(new Map());
  const userInputRef = useRef(new Map([
    ['inputA', true],
    ["inputB", true],
    ["inputC", false],
    ["inputD", false],
    ['inputButton', false],
  ]))
  const dependenciesRef = useRef(initialDependencies)
  const forwardDependenciesRef = useRef(initialForwardDependencies)
  const previewLineRef = useRef(null)
  const nodeIntervalRef = useRef(null)
  const clockNodesRef = useRef(new Set())
  const dffStateRef = useRef(dffState)

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



  function getInputValues(nodeId, splitNodeId) {
    let inputs = []

    if (!nodeId.includes("io")) {
      inputs = dependenciesRef.current.get(nodeId) || []; // which nodes does the selected nodeId depend on?
    } else {
      inputs = dependenciesRef.current.get(splitNodeId[1]) || [];
      const value = dependenciesRef.current.get(nodeId)?.[0]
      if (!inputs.includes(value) && value != null) inputs.push(value)
    }
    if (inputs.some(value => value?.includes("io"))) {
      // TODO: Did I want to do something here?
    }
    let inputValues = []
    if (Array.isArray(inputs[0])) {
      let count = 0
      for (let i of inputs) {
        inputValues[count++] = i.some(id => usedNodesRef.current.get(id)) || false;
        console.log("Input values for", inputValues, i)
      }
    } else if (inputs[0]?.length <= 2) { // because our io groups all get grouped together into ids of 1-2 characters
      // we do not check the values of the connected nodes, because otherwise if one node is true it'll get stuck forever
      // instead we check the values of connected dependencies!!
      inputValues = nodeGroups.get(inputs[0])?.map((id) => usedNodesRef.current.get(dependenciesRef.current.get(id)?.[0]))
    } else {
      inputValues = inputs.map((id) => usedNodesRef.current.get(id)); // ensures single input still is an array
    }
    return inputValues
  }


  /**
   * Computes the correct output value/state for the selected node
   * @param {String} nodeId The ID of the corresponding vector path/node of our board
   * @returns {Boolean} 
   */
  function getNodeOutput(nodeId) {
    const splitNodeId = nodeId.split(/_/)
    let inputValues = getInputValues(nodeId, splitNodeId)

    // we don't need breaks within this switch as we return out of the function
    switch (splitNodeId[0]) {
      case "in": {
        switch (splitNodeId[1]) {
          case "a": return userInputRef.current.get("inputA");
          case "b": return userInputRef.current.get("inputB");
          case "c": return userInputRef.current.get("inputC");
          case "d": return userInputRef.current.get("inputD");
          case "but": return userInputRef.current.get("inputButton");
          case "clk": {
            clockNodesRef.current.add(nodeId)
            startNodeInterval()
            return
          }
        }
      }
      case "g": {
        // deal with input/gnd/vcc first, as it's the same for all nodes
        switch (splitNodeId[2]) {
          case "in": return inputValues[0] == true ? true : false
          case "gnd": return false
          case "vcc": return true
        }
        // differentiating between gates
        switch (splitNodeId[1]) {
          case "and": return inputValues.every(Boolean)
          case "or": return inputValues.some(Boolean)
          case "not": return !inputValues[0];
          case "nand": return !inputValues.every(Boolean)
          case "xor": return inputValues[0] !== inputValues[1];
          case "nor": return !inputValues.some(Boolean)
          case "dff": {
            switch (splitNodeId[2]) {
              case "oe": return inputValues[0] == true ? false : true //because oe is negative 
              case "in": return inputValues[0] == true ? true : false
              case "cp": return inputValues[0] == true ? true : false
              case "out": {
                const key = `dff_${splitNodeId[3]}`
                const state = dffStateRef.current[key]
                console.log("Our dffMemory is currently based on ", inputs, inputValues)
                if (usedNodesRef.current.get("g_dff_oe_1") === false || !usedNodesRef.current.get("g_dff_oe_2") === false) return false
                else if (usedNodesRef.current.get("g_dff_oe_1") === true || !usedNodesRef.current.get("g_dff_oe_2") === true) {
                  console.log("State of node:", state)
                  state.D = inputValues[0]
                }
                return state.Q
              }
            }
          }
        }
      }
      case "out": {
        lightLED(splitNodeId[3], shouldLEDBeLit(splitNodeId[3]))
        return inputValues.some(Boolean)
      }
      case "io": {
        return inputValues.some(Boolean)
      }
      default: return false // fallback for unknown node
    }
  }

  function shouldLEDBeLit(currentNode) {
    const inputs = dependenciesRef.current.get(`out_led_out_${currentNode}`) || []; // which nodes does the selected nodeId depend on?
    let inputValues
    if (inputs[0]?.length <= 2) {
      inputValues = nodeGroups.get(inputs[0])?.map((id) => usedNodesRef.current.get(id))
    } else inputValues = inputs.map((id) => usedNodesRef.current.get(id));
    console.log("Our led inputs for _ are", inputs, inputValues)
    if (inputValues.some(Boolean)) return true
    else return false
  }

  function lightLED(nodeId, on) {
    if (on) document.getElementById(`out_led_out_${nodeId}`)?.setAttribute("class", "led-lit")
    else document.getElementById(`out_led_out_${nodeId}`)?.removeAttribute("class", "led-lit")
  }

  function previousNodeIsToId(previousId, currentId) {
    const splitNodeIdCurrent = currentId.split(/_/)
    const splitNodeId = previousId.split(/_/)
    if (splitNodeIdCurrent[0] === "in" || splitNodeId[0] === "out" || splitNodeId[2] === "in") return true
    else return false
  }

  function propagateChanges(nodeId, visited) {
    if (!forwardDependenciesRef.current.get(nodeId) && !nodeId.includes("io") || !usedNodesRef.current.has(nodeId) && !nodeId.includes("input")) return
    console.log("We're propagating, baby:", nodeId, usedNodesRef.current.get(nodeId), forwardDependenciesRef.current.get(nodeId))

    let fwDependencies = []
    let splitNodeId = nodeId.split(/_/)
    fwDependencies = nodeId.includes("io") ? getIoFwDependencies(splitNodeId[1]) : forwardDependenciesRef.current.get(nodeId)
    for (const dep of fwDependencies) {
      splitNodeId = dep.split(/_/)
      if (visited.has(dep)) return
      if (dep.includes("dff_out") && usedNodesRef.current.get("g_dff_oe_1") === false || usedNodesRef.current.get("g_dff_oe_2") === false) usedNodesRef.current.set(dep, false)
      else if (dep.includes("dff_out") && usedNodesRef.current.get("in_but_1")) {
        console.log("Dff state: ", dffStateRef.current)
        const state = dffStateRef.current[`dff_${splitNodeId[3]}`]
        state.Q = state.D
        usedNodesRef.current.set(dep, getNodeOutput(nodeId))
      }
      if (usedNodesRef.current.has(dep)) usedNodesRef.current.set(dep, getNodeOutput(dep))
      visited.add(dep);
      if (nodeId.includes("led")) {
        lightLED(splitNodeId[3], shouldLEDBeLit(splitNodeId[3]))
      }
      propagateChanges(dep, visited);
    }
  }

  function getIoFwDependencies(ioKey) {
    const fwNodes = [...forwardDependenciesRef.current.keys()].filter(key => key.includes(`io_${ioKey}`))
    let fwDependentNodes = []
    for (const node of fwNodes) {
      fwDependentNodes.push(forwardDependenciesRef.current.get(node))
    }
    return fwDependentNodes.flat()
  }

  function hasNodeBeenUsed(id) {
    if (usedNodesRef.current.has(id)) {
      if (selectedNodeRef.current === id) {
        usedNodesRef.current.delete(id);
        selectedNodeRef.current = null;
      }
      return true;
    }
  }

  // Draws line between nodes, including the selected css class
  function drawLineBetween(fromId, toId, colorClass) {
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

  /**
   * Finds out which element is clicked and runs the corresponding click handler
   * @param {*} event Click event
   * @returns _nothing_
   */
  function handleClick(event) {
    const clickedInput = event.target.closest("[id]");
    // console.log(clickedInput.id, "has been clicked")
    if (clickedInput.id.includes("input")) {
      handleInputClick(clickedInput);
      propagateChanges(clickedInput.id, new Set());
      return;
    }

    if (clickedInput.id.includes("line")) {
      handleLineClick(clickedInput.id);
      return;
    }

    if (clickedInput.id.includes("_")) {     // Neither button nor the switches have underscores in the name
      handleNodeClick(clickedInput.id);      // It's not pretty but it works
      propagateChanges(clickedInput.id, new Set())
    }
  };

  /**
   * 
   * @param {String} id 
   * @returns 
   */
  function handleNodeClick(id) {
    if (hasNodeBeenUsed(id)) {
      stopPreviewLine()
      return
    }
    console.log("Node has been clicked")
    if (selectedNodeRef.current === null) {
      usedNodesRef.current.set(id, getNodeOutput(id));
      console.log("Our node is now: ", id, usedNodesRef.current.get(id))
      selectedNodeRef.current = id;
      startPreviewLine(id);
    } else {
      let toId, fromId
      if (!previousNodeIsToId(selectedNodeRef.current, id)) {
        fromId = selectedNodeRef.current;
        toId = id;
        dependenciesRef.current.get(toId) ? dependenciesRef.current.get(toId).push(fromId) : dependenciesRef.current.set(toId, [fromId])
      } else {
        fromId = id;
        toId = selectedNodeRef.current;
        console.log("To and from were switched.")
        dependenciesRef.current.get(toId) ? dependenciesRef.current.get(toId).push(fromId) : dependenciesRef.current.set(toId, [fromId])
        usedNodesRef.current.set(fromId, getNodeOutput(fromId));
      }

      
        if (toId.includes("io")) {
          const splitNodeId = toId.split(/_/)
          dependenciesRef.current.get(splitNodeId[1]).push(fromId)
        }

        // if it's an io node, we remove the node name from dependencies and instead add the group
        if (fromId.includes("io")) {
          const splitNodeId = fromId.split(/_/)
          dependenciesRef.current.get(toId)?.pop(fromId)
          dependenciesRef.current.get(toId).push(splitNodeId[1])
        }

      if (fromId.includes("io") || toId.includes("io")) handleIoDependencies(fromId, toId)
      
      console.log("Dependencies for ", toId, dependenciesRef.current.get(toId))
      forwardDependenciesRef.current.get(fromId) ? forwardDependenciesRef.current.get(fromId).push(toId) : forwardDependenciesRef.current.set(fromId, [toId])
      usedNodesRef.current.set(toId, getNodeOutput(toId))
      const colorClass = getColorClass(); // Read current colour
      /*
      if (!colorClass) {
        console.warn("No valid cable color = no connection...");
        usedNodesRef.current.delete(fromId); // Removes selected nodes if no line can be drawn
        usedNodesRef.current.delete(toId);
        selectedNodeRef.current = null;
        return;
      }
      */
      stopPreviewLine();
      drawLineBetween(fromId, toId, colorClass);
      if (toId.includes("led")) {
      const splitNodeId = toId.split(/_/)
        lightLED(splitNodeId[3], shouldLEDBeLit(splitNodeId[3]))
      }
      selectedNodeRef.current = null;
    }
  };

  /**
   * 
   * @param {String} fromId 
   * @param {String} toId 
   */
  function handleIoDependencies(fromId, toId) {
    if (toId.includes("io")) {
        const splitNodeId = toId.split(/_/)
        dependenciesRef.current.get(splitNodeId[1]).push(fromId)
      }
      // if it's an io node, we remove the node name from dependencies and instead add the group
      if (fromId.includes("io")) {
        const splitNodeId = fromId.split(/_/)
        dependenciesRef.current.get(toId)?.pop(fromId)
        dependenciesRef.current.get(toId).push(splitNodeId[1])
      }

  }

  /**
   * Deletes any existing line and removes dependencies
   * @param {*} lineId 
   */
  function handleLineClick(lineId) {
    const [_, fromId, toId] = lineId.split("-");
    document.getElementById(lineId)?.remove();
    document.getElementById(`v_line-${fromId}-${toId}`)?.remove();
    dependenciesRef.current.get(toId)?.length > 1 ? dependenciesRef.current.get(toId).pop() : dependenciesRef.current.delete(toId);
    forwardDependenciesRef.current.get(fromId)?.length > 1 ? forwardDependenciesRef.current.get(fromId).pop() : forwardDependenciesRef.current.delete(fromId);
    usedNodesRef.current.delete(fromId);
    usedNodesRef.current.delete(toId);

    if (toId.includes("io")) {
      const splitNodeId = toId.split(/_/)
      dependenciesRef.current.get(splitNodeId[1]).pop(toId)
    }

    if (toId.includes("led")) {
      const splitNodeId = toId.split(/_/)
      lightLED(splitNodeId[3], shouldLEDBeLit(splitNodeId[3]))
    }

    propagateChanges(toId, new Set())
  };

  /**
   * Reverses value of corresponding input id and updates switch color
   * @param {String} inputId 
   */
  function handleInputClick(clickedInput) {
    const inputId = clickedInput.id;
    const currentValue = userInputRef.current.get(inputId);
    const newValue = !currentValue;
    userInputRef.current.set(inputId, newValue);
    clickedInput.setAttribute("class", newValue ? "signal-true" : "signal-false");
  }


  // Start Code by ChatGPT
  function startPreviewLine(fromId) {
    const svg = containerRef.current.querySelector("svg");
    const from = svg.querySelector(`#${fromId}`);
    if (!from) return;

    const x1 = parseFloat(from.getAttribute("cx"));
    const y1 = parseFloat(from.getAttribute("cy"));

    const previewLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    previewLine.setAttribute("x1", x1);
    previewLine.setAttribute("y1", y1);
    previewLine.setAttribute("x2", x1); // initially same as start
    previewLine.setAttribute("y2", y1);
    previewLine.setAttribute("class", "preview-line");
    previewLine.setAttribute("id", "preview-line");

    svg.appendChild(previewLine);
    previewLineRef.current = previewLine;

    svg.addEventListener("mousemove", handleMouseMove);
  }

  function stopPreviewLine() {
    const svg = containerRef.current.querySelector("svg");
    svg.removeEventListener("mousemove", handleMouseMove);
    previewLineRef.current?.remove();
    previewLineRef.current = null;
  }

  function handleMouseMove(event) {
    const svg = containerRef.current.querySelector("svg");
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;
    const cursorPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

    if (previewLineRef.current) {
      previewLineRef.current.setAttribute("x2", cursorPoint.x);
      previewLineRef.current.setAttribute("y2", cursorPoint.y);
    }
  }
  // End Code by ChatGPT


  useEffect(() => {
    let svgElement;

    // Fetches the SVG, adds its content to the DOM & makes the whole thing clickable
    fetch("src/assets/Digitech.svg")
      .then((res) => res.text())
      .then((svg) => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = svg;
        svgElement = containerRef.current;

        // TODO: Set class to false from the start for production, remove this
        // set initial input colors
        ["inputA", "inputB", "inputC", "inputD"].forEach((key) => {
          const el = containerRef.current.querySelector(`#${key}`);
          const value = userInputRef.current.get(key);
          if (el) {
            el.setAttribute("class", value ? "signal-true" : "signal-false");
          }
        });


        svgElement.addEventListener("click", handleClick);

        // input button hold
        const buttonEl = svgElement.querySelector("inputButton");
        if (buttonEl) {
          buttonEl.addEventListener("mousedown", () => {
            userInputRef.current.set("inputButton", true);
            const targets = forwardDependenciesRef.current.get("inputButton") || [];
            console.log("Targets for button propagation:", targets)
            targets.forEach((id) => {
              usedNodesRef.current.set(id, true)
              propagateChanges(id, new Set());
            });
            console.log("Button clicked");
          });

          buttonEl.addEventListener("mouseup", () => {
            userInputRef.current.set("inputButton", false);
            const targets = forwardDependenciesRef.current.get("inputButton") || [];
            targets.forEach((id) => {
              usedNodesRef.current.set(id, false);
              propagateChanges(id, new Set());
            });
            console.log("Button click over");
          });

          buttonEl.addEventListener("mouseleave", () => {
            if (userInputRef.current.get("inputButton")) {
              userInputRef.current.set("inputButton", false);
              const targets = forwardDependenciesRef.current.get("inputButton") || [];
              targets.forEach((id) => {
                usedNodesRef.current.set(id, false);
                propagateChanges(id, new Set());
              });
            }
            console.log("Button mouseover finished");
          });
        }

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