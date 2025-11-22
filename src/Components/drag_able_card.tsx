
interface drag_able_item_F {
    img_ref:string
    ,
    title:String,
    id:Number
}

export default function Drag_able_card(props:drag_able_item_F){
    const onDragStart = (event: React.DragEvent<HTMLDivElement>)=>{
    event.dataTransfer.setData("iid", String(props.id)); // store class
    event.dataTransfer.effectAllowed = "move";

    }
    return(

        <>
        <div className="drag_able_card"    draggable={true} onDragStart={onDragStart} >
            <img  className={'drag_able_card-img'} draggable={false}  src={props.img_ref}/>
            <p className={'drag_able_card-title'}  draggable={false}  >{props.title}</p>

        </div>

        
        
        </>
    )
}