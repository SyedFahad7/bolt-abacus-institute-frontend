import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Button } from '../../../components'
import { ArrowLeft, Plus, Trash, Eye } from 'phosphor-react'
import { getRealmBySlug, getClassById, getTopicsForClass, classIdFromSlug, topicSlugFromId } from '../utils'
import { createTopic, deleteTopic } from '../../../lib/data'

const ClassTopicsPage: React.FC = () => {
  const { scope, realmSlug, classSlug } = useParams<{ scope: string; realmSlug: string; classSlug: string }>()
  const navigate = useNavigate()

  const realm = useMemo(() => getRealmBySlug(scope!, realmSlug!), [scope, realmSlug])
  const classIdNum = useMemo(() => classIdFromSlug(classSlug!), [classSlug])
  const cls = useMemo(() => (realm && !isNaN(classIdNum) ? getClassById(realm.id, classIdNum) : null), [realm, classIdNum])
  const topics = useMemo(() => (realm && !isNaN(classIdNum) ? getTopicsForClass(realm.id, classIdNum) : []), [realm, classIdNum])

  const handleCreateTopic = () => {
    if (confirm('Create a new topic?')) {
      createTopic(Number(realm!.id), Number(classIdNum))
      window.location.reload()
    }
  }

  const handleDeleteTopic = (topicId: number) => {
    if (confirm(`Delete Topic ${topicId}? All questions will be lost.`)) {
      deleteTopic(Number(realm!.id), Number(classIdNum), topicId)
      window.location.reload()
    }
  }

  const handleViewQuestions = (topicId: number, type: 'classwork' | 'homework') => {
    navigate(`/admin/realms/${scope}/${realmSlug}/${classSlug}/${topicSlugFromId(topicId)}/${type}`)
  }

  if (!realm || !cls) {
    return (
      <div className="w-full">
        <Card className="bg-[#0f0f10] border-[#2a2a2d]">
          <CardContent>
            <p className="text-white/70 text-center py-8">Class not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="secondary" onClick={() => navigate(`/admin/realms/${scope}/${realmSlug}`)}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">{cls.name}</h2>
          <p className="text-sm text-white/70">{realm.name}</p>
        </div>
        <Button onClick={handleCreateTopic} className="ml-auto">
          <Plus size={16} className="mr-1" /> Add Topic
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#0f0f10] border-[#2a2a2d]">
          <CardHeader>
            <CardTitle className="text-white">Topics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topics.map(topic => (
                <div key={topic.id} className="flex items-center justify-between p-3 bg-[#1a1a1d] rounded border border-[#2a2a2d]">
                  <span className="text-white font-medium">Topic {topic.id}</span>
                  <Button variant="destructive" onClick={() => handleDeleteTopic(topic.id)} className="!p-2">
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
              {topics.length === 0 && (
                <p className="text-white/70 text-sm text-center py-4">No topics yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f0f10] border-[#2a2a2d]">
          <CardHeader>
            <CardTitle className="text-white">Classwork</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topics.map(topic => (
                <div key={topic.id} className="flex items-center justify-between p-3 bg-[#1a1a1d] rounded border border-[#2a2a2d]">
                  <div>
                    <p className="text-white font-medium">Topic {topic.id}</p>
                    <p className="text-white/70 text-xs">{topic.classworkQuestions.length} questions</p>
                  </div>
                  <Button onClick={() => handleViewQuestions(topic.id, 'classwork')} variant="secondary" className="!p-2">
                    <Eye size={16} />
                  </Button>
                </div>
              ))}
              {topics.length === 0 && (
                <p className="text-white/70 text-sm text-center py-4">No topics yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0f0f10] border-[#2a2a2d]">
          <CardHeader>
            <CardTitle className="text-white">Homework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topics.map(topic => (
                <div key={topic.id} className="flex items-center justify-between p-3 bg-[#1a1a1d] rounded border border-[#2a2a2d]">
                  <div>
                    <p className="text-white font-medium">Topic {topic.id}</p>
                    <p className="text-white/70 text-xs">{topic.homeworkQuestions.length} questions</p>
                  </div>
                  <Button onClick={() => handleViewQuestions(topic.id, 'homework')} variant="secondary" className="!p-2">
                    <Eye size={16} />
                  </Button>
                </div>
              ))}
              {topics.length === 0 && (
                <p className="text-white/70 text-sm text-center py-4">No topics yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ClassTopicsPage
