'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Header } from '@/components/layout/header'
import { PageHero } from '@/components/layout/PageHero'
import { AnimatedCard, AnimatedButton } from '@/components/animated'
import { ArrowLeft, Send, CheckCircle, FileText, User, Sparkles, Star, Globe, Award } from 'lucide-react'
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
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
        <AnimatedCard className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-[#17152b] rounded-2xl flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[#17152b] mb-4">Submission Received!</h1>
          <p className="text-lg text-[#404040] mb-8 leading-relaxed">
            Thank you for your submission. We'll review your proposal and get back to you within 2-3 business days.
          </p>
          <div className="space-y-4">
            <AnimatedButton variant="primary" size="lg" href="/" className="w-full">
              Return to Home
            </AnimatedButton>
            <AnimatedButton variant="secondary" size="lg" href="/schedule" className="w-full">
              View Schedule
            </AnimatedButton>
          </div>
        </AnimatedCard>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#fafafa]">
        <div style={{ marginTop: '80px' }}>
          <PageHero title="Submit Your Research" subtitle="Share your groundbreaking research with the APOSS community">
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#00376c] rounded-2xl flex items-center justify-center mb-3 mx-auto">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-[#17152b]">Global Reach</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#dc7510] rounded-2xl flex items-center justify-center mb-3 mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-[#17152b]">Expert Review</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ba3828] rounded-2xl flex items-center justify-center mb-3 mx-auto">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm font-bold text-[#17152b]">Career Boost</div>
              </div>
            </div>
          </PageHero>
        </div>
        
        {/* Form Section */}
        <div className="container max-w-4xl py-16">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 text-[#17152b] hover:text-[#00376c] font-semibold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Progress Bar */}
          <div className="mb-12">
            <AnimatedCard>
              <div className="flex items-center gap-4 mb-4">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${currentStep >= 1 ? 'bg-[#17152b] text-white' : 'bg-[#e5e5e5] text-[#737373]'} font-bold text-lg transition-all`}>
                  1
                </div>
                <div className={`h-1 flex-1 rounded-full ${currentStep >= 2 ? 'bg-[#17152b]' : 'bg-[#e5e5e5]'} transition-all`}></div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${currentStep >= 2 ? 'bg-[#17152b] text-white' : 'bg-[#e5e5e5] text-[#737373]'} font-bold text-lg transition-all`}>
                  2
                </div>
                <div className={`h-1 flex-1 rounded-full ${currentStep >= 3 ? 'bg-[#17152b]' : 'bg-[#e5e5e5]'} transition-all`}></div>
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${currentStep >= 3 ? 'bg-[#17152b] text-white' : 'bg-[#e5e5e5] text-[#737373]'} font-bold text-lg transition-all`}>
                  3
                </div>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#17152b]">
                <span>Author Info</span>
                <span>Research Details</span>
                <span>Review & Submit</span>
              </div>
            </AnimatedCard>
          </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Author Information */}
          {currentStep === 1 && (
            <AnimatedCard>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-[#17152b] rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#17152b]">Author Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#17152b] mb-2">Full Name</label>
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
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!formData.authorName || !formData.authorEmail || !formData.authorAffiliation}
                  className="px-8 py-4 bg-black text-white border-[3px] border-black hover:bg-white hover:text-black transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next: Research Details
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Research Details */}
          {currentStep === 2 && (
            <div className="card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="heading-md">Research Details</h2>
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
className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Presentation preference</label>
                    <Input
                      value={formData.presentationPreference}
                      onChange={(e) => handleInputChange('presentationPreference', e.target.value)}
                      placeholder="e.g., Any weekday after 10am JST"
                    />
                  </div>
                  <div className="flex items-center gap-3 mt-7 md:mt-0">
                    <input
                      id="isPublished"
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                      className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor="isPublished" className="text-sm font-semibold text-gray-700">
                      This work is already published or forthcoming
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                  <Textarea
                    value={formData.availabilityNotes}
                    onChange={(e) => handleInputChange('availabilityNotes', e.target.value)}
                    placeholder="Any scheduling preferences, discussant suggestions, or special requirements..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>
              
              <div className="flex justify-between mt-8">
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-4 bg-white text-black border-[3px] border-black hover:bg-black hover:text-white transition-colors font-bold"
                >
                  Back
                </button>
                <button 
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  disabled={!formData.title || !formData.abstract || !formData.researchField || !formData.methodology}
                  className="px-8 py-4 bg-black text-white border-[3px] border-black hover:bg-white hover:text-black transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Review Submission
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div className="card">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="heading-md">Review Your Submission</h2>
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
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-4 bg-white text-black border-[3px] border-black hover:bg-black hover:text-white transition-colors font-bold"
                >
                  Back to Edit
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white border-[3px] border-black hover:bg-white hover:text-black transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </form>
        </div>
      </div>
    </>
  )
}
