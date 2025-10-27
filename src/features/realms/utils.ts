import { getRealms, getRealm, getRealmClasses, getClass, getClassTopics, getTopic, getTopicQuestions, institutes } from '../../lib/data'

export const getScopeOptions = () => {
  const scopes = new Set<string>()
  const allRealms = [...getRealms('global')]
  allRealms.forEach(r => scopes.add(r.scope))
  return Array.from(scopes)
}

export const getRealmsForScope = (scope: string) => getRealms(scope)

export const getRealmById = (realmId: number) => getRealm(realmId)

export const getClassesForRealm = (realmId: number) => getRealmClasses(realmId)

export const getClassById = (realmId: number, classId: number) => getClass(realmId, classId)

export const getTopicsForClass = (realmId: number, classId: number) => getClassTopics(realmId, classId)

export const getTopicById = (realmId: number, classId: number, topicId: number) => getTopic(realmId, classId, topicId)

export const getQuestionsForTopic = (realmId: number, classId: number, topicId: number, type: 'classwork' | 'homework') => getTopicQuestions(realmId, classId, topicId, type)

export const getOperatorDisplay = (operator: string) => {
  const map: Record<string, string> = {
    '+': 'Addition',
    '*': 'Multiplication',
    '/': 'Division',
    'sqrt': 'Square Root',
    'cuberoot': 'Cube Root',
    'square': 'Square',
    'cube': 'Cube',
    '^2': 'Square',
    '^3': 'Cube'
  }
  return map[operator] || operator
}

export const getScopeDisplayName = (scope: string) => {
  return scope === 'global' ? 'Global Realms' : scope
}

// URL slug helpers
export const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const scopeFromSlug = (scopeSlug: string): string => {
  if (!scopeSlug) return ''
  if (scopeSlug === 'global') return 'global'
  const inst = institutes.find(i => slugify(i.name) === scopeSlug)
  return inst ? inst.name : scopeSlug
}

export const getRealmBySlug = (scopeSlug: string, realmSlug: string) => {
  const scope = scopeFromSlug(scopeSlug)
  const realms = getRealms(scope)
  return realms.find(r => slugify(r.name) === realmSlug)
}

// Class/Topic slug helpers
export const classSlugFromId = (id: number) => `class-${id}`
export const topicSlugFromId = (id: number) => `topic-${id}`
export const classIdFromSlug = (slug: string) => {
  const m = /^class-(\d+)$/.exec(slug)
  return m ? Number(m[1]) : NaN
}
export const topicIdFromSlug = (slug: string) => {
  const m = /^topic-(\d+)$/.exec(slug)
  return m ? Number(m[1]) : NaN
}
