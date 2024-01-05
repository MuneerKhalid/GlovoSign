'use client'


import Link from 'next/link'
import { Router } from 'next/router';
import {useState} from 'react'

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, status }),
      });

      const data = await response.json();

      if (data.success) {
        // Signup successful, you can redirect or show a success message
        console.log('Signup successful:', data.message);
        setUsername('');
        setEmail('');
        setPassword('');
        setStatus('');
      } else {
        // Signup failed, handle errors
        console.error('Signup failed:', data.message);
        setUsername('');
        setEmail('');
        setPassword('');
        setStatus('');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome. We exist to make Life easier.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSignup}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Username <span className="text-red-600">*</span></label>
                  <input 
                    id="username" type="text" 
                    value={username} 
                    onChange={(e) => { setUsername(e.target.value)}}
                    className="form-input w-full text-gray-800" 
                    placeholder="User Name..." 
                    required 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                  <input 
                    id="email" type="email"
                    value={email} 
                    onChange={(e) => { setEmail(e.target.value)}}
                    className="form-input w-full text-gray-800" 
                    placeholder="Email Address.." 
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                  <input 
                    id="password" type="password" 
                    value={password} 
                    onChange={(e) => { setPassword(e.target.value)}}
                    className="form-input w-full text-gray-800" 
                    placeholder="Your Password..." 
                    required 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="status">Status <span className="text-red-600">*</span></label>
                  <input 
                    id="status" type="text" 
                    value={status} 
                    onChange={(e) => { setStatus(e.target.value)}}
                    className="form-input w-full text-gray-800" 
                    placeholder="Normal/Disabled?..." 
                    required 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type='submit' className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign up</button>
                </div>
              </div>
            </form>
            <div className="flex items-center my-6">
              <div className="border-t border-gray-300 grow mr-3" aria-hidden="true"></div>
              <div className="text-gray-600 italic">Or</div>
              <div className="border-t border-gray-300 grow ml-3" aria-hidden="true"></div>
            </div>
            
            <div className="text-gray-600 text-center mt-6">
              Already Using GlovoSign? <Link href="/signin" className="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
