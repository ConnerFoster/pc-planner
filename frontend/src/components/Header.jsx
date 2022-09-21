import { GiHamburgerMenu } from "react-icons/gi";
import { MdViewList } from "react-icons/md";
import { CgClose } from "react-icons/cg";

import {Link} from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
      setMenuOpen(prev => !prev)
  }

  const icon = menuOpen ? <CgClose /> :  <GiHamburgerMenu />

  return (
    <header className="header">
        <div className="brand">
            <Link to='/'><span className="yellow">P</span>C<span className="yellow">P</span>LANNER</Link>
        </div>

        <nav className="menu">
            <button className="btn" onClick={toggleMenu}> {icon} </button>
            <ul className={`menuLinks ${menuOpen ? "showMenu" : ""}`}>
                <li id="my-list-nav"><Link to='/'><MdViewList style={{paddingTop: '2.5px'}}/> My List</Link></li>
                
                <li><Link to='/categories'>Categories</Link></li>
                <li><Link to='/manufacturers'>Manufacturers</Link></li>
                <li><Link to='/parts'>All Parts</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header