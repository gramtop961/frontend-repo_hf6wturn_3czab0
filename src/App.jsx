import React, { useMemo, useState } from 'react'
import PageSelector from './components/PageSelector'
import SubmissionsTable from './components/SubmissionsTable'
import ExportDropdown from './components/ExportDropdown'
import DeleteModal from './components/DeleteModal'

const demoPages = [
  { id: '1', title: 'Contact Form' },
  { id: '2', title: 'Survey 2025' },
  { id: '3', title: 'Beta Signup' },
]

const demoData = {
  '1': [
    { Name: 'Alya', Email: 'alya@example.com', Message: 'Hi there 👋', Date: '2025-11-01' },
    { Name: 'Bima', Email: 'bima@example.com', Message: 'Butuh info lebih lanjut', Date: '2025-11-03' },
  ],
  '2': [],
  '3': [
    { Name: 'Raka', Email: 'raka@domain.com', Company: 'Acme', Date: '2025-11-10' },
  ],
}

function App() {
  const [selectedPage, setSelectedPage] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [rowToDelete, setRowToDelete] = useState(null)

  const rows = demoData[selectedPage] || []
  const headers = useMemo(() => {
    if (rows.length === 0) return []
    // Collect all unique keys from rows to build headers
    const set = new Set()
    rows.forEach((r) => Object.keys(r).forEach((k) => set.add(k)))
    return Array.from(set)
  }, [rows])

  const showData = selectedPage !== ''
  const hasData = rows.length > 0

  const handleExport = (format) => {
    if (!hasData) return
    if (format === 'csv') {
      const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? '')).join(','))].join('\n')
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `submissions-${selectedPage}.csv`
      link.click()
    } else if (format === 'xlsx') {
      // Simple TSV so it opens in Excel
      const tsv = [headers.join('\t'), ...rows.map((r) => headers.map((h) => String(r[h] ?? '')).join('\t'))].join('\n')
      const blob = new Blob([tsv], { type: 'text/tab-separated-values;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `submissions-${selectedPage}.xls`
      link.click()
    }
  }

  const onDeleteRow = (row) => {
    setRowToDelete(row)
    setConfirmOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-100">
      {/* Header */}
      <div className="px-4 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Form Submissions</h1>
          <p className="text-blue-300/70 mt-1">View, export, and manage form response data</p>
        </div>
      </div>

      {/* Selector Card */}
      <div className="px-4 sm:px-6">
        <div className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur border border-blue-500/20 rounded-2xl p-4 sm:p-6 shadow-lg">
          <PageSelector pages={demoPages} value={selectedPage} onChange={setSelectedPage} />
        </div>
      </div>

      {/* Submissions */}
      {showData && (
        <div className="px-4 sm:px-6 mt-4">
          <div className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur border border-blue-500/20 rounded-2xl p-4 sm:p-6 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">Submissions</h3>
              <div className="flex items-center gap-2 sm:gap-3">
                <ExportDropdown visible={hasData} onExport={handleExport} />
                {hasData && (
                  <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl shadow" onClick={() => alert('Delete all clicked')}>
                    🗑️ Delete All
                  </button>
                )}
              </div>
            </div>

            {!hasData && (
              <div className="flex flex-col items-center text-center py-12">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="text-xl font-semibold mb-1">No submissions yet</h3>
                <p className="text-blue-300/70">No form submissions found for the selected page</p>
              </div>
            )}

            {hasData && (
              <SubmissionsTable headers={headers} rows={rows} onDeleteRow={onDeleteRow} />
            )}
          </div>
        </div>
      )}

      <DeleteModal
        open={confirmOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this submission?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => { setConfirmOpen(false); alert('Row deleted (demo)') }}
      />
    </div>
  )
}

export default App
