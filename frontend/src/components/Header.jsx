import { GiHamburgerMenu } from "react-icons/gi";
import {Link} from 'react-router-dom'
import { useState } from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(true)

  const toggleMenu = () => {
      setMenuOpen(prev => !prev)
  }

  return (
    <header className="header">
        <div className="brand">
            <Link to='/'><span className="yellow">P</span>C<span className="yellow">P</span>LANNER</Link>
        </div>

        <nav className="menu">
            <button className="btn" onClick={toggleMenu}> <GiHamburgerMenu /> </button>
            <ul className={`menuLinks ${menuOpen ? "showMenu" : ""}`}>
                <li><Link to='/'>My List</Link></li>
                <hr />
                <li><Link to='/categories'>Categories</Link></li>
                <li><Link to='/manufacturers'>Manufacturers</Link></li>
                <li><Link to='/parts'>All Parts</Link></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header