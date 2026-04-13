import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import CodeEditor from '../components/editor/CodeEditor'
import ChatPanel from '../components/chat/ChatPanel'
import { useResizable } from '../hooks/useResizable'

const DIVIDER = (
    <div className="w-1 cursor-col-resize bg-[#2a2a3d] hover:bg-violet-500/60 transition-colors duration-150 shrink-0 active:bg-violet-500" />
)

const Home = () => {
    const [sidebarW, onSidebarDrag] = useResizable(220, 140, 480, 'right')
    const [chatW, onChatDrag]       = useResizable(300, 200, 520, 'left')

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-[#1a1a2e] font-sans select-none">

            {/* ── Left: Sidebar ───────────────────── */}
            <div style={{ width: sidebarW }} className="shrink-0 flex flex-col h-full overflow-hidden">
                <Sidebar />
            </div>

            {/* ── Divider 1 ───────────────────────── */}
            <div
                onMouseDown={onSidebarDrag}
                className="w-1 cursor-col-resize bg-[#2a2a3d] hover:bg-violet-500/60 transition-colors duration-150 shrink-0"
            />

            {/* ── Middle: Code Editor ─────────────── */}
            <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
                <CodeEditor />
            </div>

            {/* ── Divider 2 ───────────────────────── */}
            <div
                onMouseDown={onChatDrag}
                className="w-1 cursor-col-resize bg-[#2a2a3d] hover:bg-violet-500/60 transition-colors duration-150 shrink-0"
            />

            {/* ── Right: Chat Panel ───────────────── */}
            <div style={{ width: chatW }} className="shrink-0 flex flex-col h-full overflow-hidden">
                <ChatPanel />
            </div>
        </div>
    )
}

export default Home
