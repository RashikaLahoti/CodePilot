import React, { useState, useRef, useEffect } from 'react'
import { askAI } from '../../services/ai/index.js'

/* ─── option sets ──────────────────────────────────────────── */
const PROVIDERS = [
    { value: 'gemini',      label: '✦ Gemini', color: 'text-blue-400' },
    { value: 'huggingface', label: '🤗 HuggingFace', color: 'text-yellow-400' },
]

const MODES = [
    { value: 'chat',  label: '💬 Chat',  desc: 'Free-form conversation' },
    { value: 'agent', label: '🤖 Agent', desc: 'Returns structured JSON' },
]

/* ─── small reusable dropdown ──────────────────────────────── */
const Dropdown = ({ id, value, onChange, options }) => (
    <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
            bg-[#12122a] border border-[#2e2e50] text-[#c8c8f0] text-[11px]
            rounded-lg px-2 py-1.5 outline-none cursor-pointer
            hover:border-violet-500 focus:border-violet-500
            transition-colors duration-150 appearance-none pr-5
        "
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238080b0'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 6px center' }}
    >
        {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
        ))}
    </select>
)

/* ─── typing indicator ─────────────────────────────────────── */
const TypingDots = () => (
    <div className="flex justify-start">
        <div className="bg-[#252538] border border-[#2e2e50] rounded-xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                />
            ))}
        </div>
    </div>
)

/* ─── single message bubble ────────────────────────────────── */
const Message = ({ msg }) => {
    const isUser = msg.role === 'user'
    const isAgent = msg.isAgent

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="w-6 h-6 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-[10px] text-violet-300 shrink-0 mr-2 mt-0.5">
                    ✦
                </div>
            )}
            <div
                className={`max-w-[85%] px-3 py-2.5 rounded-xl text-[12.5px] leading-relaxed break-words
                    ${isUser
                        ? 'bg-violet-600 text-white rounded-br-sm'
                        : 'bg-[#252538] text-[#c8c8f0] border border-[#2e2e50] rounded-bl-sm'
                    }`}
            >
                {/* agent badge */}
                {isAgent && !isUser && (
                    <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-[#2e2e50]">
                        <span className="text-[10px] font-semibold text-violet-400 uppercase tracking-wider">Agent Response</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                            msg.agentData?.status === 'success'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                            {msg.agentData?.status ?? 'unknown'}
                        </span>
                    </div>
                )}

                {/* agent structured data */}
                {isAgent && !isUser && msg.agentData ? (
                    <div className="flex flex-col gap-1.5">
                        {msg.agentData.action && (
                            <div className="text-[11px]">
                                <span className="text-violet-400 font-semibold">Action: </span>
                                <span className="text-[#c8c8f0]">{msg.agentData.action}</span>
                            </div>
                        )}
                        {msg.agentData.data && (
                            <div className="text-[11px]">
                                <span className="text-violet-400 font-semibold">Data: </span>
                                <span className="text-[#c8c8f0] font-mono">{
                                    typeof msg.agentData.data === 'object'
                                        ? JSON.stringify(msg.agentData.data, null, 2)
                                        : msg.agentData.data
                                }</span>
                            </div>
                        )}
                    </div>
                ) : (
                    <span>{msg.text}</span>
                )}

                {/* timestamp + provider tag */}
                <div className="flex items-center gap-1.5 mt-1.5">
                    {msg.provider && !isUser && (
                        <span className="text-[10px] text-[#555572]">
                            {msg.provider === 'gemini' ? '✦ Gemini' : '🤗 HF'} ·
                        </span>
                    )}
                    <span className="text-[10px] text-[#555572]">{msg.time}</span>
                </div>
            </div>
            {isUser && (
                <div className="w-6 h-6 rounded-full bg-violet-600/40 border border-violet-500/40 flex items-center justify-center text-[10px] text-violet-200 shrink-0 ml-2 mt-0.5">
                    U
                </div>
            )}
        </div>
    )
}

/* ─── main component ───────────────────────────────────────── */
const ChatPanel = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'assistant',
            text: "Hi! I'm CodePilot. Select your provider & mode, then ask me anything.",
            time: now(),
        }
    ])
    const [input, setInput]       = useState('')
    const [provider, setProvider] = useState('gemini')
    const [mode, setMode]         = useState('chat')
    const [loading, setLoading]   = useState(false)
    const bottomRef               = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    const handleSend = async () => {
        const trimmed = input.trim()
        if (!trimmed || loading) return

        // push user message
        const userMsg = {
            id: Date.now(),
            role: 'user',
            text: trimmed,
            time: now(),
        }
        setMessages((prev) => [...prev, userMsg])
        setInput('')
        setLoading(true)

        try {
            const res = await askAI({ prompt: trimmed, mode, provider })

            // res.data is either a string (chat) or { action, data, status } (agent)
            const rawData = res?.data

            const aiMsg = {
                id: Date.now() + 1,
                role: 'assistant',
                provider,
                time: now(),
                isAgent: mode === 'agent',
                agentData: mode === 'agent' && typeof rawData === 'object' ? rawData : null,
                text: mode === 'agent'
                    ? (typeof rawData === 'string' ? rawData : JSON.stringify(rawData))
                    : (typeof rawData === 'string' ? rawData : JSON.stringify(rawData)),
            }
            setMessages((prev) => [...prev, aiMsg])
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 2,
                    role: 'assistant',
                    text: `⚠️ Error: ${err?.message ?? 'Something went wrong'}`,
                    time: now(),
                }
            ])
        } finally {
            setLoading(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <aside className="flex flex-col h-full w-full bg-[#1e1e2e] border-l border-[#2a2a3d] overflow-hidden">

            {/* ── Header ─────────────────────────────── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2a2a3d] bg-[#16162a] shrink-0">
                <div className="flex items-center gap-2">
                    <span className="text-violet-400 text-base leading-none">✦</span>
                    <span className="text-[13px] font-bold tracking-wide text-[#c8c8f0]">
                        CodePilot AI
                    </span>
                </div>
                {/* clear chat */}
                <button
                    onClick={() => setMessages([{ id: 1, role: 'assistant', text: "Chat cleared. Select provider & mode to continue.", time: now() }])}
                    className="text-[10px] text-[#555572] hover:text-violet-400 transition-colors duration-150 cursor-pointer"
                    title="Clear chat"
                >
                    Clear
                </button>
            </div>



            {/* ── Messages ───────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-[#2e2e50] scrollbar-track-transparent">
                {messages.map((msg) => (
                    <Message key={msg.id} msg={msg} />
                ))}
                {loading && <TypingDots />}
                <div ref={bottomRef} />
            </div>

            {/* ── Input area ─────────────────────────── */}
            <div className="flex flex-col gap-2 px-3 py-3 border-t border-[#2a2a3d] bg-[#16162a] shrink-0">

                {/* textarea + send */}
                <div className="flex items-end gap-2">
                    <textarea
                        id="chat-input"
                        rows={2}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={mode === 'agent' ? 'Give the agent a task…' : 'Ask CodePilot…'}
                        disabled={loading}
                        className="
                            flex-1 resize-none rounded-[10px] bg-[#1a1a2e] border border-[#2e2e50]
                            text-[#e0e0f0] text-[13px] px-3 py-2 outline-none leading-relaxed
                            placeholder-[#555572] focus:border-violet-500 transition-colors duration-200
                            font-sans disabled:opacity-50
                        "
                    />
                    <button
                        id="chat-send-btn"
                        onClick={handleSend}
                        disabled={loading || !input.trim()}
                        aria-label="Send message"
                        className="
                            w-9 h-9 rounded-[9px] bg-violet-600 text-white text-lg flex items-center
                            justify-center shrink-0 hover:bg-violet-500 active:scale-95 transition-all
                            duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed
                        "
                    >
                        {loading ? (
                            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : '↑'}
                    </button>
                </div>

                {/* ── dropdowns row (below input) ──────── */}
                <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#555572] uppercase tracking-wider font-semibold">Provider</span>
                    <Dropdown
                        id="ai-provider-select"
                        value={provider}
                        onChange={setProvider}
                        options={PROVIDERS}
                    />
                    <span className="text-[#2e2e50]">|</span>
                    <span className="text-[10px] text-[#555572] uppercase tracking-wider font-semibold">Mode</span>
                    <Dropdown
                        id="ai-mode-select"
                        value={mode}
                        onChange={setMode}
                        options={MODES}
                    />
                    <span className={`ml-auto text-[10px] px-2 py-0.5 rounded-full border font-medium
                        ${mode === 'agent'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                            : 'bg-violet-500/10 text-violet-400 border-violet-500/30'
                        }`}>
                        {mode === 'agent' ? '🤖 Agent' : '💬 Chat'}
                    </span>
                    <span className="text-[10px] text-[#404060]">Shift+Enter↵</span>
                </div>
            </div>
        </aside>
    )
}

function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default ChatPanel
