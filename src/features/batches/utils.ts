import { institutes, students, teachers } from '../../lib/data'

export function getBatch(batchId: string) {
  for (const inst of institutes) {
    const batch = inst.batches.find(b => b.id === batchId)
    if (batch) {
      return {
        ...batch,
        instituteId: inst.id,
        instituteName: inst.name
      }
    }
  }
  return null
}

export function getBatchStudents(batchId: string) {
  return students.filter(s => s.batchId === batchId)
}

export function getBatchInstitute(batchId: string) {
  return institutes.find(i => i.batches.some(b => b.id === batchId))
}

export function getBatchTeacher(batchId: string) {
  const batch = getBatch(batchId)
  if (!batch || !batch.teacherId) return null
  return teachers.find(t => t.id === batch.teacherId)
}
