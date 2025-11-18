import React from 'react'

function PageSelector({ pages, value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor="pageSelect" className="block text-sm font-medium text-blue-100 mb-2">
        Select Page
      </label>
      <div className="relative">
        <select
          id="pageSelect"
          className="block w-full appearance-none rounded-xl bg-slate-800/70 border border-blue-500/20 text-blue-100 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select a page...</option>
          {pages.map((p) => (
            <option key={p.id} value={p.id}>{p.title}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-blue-300">
          ▼
        </span>
      </div>
    </div>
  )
}

export default PageSelector
