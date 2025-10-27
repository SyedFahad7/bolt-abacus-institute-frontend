import { teachers, institutes, students } from '../../lib/data'

export function getTeacher(id?: string) {
  if (!id) return undefined
  return teachers.find(t => t.id === id)
}

export function getTeacherStudents(id?: string) {
  if (!id) return []
  return students.filter(s => s.teacherId === id)
}

export function getTeacherAssignment(id?: string) {
  if (!id) return { institute: undefined, batch: undefined }
  const inst = institutes.find(i => i.batches.some(b=>b.teacherId === id))
  const batch = inst?.batches.find(b=>b.teacherId === id)
  return { institute: inst, batch }
}

export default { getTeacher, getTeacherStudents, getTeacherAssignment }
