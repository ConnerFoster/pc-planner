import {GiHamburgerMenu} from 'react-icons/gi'
import {MdViewList} from 'react-icons/md'

import {Link} from 'react-router-dom'
import {useState, useEffect, useRef} from 'react'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }
  const ref = useRef(null)

  //detect click outside of menu button to close the menu
  const detectClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', detectClick, true)
    return () => {
      document.removeEventListener('click', detectClick, true)
    }
  }, [])

  return (
    <header className='header'>
      <div className='brand'>
        <Link to='/'>
          <span className='yellow'>P</span>C<span className='yellow'>P</span>
          LANNER
        </Link>
      </div>

      <nav className='menu'>
        <button ref={ref} className='btn' onClick={toggleMenu}>
          <GiHamburgerMenu />
        </button>
        <ul className={`menuLinks ${menuOpen ? 'showMenu' : ''}`}>
          <li id='my-list-nav'>
            <Link className='dropdown-links' to='/'>
              <MdViewList style={{paddingTop: '2.5px'}} /> My List
            </Link>
          </li>

          <li>
            <Link className='dropdown-links' to='/categories'>
              Components
            </Link>
          </li>
          <li>
            <Link className='dropdown-links' to='/manufacturers'>
              Manufacturers
            </Link>
          </li>
          <li>
            <Link className='dropdown-links' to='/parts'>
              All Parts
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
