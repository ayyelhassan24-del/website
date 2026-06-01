import React, { useState } from 'react'
import { submitLeadToGHL } from '../lib/ghl'

export default function FundingFunnel() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    phone: '',
    businessName: '',
    revenue: '',
    fundingNeeded: '',
    creditScore: '',
    industry: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required'
    if (!formData.email.trim()) newErrors.email = 'Email required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone required'
    if (!formData.businessName.trim()) newErrors.businessName = 'Business name required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.revenue) newErrors.revenue = 'Revenue required'
    if (!formData.fundingNeeded) newErrors.fundingNeeded = 'Funding amount required'
    if (!formData.creditScore) newErrors.creditScore = 'Credit score required'
    if (!formData.industry) newErrors.industry = 'Industry required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep1 = () => {
    fbq('track', 'Lead')
    if (validateStep1()) setStep(2)
  }

  const handleSubmitStep2 = async () => {
    if (!validateStep2()) return

    fbq('track', 'CompleteRegistration')
    setLoading(true)

    try {
      await submitLeadToGHL(formData)
      setStep(3)
    } catch (error) {
      console.error('Submit error:', error)
      alert('Error submitting form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleStep3Load = () => {
    fbq('track', 'Schedule')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Capital Vault</h1>
          <p className="text-gray-600 text-sm">Business Funding Score</p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your first name"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your business name"
              />
              {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
            </div>
            <button
              onClick={handleNextStep1}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Revenue</label>
              <select
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select revenue</option>
                <option value="0-100K">$0 - $100K</option>
                <option value="100K-250K">$100K - $250K</option>
                <option value="250K-500K">$250K - $500K</option>
                <option value="500K-1M">$500K - $1M</option>
                <option value="1M+">$1M+</option>
              </select>
              {errors.revenue && <p className="text-red-500 text-xs mt-1">{errors.revenue}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Funding Needed</label>
              <select
                name="fundingNeeded"
                value={formData.fundingNeeded}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select amount</option>
                <option value="25-50K">$25K - $50K</option>
                <option value="50-100K">$50K - $100K</option>
                <option value="100-250K">$100K - $250K</option>
                <option value="250K+">$250K+</option>
              </select>
              {errors.fundingNeeded && <p className="text-red-500 text-xs mt-1">{errors.fundingNeeded}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Credit Score</label>
              <select
                name="creditScore"
                value={formData.creditScore}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select score range</option>
                <option value="Below 600">Below 600</option>
                <option value="600-700">600 - 700</option>
                <option value="700-750">700 - 750</option>
                <option value="750+">750+</option>
              </select>
              {errors.creditScore && <p className="text-red-500 text-xs mt-1">{errors.creditScore}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select industry</option>
                <option value="HVAC">HVAC</option>
                <option value="Construction">Construction</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Auto">Auto</option>
                <option value="SaaS">SaaS</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Other">Other</option>
              </select>
              {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
            </div>
            <button
              onClick={handleSubmitStep2}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition"
            >
              {loading ? 'Submitting...' : 'Get Your Funding Score'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div onLoad={handleStep3Load}>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Consultation</h2>
              <p className="text-gray-600">Let's discuss your funding options</p>
            </div>
            <iframe
              src="https://api.leadconnectorhq.com/widget/bookings/cvbusinessfunding"
              style={{ width: '100%', height: '600px', border: 'none', borderRadius: '8px' }}
              title="GHL Calendar"
            />
          </div>
        )}
      </div>
    </div>
  )
}
