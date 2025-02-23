import React from 'react'

function About() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary text-center mb-6"> Contact App</h1>
        <p className="text-center text-gray-600 mt-2">Made using React, Node.js, Tailwind CSS, DaisyUI</p>

      <div className="max-w-2xl text-left">
        
        <h3 className="text-xl font-semibold text-accent mt-6">Made By</h3>
        <p className="text-3xl text-md text-primary">Rohit Kedar</p>
        
        <h3 className="text-xl font-semibold text-accent mt-6">My Portfolio</h3>
        <a 
          href="https://rohitkedar.netlify.app/" 
          className="text-3xl text-blue-500 hover:underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >rohitkedar.netlify.app</a>
        
        <h3 className="text-xl font-semibold text-accent mt-6">Contact Me</h3>
        <p className="text-2xl mt-2">Email: <span className="text-blue-500 font-medium">rohitkedar2000@gmail.com</span></p>
      </div>
    </div>
  )
}

export default About