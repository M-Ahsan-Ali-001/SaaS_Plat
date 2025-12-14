import web from '../images/mouse_click.png';
export default function Mouse_click (props){
    return(
        <div className="trigger" key={102} data-key={props.data_key}>
      <div  className="trigger-navbar">
         <img  className={'open_url-img'}   src={web}/>
        <p>Mouse Click</p>
      </div>

      <div className="open_url-input_area">

        <p>xpath </p>
        <p  className="red-area"> *</p>
        <input className="open_url_input"/>
        

      </div>
      
    </div>
    )
}