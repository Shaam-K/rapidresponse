import { UserAuth } from "../context/AuthContext";

function CreateAcc() {

  const {googleSignIn} = UserAuth();


  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='grid place-items-center'>
        <div className='md:w-9/12 w-11/12 my-10'>
            <h1 className='text-4xl font-Roboto'>Create Account / Login</h1>
            <div className='h-[50vh] grid place-content-center'>
              <h3 className='text-xl text-zinc-700 my-3 font-OpenSans'>* Authenticate with Google *</h3>
                <button onClick={handleGoogleSignIn} type="button" className="text-white bg-accent hover:bg-accent/90 focus:ring-4 focus:ring-accent/50 font-medium rounded-lg text-md px-5 py-4 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                <svg className="mr-2 -ml-1 w-6 h-6" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                Continue with Google
                </button>
            </div>
        </div>
    </div>
  )
}

export default CreateAcc