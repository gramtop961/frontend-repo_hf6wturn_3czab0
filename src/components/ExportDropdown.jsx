import React, { useState, useRef, useEffect } from 'react'

function ExportDropdown({ visible, onExport }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  if (!visible) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl shadow transition"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span>Export Data</span>
        <span className="text-blue-100">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden border border-blue-500/20 bg-slate-900/90 backdrop-blur shadow-xl animate-in">
          <button
            className="w-full text-left px-4 py-2 text-blue-100 hover:bg-slate-800/80"
            onClick={() => { setOpen(false); onExport('csv') }}
          >
            📊 Export as CSV
          </button>
          <button
            className="w-full text-left px-4 py-2 text-blue-100 hover:bg-slate-800/80"
            onClick={() => { setOpen(false); onExport('xlsx') }}
          >
            📈 Export as Excel
          </button>
        </div>
      )}
    </div>
  )
}

export default ExportDropdown
