import {Link} from 'react-router-dom';


const NavBar = () =>{



    return (
        <header>
            <div className ="container">
          
                <Link to ="/">
                    <h1>Landing - internBridge</h1>
                </Link>
                <Link to ="home">
                    <h1>Home - internBridge</h1>
                    
                </Link>
            </div>
        </header>

    )
}

export default NavBar;