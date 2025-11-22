import web from "../images/open_url.png" 
export default function Open_Url (){
    return(
        <div className="trigger" key={101}>
      <div  className="trigger-navbar">
         <img  className={'open_url-img'}   src={web}/>
        <p>Open URL</p>
      </div>

      <div className="open_url-input_area">

        <p>Insert Url </p>
        <p  className="red-area"> *</p>
        <input className="open_url_input"/>
        

      </div>
      
    </div>
    )
}