import React, { useState } from 'react';
import Button from '../ui/auth_button';
import axios from 'axios';
import Cookies from 'js-cookie'; // Make sure to install this package: npm install js-cookie @types/js-cookie

const UserModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [modalState, setModalState] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const saveUserIdToCookie = (userId: string) => {
        Cookies.set('userId', userId, { expires: 7 }); // Expires in 7 days
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');
        setLoginError('');

        if (email.trim() === '') {
            setEmailError('Email cannot be empty');
            return;
        }
        if (password.trim() === '') {
            setPasswordError('Password cannot be empty');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5045/home/login', {
                Email: email,
                Password: password
            });
            
            console.log('User logged in:', response.data);
            saveUserIdToCookie(response.data.userId); // Save user ID to cookie
            onClose(); // Close the modal after successful login
        } catch (error) {
            console.error('Login failed:', error);
            setLoginError('Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEmailError('');
        setPasswordError('');

        if (name.trim() === '') {
            setEmailError('Name cannot be empty');
            return;
        }
        if (email.trim() === '') {
            setEmailError('Email cannot be empty');
            return;
        }
        if (password.trim() === '') {
            setPasswordError('Password cannot be empty');
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:5045/home/create-user', {
                Name: name,
                Email: email,
                Password: password
            });

            console.log('User registered:', response.data);
            saveUserIdToCookie(response.data.userId); // Save user ID to cookie
            onClose(); // Close the modal after successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle error (e.g., show error message to user)
        } finally {
            setIsLoading(false);
        }
    };

    const renderContent = () => {
      switch (modalState) {
        case 'login':
          return (
            <>
              <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Login</h2>
              {loginError && <p className='text-red-500 text-sm text-center mb-4'>{loginError}</p>}
              <form className="space-y-4" onSubmit={handleLogin}>
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
                  <Button text={isLoading ? 'Logging in...' : 'Login'} type="submit" disabled={isLoading}/>
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
              <form className='space-y-4' onSubmit={handleRegister}>
                {/* Name section */}
                <div>
                  <label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
                    Name
                  </label>
                  <input
                    id='name'
                    type='text'
                    className='appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* Email section */}
                <div>
                  <label htmlFor='email' className='block text-gray-700 font-bold mb-2'>
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
                  <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>
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
                  <Button text={isLoading ? 'Registering...' : 'Register'} disabled={isLoading} type="submit"/>
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
                <form className='space-y-4' onSubmit={handleLogin}>
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
