import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../config/firebase';

function Record() {

  const { recordId } = useParams();

  const [Name, setName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [contact1, setcontact1] = useState("");
  const [contact2, setcontact2] = useState("");
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
        const recordData = await getDoc(doc(db, "records", recordId))

        setName(recordData.data().name)
        setphoneNo(recordData.data().phoneNo)
        setcontact1(recordData.data().contact1)
        setcontact2(recordData.data().contact2)
        setbloodType(recordData.data().bloodType)
        setAge(recordData.data().age)
        setGender(recordData.data().gender)
        setEmerMed(recordData.data().emerMed)
        setprevTreat(recordData.data().prevTreat)
        setAllergies(recordData.data().allergies)
        setfamChronic(recordData.data().famChronic)
        setsmokeAlc(recordData.data().smokeAlc)
        setarmForce(recordData.data().armForce)
    })()
}, [recordId]);

  return (
    <div className='grid place-items-center'>
        <div className='md:w-1/2 w-11/12'>
            <h1 className='text-3xl my-5 mt-10 border-b-2 border-accent font-Roboto font-semibold'>{Name}'s Report</h1>
            <div className='grid gap-10'>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>NAME</h1>
                    <h1 className='text-xl font-OpenSans'>{Name}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>PHONE NO</h1>
                    <h1 className='text-xl font-OpenSans'>{phoneNo}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>CONTACTS</h1>
                    <h1 className='text-xl font-OpenSans'>{contact1}</h1>
                    <h1 className='text-xl font-OpenSans'>{contact2}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>BLOOD TYPE</h1>
                    <h1 className='text-xl font-OpenSans'>{bloodType}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>AGE</h1>
                    <h1 className='text-xl font-OpenSans'>{Age}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>GENDER</h1>
                    <h1 className='text-xl font-OpenSans'>{Gender}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>MEDICATIONS USED</h1>
                    <h1 className='text-xl font-OpenSans'>{!EmerMed ? 'Not mentioned': EmerMed}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>PREVIOUS TREATMENTS</h1>
                    <h1 className='text-xl font-OpenSans'>{!prevTreat ? 'Not mentioned': prevTreat}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>ALLERGIES</h1>
                    <h1 className='text-xl font-OpenSans'>{!Allergies ? 'Not mentioned': Allergies}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>FAMILY RELATED ILLNESS</h1>
                    <h1 className='text-xl font-OpenSans'>{!famChronic ? 'Not mentioned': famChronic}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>SMOKING / ALCOHOL USE</h1>
                    <h1 className='text-xl font-OpenSans'>{smokeAlc}</h1>
                </div>
                <div className='grid gap-3'>
                    <h1 className='text-2xl text-accent font-bold font-Roboto'>SERVED IN ARMED FORCED</h1>
                    <h1 className='text-xl font-OpenSans'>{armForce}</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Record