import { institutes, students } from '../../lib/data'

export function getInstitute(id: string | undefined) {
  if (!id) return undefined
  return institutes.find(i => i.id === id)
}

export function getInstituteStudents(id: string | undefined) {
  if (!id) return []
  return students.filter(s => s.instituteId === id)
}

export function getInstituteBatches(id: string | undefined) {
  const inst = getInstitute(id)
  return inst?.batches ?? []
}

export default { getInstitute, getInstituteStudents, getInstituteBatches }
