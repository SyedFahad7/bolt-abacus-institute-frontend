import React, { useMemo, useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import SearchInput from '../../../components/SearchInput'
import TablePagination from '../../../components/TablePagination'
import { students as allStudents, institutes } from '../../../lib/data'
import { useNavigate } from 'react-router-dom'

const StudentsPage: React.FC = () => {
	const [query, setQuery] = useState('')
	const [rowsPerPage, setRowsPerPage] = useState(10)
	const [pageIndex, setPageIndex] = useState(0)
	// This frontend is for a single institute. Default to the first dummy institute.
 	const CURRENT_INSTITUTE_ID = institutes[0]?.id ?? ''
 	const [instituteFilter] = useState(CURRENT_INSTITUTE_ID)
	const [batchFilter, setBatchFilter] = useState('')
	const navigate = useNavigate()

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase()
		return allStudents.filter(s => {
			if (q) {
				const matches = s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
				if (!matches) return false
			}
			// Only show students for the current institute
			if (instituteFilter && s.instituteId !== instituteFilter) return false
			if (batchFilter && s.batchId !== batchFilter) return false
			return true
		})
	}, [query, instituteFilter, batchFilter])

	const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
	const currentPageIndex = Math.min(pageIndex, Math.max(0, pageCount - 1))
	const pageStart = currentPageIndex * rowsPerPage
	const pageEnd = pageStart + rowsPerPage
	const pageItems = filtered.slice(pageStart, pageEnd)

	return (
		<div className="w-full">
			<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 w-full">
				<div className="w-full sm:w-1/2">
					<SearchInput
						placeholder="Filter by name or email..."
						value={query}
						onChange={(value) => {
							setQuery(value)
							setPageIndex(0)
						}}
					/>
					<div className="flex items-center gap-2 mt-2">
						<button onClick={() => navigate('/institute/students/attendance')} className="px-4 py-2 bg-[#facb25] text-[#000] rounded-md font-medium">Mark Attendance</button>
					</div>
					<div className="flex gap-2 mt-2">
						<div className="flex items-center gap-2">
							<label className="text-white/80">Batch</label>
							<select value={batchFilter} onChange={(e)=>{ setBatchFilter(e.target.value); setPageIndex(0) }} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white">
								<option value="">All</option>
								{institutes.find(x=>x.id===CURRENT_INSTITUTE_ID)?.batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
							</select>
						</div>
					</div>
				</div>

				{/* <div className="flex items-center gap-2 justify-end w-full sm:w-1/2">
					<Button variant="secondary">Status</Button>
					<Button variant="secondary">View</Button>
					<Button>+ Add user</Button>
				</div> */}
			</div>

			<Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
				<CardHeader>
					<CardTitle className="text-white">Students</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Batch</TableHead>
									<TableHead className="text-center">Attendance</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
						<TableBody>
						{pageItems.map(s => {
							const inst = institutes.find(i => i.id === s.instituteId)
							const batch = inst?.batches.find(b => b.id === s.batchId)
							return (
								<TableRow key={s.id}>
									<TableCell className="font-medium">{s.name}</TableCell>
									<TableCell>{s.email}</TableCell>
										<TableCell>{batch?.name ?? '—'}</TableCell>
									<TableCell className="text-center">{s.attendance ?? '—'}</TableCell>
									<TableCell>
										<button
											onClick={() => navigate(`/institute/students/${s.id}/actions`)}
											className="px-3 py-1 bg-[#161618] rounded-md text-white"
										>
											Actions
										</button>
									</TableCell>
								</TableRow>
							)
						})}

						{filtered.length === 0 && (
							<TableRow>
								<TableCell colSpan={5} className="text-center py-8">No results.</TableCell>
							</TableRow>
						)}
						</TableBody>
					</Table>

					<TablePagination
						currentPage={currentPageIndex}
						totalPages={pageCount}
						rowsPerPage={rowsPerPage}
						totalItems={filtered.length}
						onPageChange={setPageIndex}
						onRowsPerPageChange={(rows) => {
							setRowsPerPage(rows)
							setPageIndex(0)
						}}
					/>
				</CardContent>
			</Card>
		</div>
	)
}

export default StudentsPage
