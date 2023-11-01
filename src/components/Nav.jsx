import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Nav = () => {

  const {user,logOut,token} = UserAuth();

  const navigate = useNavigate();

  function dropDown() {
    document.getElementById("show_Drop").classList.toggle("hidden");
  }

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log("Error Logging In");
    }
  } 
  
  return (
    <nav className="grid place-items-center sticky top-0 bg-bg_main font-Roboto text-lg z-100 bg-zinc-800 text-white">
    <div className="flex justify-between md:w-9/12 w-11/12 p-2 my-2">
     <div className="flex cursor-pointer">
      <Link to="/">
        <img
          src="/logo.png"
          alt="RRID-logo"
          className=""
          style={{'width': '140px', 'objectFit': 'contain'}}
        />
      </Link> 
    </div>
      <div className="grid place-items-center font-semibold">

        {user?.displayName ?           <span className="md:text-lg text-white">
                      <h1 className="text-xl cursor-pointer" onClick={() => {
                        dropDown();
                      }}>{user.displayName}</h1>
                      <div id="show_Drop" className="hidden absolute lg:right md:right-auto right-0 bg-zinc-800 p-5 text-right grid gap-2 md:w-[10vw] w-[50vw]">
                        <h1 className="cursor-pointer" onClick={() => {
                            window.location.href = "/record/" + token
                          }}>
                                My Report
                            </h1>
                            <h1 className="cursor-pointer" onClick={() => {
                              window.location.href = '/edit/' + token
                            }}>
                              Edit Report
                          </h1>
                          <h1 className="cursor-pointer" onClick={() => {
                            window.location.href = '/delete/' + token
                          }}>
                            Delete Report
                        </h1> 
                        <h1 className="cursor-pointer" onClick={() => {
                          handleSignOut();
                        }}>Sign Out</h1>
                      </div>
    
            </span>: 
            <div className="flex textl-xl cursor-pointer">
              <Link className="mx-7" to="/signup">
                Login
            </Link>             
            </div>}
    </div>
  </div>
</nav>
  )
}

export default Nav