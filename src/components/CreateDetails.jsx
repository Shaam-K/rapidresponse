import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function CreateDetails() {
  let navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  const [Name, setName] = useState("");
  const [phoneNo, setphoneNo] = useState();
  const [emergencyNo1, setemergencyNo1] = useState();
  const [emergencyNo2, setemergencyNo2] = useState();
  const [bloodType, setbloodType] = useState("o+ve");
  const [Age, setAge] = useState();
  const [Gender, setGender] = useState("");
  const [EmerMed, setEmerMed] = useState("");
  const [prevTreat, setprevTreat] = useState("")
  const [Allergies, setAllergies] = useState("")
  const [famChronic, setfamChronic] = useState("");
  const [smokeAlc, setsmokeAlc] = useState(false);
  const [armForce, setarmForce] = useState(false);


  useEffect(() => {
    (async () => {
        if (loading) return;
        if (error) navigate('/signup')
        if (!user) {
            navigate('/signup')
        }
        const userData = await getDoc(doc(db, "users", user.uid))

        const token = userData.data().token

        const recordData = await getDoc(doc(db, "records", token))

        if (recordData.data() !== undefined) {
            navigate('/')
        }
    })
    ();
  }, [user,loading,error])

  return <div>CreateDetails</div>;
}

export default CreateDetails;
