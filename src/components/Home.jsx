import { Link } from "react-router-dom"

function Home() {
  return (
    <div className='grid place-items-center md:h-[75vh] h-[90vh]'>
      <div className='grid md:place-content-center md:w-9/12 w-11/12 gap-10 my-10'>
          <h1 className="text-4xl md:text-left text-center font-Roboto">Rapid Response</h1>
          <h3 className="text-3xl md:text-left text-center text-accent font-Roboto">An emergency identification system for victims who are incapacitated</h3>
          <div>
            <h3 className="text-3xl text-accent font-Roboto my-5">Features</h3>
            <ul className="text-xl font-OpenSans list-decimal list-inside">
              <span className="grid place-content-center md:gap-3 gap-7">
                <li>A physical card providing basic info </li>
                <li>A qr code when scanned will show a detailed and personalized medical web report</li>
                <li>Aimed to help first responders gather information quickly and save valuable time</li>
              </span>
            </ul>
          </div>
          <Link className="border-2 rounded-sm border-accent hover:bg-accent hover:text-white transition-all md:w-3/12 p-2 font-Roboto text-center text-xl my-5" to="/login">Create Account</Link>
      </div>
    </div>
  )
}

export default Home