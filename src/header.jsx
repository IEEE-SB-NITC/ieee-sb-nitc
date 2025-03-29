import logo from "./assets/logo.png";

function Header(){
    return(
        <div className="header">
        <div className="main">
            <div >
                <img className="logo" src={logo} alt="" />
            </div>
            <div className="items">
                <button>Home</button>
                <button>Chapters</button>
                <button>Execom</button>
                <button>Gallery</button>
                <button>Contact Us</button>
                <button>Blogs</button>
                <button>Join IEEE</button>
            </div>
        </div>
        <div className="ieee">
            <span>IEEE SB NITC</span>
            <span>EXECOM 2025-26</span>
        </div>
        <div className="moto">"Where Passion meets technology, we pave the way for engineering excellence"</div>
        <div className="meet">
            <span className="meet-first">Meet</span> Our <span className="meet-second">Team</span>
        </div>
        </div>
    )
}

export default Header