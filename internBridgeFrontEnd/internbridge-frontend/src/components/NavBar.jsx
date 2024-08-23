import {Link} from 'react-router-dom';


const NavBar = () =>{



    return (
        <header>
            <div className ="container">
          
                <Link to ="/">
                    <h1>Landing </h1>
                </Link>
                <Link to ="/home">
                    <h1>Home </h1>  
                </Link>
                <Link to ="/contact-us">
                    <h1>Contact Us </h1>  
                </Link>
                <Link to ="/about-us">
                    <h1>About Us </h1>  
                </Link>
                <Link to ="/company">
                    <h1>Company </h1>  
                </Link>
                <Link to ="/student">
                    <h1>Student </h1>  
                </Link>
            </div>
        </header>

    )
}

export default NavBar;