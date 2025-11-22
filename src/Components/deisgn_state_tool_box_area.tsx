import Drag_able_card from './drag_able_card';
import borwser_control from '../images/open_url.png'
import React from 'react';
import { DesignContext } from '../Global_stateMangement/design_stack';
import { useContext, useEffect, useState } from "react";
import Open_Url from '../playground_content/Open_url';

export default function DesignStateToolBoxArea() {
  const { stack, setStack,normal_dict,setNormal_dict } = useContext(DesignContext);
  const [display_block,setDisplayBlocks] = useState([])
  useEffect(()=>{
    stack.forEach((item:string,idx)=>{
   
  //  alert(typeof normal_dict[item]);
   setDisplayBlocks([...display_block,normal_dict[item]])
   console.log(item)

    })



  },[stack,normal_dict])


  const onDragCapture = (event:React.DragEvent<HTMLDivElement>)=>{
            event.preventDefault();
            const iid = event.dataTransfer.getData("iid");
            if (iid =='1'){
              setStack([...stack, iid]);
              setNormal_dict({
  ...normal_dict,
  [iid]: <Open_Url />
});



            }
  }
  return (
    <div className="deisgn_state_tool_box_area">
      {/* Left Toolbar */}
      <div className="Tool-Area" >
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
         <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={1}/>
         <Drag_able_card img_ref={borwser_control} title={'Mouse Click'} id={2}/>
         <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={3}/>
         <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={4}/>
         <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={5}/>
         <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={6}/>
         <Drag_able_card img_ref={borwser_control} title={'Open Url'} id={7}/>
         {/* <Drag_able_card img_ref={null} title={''} id={2}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
        <Drag_able_card img_ref={null} title={''} id={1}/>
         <Drag_able_card img_ref={null} title={''} id={1}/>
          <Drag_able_card img_ref={null} title={''} id={1}/>
           <Drag_able_card img_ref={null} title={''} id={1}/> */}
        </div>
      </div>

      <div className="Tool-Area-side-bar">
      </div>

      <div className="play-ground_area_design" onDrop={onDragCapture} onDragOver={(event) => event.preventDefault()}>
         {display_block}
      </div>
    </div>
  );
}
