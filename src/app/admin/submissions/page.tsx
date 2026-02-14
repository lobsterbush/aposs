'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AnimatedCard } from '@/components/animated'
import { 
  FileText, CheckCircle, X, Eye, Clock, Calendar,
  Mail, Building, User, Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Submission {
  id: string
  title: string
  abstract: string
  authorName: string
  authorEmail: string
  authorAffiliation: string
  authorBio?: string
  coAuthors?: string
  researchField?: string
  methodology?: string
  keywords?: string
  isPublished?: boolean
  presentationPreference?: string
  availabilityNotes?: string
  status: 'PENDING' | 'UNDER_REVIEW' | 'ACCEPTED' | 'SCHEDULED' | 'PRESENTED' | 'REJECTED'
  submittedAt: string
  reviewedAt?: string
  scheduledAt?: string
}

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions')
      const data = await response.json()
      if (data.success) {
        setSubmissions(data.submissions)
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSubmissionStatus = async (submissionId: string, status: string) => {
    try {
      const response = await fetch(`/api/submissions/${submissionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      
      if (response.ok) {
        fetchSubmissions()
        if (selectedSubmission?.id === submissionId) {
          setSelectedSubmission({ ...selectedSubmission, status: status as Submission['status'] })
        }
      }
    } catch (error) {
      console.error('Error updating submission:', error)
    }
  }

  const scheduleSubmission = async (submissionId: string, scheduledDateTime: string) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          scheduledAt: scheduledDateTime
        })
      })
      
      if (response.ok) {
        fetchSubmissions()
      }
    } catch (error) {
      console.error('Error scheduling submission:', error)
    }
  }

  const getStatusBadge = () => {
    return 'bg-[#f3f4f6] text-[#374151] border-[#e5e7eb]'
  }

  const filteredSubmissions = submissions.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.authorEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'ALL' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    ALL: submissions.length,
    PENDING: submissions.filter(s => s.status === 'PENDING').length,
    UNDER_REVIEW: submissions.filter(s => s.status === 'UNDER_REVIEW').length,
    ACCEPTED: submissions.filter(s => s.status === 'ACCEPTED').length,
    SCHEDULED: submissions.filter(s => s.status === 'SCHEDULED').length,
    PRESENTED: submissions.filter(s => s.status === 'PRESENTED').length,
    REJECTED: submissions.filter(s => s.status === 'REJECTED').length,
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-[3px] border-[#17152b]/20 border-t-[#17152b] rounded-full animate-spin" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#111827] mb-2">Submissions</h1>
          <p className="text-[#4b5563]">Review and manage paper submissions</p>
        </div>

        {/* Filters */}
        <AnimatedCard className="border border-[#e5e5e5]">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <Input
                type="text"
                placeholder="Search by title, author, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status filters */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(statusCounts).map(([status, count]) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    statusFilter === status
                      ? 'bg-[#111827] text-white'
                      : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]'
                  }`}
                >
                  {status.replace('_', ' ')} ({count})
                </button>
              ))}
            </div>
          </div>
        </AnimatedCard>

        {/* Submissions List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredSubmissions.length === 0 ? (
            <AnimatedCard className="text-center py-12 border border-[#e5e5e5]">
              <FileText className="w-12 h-12 mx-auto mb-4 text-[#9ca3af]" />
              <p className="text-[#6b7280]">No submissions found</p>
            </AnimatedCard>
          ) : (
            filteredSubmissions.map((submission, idx) => (
              <AnimatedCard key={submission.id} delay={idx * 0.02} className="border border-[#e5e5e5]">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#111827] mb-2">{submission.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-[#6b7280]">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {submission.authorName}
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {submission.authorEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {submission.authorAffiliation}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold border ${getStatusBadge()}`}>
                      {submission.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Abstract preview */}
                  {selectedSubmission?.id === submission.id ? (
                    <div className="space-y-3 pt-4 border-t border-[#e5e5e5]">
                      <div>
                        <h4 className="font-semibold text-[#111827] mb-2">Abstract</h4>
                        <p className="text-[#4b5563] leading-relaxed">{submission.abstract}</p>
                      </div>
                      {submission.keywords && (
                        <div>
                          <h4 className="font-semibold text-[#111827] mb-2">Keywords</h4>
                          <p className="text-[#4b5563]">{submission.keywords}</p>
                        </div>
                      )}
                      {submission.researchField && (
                        <div>
                          <h4 className="font-semibold text-[#111827] mb-2">Research Field</h4>
                          <p className="text-[#4b5563]">{submission.researchField}</p>
                        </div>
                      )}
                      <button
                        onClick={() => setSelectedSubmission(null)}
                        className="text-sm text-[#374151] hover:text-[#111827] font-semibold"
                      >
                        Show less
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-sm text-[#374151] hover:text-[#111827] font-semibold"
                    >
                      View full details →
                    </button>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[#e5e5e5]">
                    {submission.status === 'PENDING' && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#d4d4d4] text-[#374151] hover:bg-[#f3f4f6]"
                          onClick={() => updateSubmissionStatus(submission.id, 'UNDER_REVIEW')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Start Review
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[#374151] border-[#d4d4d4] hover:bg-[#f3f4f6]"
                          onClick={() => updateSubmissionStatus(submission.id, 'REJECTED')}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    {submission.status === 'UNDER_REVIEW' && (
                      <>
                        <Button
                          size="sm"
                          onClick={() => updateSubmissionStatus(submission.id, 'ACCEPTED')}
                          className="bg-[#111827] hover:bg-[#000000] text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-[#374151] border-[#d4d4d4] hover:bg-[#f3f4f6]"
                          onClick={() => updateSubmissionStatus(submission.id, 'REJECTED')}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}

                    {(submission.status === 'ACCEPTED' || submission.status === 'UNDER_REVIEW') && (
                      <div className="w-full mt-2 p-4 bg-[#f3f4f6] border border-[#e5e7eb] rounded-lg">
                        <label className="block text-sm font-semibold text-[#111827] mb-2">
                          <Calendar className="w-4 h-4 inline-block mr-1" />
                          Schedule Presentation
                        </label>
                        <p className="text-xs text-[#6b7280] mb-3">
                          Choose date and time to automatically accept and schedule this submission
                        </p>
                        <Input
                          type="datetime-local"
                          onChange={(e) => {
                            if (e.target.value) {
                              if (submission.status !== 'ACCEPTED') {
                                updateSubmissionStatus(submission.id, 'ACCEPTED')
                              }
                              scheduleSubmission(submission.id, e.target.value)
                            }
                          }}
                          className="max-w-xs"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
