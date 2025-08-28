import React, { useState } from 'react';

const PasswordPrompt = ({ correctPassword, onSuccess, onClose }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === correctPassword) {
            onSuccess();
        } else {
            setError(true);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="min-h-screen flex items-center justify-center">
                    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow-md w-96">
                        <h2 className="text-2xl mb-4 text-center text-gray-900 dark:text-gray-100">Enter Password</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="password"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Enter password"
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                            {error && <p className="my-0 text-red-500 dark:text-red-400 text-left">Incorrect password!</p>}
                            <button
                                type="submit"
                                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Submit
                            </button>
                            <button 
                                type="button"
                                onClick={onClose}
                                className="w-full justify-center rounded-md bg-white dark:bg-gray-700 p-2 font-medium text-gray-900 dark:text-gray-100 ring-1 shadow-xs ring-gray-300 dark:ring-gray-600 ring-inset hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0"
                            >
                                Close
                            </button>
                        </form>
                        <div className='flex flex-col' ><p className='text-center mt-8 mb-2 text-gray-700 dark:text-gray-300'>Don't know the password?</p> <a className='w-full p-2 text-blue-500 dark:text-blue-400 rounded hover:font-regular hover:underline text-center' href='https://linkedin.com/in/cagdasm'>Ask me on Linkedin</a></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordPrompt;
