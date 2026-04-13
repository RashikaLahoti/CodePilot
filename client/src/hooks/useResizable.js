import { useState, useCallback, useRef, useEffect } from 'react'

/**
 * Returns [size, dragHandleProps] for a resizable panel.
 * @param {number} initialSize  - initial width in px
 * @param {number} min          - minimum width in px
 * @param {number} max          - maximum width in px
 * @param {'right'|'left'}  dir - which side the handle is on
 */
export function useResizable(initialSize, min, max, dir = 'right') {
    const [size, setSize] = useState(initialSize)
    const dragging = useRef(false)
    const startX = useRef(0)
    const startSize = useRef(initialSize)

    const onMouseDown = useCallback((e) => {
        dragging.current = true
        startX.current = e.clientX
        startSize.current = size
        document.body.style.cursor = 'col-resize'
        document.body.style.userSelect = 'none'
    }, [size])

    useEffect(() => {
        const onMouseMove = (e) => {
            if (!dragging.current) return
            const delta = dir === 'right'
                ? e.clientX - startX.current
                : startX.current - e.clientX
            const next = Math.min(max, Math.max(min, startSize.current + delta))
            setSize(next)
        }
        const onMouseUp = () => {
            dragging.current = false
            document.body.style.cursor = ''
            document.body.style.userSelect = ''
        }
        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseup', onMouseUp)
        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseup', onMouseUp)
        }
    }, [min, max, dir])

    return [size, onMouseDown]
}
