import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Button, Input } from '../../../components'
import SearchInput from '../../../components/SearchInput'
import TablePagination from '../../../components/TablePagination'
import { ArrowLeft, Eye, Plus, Trash, PencilSimple } from 'phosphor-react'
import { getRealmBySlug, getClassesForRealm, classSlugFromId } from '../utils'
import { addClassToRealm, deleteClassFromRealm, updateSpecialClassName } from '../../../lib/data'

const RealmClassesPage: React.FC = () => {
  const { scope, realmSlug } = useParams<{ scope: string; realmSlug: string }>()
  const [query, setQuery] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageIndex, setPageIndex] = useState(0)
  const [version, setVersion] = useState(0)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingName, setEditingName] = useState('')
  const navigate = useNavigate()

  const realm = useMemo(() => getRealmBySlug(scope!, realmSlug!), [scope, realmSlug, version])
  const classes = useMemo(() => (realm ? getClassesForRealm(realm.id) : []), [realm, version])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return classes
    return classes.filter(c => c.name.toLowerCase().includes(q))
  }, [query, classes])

  const pageCount = Math.max(1, Math.ceil(filtered.length / rowsPerPage))
  const currentPageIndex = Math.min(pageIndex, Math.max(0, pageCount - 1))
  const pageStart = currentPageIndex * rowsPerPage
  const pageEnd = pageStart + rowsPerPage
  const pageItems = filtered.slice(pageStart, pageEnd)

  const handleViewClass = (classId: number) => {
    navigate(`/institute/realms/${scope}/${realmSlug}/${classSlugFromId(classId)}`)
  }

  const handleAddClass = () => {
    if (!realm) return
    addClassToRealm(realm.id)
    setVersion(v => v + 1)
  }

  const handleDeleteClass = (classId: number) => {
    if (!realm) return
    if (!confirm('Delete this class? All its topics and questions will be removed.')) return
    const ok = deleteClassFromRealm(realm.id, classId)
    if (!ok) {
      alert('Cannot delete special rows. Only numbered classes can be deleted.')
      return
    }
    setVersion(v => v + 1)
  }

  const startEditSpecial = (classId: number, name: string) => {
    setEditingId(classId)
    setEditingName(name)
  }

  const saveEditSpecial = () => {
    if (!realm || editingId == null) return
    if (!editingName.trim()) return
    const ok = updateSpecialClassName(realm.id, editingId, editingName.trim())
    if (!ok) {
      alert('Only the last two rows can be renamed.')
      return
    }
    setEditingId(null)
    setEditingName('')
    setVersion(v => v + 1)
  }

  const cancelEditSpecial = () => {
    setEditingId(null)
    setEditingName('')
  }

  if (!realm) {
    return (
      <div className="w-full">
        <Card className="bg-[#0f0f10] border-[#2a2a2d]">
          <CardContent>
            <p className="text-white/70 text-center py-8">Realm not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="secondary" onClick={() => navigate('/institute/realms')}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">{realm.name}</h2>
          <p className="text-sm text-white/70">Manage classes in this realm</p>
        </div>
        <Button onClick={handleAddClass} className="ml-auto">
          <Plus size={16} className="mr-1" /> Add Class
        </Button>
      </div>

      <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
        <CardHeader>
          <CardTitle className="text-white">Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <SearchInput
              placeholder="Search classes..."
              value={query}
              onChange={(value) => {
                setQuery(value)
                setPageIndex(0)
              }}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Class Name</TableHead>
                <TableHead className="text-white">Topics</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="text-white">
              {pageItems.map((cls) => {
                const isSpecial = classes.indexOf(cls) >= classes.length - 2
                return (
                  <TableRow key={cls.id}>
                    <TableCell className="font-medium">
                      {isSpecial && editingId === cls.id ? (
                        <Input value={editingName} onChange={(e: any) => setEditingName(e.target.value)} />
                      ) : (
                        cls.name
                      )}
                    </TableCell>
                    <TableCell>{cls.topics.length}</TableCell>
                    <TableCell className="flex gap-2">
                      {isSpecial ? (
                        editingId === cls.id ? (
                          <>
                            <Button onClick={saveEditSpecial}>Save</Button>
                            <Button variant="secondary" onClick={cancelEditSpecial}>Cancel</Button>
                            <Button variant="secondary" onClick={() => handleViewClass(cls.id)} className="!p-2">
                              <Eye size={16} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="secondary" onClick={() => startEditSpecial(cls.id, cls.name)} className="!p-2">
                              <PencilSimple size={16} />
                            </Button>
                            <Button variant="secondary" onClick={() => handleViewClass(cls.id)} className="!p-2">
                              <Eye size={16} />
                            </Button>
                          </>
                        )
                      ) : (
                        <>
                          <Button variant="secondary" onClick={() => handleViewClass(cls.id)} className="!p-2">
                            <Eye size={16} />
                          </Button>
                          <Button variant="destructive" onClick={() => handleDeleteClass(cls.id)} className="!p-2">
                            <Trash size={16} />
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8">No classes found.</TableCell>
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

export default RealmClassesPage
