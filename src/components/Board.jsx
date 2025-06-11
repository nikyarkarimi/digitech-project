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
  const connectionsRef = useRef([]);
  const usedNodesRef = useRef(new Set());

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

  useEffect(() => {
    let svgElement;

    const handleNodeClick = (id) => {
      if (usedNodesRef.current.has(id)) {
        if (selectedNodeRef.current === id) {
          usedNodesRef.current.delete(id);
          selectedNodeRef.current = null;
        }
        return;
      }

      usedNodesRef.current.add(id);

      if (selectedNodeRef.current === null) {
        selectedNodeRef.current = id;
      } else {
        const fromId = selectedNodeRef.current;
        const toId = id;

        const colorClass = getColorClass(); // Aktuelle Farbe lesen

        if (!colorClass) {
          console.warn("No valid cable color = no connection...");
          usedNodesRef.current.delete(fromId); // optional: Knoten wieder freigeben
          usedNodesRef.current.delete(toId);
          selectedNodeRef.current = null;
          return;
        }

        drawLineBetween(fromId, toId, colorClass);
        connectionsRef.current.push([fromId, toId]);
        selectedNodeRef.current = null;
      }
    };

    const handleLineClick = (lineId) => {
      const [_, fromId, toId] = lineId.split("-");
      document.getElementById(lineId)?.remove();
      document.getElementById(`v_line-${fromId}-${toId}`)?.remove();
      usedNodesRef.current.delete(fromId);
      usedNodesRef.current.delete(toId);


    };

    // Zeichne Linie mit übergebener CSS-Klasse
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
