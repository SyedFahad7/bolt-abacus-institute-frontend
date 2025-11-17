import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../../components'
import { Input, Button } from '../../../components'
import { ArrowLeft, Plus, Trash, PencilSimple } from 'phosphor-react'
import { getRealmBySlug, getClassById, getTopicById, getQuestionsForTopic, getOperatorDisplay, classIdFromSlug, topicIdFromSlug } from '../utils'
import { createQuestion, updateQuestion, deleteQuestion } from '../../../lib/data'

const QuestionsPage: React.FC = () => {
  const { scope, realmSlug, classSlug, topicSlug, quizType } = useParams<{ scope: string; realmSlug: string; classSlug: string; topicSlug: string; quizType: 'classwork' | 'homework' }>()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editOperator, setEditOperator] = useState('')
  const [editOperands, setEditOperands] = useState('')
  const [editAnswer, setEditAnswer] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [newOperator, setNewOperator] = useState('+')
  const [newOperands, setNewOperands] = useState('')
  const [newAnswer, setNewAnswer] = useState('')
  const navigate = useNavigate()

  const realm = useMemo(() => getRealmBySlug(scope!, realmSlug!), [scope, realmSlug])
  const classIdNum = useMemo(() => classIdFromSlug(classSlug!), [classSlug])
  const topicIdNum = useMemo(() => topicIdFromSlug(topicSlug!), [topicSlug])
  const cls = useMemo(() => (realm && !isNaN(classIdNum) ? getClassById(realm.id, classIdNum) : null), [realm, classIdNum])
  const topic = useMemo(() => (realm && !isNaN(classIdNum) && !isNaN(topicIdNum) ? getTopicById(realm.id, classIdNum, topicIdNum) : null), [realm, classIdNum, topicIdNum])
  const questions = useMemo(() => (realm && !isNaN(classIdNum) && !isNaN(topicIdNum) ? getQuestionsForTopic(realm.id, classIdNum, topicIdNum, quizType!) : []), [realm, classIdNum, topicIdNum, quizType])

  const operators = ['+', '*', '/', 'sqrt', 'cuberoot', 'square', 'cube', '^2', '^3']

  const handleEdit = (question: any) => {
    setEditingId(question.id)
    setEditOperator(question.operator)
    setEditOperands(question.operands.join(','))
    setEditAnswer(String(question.correctAnswer))
  }

  const handleSaveEdit = () => {
    if (!editOperands.trim() || !editAnswer.trim()) return
    const operands = editOperands.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n))
    const correctAnswer = Number(editAnswer)
    if (operands.length === 0 || isNaN(correctAnswer)) return
    updateQuestion(Number(realm!.id), Number(classIdNum), Number(topicIdNum), quizType!, editingId!, {
      operator: editOperator as any,
      operands,
      correctAnswer
    })
    setEditingId(null)
    setEditOperator('')
    setEditOperands('')
    setEditAnswer('')
    window.location.reload()
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditOperator('')
    setEditOperands('')
    setEditAnswer('')
  }

  const handleDelete = (questionId: string) => {
    if (confirm('Delete this question?')) {
      deleteQuestion(Number(realm!.id), Number(classIdNum), Number(topicIdNum), quizType!, questionId)
      window.location.reload()
    }
  }

  const handleAdd = () => {
    if (!newOperands.trim() || !newAnswer.trim()) return
    const operands = newOperands.split(',').map(n => Number(n.trim())).filter(n => !isNaN(n))
    const correctAnswer = Number(newAnswer)
    if (operands.length === 0 || isNaN(correctAnswer)) return
  createQuestion(Number(realm!.id), Number(classIdNum), Number(topicIdNum), quizType!, newOperator, operands, correctAnswer)
    setIsAdding(false)
    setNewOperator('+')
    setNewOperands('')
    setNewAnswer('')
    window.location.reload()
  }

  if (!realm || !cls || !topic) {
    return (
      <div className="w-full">
        <Card className="bg-[#0f0f10] border-[#2a2a2d]">
          <CardContent>
            <p className="text-white/70 text-center py-8">Not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
  <Button variant="secondary" onClick={() => navigate(`/institute/realms/${scope}/${realmSlug}/${classSlug}`)}>
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white capitalize">{quizType} - Topic {topicIdNum}</h2>
          <p className="text-sm text-white/70">{cls.name} / {realm.name}</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="ml-auto">
          <Plus size={16} className="mr-1" /> Add Question
        </Button>
      </div>

      <Card className="bg-[#0f0f10] border-[#2a2a2d] w-full">
        <CardHeader>
          <CardTitle className="text-white">Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">No.</TableHead>
                <TableHead className="w-1/5">Operator</TableHead>
                <TableHead className="w-1/3">Operands</TableHead>
                <TableHead className="w-[150px]">Answer</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isAdding && (
                <TableRow>
                  <TableCell>—</TableCell>
                  <TableCell>
                    <select value={newOperator} onChange={(e) => setNewOperator(e.target.value)} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded px-2 py-1 text-white w-full">
                      {operators.map(op => <option key={op} value={op}>{getOperatorDisplay(op)}</option>)}
                    </select>
                  </TableCell>
                  <TableCell>
                    <Input placeholder="e.g., 10,5" value={newOperands} onChange={(e: any) => setNewOperands(e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input placeholder="e.g., 15" value={newAnswer} onChange={(e: any) => setNewAnswer(e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button onClick={handleAdd}>Save</Button>
                      <Button variant="secondary" onClick={() => setIsAdding(false)}>Cancel</Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {questions.map((q, idx) => (
                <TableRow key={q.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    {editingId === q.id ? (
                      <select value={editOperator} onChange={(e) => setEditOperator(e.target.value)} className="bg-[#0b0b0c] border border-[#2a2a2d] rounded px-2 py-1 text-white w-full">
                        {operators.map(op => <option key={op} value={op}>{getOperatorDisplay(op)}</option>)}
                      </select>
                    ) : getOperatorDisplay(q.operator)}
                  </TableCell>
                  <TableCell>
                    {editingId === q.id ? (
                      <Input value={editOperands} onChange={(e: any) => setEditOperands(e.target.value)} />
                    ) : q.operands.join(', ')}
                  </TableCell>
                  <TableCell>
                    {editingId === q.id ? (
                      <Input value={editAnswer} onChange={(e: any) => setEditAnswer(e.target.value)} />
                    ) : q.correctAnswer}
                  </TableCell>
                  <TableCell>
                    {editingId === q.id ? (
                      <div className="flex gap-2">
                        <Button onClick={handleSaveEdit}>Save</Button>
                        <Button variant="secondary" onClick={handleCancelEdit}>Cancel</Button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => handleEdit(q)} className="!p-2">
                          <PencilSimple size={16} />
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(q.id)} className="!p-2">
                          <Trash size={16} />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {questions.length === 0 && !isAdding && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">No questions yet. Click Add Question to create one.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuestionsPage
