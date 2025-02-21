import React from 'react'

function About() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-primary text-center mb-6">About This App</h1>

      <div className="max-w-2xl text-left">
        <h2 className="text-3xl font-bold text-primary">Contact App</h2>
        <p className="text-md text-gray-600 mt-2">Made using React, Node.js, Tailwind CSS, DaisyUI, Zustand, Axios</p>
        
        <h3 className="text-xl font-semibold text-accent mt-6">Made By</h3>
        <p className="text-md text-gray-600">Rohit Kedar</p>
        <p className="text-md text-gray-600">An Aspiring Developer</p>
        
        <h3 className="text-xl font-semibold text-accent mt-6">My Portfolio</h3>
        <a 
          href="https://rohitkedar.netlify.app/" 
          className="text-blue-500 hover:underline font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >rohitkedar.netlify.app</a>
        
        <h3 className="text-xl font-semibold text-accent mt-6">Contact Me</h3>
        <p className="text-md mt-2">Email: <span className="text-blue-500 font-medium">rohitkedar2000@gmail.com</span></p>
      </div>
    </div>
  )
}

export default About