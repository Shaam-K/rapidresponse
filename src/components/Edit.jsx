import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import QRCode from "react-qr-code";


import { toPng } from 'html-to-image';


function CreateDetails() {

  const {recordId} = useParams();
  let navigate = useNavigate();

  const elementRef = useRef(null);

  const [user, loading, error] = useAuthState(auth);
  

  const [id, setId] = useState("");

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

        setId(userData.data().token)

        const recordData = await getDoc(doc(db, "records", recordId))

        if (recordData.data() == undefined) {
            alert('Report does not exist');
            window.location.href = '/';
        }


        setName(recordData.data().name)
        setphoneNo(recordData.data().phoneNo)
        setbloodType(recordData.data().bloodType)
        setAge(recordData.data().age)
        setGender(recordData.data().gender)
        setEmerMed(recordData.data().emerMed)
        setprevTreat(recordData.data().prevTreat)
        setAllergies(recordData.data().allergies)
        setfamChronic(recordData.data().famChronic)
        setsmokeAlc(recordData.data().smokeAlc)
        setarmForce(recordData.data().armForce)
    })
    ();
  }, [user,loading,error])


  const submitReport = async () => {

    
    await updateDoc(doc(db,"records",id), {
        userId: user.uid,
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

    await toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-id.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });

    alert('Created Successfully! Check Downloads for ID card')

    window.location.href = '/record/' + id

  }
    const createId = async () => {
        await toPng(elementRef.current, { cacheBust: false })
        .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-id.png";
        link.href = dataUrl;
        link.click();
        })
        .catch((err) => {
        console.log(err);
        });

    alert('Created Successfully! Check Downloads for ID card')

    }


    // console.log(Name,phoneNo,emergencyNoRelation1 + '-' + emergencyNo1, emergencyNoRelation2 + '-' + emergencyNo2, bloodType, Age, Gender, EmerMed, prevTreat, Allergies,famChronic, smokeAlc, armForce)


  

  return (
    <div className="grid place-items-center my-10">
        <div className="md:w-9/12 w-11/12">
            <div className="flex my-5">
                <h1 className="text-4xl font-Roboto mr-5">Enter Your Details</h1>
                <span className="text-2xl font-Roboto text-accent font-semibold border-accent cursor-pointer" onClick={() => {
                    createId()
                }}>(Download ID Card)</span>
            </div>
                <h1 className="text-3xl font-Roboto text-zinc-800 my-5">Step 1: Creating ID Card</h1>
                <div className="grid lg:grid-cols-2 grid-cols-1">
                    <div className="grid my-5 gap-7">
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
                    </div>
                    <div className="">
                        <div className="grid place-items-center place-content-center bg-white p-10 w-full overflow-scroll" ref={elementRef}>
                            <div className="grid grid-cols-1 gap-10 font-Roboto">
                                <div className="w-[350px] h-[500px] bg-[#FDFDFD] rounded-md">
                                    <div className="flex justify-between m-3">
                                        <img src="/logo-text.png" alt="logo" className="w-[120px]" />
                                        <h1 className="text-zinc-800">#{id}</h1>
                                    </div>
                                    <div className="grid place-items-center h-[175px]">
                                        <h1 className="my-5 text-[#59BF35] font-semibold">Scan In Emergency</h1>
                                        <div style={{ height: "auto", margin: "0 auto", maxWidth: 100, width: "100%" }}>
                                            <QRCode
                                            size={256}
                                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                            value={'https://rapidresponse.vercel.app/record/'+id}
                                            viewBox={`0 0 256 256`}
                                            />
                                        </div>
                                        <h1 className="text-[#59BF35] font-semibold my-5">WEB REPORT</h1>
                                    </div>

                                    <div className="m-5 pt-5">
                                        <h1 className="text-2xl font-bold">{Name}</h1>
                                        <h1 className="text-xl">{phoneNo}</h1>
                                    </div>

                                    <div className="flex justify-between m-5">
                                        <div className="mt-5">
                                            <h1 className="text-xl text-[#59BF35] font-semibold">Contacts</h1>
                                            <h1 className="text-lg">{emergencyNoRelation1 + ' - ' + emergencyNo1}</h1>
                                            <h1 className="text-lg">{emergencyNoRelation2 + ' - ' + emergencyNo2}</h1>
                                        </div>
                                        <div className="mt-5">
                                            <h1 className="text-xl font-semibold">Blood Type</h1>
                                            <h1 className="text-2xl text-[#59BF35] font-semibold">{bloodType}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[350px] h-[500px] bg-[#FDFDFD] rounded-md">
                                    <div className="flex justify-between m-3">
                                        <img src="/logo-text.png" alt="logo" className="w-[120px]" />
                                        <h1 className="text-zinc-800">#{id}</h1>
                                    </div>
                                    <div className="grid gap-5">
                                        <div className="grid gap-3 m-3 font-Roboto text-[#59BF35]">
                                            <h1 className="text-2xl mt-5 font-semibold">Disclaimer</h1>
                                            <h1 className="font-OpenSans">By using this card you are agreeing to safekeep the card from unwanted people. Know that the data set by you is visible for anyone that scans the QR Code.</h1>
                                        </div>

                                        <div className="grid gap-3 m-3 font-Roboto text-[#59BF35]">
                                            <h1 className="text-2xl mt-5 font-semibold">Note</h1>
                                            <h1>Scratched cards can create inaccuracies for the QR Code. If so, you can visit <span className="font-semibold">{'https://rapidresponse.vercel.app/record/'+id}</span></h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>     
                    <button type="button" onClick={submitReport} className="bg-zinc-800 text-xl p-3 px-5 text-white font-OpenSans hover:bg-accent transition-all cursor-pointer rounded-sm font-semibold" value="Submit"> Submit </button>    
                </div>
        </div>
    </div>
    )
}

export default CreateDetails;
