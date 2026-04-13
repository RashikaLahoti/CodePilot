import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '../services/auth'
import { useNavigate } from 'react-router'

const Register = ({ onToggle }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [serverError, setServerError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({ mode: 'onTouched' })

    const passwordValue = watch('password', '')

    const getStrength = (p) => {
        if (!p) return null
        if (p.length < 6) return { label: 'Weak', color: 'bg-red-500', text: 'text-red-400', width: 'w-1/4' }
        if (p.length < 10) return { label: 'Fair', color: 'bg-amber-500', text: 'text-amber-400', width: 'w-2/4' }
        if (p.match(/[A-Z]/) && p.match(/[0-9]/)) return { label: 'Strong', color: 'bg-emerald-500', text: 'text-emerald-400', width: 'w-full' }
        return { label: 'Good', color: 'bg-blue-500', text: 'text-blue-400', width: 'w-3/4' }
    }

    const strength = getStrength(passwordValue)

    const onSubmit = async (data) => {
        setServerError('')
        setSuccessMsg('')
        try {
            const payload = { username: data.username, email: data.email, password: data.password }
            const res = await registerUser(payload)
            setSuccessMsg(res.data?.message || 'Account created successfully! You can now sign in.')
            navigate('/home');
        } catch (err) {
            const msg = err.response?.data?.message || 'Something went wrong. Please try again.'
            setServerError(msg)
        }
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-violet-600 to-indigo-600 mb-4 shadow-lg shadow-violet-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-white mb-1">Create account</h1>
                <p className="text-slate-400 text-sm">Join CodePilot and supercharge your workflow</p>
            </div>

            {/* Server feedback banners */}
            {serverError && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-5">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {serverError}
                </div>
            )}
            {successMsg && (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3 mb-5">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {successMsg}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

                {/* Username */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="johndoe"
                            {...register('username', {
                                required: 'Username is required',
                                minLength: { value: 3, message: 'Username must be at least 3 characters' },
                                maxLength: { value: 30, message: 'Username must be under 30 characters' },
                            })}
                            className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.username
                                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                            }`}
                        />
                    </div>
                    {errors.username && (
                        <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.username.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                            })}
                            className={`w-full pl-12 pr-4 py-3.5 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.email
                                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                            }`}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                            })}
                            className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.password
                                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            {showPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {/* Password strength bar */}
                    {passwordValue && (
                        <div className="mt-2 space-y-1">
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`} />
                            </div>
                            <p className={`text-xs font-medium ${strength.text}`}>{strength.label} password</p>
                        </div>
                    )}
                    {errors.password && (
                        <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Confirm password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: (val) => val === passwordValue || 'Passwords do not match',
                            })}
                            className={`w-full pl-12 pr-12 py-3.5 bg-white/5 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                                errors.confirmPassword
                                    ? 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-white/10 focus:border-violet-500 focus:ring-violet-500/20'
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            {showConfirmPassword ? (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-400 mt-1.5 ml-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                    <input
                        type="checkbox"
                        id="terms"
                        {...register('terms', { required: 'You must accept the terms to continue' })}
                        className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-violet-600 focus:ring-violet-500/50 focus:ring-2 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-sm text-slate-400 leading-relaxed cursor-pointer">
                        I agree to the{' '}
                        <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-violet-400 hover:text-violet-300 transition-colors font-medium">Privacy Policy</a>
                    </label>
                </div>
                {errors.terms && (
                    <p className="text-xs text-red-400 -mt-2 ml-1">{errors.terms.message}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Creating account...
                        </>
                    ) : (
                        <>
                            Create account
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </>
                    )}
                </button>
            </form>

            {/* Toggle */}
            <p className="text-center text-slate-400 text-sm mt-6">
                Already have an account?{' '}
                <button
                    onClick={onToggle}
                    className="text-violet-400 hover:text-violet-300 font-semibold transition-colors hover:underline underline-offset-2"
                >
                    Sign in instead
                </button>
            </p>
        </div>
    )
}

export default Register