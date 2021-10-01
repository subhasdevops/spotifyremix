import {Link} from 'react-router-dom'
import {BsFillPersonFill} from 'react-icons/bs'
import {AiOutlineHome} from 'react-icons/ai'
import {ImMusic} from 'react-icons/im'
import {MdQueueMusic} from 'react-icons/md'
import './index.css'

const Header = () => (
  <nav className="side-nav-bar">
    <img
      src="https://res.cloudinary.com/dzfehrv3n/image/upload/v1625840890/Vector_isr50q.png"
      alt="logo"
      className="icon"
    />
    <div className=" icon-cont">
      <div className="icons">
        <Link to="/profile" className="link-color">
          <BsFillPersonFill />
          <p>Profile</p>
        </Link>
      </div>

      <div className="icons">
        <Link to="/" className="link-color">
          <AiOutlineHome />
          <p>Home</p>
        </Link>
      </div>
      <div className="icons">
        <Link to="/yourmusic" className="link-color">
          <ImMusic />
          <p>Your Music</p>
        </Link>
      </div>

      <div className="icons">
        <Link to="/playList" className="link-color">
          <MdQueueMusic />
          <p>Playlists</p>
        </Link>
      </div>
    </div>
  </nav>
)

export default Header
