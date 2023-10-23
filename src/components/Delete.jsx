import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth, db } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';


function Delete() {
    
    const {recordId} = useParams();

    

    let navigate = useNavigate();


    const deleteRecord = async () => {
        const Record = doc(db, "records", recordId);

        await deleteDoc(Record);

        alert('Your Report has been deleted')

        navigate('/')

    }

  return (

    <div className='grid place-content-center'>
        <div className='md:w-9/12 w-11/12 my-10'>
            <div className='grid gap-10 font-OpenSans'>
                <h1 className='text-2xl'>If you do not want your Report to be stored anymore, you can click the button below and delete it permanently.</h1>
                <h1 className='text-2xl'><b>Note:</b> To use our services again, you can create a new Report, we will miss you :*(</h1>

                <button onClick={deleteRecord} className='bg-red-600 hover:bg-red-500 w-1/4 p-3 text-xl text-white font-Roboto font-semibold'>Delete Record</button>
            </div>
        </div>
    </div>
  )
}

export default Delete