import React from 'react'
import Editor from '@monaco-editor/react'

const MONACO_THEME_OPTIONS = {
    theme: 'vs-dark',
    options: {
        fontSize: 14,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        fontLigatures: true,
        lineHeight: 24,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        renderLineHighlight: 'line',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        smoothScrolling: true,
        padding: { top: 16, bottom: 16 },
        tabSize: 4,
        wordWrap: 'off',
        bracketPairColorization: { enabled: true },
        guides: { bracketPairs: true },
        scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
        },
    },
}

const CodeEditor = () => {
    return (
        <div className="flex flex-col h-full w-full bg-[#1a1a2e] overflow-hidden">

            {/* ── Tab bar ───────────────────────── */}
            <div className="flex items-center bg-[#16162a] border-b border-[#2a2a3d] min-h-[36px] px-1 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-[#e0e0f0] border-b-2 border-violet-500 bg-[#1a1a2e] cursor-default select-none">
                    <span className="w-2 h-2 rounded-full bg-violet-500 inline-block" />
                    untitled.js
                </div>
            </div>

            {/* ── Monaco Editor ─────────────────── */}
            <div className="flex-1 min-h-0">
                <Editor
                    height="100%"
                    defaultLanguage="javascript"
                    defaultValue={'// Start writing your code here...\n'}
                    theme={MONACO_THEME_OPTIONS.theme}
                    options={MONACO_THEME_OPTIONS.options}
                />
            </div>
        </div>
    )
}

export default CodeEditor
