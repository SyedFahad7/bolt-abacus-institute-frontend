import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Button, Input } from '../../../components'
import SearchInput from '../../../components/SearchInput'
import TablePagination from '../../../components/TablePagination'
import { Eye, Plus, PencilSimple, Trash } from 'phosphor-react'
import { institutes, createRealm, updateRealmName, deleteRealm } from '../../../lib/data'
import { getRealmsForScope, slugify } from '../utils'

const RealmsPage: React.FC = () => {
  const [selectedScope, setSelectedScope] = useState('')
  const [query, setQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const [version, setVersion] = useState(0)
  const navigate = useNavigate()

  const scopeOptions = useMemo(() => {
    const options = [{ value: '', label: 'Select scope…' }, { value: 'global', label: 'Global Realms' }]
    institutes.slice(0, 3).forEach(inst => {
      options.push({ value: inst.name, label: inst.name })
    })
    return options
  }, [])

  const realms = useMemo(() => getRealmsForScope(selectedScope), [selectedScope, version])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return realms
    return realms.filter(r => r.name.toLowerCase().includes(q))
  }, [query, realms])

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const currentPageIndex = Math.min(pageIndex, Math.max(0, pageCount - 1))
  const pageStart = currentPageIndex * rowsPerPage
  const pageEnd = pageStart + rowsPerPage
  const pageItems = filtered.slice(pageStart, pageEnd)

  const handleViewRealm = (realmName: string) => {
    const scopeSlug = slugify(selectedScope)
    const realmSlug = slugify(realmName)
    navigate(`/admin/realms/${scopeSlug}/${realmSlug}`)
  }

  const handleCreate = () => {
    if (!newName.trim() || !selectedScope) return
    createRealm(selectedScope, newName.trim())
    setNewName('')
    setShowAdd(false)
    setVersion(v => v + 1)
  }

  const handleSaveEdit = (id: number) => {
    if (!editingName.trim()) return
    updateRealmName(id, editingName.trim())
    setEditingId(null)
    setEditingName('')
    setVersion(v => v + 1)
  }

  const handleDelete = (id: number) => {
    if (!confirm('Delete this realm? All its classes and topics will be removed from this view.')) return
    deleteRealm(id)
    setVersion(v => v + 1)
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Realms Management</h2>
          <p className="text-sm text-white/70">Manage curriculum across realms and institutes</p>
        </div>
      </div>

      <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
        <CardHeader>
          <CardTitle className="text-white">Select Scope</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="text-white/80 text-sm mb-2 block">Realm Scope</label>
            <select 
              value={selectedScope} 
              onChange={(e) => {
                setSelectedScope(e.target.value)
                setPageIndex(0)
                setQuery('')
              }} 
              className="w-full md:w-64 bg-[#0b0b0c] border border-[#2a2a2d] rounded-md px-3 py-2 text-white"
            >
              {scopeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {selectedScope && (
            <>
              <div className="mb-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <SearchInput
                      placeholder="Search realms by name..."
                      value={query}
                      onChange={(value) => {
                        setQuery(value)
                        setPageIndex(0)
                      }}
                    />
                  </div>
                  <Button onClick={() => setShowAdd(s => !s)} className="whitespace-nowrap">
                    <Plus size={16} className="mr-1" /> Add realm
                  </Button>
                </div>
                {showAdd && (
                  <div className="mt-3 flex items-center gap-2">
                    <Input placeholder="Realm name" value={newName} onChange={(e:any)=>setNewName(e.target.value)} />
                    <Button onClick={handleCreate}>Create</Button>
                    <Button variant="secondary" onClick={()=>{setShowAdd(false); setNewName('')}}>Cancel</Button>
                  </div>
                )}
              </div>

              <Table>
                <TableHeader className="text-center">
                  <TableRow>
                    <TableHead className='text-center'>Realm Name</TableHead>
                    <TableHead className='text-center'>Classes</TableHead>
                    <TableHead className='text-center'>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="text-center">
                  {pageItems.map(realm => (
                    <TableRow key={realm.id}>
                      <TableCell className="font-medium">
                        {editingId === realm.id ? (
                          <Input value={editingName} onChange={(e:any)=>setEditingName(e.target.value)} />
                        ) : realm.name}
                      </TableCell>
                      <TableCell>{realm.classes.length}</TableCell>
                      <TableCell className='flex justify-center items-center'>
                        {editingId === realm.id ? (
                          <div className='flex gap-2'>
                            <Button onClick={() => handleSaveEdit(realm.id)}>Save</Button>
                            <Button variant='secondary' onClick={()=>{setEditingId(null); setEditingName('')}}>Cancel</Button>
                          </div>
                        ) : (
                          <div className='flex gap-2'>
                            <Button variant='secondary' className='!p-2' onClick={()=>{setEditingId(realm.id); setEditingName(realm.name)}}>
                              <PencilSimple size={16} />
                            </Button>
                            <Button className='!p-2' onClick={() => handleViewRealm(realm.name)}>
                              <Eye size={16} />
                            </Button>
                            <Button variant='destructive' className='!p-2' onClick={()=>handleDelete(realm.id)}>
                              <Trash size={16} />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}

                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">No realms found.</TableCell>
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default RealmsPage
