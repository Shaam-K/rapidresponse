import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function CreateDetails() {
  let navigate = useNavigate();

  const [user, loading, error] = useAuthState(auth);

  const [Name, setName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [emergencyNoRelation1, setemergencyNoRelation1] = useState("");
  const [emergencyNo1, setemergencyNo1] = useState("");
  const [emergencyNoRelation2, setemergencyNoRelation2] = useState("");
  const [emergencyNo2, setemergencyNo2] = useState("");
  const [bloodType, setbloodType] = useState("");
  const [Age, setAge] = useState(0);
  const [Gender, setGender] = useState("Male");
  const [EmerMed, setEmerMed] = useState("");
  const [prevTreat, setprevTreat] = useState("")
  const [Allergies, setAllergies] = useState("")
  const [famChronic, setfamChronic] = useState("");
  const [smokeAlc, setsmokeAlc] = useState("Yes");
  const [armForce, setarmForce] = useState("Yes");


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



  const submitReport = async () => {
    const userData =  await getDoc(doc(db, "users", user.uid))

    const token = userData.data().token
    
    await setDoc(doc(db,"records",token), {
        name: Name,
        phoneNo: phoneNo,
        contact1: emergencyNoRelation1 + '-' + emergencyNo1,
        contact2: emergencyNoRelation2 + '-' + emergencyNo2,
        bloodType: bloodType,
        age: Age,
        gender: Gender,
        emerMed: EmerMed,
        prevTreat: prevTreat,
        allergies: Allergies,
        famChronic: famChronic,
        smokeAlc: smokeAlc,
        armForce: armForce
    })

    navigate('/')
  }


    // console.log(Name,phoneNo,emergencyNoRelation1 + '-' + emergencyNo1, emergencyNoRelation2 + '-' + emergencyNo2, bloodType, Age, Gender, EmerMed, prevTreat, Allergies,famChronic, smokeAlc, armForce)


  

  return (
    <div className="grid place-items-center my-10">
        <div className="md:w-9/12 w-11/12">
            <h1 className="text-4xl font-Roboto my-5">Enter Your Details</h1>
                <h1 className="text-3xl font-Roboto text-zinc-800 my-5">Step 1: Creating ID Card</h1>
                <div className="grid my-5 gap-7 w-2/4">
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">NAME</label>
                        <input type="text" className="font-OpenSans" placeholder="Enter Your Name" value={Name} onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </div>  
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">PHONE NO</label>
                        <input type="text" className="font-OpenSans" placeholder="Enter Your Phone No" value={phoneNo} onChange={(e) => {
                            setphoneNo(e.target.value)
                        }}/>
                    </div>  
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">EMERGENCY CONTACT - 1</label>
                        <span className="flex">
                            <input type="text"  className="w-full font-OpenSans" placeholder="Enter Relation" value={emergencyNoRelation1} onChange={(e) => {
                                setemergencyNoRelation1(e.target.value)
                            }} />
                            <input type="text" className="w-full font-OpenSans" placeholder="Enter Phone no" value={emergencyNo1} onChange={(e) => {
                                setemergencyNo1(e.target.value)
                            }} />
                        </span>
                    </div>  
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">EMERGENCY CONTACT - 2</label>
                            <span className="flex">
                                <input type="text" className="w-full font-OpenSans" placeholder="Enter Relation" value={emergencyNoRelation2} onChange={(e) => {
                                    setemergencyNoRelation2(e.target.value)
                                }} />
                                <input type="text" className="w-full font-OpenSans" placeholder="Enter Phone No" value={emergencyNo2} onChange={(e) => {
                                    setemergencyNo2(e.target.value)
                                }} />
                            </span>
                    </div>
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">BLOOD TYPE</label>
                        <input type="text" className="font-OpenSans" placeholder="Enter Your Blood Type" value={bloodType} onChange={(e) => {
                            setbloodType(e.target.value)
                        }}/>
                    </div>  
                    <h1 className="text-3xl font-Roboto text-zinc-800 mt-5">Step 2: Creating Report</h1>
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">YOUR AGE</label>
                        <input type="number" min={0} className="font-OpenSans"
                         value={Age} onChange={(e) => {
                            setAge(e.target.value)
                         }}/>
                    </div>  
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">GENDER</label>
                        <select name="" id="" className="font-OpenSans" value={Gender} onChange={(e) => {
                            setGender(e.target.value)
                        }}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>  
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">MEDICATIONS</label>
                        <textarea name="" id="" cols="30" rows="10" className="font-OpenSans" value={EmerMed} onChange={(e) => {
                            setEmerMed(e.target.value)
                        }} placeholder="List of medicines that you use on a regular basis"></textarea>
                    </div>  
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">PREVIOUS TREATMENTS</label>
                        <textarea name="" id="" cols="30" rows="10" className="font-OpenSans" placeholder="Any treatments we need to know aobut?" value={prevTreat} onChange={(e) => {
                            setprevTreat(e.target.value)
                        }}></textarea>
                    </div>  
                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">ALLERGIES</label>
                        <textarea name="" id="" cols="30" rows="10" className="font-OpenSans" placeholder="Any allergies? If so list them" value={Allergies} onChange={(e) => {
                            setAllergies(e.target.value)
                        }}></textarea>
                    </div>  

                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">FAMILY HISTORY</label>
                        <textarea name="" id="" cols="30" rows="10" className="font-OpenSans" placeholder="Does your family have a history of any disease?" value={famChronic} onChange={(e) => {
                            setfamChronic(e.target.value)
                        }}></textarea>
                    </div>  

                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">SMOKE OR ALCOHOL USE</label>
                        <select name="" id="" className="font-OpenSans" value={smokeAlc}
                        onChange={(e) => {
                            setsmokeAlc(e.target.value)
                        }}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>  

                    <div className="grid gap-3">
                        <label className="font-Roboto text-accent font-bold italic">HAVE YOU SERVED IN ARMED FORCES</label>
                        <select name="" id="" className="font-OpenSans" value={armForce} onChange={(e) => {
                            setarmForce(e.target.value)
                        }}>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                        <button type="button" onClick={submitReport} className="bg-accent text-xl p-3 px-5 text-white font-OpenSans hover:bg-blue-600 transition-all cursor-pointer rounded-sm font-semibold" value="Submit"> Submit </button>             
                </div>
        </div>
    </div>
    )
}

export default CreateDetails;
