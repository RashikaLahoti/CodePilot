import React from 'react'

const Sidebar = () => {
    return (
        <aside className="flex flex-col h-full w-full bg-[#1e1e2e] border-r border-[#2a2a3d] overflow-hidden">

            {/* Header */}
            <div className="px-4 py-2.5 border-b border-[#2a2a3d] bg-[#16162a]">
                <span className="text-[11px] font-bold tracking-widest text-[#7c7cad] uppercase select-none">
                    Explorer
                </span>
            </div>

            {/* Body — file tree goes here later */}
            <div className="flex-1 overflow-y-auto py-2">
                <p className="text-xs text-[#555572] text-center mt-10 italic select-none">
                    No folder opened
                </p>
            </div>
        </aside>
    )
}

export default Sidebar
