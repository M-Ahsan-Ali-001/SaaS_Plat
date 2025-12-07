import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react';
import Drag_able_card from './drag_able_card';
import borwser_control from '../images/open_url.png';
import { DesignContext } from '../Global_stateMangement/design_stack';
import Open_Url from '../playground_content/Open_url';

export default function DesignStateToolBoxArea() {
  const { stack, setStack, normal_dict, setNormal_dict, unqiue_key, setUnqiueKey } = useContext(DesignContext);
  const [display_block, setDisplayBlocks] = useState([]);
  
  // Ref for the scrollable container
  const playgroundRef = useRef(null);

  useEffect(() => {
    Object.keys(unqiue_key).forEach((item, idx) => {
      const it = unqiue_key[item];
      setDisplayBlocks([...display_block, normal_dict[it]]);
    });
  }, [stack, normal_dict, unqiue_key]);

  // Re-draw lines whenever blocks change
  useLayoutEffect(() => {
    polyline_handler();
  }, [display_block]);

  const onDragCapture = (event) => {
    event.preventDefault();

    const iid = event.dataTransfer.getData("iid");
    if (iid === '1') {
      const unique_key_map = {
        1: "A",
        2: "B",
        15: "C"
      };

      const newKey = generateUniqueRandomNumber(unqiue_key); // Passed unqiue_key state instead of static obj

      setUnqiueKey({
        ...unqiue_key,
        [newKey]: iid
      });

      setNormal_dict({
        ...normal_dict,
        [iid]: <Open_Url data_key={newKey} />
      });
    }
  };

  function generateUniqueRandomNumber(unique_key_obj) {
    const usedKeys = new Set(Object.keys(unique_key_obj).map(Number));
    let num = Math.floor(Math.random() * 100000);
    while (usedKeys.has(num)) {
      num = Math.floor(Math.random() * 100000);
    }
    return num;
  }

  const polyline_handler = () => {
    const container = playgroundRef.current;
    if (!container) return;

    // 1. Setup SVG inside the container
    let svg = document.getElementById("dynamic-svg");
    if (!svg) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("id", "dynamic-svg");
      svg.style.position = "absolute";
      svg.style.top = "0";
      svg.style.left = "0";
      svg.style.width = "100%";
      svg.style.height = "100%";
      svg.style.pointerEvents = "none"; // Allow clicking through lines
      svg.style.overflow = "visible";   // Allow lines to render if container expands
      svg.style.zIndex = "-1";           // Behind the cards
      container.appendChild(svg);
    }

    // 2. Clear previous lines
    svg.innerHTML = "";

    const ky = Object.keys(unqiue_key);
    if (ky.length <= 1) return;

    let i = 0;
    const containerRect = container.getBoundingClientRect();

    while (i < ky.length - 1) {
      const first_item = ky[i];
      const second_item = ky[i + 1];

      const dom1 = document.querySelector(`[data-key="${first_item}"]`);
      const dom2 = document.querySelector(`[data-key="${second_item}"]`);

      if (!dom1 || !dom2) {
        console.warn("Missing element for", first_item, second_item);
        i++;
        continue;
      }

      const rect1 = dom1.getBoundingClientRect();
      const rect2 = dom2.getBoundingClientRect();

      // 3. Calculate offsets relative to the container + scroll position
      const x1 = (rect1.left - containerRect.left) + container.scrollLeft + (rect1.width / 2);
      const y1 = (rect1.bottom - containerRect.top) + container.scrollTop;

      const x2 = (rect2.left - containerRect.left) + container.scrollLeft + (rect2.width / 2);
      const y2 = (rect2.top - containerRect.top) + container.scrollTop;

      // 4. Draw Polyline
      const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      polyline.setAttribute("points", `${x1},${y1} ${x2},${y2}`);
      polyline.setAttribute("stroke", "black");
      polyline.setAttribute("fill", "none");
      polyline.setAttribute("stroke-width", "3");
      
      svg.appendChild(polyline);
      i++;
    }
  };

  return (
    <div className="deisgn_state_tool_box_area">
      {/* Left Toolbar */}
      <div className="Tool-Area">
        <div className="run-debug-area">
          <div className="button-run">Run</div>
          <div className="button-Debug">Debug</div>
          <div className="button-stop">Stop</div>
        </div>
        <div className="txt-tool-area">
          <p>All Available Options</p>
          <p>⮟</p>
        </div>
        <div className="dragable-controle-area">
          <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={1} />
          <Drag_able_card img_ref={borwser_control} title={'Mouse Click'} id={2} />
          <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={3} />
          <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={4} />
          <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={5} />
          <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={6} />
          <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={7} />
        </div>
      </div>

      <div className="Tool-Area-side-bar"></div>

      {/* Main Playground Area */}
      <div 
        className="play-ground_area_design" 
        ref={playgroundRef}
        onDrop={onDragCapture} 
        onDragOver={(event) => event.preventDefault()}
      >
        {display_block}
        <br></br>
         <br></br>
          <br></br>
           <br></br>
            <br></br>
      </div>
    </div>
  );
}