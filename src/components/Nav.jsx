import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate} from "react-router-dom";
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function Nav() {

  let navigate = useNavigate();

  const [Report, setReport] = useState(false);

  const [Name, setName] = useState("");
  const [Token, setToken] = useState("");
  const [user,loading,error] = useAuthState(auth);


  useEffect(() => {
    (async () => {
        if (loading) return;
        if (error) navigate('/login');

        if (user) {
            const userData = await getDoc(doc(db, "users",
            user.uid))


            const recordData = await getDoc(doc(db, "records", userData.data().token))

            if (recordData.data() !== undefined) {
              setReport(true)
            }

            setName(userData.data().name);
            setToken(userData.data().token)
        }
    })
    ();
  })


  const signUserOut = () => {
    signOut(auth).then(() => {
        window.location.pathname = "/";
    });
  };

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
        {user ? <div className="flex md:text-lg">
                  {
                    Report ?                     <div onClick={() => {
                      window.location.href = '/record/' + Token
                  }} className="mx-10 cursor-pointer">
                      My Report
                  </div> : <div onClick={() => {
                      window.location.href = '/create/'
                  }} className="mx-10 cursor-pointer">
                      Create Report
                  </div> 
                  }
                    <h1 className="cursor-pointer" onClick={signUserOut}>Sign Out ({Name})</h1>
            </div>: <Link to="/signup">
            Login
        </Link>}
    </div>
  </div>
</nav>
  )
}

export default Nav