import React from 'react'

function DeleteModal({ open, title = 'Confirm Deletion', message = 'Are you sure?', onCancel, onConfirm }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onCancel} />

      {/* Sheet style on mobile, modal on larger screens */}
      <div className="relative w-full sm:w-auto sm:min-w-[400px] bg-slate-900 text-blue-100 rounded-t-2xl sm:rounded-2xl border border-blue-500/20 shadow-2xl animate-in">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-blue-500/10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onCancel} className="text-blue-300 hover:text-blue-100">✕</button>
        </div>
        <div className="px-4 sm:px-6 py-4 text-blue-200">{message}</div>
        <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-2 sm:justify-end border-t border-blue-500/10">
          <button
            className="w-full sm:w-auto bg-transparent border border-blue-500/30 text-blue-100 px-4 py-2 rounded-xl hover:bg-slate-800/70"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="w-full sm:w-auto bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
