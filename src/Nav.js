import React ,{useEffect, useState} from 'react';
import "./Nav.css";

const Nav = () => {

    const [show,setshow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setshow(true);
            }else setshow(false);
        });

        return ()=>{
            window.removeEventListener("scroll");
        }
    }, [])


    return (
        <div className={`nav ${show && "nav__black"} `}>
            <img
            className="nav__logo" 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="netflixlogo" />
           <img
           className="nav__avtar"
            src="./img/profile.png" alt="profile img" />
        </div>
    )
}

export default Nav;
