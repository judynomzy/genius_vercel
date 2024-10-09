import React from 'react'
import { Link } from 'react-router-dom';

const AboutUs = () => {
   return (
      <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center p-8">
        {/* Navbar */}
       <div className='flex justify-between '>
          <nav>
            <ul className='flex justify-between gap-16  pb-6 text-yellow-200 text-xl'>
              <li className=' hover:text-yellow-600 '><a href='/about-us'>Home</a></li>
              <li className=' hover:text-yellow-600 cursor-pointer'><Link to='/editorial-board'>Editorial Board</Link></li>
              <li className='cursor-pointer hover:text-yellow-600' >
              <Link to='/'>Online Store</Link>
                </li>
              <li className='cursor-pointer hover:text-yellow-600'><Link to='/events'>Event</Link></li>
            </ul>
          </nav>
       </div>
       <div className='font-extrabold font-serif text-5xl text-center'>
       Genius Multidisciplinary International Journal Publication, Nigeria(GMIJPN)
       <p>ISSN: 2971-7760</p>
       </div>
  
        {/* Page Content */}
        <div className="mt-20 max-w-4xl text-center">
          <h1 className="text-5xl text-red-600 font-bold mb-10">ABOUT US</h1>
  
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">WHO WE ARE</h2>
            <p className="text-lg text-yellow-400  leading-relaxed">
              Genius is a registered professional body under the Corporate Affairs
              Commission, with number 3591627, whose personnel come from different
              walks of life, ranging from the field of academics, prestigious
              institutional bodies, with the highest educational qualifications.
            </p>
          </section>
  
          <section className="mb-10">
            <h2 className="text-4xl font-bold mb-6">WHAT WE DO</h2>
            <ul className="text-lg text-yellow-400 list-none space-y-2">
              <li>Guidance on research and methodology</li>
              <li>Data Analysis</li>
              <li>Training/Coaching</li>
              <li>Mentorship</li>
              <li>Guidance on academic progress</li>
            </ul>
          </section>
  
          <section className="mb-10">
            <h2 className="text-4xl font-bold mb-6">OUR FOCUS</h2>
            <p className="text-lg text-yellow-400 leading-relaxed">
              To provide a publishing platform for researchers and scholars from different fields.
            </p>
          </section>
  
          <section className="mb-10" id="editorial-board">
            <h2 className="text-4xl font-bold mb-6">PARTNERSHIP</h2>
            <p className="text-lg  text-yellow-400 leading-relaxed">
              Genius is in collaboration with the department of Research Measurement and Evaluation, Faculty of
              Education Nasarawa State University, Keffi. Also in consultation with academic professionals across the
              globe.
            </p>
          </section>
  
          <section className="mb-10" id="event">
            <h2 className="text-4xl font-bold mb-6">HOW TO REACH US</h2>
            <p className="text-lg  text-yellow-400 leading-relaxed">Phone numbers - 07039031154, 08164064212</p>
            <p className="text-lg text-yellow-400 leading-relaxed">
              Email - <a href="mailto:geniusjournal11@gmail.com" className="text-yellow-500 hover:underline">geniusjournal11@gmail.com</a>
            </p>
          </section>
        </div>
      </div>
    );
  
  
  
  
}

export default AboutUs