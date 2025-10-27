import React from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { Button } from './index'

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  rowsPerPage: number
  totalItems: number
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  rowsPerPageOptions?: number[]
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions = [5, 10, 25, 50]
}) => {
  const pageStart = currentPage * rowsPerPage
  const pageEnd = Math.min(pageStart + rowsPerPage, totalItems)

  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <label className="text-white/80">Rows per page</label>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
          className="bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-2 py-1 text-white"
        >
          {rowsPerPageOptions.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-white/80">
          {pageStart + 1}-{pageEnd} of {totalItems}
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
            disabled={currentPage <= 0}
          >
            <CaretLeft size={16} weight="bold" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
            disabled={currentPage >= totalPages - 1}
          >
            <CaretRight size={16} weight="bold" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TablePagination
