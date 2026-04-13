import React, { useState } from 'react'
import Login from '../pages/Login'
import Register from '../pages/Register'

const AuthLayout = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-4 relative overflow-hidden">

            {/* Background blobs */}
            <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-violet-700/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Card */}
            <div className="relative w-full max-w-md">
                {/* Glow border */}
                <div className="absolute -inset-1px bg-linear-to-br from-violet-600/50 via-transparent to-indigo-600/50 rounded-2xl blur-sm" />

                <div className="relative bg-[#0f0f23]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-8">

                    {/* Badge */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <div className="bg-linear-to-r from-violet-600 to-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg shadow-violet-500/30 whitespace-nowrap">
                            ✦ CodePilot — AI-Powered Dev
                        </div>
                    </div>

                    {/* Tab switcher */}
                    <div className="flex bg-white/5 rounded-xl p-1 mb-8 mt-2">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                                isLogin
                                    ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                                !isLogin
                                    ? 'bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                                    : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Register
                        </button>
                    </div>

                    {/* Animated form switcher */}
                    <div
                        key={isLogin ? 'login' : 'register'}
                        className="animate-fadeIn"
                        style={{ animation: 'fadeSlideIn 0.3s ease forwards' }}
                    >
                        {isLogin
                            ? <Login onToggle={() => setIsLogin(false)} />
                            : <Register onToggle={() => setIsLogin(true)} />
                        }
                    </div>
                </div>

                {/* Footer text */}
                <p className="text-center text-slate-600 text-xs mt-6">
                    Protected by industry-standard encryption ·{' '}
                    <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
                </p>
            </div>

            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default AuthLayout
