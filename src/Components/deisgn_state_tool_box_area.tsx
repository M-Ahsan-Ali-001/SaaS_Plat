import React, { useContext, useEffect, useState, useLayoutEffect, useRef } from 'react';
import Drag_able_card from './drag_able_card';
import borwser_control from '../images/open_url.png';
import mouse_click from '../images/mouse_click.png';
import { DesignContext } from '../Global_stateMangement/design_stack';
import Open_Url from '../playground_content/Open_url';
import Mouse_click from '../playground_content/Mouse_click';
import PolyLine from '../playground_content/poly_line';

export default function DesignStateToolBoxArea() {
  const { stack, setStack, normal_dict, setNormal_dict, unqiue_key, setUnqiueKey } = useContext(DesignContext);
  const [display_block, setDisplayBlocks] = useState([]);
  
  // Ref for the scrollable container
  const playgroundRef = useRef(null);

  useEffect(() => {
    console.log(unqiue_key)
    let obj = []
    Object.keys(unqiue_key).forEach((item, idx) => {
      const it = unqiue_key[item];
      obj.push(<PolyLine/>)
      obj.push(normal_dict[it])
    });

    setDisplayBlocks(obj);
  }, [ normal_dict, unqiue_key]);



  const onDragCapture = (event) => {
    event.preventDefault();

    const iid = event.dataTransfer.getData("iid");
    console.log('oiid',iid)
    console.log('oiid',typeof(iid))
    console.log('oiid',iid == '1')
    const newKey = 'A'+String(generateUniqueRandomNumber(unqiue_key)); // Passed unqiue_key state instead of static obj
    if (iid == '1') {
     
      console.log('if --oiid',iid)
     

      setUnqiueKey({
        ...unqiue_key,
        [newKey]: iid
      });

      setNormal_dict({
        ...normal_dict,
        [iid]: <Open_Url data_key={newKey} />
      });
    }
  else if(iid == '2'){
   
       console.log('elseif --oiid',iid)
      setUnqiueKey({
        ...unqiue_key,
        [newKey]: iid
      });

      setNormal_dict({
        ...normal_dict,
        [iid]: <Mouse_click data_key={newKey} />
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
          <Drag_able_card img_ref={mouse_click} title={'Mouse Click'} id={2} />
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