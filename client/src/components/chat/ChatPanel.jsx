import React, { useState, useRef, useEffect } from 'react'

const ChatPanel = () => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', text: "Hi! I'm CodePilot. Ask me anything about your code." }
    ])
    const [input, setInput] = useState('')
    const bottomRef = useRef(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = () => {
        const trimmed = input.trim()
        if (!trimmed) return
        setMessages((prev) => [
            ...prev,
            { id: Date.now(), role: 'user', text: trimmed }
        ])
        setInput('')
        // TODO: call AI API and push assistant response
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <aside className="flex flex-col h-full w-full bg-[#1e1e2e] border-l border-[#2a2a3d] overflow-hidden">

            {/* ── Header ───────────────────────────── */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a3d] bg-[#16162a] shrink-0">
                <span className="text-violet-400 text-base leading-none">✦</span>
                <span className="text-[13px] font-bold tracking-wide text-[#c8c8f0]">
                    CodePilot AI
                </span>
            </div>

            {/* ── Messages ─────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-[#2e2e50] scrollbar-track-transparent">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] px-3 py-2 rounded-xl text-[13px] leading-relaxed wrap-break-word
                                ${msg.role === 'user'
                                    ? 'bg-violet-600 text-white rounded-br-sm'
                                    : 'bg-[#252538] text-[#c8c8f0] border border-[#2e2e50] rounded-bl-sm'
                                }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* ── Input area ───────────────────────── */}
            <div className="flex items-end gap-2 px-3 py-3 border-t border-[#2a2a3d] bg-[#16162a] shrink-0">
                <textarea
                    id="chat-input"
                    rows={2}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask CodePilot..."
                    className="flex-1 resize-none rounded-[10px] bg-[#1a1a2e] border border-[#2e2e50] text-[#e0e0f0]
                               text-[13px] px-3 py-2 outline-none leading-relaxed placeholder-[#555572]
                               focus:border-violet-500 transition-colors duration-200 font-sans"
                />
                <button
                    id="chat-send-btn"
                    onClick={handleSend}
                    aria-label="Send message"
                    className="w-9 h-9 rounded-[9px] bg-violet-600 text-white text-lg flex items-center justify-center
                               shrink-0 hover:bg-violet-500 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                    ↑
                </button>
            </div>
        </aside>
    )
}

export default ChatPanel
