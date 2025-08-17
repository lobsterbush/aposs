'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/header'
import { ArrowLeft, Send, CheckCircle, FileText, User, Mail, Building, Sparkles, ArrowRight, Star, Globe, Award } from 'lucide-react'
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
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="relative max-w-md w-full glass rounded-3xl p-10 text-center animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-elegant animate-pulse-glow">
            <CheckCircle className="w-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-6 gradient-text-cool">Submission Received!</h1>
          <p className="text-white/90 mb-8 text-lg leading-relaxed">
            Thank you for your submission. We&apos;ll review your proposal and get back to you within 2-3 business days.
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full bg-white text-green-600 hover:bg-white/90 font-semibold py-3 rounded-2xl shadow-lg">
              <Link href="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild className="w-full border-2 border-white/30 text-white hover:bg-white/10 py-3 rounded-2xl backdrop-blur-md">
              <Link href="/schedule">View Schedule</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-20 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{animationDelay: '6s'}}></div>
        </div>
        
        {/* Hero Section */}
        <div className="relative pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full glass border border-white/20 text-white/90 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Join our global research community
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                Submit Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl">
                Research
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-12 max-w-3xl mx-auto">
              Share your groundbreaking research with the APOSS community and connect with scholars worldwide.
            </p>
            
            <div className="flex items-center justify-center space-x-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-white/70 text-sm font-medium">Global Reach</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-white/70 text-sm font-medium">Expert Review</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-white/70 text-sm font-medium">Career Boost</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Section */}
        <div className="relative max-w-4xl mx-auto px-6 pb-16">
          <Link href="/" className="inline-flex items-center glass px-4 py-2 rounded-xl text-white/90 hover:text-white font-medium mb-8 transition-all duration-300 hover:scale-105">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="glass rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${currentStep >= 1 ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' : 'bg-white/20 text-white/70'} font-bold text-lg transition-all duration-300`}>
                  1
                </div>
                <div className={`h-2 flex-1 ${currentStep >= 2 ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-white/20'} rounded-full transition-all duration-300`}></div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${currentStep >= 2 ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg' : 'bg-white/20 text-white/70'} font-bold text-lg transition-all duration-300`}>
                  2
                </div>
                <div className={`h-2 flex-1 ${currentStep >= 3 ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-white/20'} rounded-full transition-all duration-300`}></div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-full ${currentStep >= 3 ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg' : 'bg-white/20 text-white/70'} font-bold text-lg transition-all duration-300`}>
                  3
                </div>
              </div>
              <div className="flex justify-between text-sm text-white/90 font-medium">
                <span>Author Info</span>
                <span>Research Details</span>
                <span>Review & Submit</span>
              </div>
            </div>
          </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Author Information */}
          {currentStep === 1 && (
            <div className="glass rounded-3xl shadow-elegant p-10 border border-white/20 animate-scale-in">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Author Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">Full Name</label>
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
