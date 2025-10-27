// Dummy data used by admin students pages
export const institutes = [
  { id: 'ins-1', name: 'Northside Institute', batches: [
    { id: 'ins-1-b1', name: 'Batch A', teacherId: 't-1' },
    { id: 'ins-1-b2', name: 'Batch B', teacherId: 't-2' },
    { id: 'ins-1-b3', name: 'Batch C', teacherId: 't-3' },
  ] },
  { id: 'ins-2', name: 'Eastside Learning', batches: [
    { id: 'ins-2-b1', name: 'Batch 1', teacherId: 't-2' },
    { id: 'ins-2-b2', name: 'Batch 2', teacherId: 't-3' },
    { id: 'ins-2-b3', name: 'Batch 3', teacherId: 't-1' },
  ] },
  { id: 'ins-3', name: 'Downtown Academy', batches: [
    { id: 'ins-3-b1', name: 'Morning Batch', teacherId: 't-3' },
    { id: 'ins-3-b2', name: 'Evening Batch', teacherId: 't-1' },
    { id: 'ins-3-b3', name: 'Weekend Batch', teacherId: 't-2' },
  ] },
  { id: 'ins-4', name: 'Riverdale College', batches: [
    { id: 'ins-4-b1', name: 'Alpha', teacherId: 't-4' },
    { id: 'ins-4-b2', name: 'Beta', teacherId: 't-5' },
    { id: 'ins-4-b3', name: 'Gamma', teacherId: 't-6' },
  ] },
  { id: 'ins-5', name: 'Hillside School', batches: [
    { id: 'ins-5-b1', name: 'Group 1', teacherId: 't-5' },
    { id: 'ins-5-b2', name: 'Group 2', teacherId: 't-4' },
    { id: 'ins-5-b3', name: 'Group 3', teacherId: 't-6' },
  ] },
  { id: 'ins-6', name: 'Central Learning Hub', batches: [
    { id: 'ins-6-b1', name: 'Cohort A', teacherId: 't-6' },
    { id: 'ins-6-b2', name: 'Cohort B', teacherId: 't-4' },
    { id: 'ins-6-b3', name: 'Cohort C', teacherId: 't-5' },
  ] },
]

export const teachers = [
  { id: 't-1', name: 'Aisha Khan', email: 'aisha.khan@example.com' },
  { id: 't-2', name: 'Rahul Verma', email: 'rahul.verma@example.com' },
  { id: 't-3', name: 'Maya Singh', email: 'maya.singh@example.com' },
  { id: 't-4', name: 'Imran Qureshi', email: 'imran.qureshi@example.com' },
  { id: 't-5', name: 'Neha Patel', email: 'neha.patel@example.com' },
  { id: 't-6', name: 'Arjun Das', email: 'arjun.das@example.com' },
]

export const students = Array.from({ length: 18 }).map((_, i) => {
  const id = `s-${i+1}`
  const name = ['Rahim Ali','Sara Malik','Aman','Fahad','Sofia','Liam','Emma','Noah','Olivia','Zara','Omar','Ibrahim','Hira','Naveed','Ayesha','Bilal','Kiran','Rida'][i % 18]
  const email = `${name.toLowerCase().replace(/\s+/g,'')}@example.com`
  const institute = institutes[i % institutes.length]
  const batch = institute.batches[i % institute.batches.length]
  return {
    id,
    name,
    email,
    location: ['Lahore','Karachi','Islamabad','Multan'][i % 4],
    status: ['Active','Inactive'][i % 2],
    performance: `${Math.floor(50 + Math.random()*50)}%`,
    attendance: `${Math.floor(60 + Math.random()*40)}%`,
    balance: `₹${(Math.floor(Math.random()*1000)).toFixed(0)}`,
    instituteId: institute.id,
    batchId: batch.id,
    teacherId: teachers[i % teachers.length].id,
  }
})

export default { institutes, teachers, students }
export function updateStudent(id: string, patch: Partial<{ name: string; email: string; instituteId: string; batchId: string }>) {
  const idx = students.findIndex(s => s.id === id)
  if (idx === -1) return false
  students[idx] = { ...students[idx], ...patch }
  return true
}

export function assignStudentToBatch(studentId: string, instituteId: string, batchId: string) {
  return updateStudent(studentId, { instituteId, batchId })
}

export function removeStudentFromBatch(studentId: string) {
  return updateStudent(studentId, { instituteId: '', batchId: '' })
}

// Institutes CRUD helpers (UI-only, mutate in-memory data)
function genId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function createInstitute(name: string) {
  const id = genId('ins')
  institutes.push({ id, name, batches: [] })
  return id
}

export function updateInstitute(id: string, patch: Partial<{ name: string }>) {
  const idx = institutes.findIndex(i => i.id === id)
  if (idx === -1) return false
  institutes[idx] = { ...institutes[idx], ...patch }
  return true
}

export function deleteInstitute(id: string) {
  const idx = institutes.findIndex(i => i.id === id)
  if (idx === -1) return false
  // clear students belonging to this institute
  students.forEach(s => {
    if (s.instituteId === id) {
      s.instituteId = ''
      s.batchId = ''
    }
  })
  institutes.splice(idx, 1)
  return true
}

export function addBatch(instituteId: string, name: string) {
  const inst = institutes.find(i => i.id === instituteId)
  if (!inst) return null
  const id = genId(`${instituteId}-b`)
  const batch = { id, name, teacherId: '' }
  inst.batches.push(batch)
  return batch
}

export function updateBatch(instituteId: string, batchId: string, patch: Partial<{ name: string; teacherId: string }>) {
  const inst = institutes.find(i => i.id === instituteId)
  if (!inst) return false
  const idx = inst.batches.findIndex(b => b.id === batchId)
  if (idx === -1) return false
  inst.batches[idx] = { ...inst.batches[idx], ...patch }
  return true
}

export function deleteBatch(instituteId: string, batchId: string) {
  const inst = institutes.find(i => i.id === instituteId)
  if (!inst) return false
  const idx = inst.batches.findIndex(b => b.id === batchId)
  if (idx === -1) return false
  // clear students belonging to this batch
  students.forEach(s => {
    if (s.batchId === batchId) s.batchId = ''
  })
  inst.batches.splice(idx, 1)
  return true
}

export function assignTeacherToBatch(instituteId: string, batchId: string, teacherId: string) {
  return updateBatch(instituteId, batchId, { teacherId })
}

// Teachers CRUD (UI-only)
export function createTeacher(name: string, email: string, instituteId = '', batchId = '') {
  const id = genId('t')
  const teacher = { id, name, email }
  teachers.push(teacher)
  // optionally assign to batch
  if (instituteId && batchId) {
    updateBatch(instituteId, batchId, { teacherId: id })
  }
  return teacher
}

export function updateTeacher(id: string, patch: Partial<{ name: string; email: string }>) {
  const idx = teachers.findIndex(t => t.id === id)
  if (idx === -1) return false
  teachers[idx] = { ...teachers[idx], ...patch }
  return true
}

export function deleteTeacher(id: string) {
  const idx = teachers.findIndex(t => t.id === id)
  if (idx === -1) return false
  // remove teacher from any batches
  institutes.forEach(i => i.batches.forEach(b => { if (b.teacherId === id) b.teacherId = '' }))
  teachers.splice(idx, 1)
  return true
}

export function assignTeacherToInstituteBatch(teacherId: string, instituteId: string, batchId: string) {
  // set batch teacherId
  return updateBatch(instituteId, batchId, { teacherId })
}

export function removeTeacherFromBatch(instituteId: string, batchId: string) {
  return updateBatch(instituteId, batchId, { teacherId: '' })
}

export function getAllBatches() {
  const allBatches: Array<{ id: string; name: string; instituteId: string; teacherId: string }> = []
  institutes.forEach(inst => {
    inst.batches.forEach(batch => {
      allBatches.push({
        id: batch.id,
        name: batch.name,
        instituteId: inst.id,
        teacherId: batch.teacherId || ''
      })
    })
  })
  return allBatches
}

export function moveBatchToInstitute(batchId: string, fromInstituteId: string, toInstituteId: string) {
  const fromInst = institutes.find(i => i.id === fromInstituteId)
  const toInst = institutes.find(i => i.id === toInstituteId)
  if (!fromInst || !toInst) return false
  const batchIdx = fromInst.batches.findIndex(b => b.id === batchId)
  if (batchIdx === -1) return false
  const batch = fromInst.batches.splice(batchIdx, 1)[0]
  toInst.batches.push(batch)
  students.forEach(s => {
    if (s.batchId === batchId) s.instituteId = toInstituteId
  })
  return true
}

// Realms data structure
export const realmNames = [
  'Wind Realm', 'Water Realm', 'Fire Realm', 'Earth Realm', 'Lightning Realm',
  'Crystal Realm', 'Shadow Realm', 'Light Realm', 'Celestial Realm', 'Eternal Realm'
]

export interface Question {
  id: string
  operator: '+' | '*' | '/' | 'sqrt' | 'cuberoot' | 'square' | 'cube' | '^2' | '^3'
  operands: number[]
  correctAnswer: number
}

export interface Topic {
  id: number
  classworkQuestions: Question[]
  homeworkQuestions: Question[]
}

export interface Class {
  id: number
  name: string
  topics: Topic[]
}

export interface Realm {
  id: number
  name: string
  scope: 'global' | string
  classes: Class[]
}

const generateQuestions = (count: number, startId: string): Question[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `${startId}-q${i+1}`,
    operator: ['+', '*', '/'][i % 3] as '+' | '*' | '/',
    operands: [Math.floor(Math.random()*100)+10, Math.floor(Math.random()*50)+5],
    correctAnswer: 0
  }))
}

const generateTopics = (classId: number, realmId: number, scope: string): Topic[] => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    classworkQuestions: generateQuestions(10, `${scope}-r${realmId}-c${classId}-t${i+1}-cw`),
    homeworkQuestions: generateQuestions(10, `${scope}-r${realmId}-c${classId}-t${i+1}-hw`)
  }))
}

const generateClasses = (realmId: number, scope: string): Class[] => {
  const classes: Class[] = []
  for (let i = 1; i <= 10; i++) {
    classes.push({
      id: i,
      name: `Class ${i}`,
      topics: generateTopics(i, realmId, scope)
    })
  }
  classes.push({
    id: 11,
    name: 'Realm Practice Test',
    topics: generateTopics(11, realmId, scope)
  })
  classes.push({
    id: 12,
    name: 'Realm Final Test',
    topics: generateTopics(12, realmId, scope)
  })
  return classes
}

export const realms: Realm[] = []

realmNames.forEach((name, idx) => {
  realms.push({
    id: idx + 1,
    name,
    scope: 'global',
    classes: generateClasses(idx + 1, 'global')
  })
})

institutes.slice(0, 3).forEach((inst) => {
  realmNames.forEach((name, rIdx) => {
    realms.push({
      id: realms.length + 1,
      name,
      scope: inst.name,
      classes: generateClasses(rIdx + 1, inst.id)
    })
  })
})

export const getRealms = (scope: string) => realms.filter(r => r.scope === scope)
export const getRealm = (realmId: number) => realms.find(r => r.id === realmId)
export const getRealmClasses = (realmId: number) => realms.find(r => r.id === realmId)?.classes || []
export const getClass = (realmId: number, classId: number) => getRealmClasses(realmId).find(c => c.id === classId)
export const getClassTopics = (realmId: number, classId: number) => getClass(realmId, classId)?.topics || []
export const getTopic = (realmId: number, classId: number, topicId: number) => getClassTopics(realmId, classId).find(t => t.id === topicId)
export const getTopicQuestions = (realmId: number, classId: number, topicId: number, type: 'classwork' | 'homework') => {
  const topic = getTopic(realmId, classId, topicId)
  return type === 'classwork' ? (topic?.classworkQuestions || []) : (topic?.homeworkQuestions || [])
}

// Realm-level CRUD (UI only)
export const createRealm = (scope: string, name: string) => {
  const nextId = (realms.length ? Math.max(...realms.map(r => r.id)) : 0) + 1
  const newRealm: Realm = {
    id: nextId,
    name: name.trim(),
    scope,
    classes: generateClasses(1, scope) // seed with default structure
  }
  realms.push(newRealm)
  return newRealm
}

export const updateRealmName = (realmId: number, name: string) => {
  const realm = realms.find(r => r.id === realmId)
  if (!realm) return false
  realm.name = name.trim()
  return true
}

export const deleteRealm = (realmId: number) => {
  const idx = realms.findIndex(r => r.id === realmId)
  if (idx === -1) return false
  realms.splice(idx, 1)
  return true
}

// Classes CRUD (UI only) with auto-renumbering and special rows at bottom
const reorderRealmClasses = (realm: Realm) => {
  if (!realm) return
  const classes = realm.classes
  if (classes.length === 0) return
  // Assume last two are special rows
  const special: Class[] = classes.slice(-2)
  const normals: Class[] = classes.slice(0, Math.max(0, classes.length - 2))
  // Renumber normal classes and reset names
  normals.sort((a, b) => a.id - b.id)
  normals.forEach((c, idx) => {
    c.id = idx + 1
    c.name = `Class ${c.id}`
  })
  // Place specials at the end, preserving their names
  const newClasses: Class[] = [...normals]
  // Reassign special ids after normals
  special.forEach((c, sIdx) => {
    c.id = normals.length + sIdx + 1
  })
  newClasses.push(...special)
  realm.classes = newClasses
}

export const addClassToRealm = (realmId: number) => {
  const realm = realms.find(r => r.id === realmId)
  if (!realm) return false
  const len = realm.classes.length
  if (len < 2) return false // unexpected
  const normalsCount = len - 2
  const newClass: Class = { id: normalsCount + 1, name: `Class ${normalsCount + 1}`, topics: [] }
  // insert before the last two special rows
  realm.classes.splice(normalsCount, 0, newClass)
  reorderRealmClasses(realm)
  return true
}

export const deleteClassFromRealm = (realmId: number, classId: number) => {
  const realm = realms.find(r => r.id === realmId)
  if (!realm) return false
  const len = realm.classes.length
  if (len <= 2) return false
  const normalsCount = len - 2
  // disallow deleting special rows
  if (classId > normalsCount) return false
  const idx = realm.classes.findIndex(c => c.id === classId)
  if (idx === -1) return false
  realm.classes.splice(idx, 1)
  reorderRealmClasses(realm)
  return true
}

export const updateSpecialClassName = (realmId: number, classId: number, newName: string) => {
  const realm = realms.find(r => r.id === realmId)
  if (!realm) return false
  const len = realm.classes.length
  if (len < 2) return false
  const normalsCount = len - 2
  if (classId <= normalsCount) return false // only allow renaming special rows
  const cls = realm.classes.find(c => c.id === classId)
  if (!cls) return false
  cls.name = newName.trim()
  reorderRealmClasses(realm)
  return true
}

export const createQuestion = (realmId: number, classId: number, topicId: number, type: 'classwork' | 'homework', operator: string, operands: number[], correctAnswer: number) => {
  const topic = getTopic(realmId, classId, topicId)
  if (!topic) return false
  const questions = type === 'classwork' ? topic.classworkQuestions : topic.homeworkQuestions
  questions.push({
    id: `q-${Date.now()}`,
    operator: operator as any,
    operands,
    correctAnswer
  })
  return true
}

export const updateQuestion = (realmId: number, classId: number, topicId: number, type: 'classwork' | 'homework', questionId: string, updates: Partial<Question>) => {
  const topic = getTopic(realmId, classId, topicId)
  if (!topic) return false
  const questions = type === 'classwork' ? topic.classworkQuestions : topic.homeworkQuestions
  const question = questions.find(q => q.id === questionId)
  if (!question) return false
  Object.assign(question, updates)
  return true
}

export const deleteQuestion = (realmId: number, classId: number, topicId: number, type: 'classwork' | 'homework', questionId: string) => {
  const topic = getTopic(realmId, classId, topicId)
  if (!topic) return false
  const questions = type === 'classwork' ? topic.classworkQuestions : topic.homeworkQuestions
  const idx = questions.findIndex(q => q.id === questionId)
  if (idx === -1) return false
  questions.splice(idx, 1)
  return true
}

export const createTopic = (realmId: number, classId: number) => {
  const cls = getClass(realmId, classId)
  if (!cls) return false
  const newTopicId = Math.max(...cls.topics.map(t => t.id), 0) + 1
  cls.topics.push({
    id: newTopicId,
    classworkQuestions: [],
    homeworkQuestions: []
  })
  return true
}

export const deleteTopic = (realmId: number, classId: number, topicId: number) => {
  const cls = getClass(realmId, classId)
  if (!cls) return false
  const idx = cls.topics.findIndex(t => t.id === topicId)
  if (idx === -1) return false
  cls.topics.splice(idx, 1)
  return true
}
