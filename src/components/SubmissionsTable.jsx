import React from 'react'

function SubmissionsTable({ headers, rows, onDeleteRow }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full text-left text-sm text-blue-100">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 whitespace-nowrap bg-slate-800/70 border-b border-blue-500/20 font-semibold">
                {h}
              </th>
            ))}
            {onDeleteRow && <th className="px-4 py-3 bg-slate-800/70 border-b border-blue-500/20">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-6 text-blue-300" colSpan={(headers.length + (onDeleteRow ? 1 : 0))}>
                No submissions yet
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => (
              <tr key={idx} className="odd:bg-slate-900/40 even:bg-slate-900/20">
                {headers.map((h) => (
                  <td key={h} className="px-4 py-3 align-top">
                    {String(row[h] ?? '')}
                  </td>
                ))}
                {onDeleteRow && (
                  <td className="px-4 py-3">
                    <button
                      className="text-red-300 hover:text-red-200 underline"
                      onClick={() => onDeleteRow(row)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SubmissionsTable
