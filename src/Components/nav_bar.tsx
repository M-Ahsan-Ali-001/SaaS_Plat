import  MainLogo from  '../images/logo.png'   

export default  function Navbar(){

    return(
        
        <div className="navbar">
            <img src={MainLogo} className='image-main-logo'/>
            <p className='Project-Name'> Muhammad Ahsan Ali/Test Project(12.14.2025)</p>

            <div className='User-Login-Setting'>
               <div className='User-Login-Setting-icon-left'></div> 
                 <div className='User-Login-Setting-icon-mid'></div> 
                   <div className='User-Login-Setting-icon-right'>⮟</div> 
            </div>
            
        </div>
        
    )
}