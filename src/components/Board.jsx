import { useRef, useEffect } from "react";
import { useCable } from "../contexts/CableContext.jsx";


export default function Board() {
  const containerRef = useRef(null);
  const selectedNodeRef = useRef(null);
  const usedNodesRef = useRef(new Map());
  const userInputRef = useRef(new Map([
    ['inputA', false],
    ["inputB", false],
    ["inputC", false],
    ["inputD", false]
  ]))

  // Nodes that are connected by design, like islands or same line on gate
  // TODO: Move to different file OR figure out automatization (or both)


  //pins in einer Zeile gehören zsm
  const nodeGroups = new Map([
    ["and_1", ["g_and_in_1_1", "g_and_in_1_2"]],
    ["and_2", ["g_and_in_2_1", "g_and_in_2_2"]],
    ["and_3", ["g_and_out_3_1", "g_and_out_3_2"]],
    ["and_4", ["g_and_in_4_1", "g_and_in_4_2"]],
    ["and_5", ["g_and_in_5_1", "g_and_in_5_2"]],
    ["and_6", ["g_and_out_6_1", "g_and_out_6_2"]],
    ["and_7", ["g_and_gnd_7_1", "g_and_gnd_7_2"]],
    ["and_8", ["g_and_in_8_1", "g_and_in_8_2"]],
    ["and_9", ["g_and_in_9_1", "g_and_in_9_2"]],
    ["and_10", ["g_and_out_10_1", "g_and_out_10_2"]],
    ["and_11", ["g_and_in_11_1", "g_and_in_11_2"]],
    ["and_12", ["g_and_in_12_1", "g_and_in_12_2"]],
    ["and_13", ["g_and_out_13_1", "g_and_out_13_2"]],
    ["and_14", ["g_and_vcc_14_1", "g_and_vcc_14_2"]],

    ["or_1", ["g_or_in_1_1", "g_or_in_1_2"]],
    ["or_2", ["g_or_in_2_1", "g_or_in_2_2"]],
    ["or_3", ["g_or_out_3_1", "g_or_out_3_2"]],
    ["or_4", ["g_or_in_4_1", "g_or_in_4_2"]],
    ["or_5", ["g_or_in_5_1", "g_or_in_5_2"]],
    ["or_6", ["g_or_out_6_1", "g_or_out_6_2"]],
    ["or_7", ["g_or_gnd_7_1", "g_or_gnd_7_2"]],
    ["or_8", ["g_or_in_8_1", "g_or_in_8_2"]],
    ["or_9", ["g_or_in_9_1", "g_or_in_9_2"]],
    ["or_10", ["g_or_out_10_1", "g_or_out_10_2"]],
    ["or_11", ["g_or_in_11_1", "g_or_in_11_2"]],
    ["or_12", ["g_or_in_12_1", "g_or_in_12_2"]],
    ["or_13", ["g_or_out_13_1", "g_or_out_13_2"]],
    ["or_14", ["g_or_vcc_14_1", "g_or_vcc_14_2"]],

    ["not_1", ["g_not_in_1_1", "g_not_in_1_2"]],
    ["not_2", ["g_not_out_2_1", "g_not_out_2_2"]],
    ["not_3", ["g_not_in_3_1", "g_not_in_3_2"]],
    ["not_4", ["g_not_out_4_1", "g_not_out_4_2"]],
    ["not_5", ["g_not_in_5_1", "g_not_in_5_2"]],
    ["not_6", ["g_not_out_6_1", "g_not_out_6_2"]],
    ["not_7", ["g_not_gnd_7_1", "g_not_gnd_7_2"]],
    ["not_8", ["g_not_out_8_1", "g_not_out_8_2"]],
    ["not_9", ["g_not_in_9_1", "g_not_in_9_2"]],
    ["not_10", ["g_not_out_10_1", "g_not_out_10_2"]],
    ["not_11", ["g_not_in_11_1", "g_not_in_11_2"]],
    ["not_12", ["g_not_out_12_1", "g_not_out_12_2"]],
    ["not_13", ["g_not_in_13_1", "g_not_in_13_2"]],
    ["not_14", ["g_not_vcc_14_1", "g_not_vcc_14_2"]],

    ["nand_1", ["g_nand_in_1_1", "g_nand_in_1_2"]],
    ["nand_2", ["g_nand_in_2_1", "g_nand_in_2_2"]],
    ["nand_3", ["g_nand_out_3_1", "g_nand_out_3_2"]],
    ["nand_4", ["g_nand_in_4_1", "g_nand_in_4_2"]],
    ["nand_5", ["g_nand_in_5_1", "g_nand_in_5_2"]],
    ["nand_6", ["g_nand_out_6_1", "g_nand_out_6_2"]],
    ["nand_7", ["g_nand_gnd_7_1", "g_nand_gnd_7_2"]],
    ["nand_8", ["g_nand_in_8_1", "g_nand_in_8_2"]],
    ["nand_9", ["g_nand_in_9_1", "g_nand_in_9_2"]],
    ["nand_10", ["g_nand_out_10_1", "g_nand_out_10_2"]],
    ["nand_11", ["g_nand_in_11_1", "g_nand_in_11_2"]],
    ["nand_12", ["g_nand_in_12_1", "g_nand_in_12_2"]],
    ["nand_13", ["g_nand_out_13_1", "g_nand_out_13_2"]],
    ["nand_14", ["g_nand_vcc_14_1", "g_nand_vcc_14_2"]],
  ])

  // Fill with all the outs on init, add connections as we input lines?

  // Dependencies werden geschaffen 1. out dependet auf and 1 und and 2
  // FIXME: RECHTE SEITE BEI KEINEM GATE FUNKTIONIERT
  const dependenciesRef = useRef(new Map([
    ["g_and_out_3_1", [nodeGroups.get("and_1"), nodeGroups.get("and_2")]],
    ["g_and_out_3_2", [nodeGroups.get("and_1"), nodeGroups.get("and_2")]],
    ["g_and_out_6_1", [nodeGroups.get("and_4"), nodeGroups.get("and_5")]],
    ["g_and_out_6_2", [nodeGroups.get("and_4"), nodeGroups.get("and_5")]],
    ["g_and_out_10_1", [nodeGroups.get("and_8"), nodeGroups.get("and_9")]],
    ["g_and_out_10_2", [nodeGroups.get("and_8"), nodeGroups.get("and_9")]],
    ["g_and_out_13_1", [nodeGroups.get("and_11"), nodeGroups.get("and_12")]],
    ["g_and_out_13_2", [nodeGroups.get("and_11"), nodeGroups.get("and_12")]],

    ["g_or_out_3_1", [nodeGroups.get("or_1"), nodeGroups.get("or_2")]],
    ["g_or_out_3_2", [nodeGroups.get("or_1"), nodeGroups.get("or_2")]],
    ["g_or_out_6_1", [nodeGroups.get("or_4"), nodeGroups.get("or_5")]],
    ["g_or_out_6_2", [nodeGroups.get("or_4"), nodeGroups.get("or_5")]],
    ["g_or_out_10_1", [nodeGroups.get("or_8"), nodeGroups.get("or_9")]],
    ["g_or_out_10_2", [nodeGroups.get("or_8"), nodeGroups.get("or_9")]],
    ["g_or_out_13_1", [nodeGroups.get("or_11"), nodeGroups.get("or_12")]],
    ["g_or_out_13_2", [nodeGroups.get("or_11"), nodeGroups.get("or_12")]],

    ["g_not_out_2_1", nodeGroups.get("not_1")],
    ["g_not_out_2_2", nodeGroups.get("not_1")],
    ["g_not_out_4_1", nodeGroups.get("not_3")],
    ["g_not_out_4_2", nodeGroups.get("not_3")],
    ["g_not_out_6_1", nodeGroups.get("not_5")],
    ["g_not_out_6_2", nodeGroups.get("not_5")],
    ["g_not_out_8_1", nodeGroups.get("not_9")],
    ["g_not_out_8_2", nodeGroups.get("not_9")],
    ["g_not_out_10_1", nodeGroups.get("not_11")],
    ["g_not_out_10_2", nodeGroups.get("not_11")],
    ["g_not_out_12_1", nodeGroups.get("not_13")],
    ["g_not_out_12_2", nodeGroups.get("not_13")],

    // TODO: Tamara fragen, ob Nummerierung, z.B. 11 --> [13, 12] korrekt ist..., also wie am Datenblatt?
    ["g_nand_out_3_1", [nodeGroups.get("nand_1"), nodeGroups.get("nand_2")]],
    ["g_nand_out_3_2", [nodeGroups.get("nand_1"), nodeGroups.get("nand_2")]],
    ["g_nand_out_6_1", [nodeGroups.get("nand_4"), nodeGroups.get("nand_5")]],
    ["g_nand_out_6_2", [nodeGroups.get("nand_4"), nodeGroups.get("nand_5")]],
    ["g_nand_out_8_1", [nodeGroups.get("nand_10"), nodeGroups.get("nand_9")]],
    ["g_nand_out_8_2", [nodeGroups.get("nand_10"), nodeGroups.get("nand_9")]],
    ["g_nand_out_11_1", [nodeGroups.get("nand_13"), nodeGroups.get("nand_12")]],
    ["g_nand_out_11_2", [nodeGroups.get("nand_13"), nodeGroups.get("nand_12")]],
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
    const inputs = dependenciesRef.current.get(nodeId) || []; // which nodes does the selected nodeId depend on?
    let inputValues = []
    if (Array.isArray(inputs[0])) {
      inputValues[0] = inputs[0].some(id => usedNodesRef.current.get(id)) || false;
      inputValues[1] = inputs[1].some(id => usedNodesRef.current.get(id)) || false;
    } else {
      inputValues = inputs.map((id) => usedNodesRef.current.get(id)); // returns the 
    }
    console.log("Checking node output", nodeId, inputs, inputValues)
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
        // deal with input/gnd/vcc first, as it's the same for all gates
        switch (splitNodeId[2]) {
          case "in": return usedNodesRef.current.get(inputs[0])
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
        }
      }
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
        dependenciesRef.current.set(toId, [fromId])
        console.log("Dependencies ref value for id: ", dependenciesRef.current.get(id))

        /**
         * ADDED CONSOLE AND ALERT FEEDBACK WITH CHAT-BRO TODO DELETE AFTER LEDs ARE FINISHED!
         */

        // Chat wanted me to delete this next line...
        //usedNodesRef.current.set(id, getNodeOutput(id));

        //Chat added these lines...
        const newValue = getNodeOutput(toId);
        usedNodesRef.current.set(toId, newValue);
        if (/^g_(and|or)_out/.test(toId) && newValue === true) {  // by adapting the regex we can also validate other gates
          console.log(`Output ${toId} is set to TRUE.`);
          alert(`Output ${toId} is set to TRUE.`);
        }
        /**
         * END
         */

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

        console.log(`${key} is ${newValue ? "true" : "false"}`);
        console.log("All input toggles are...");
        console.table(Object.fromEntries(userInputRef.current));
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
