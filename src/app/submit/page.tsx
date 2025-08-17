'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Upload, Send, CheckCircle, FileText, User, Mail, Building } from 'lucide-react'
import Link from 'next/link'

interface SubmissionData {
  // Author Information
  authorName: string
  authorEmail: string
  authorAffiliation: string
  authorBio: string
  coAuthors: string

  // Paper Information
  title: string
  abstract: string
  keywords: string
  researchField: string
  methodology: string

  // Additional Information
  isPublished: boolean
  presentationPreference: string
  availabilityNotes: string
}

export default function SubmitPage() {
  const [formData, setFormData] = useState<SubmissionData>({
    authorName: '',
    authorEmail: '',
    authorAffiliation: '',
    authorBio: '',
    coAuthors: '',
    title: '',
    abstract: '',
    keywords: '',
    researchField: '',
    methodology: '',
    isPublished: false,
    presentationPreference: '',
    availabilityNotes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleInputChange = (field: keyof SubmissionData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Submission Received!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your submission. We'll review your proposal and get back to you within 2-3 business days.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/schedule">View Schedule</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Research</h1>
          <p className="text-xl text-gray-600">
            Share your research with the APOSS community. All fields are required unless marked optional.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} font-semibold`}>
              1
            </div>
            <div className={`h-1 flex-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} font-semibold`}>
              2
            </div>
            <div className={`h-1 flex-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'} rounded`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} font-semibold`}>
              3
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Author Info</span>
            <span>Research Details</span>
            <span>Review & Submit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Author Information */}
          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <User className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Author Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <Input
                    value={formData.authorName}
                    onChange={(e) => handleInputChange('authorName', e.target.value)}
                    placeholder="Dr. Jane Smith"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                  <Input
                    type="email"
                    value={formData.authorEmail}
                    onChange={(e) => handleInputChange('authorEmail', e.target.value)}
                    placeholder="jane.smith@university.edu"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Institution/Affiliation</label>
                <Input
                  value={formData.authorAffiliation}
                  onChange={(e) => handleInputChange('authorAffiliation', e.target.value)}
                  placeholder="University of Example, Department of Political Science"
                  required
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Brief Bio</label>
                <Textarea
                  value={formData.authorBio}
                  onChange={(e) => handleInputChange('authorBio', e.target.value)}
                  placeholder="Brief description of your academic background and research interests..."
                  rows={4}
                  className="resize-none"
                />
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Co-Authors (Optional)</label>
                <Textarea
                  value={formData.coAuthors}
                  onChange={(e) => handleInputChange('coAuthors', e.target.value)}
                  placeholder="List co-authors and their affiliations if applicable..."
                  rows={3}
                  className="resize-none"
                />
              </div>
              
              <div className="flex justify-end mt-8">
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.authorName || !formData.authorEmail || !formData.authorAffiliation}
                >
                  Next: Research Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Research Details */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Research Details</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Paper Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter your paper title..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Abstract</label>
                  <Textarea
                    value={formData.abstract}
                    onChange={(e) => handleInputChange('abstract', e.target.value)}
                    placeholder="Provide a detailed abstract of your research (200-300 words recommended)..."
                    rows={6}
                    className="resize-none"
                    required
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Research Field</label>
                    <select 
                      className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={formData.researchField}
                      onChange={(e) => handleInputChange('researchField', e.target.value)}
                      required
                    >
                      <option value="">Select a field...</option>
                      <option value="comparative-politics">Comparative Politics</option>
                      <option value="international-relations">International Relations</option>
                      <option value="political-economy">Political Economy</option>
                      <option value="public-policy">Public Policy</option>
                      <option value="political-theory">Political Theory</option>
                      <option value="methodology">Methodology</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Methodology</label>
                    <Input
                      value={formData.methodology}
                      onChange={(e) => handleInputChange('methodology', e.target.value)}
                      placeholder="e.g., Quantitative, Qualitative, Mixed Methods"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords</label>
                  <Input
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    placeholder="Enter keywords separated by commas..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                  <Textarea
                    value={formData.availabilityNotes}
                    onChange={(e) => handleInputChange('availabilityNotes', e.target.value)}
                    placeholder="Any additional information, scheduling preferences, or special requirements..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!formData.title || !formData.abstract || !formData.researchField || !formData.methodology}
                >
                  Review Submission
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Review Your Submission</h2>
              </div>
              
              <div className="space-y-6 text-sm">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Author Information</h3>
                    <p><strong>Name:</strong> {formData.authorName}</p>
                    <p><strong>Email:</strong> {formData.authorEmail}</p>
                    <p><strong>Affiliation:</strong> {formData.authorAffiliation}</p>
                    {formData.coAuthors && <p><strong>Co-Authors:</strong> {formData.coAuthors}</p>}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Research Details</h3>
                    <p><strong>Title:</strong> {formData.title}</p>
                    <p><strong>Field:</strong> {formData.researchField}</p>
                    <p><strong>Methodology:</strong> {formData.methodology}</p>
                    <p><strong>Keywords:</strong> {formData.keywords}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Abstract</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{formData.abstract}</p>
                </div>
                
                {formData.authorBio && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Bio</h3>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{formData.authorBio}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                  Back to Edit
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
