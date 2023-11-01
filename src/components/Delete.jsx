import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../config/firebase';
import { UserAuth } from '../context/AuthContext';


function Delete() {
    
    const {recordId} = useParams();

    const {user,logOut} = UserAuth();

    let navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const userData = await getDoc(doc(db,"users", user.uid))


            if(userData.data().token != recordId) {
                alert('Access Denied')
                navigate('/');
            }
        })
        ();
    },[user.uid,recordId])


    const deleteRecord = async () => {
        const Record = doc(db, "records", recordId);

        await deleteDoc(Record);

        await logOut();

        alert('Your Report has been deleted');

        navigate('/');

    }

  return (

    <div className='grid place-content-center md:m-0 m-3'>
        <div className='md:w-9/12 w-11/12 my-10'>
            <div className='grid gap-10 font-OpenSans'>
                <h1 className='text-2xl'>If you do not want your Report to be stored anymore, you can click the button below and delete it permanently.</h1>
                <h1 className='text-2xl'><b>Note:</b> To use our services again, you can create a new Report, we will miss you :*(</h1>

                <button onClick={deleteRecord} className='bg-red-600 hover:bg-red-500 md:w-1/4 w-3/6 p-3 text-xl text-white font-Roboto font-semibold'>Delete Record</button>
            </div>
        </div>
    </div>
  )
}

export default Delete