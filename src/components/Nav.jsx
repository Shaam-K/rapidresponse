import { Link} from "react-router-dom";

function Nav() {
  return (
    <nav className="grid place-items-center sticky top-0 bg-bg_main font-Roboto text-lg z-100 bg-accent text-white">
    <div className="flex justify-between md:w-9/12 w-11/12 p-2 my-2">
     <div className="flex justify-center cursor-pointer">
      <Link to="/">
        <img
          src="../public/"
          alt="RRID-logo"
          className=""
          style={{'width': '140px', 'objectFit': 'contain'}}
        />
      </Link> 
    </div>
      <div className="flex justify-center">
        <Link to="/login">
          <a className="py-1">
            Login
          </a>
        </Link>
    </div>
  </div>
</nav>
  )
}

export default Nav