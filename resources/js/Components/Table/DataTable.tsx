import { useState } from 'react'
import { Link } from '@inertiajs/react'

interface Column {
  field: string
  label: string
  sortable?: boolean
  render?: (item: any) => React.ReactNode
  className?: string
}

interface PaginationProps {
  total: number
  currentPage: number
  perPage: number
  links: Array<{ url: string | null; label: string; active: boolean }>
  from: number
  to: number
}

interface DataTableProps {
  data: any[]
  columns: Column[]
  pagination?: PaginationProps
  onSearch?: (value: string) => void
  onPerPageChange?: (value: number) => void
  onSort?: (field: string) => void
  sortField?: string
  sortDirection?: 'asc' | 'desc'
  loading?: boolean
  noDataText?: string
  title?: string
  actions?: React.ReactNode
}

export default function DataTable({
  data,
  columns,
  pagination,
  onSearch,
  onPerPageChange,
  onSort,
  sortField,
  sortDirection = 'asc',
  loading = false,
  noDataText = 'ไม่พบข้อมูล',
  title,
  actions,
}: DataTableProps) {
  const [search, setSearch] = useState('')
  const [perPage, setPerPage] = useState(10)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    if (onSearch) {
      onSearch(e.target.value)
    }
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value)
    setPerPage(value)
    if (onPerPageChange) {
      onPerPageChange(value)
    }
  }

  const handleSort = (field: string) => {
    if (onSort) {
      onSort(field)
    }
  }

  const renderSortIcon = (field: string) => {
    if (field !== sortField) return null

    return (
      <span className="ms-1">
        {sortDirection === 'asc' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-sm" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 12l7 -7l7 7" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-sm" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M5 12l7 7l7 -7" />
          </svg>
        )}
      </span>
    )
  }

  return (
    <div className="card">
      {(title || actions) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}

      <div className="card-body border-bottom py-3">
        <div className="d-flex">
          <div className="text-secondary">
            แสดง
            <div className="mx-2 d-inline-block">
              <select 
                className="form-select form-select-sm" 
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={25}>25</option>
              </select>
            </div>
            รายการ
          </div>
          <div className="ms-auto text-secondary">
            ค้นหา:
            <div className="ms-2 d-inline-block">
              <input 
                type="text" 
                className="form-control form-control-sm" 
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="progress progress-sm">
          <div className="progress-bar progress-bar-indeterminate"></div>
        </div>
      )}

      <div className="table-responsive">
        <table className={`table table-vcenter card-table ${loading ? 'opacity-50' : ''}`}>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={column.className || ''}>
                  {column.sortable ? (
                    <button 
                      onClick={() => handleSort(column.field)}
                      className="btn-sort"
                    >
                      {column.label}
                      {renderSortIcon(column.field)}
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className={column.className || ''}>
                      {column.render 
                        ? column.render(item) 
                        : item[column.field]
                      }
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="text-center py-3">
                  {noDataText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="card-footer d-flex align-items-center">
          <p className="m-0 text-secondary">
            แสดง <span>{pagination.from}</span>
            ถึง <span>{pagination.to}</span> จาก <span>{pagination.total}</span> รายการ
          </p>

          <ul className="pagination m-0 ms-auto">
            {pagination.links.map((link, index) => (
              <li 
                key={index}
                className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
              >
                {link.url ? (
                  <Link href={link.url} className="page-link" dangerouslySetInnerHTML={{ __html: link.label }} />
                ) : (
                  <span className="page-link" dangerouslySetInnerHTML={{ __html: link.label }} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 