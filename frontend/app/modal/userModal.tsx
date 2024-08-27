import React, { useState } from 'react';
import Button from '../ui/auth_button';

const UserModal = ({ isOpen, onClose }) => {
    const [modalState, setModalState] = useState('login'); // Use to change different form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');
    
        if (email.trim() === '') {
            setEmailError('Username cannot be empty');
          return;
        }
        if (password.trim() === '') {
          setPasswordError('Password cannot be empty');
          return;
        }
        // if (password.length < 8) {
        //   setPasswordError('Password must be at least 8 characters long');
        //   return;
        // }
        // if (!/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        //   setPasswordError('Password must contain at least one numeric digit and one special character');
        //   return;
        // }
    
        // alert('Form submitted!');
        onClose(); // Close the modal after successful submission
      };
    
    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const renderContent = () => {
      switch (modalState) {
        case 'login':
          return (
            <>
              <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Login</h2>
              {/* Form section */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email section */}
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email
                  </label>
                  <input
                    id="userEmail"
                    type="email"
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
                </div>
                {/* Password section */}
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                  />
                  {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
                </div>
                <div className='mt-6 flex items-center justify-center w-full'>
                  <Button text='Login'/>
                </div>
              </form>
              <div className="text-center mt-4">
                <button onClick={() => setModalState('forgotPassword')} className='text-purple-500 font-bold hover:underline'>
                  Forgot your password?
                </button>
                <br />
                No account?{' '}
                <button onClick={() => setModalState('register')} className='text-purple-500 font-bold hover:underline'>
                  Create one
                </button>
              </div>
            </>
          );
        {/* Register Section */}
        case 'register':
          return (
            <>
              <h2 className='text-xl font-bold mb-4 text-center text-gray-800'>Register</h2>
              {/* Form section */}
              <form className='space-y-4' onSubmit={handleSubmit}>
                {/* Email section */}
                <div>
                  <label htmlFor='email' className='block text-gray-700 font-blod mb-2'>
                    Email
                  </label>
                  <input
                    id='email'
                    type='email'
                    className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
                </div>
                {/* Password section */}
                <div>
                  <label htmlFor='password' className='block text-gray-700 font-blod mb-2'>
                  Password
                  </label>
                  <input
                    id='password'
                    type='password'
                    className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e => setPassword(e.target.value))}
                  />
                  {passwordError && <p className='text-red-500 text-sm'>{passwordError}</p>}
                </div>
                <div className='mt-6 flex items-center justify-center w-full'>
                  <Button text='Register'/>
                </div>
              </form>
              <div className="text-center mt-4">
                Already have an account?{' '}
                <button onClick={() => setModalState('login')} className='text-purple-500 font-bold hover:underline'>
                  Login
                </button>
              </div>
            </>
          );
          {/* Forgot Password Section */}
          case 'forgotPassword':
            return (
              <>
                <h2 className='text-xl font-bold mb-4 text-center text-gray-800'>Forgot Password</h2>
                {/* Form section */}
                <form className='space-y-4' onSubmit={handleSubmit}>
                  {/* Email section */}
                  <div>
                    <label htmlFor='email' className='block text-gray-700 font-blod mb-2'>
                      Email
                    </label>
                    <input
                      id='email'
                      type='email'
                      className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline' 
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && <p className='text-red-500 text-sm'>{emailError}</p>}
                  </div>
                  <div className='mt-6 flex items-center justify-center w-full'>
                    <Button text='Submit'/>
                  </div>
                </form>
                <div className="text-center mt-4">
                  <button onClick={() => setModalState('login')} className='text-purple-500 font-bold hover:underline'>
                    Back to Login
                  </button>
                </div>
              </>
            );
      }
    }


    return (
        isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 w-96 max-w-md shadow-lg relative z-60">
              <button
                onClick={onClose}
                className="absolute top-2 right-2 text-black-600 scale-125 hover:scale-75 text-2xl"
              >
                &times;
              </button>
              {renderContent()}
            </div>
          </div>
        )
      );
};


export default UserModal;
