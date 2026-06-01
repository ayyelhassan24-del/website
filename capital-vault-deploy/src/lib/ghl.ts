const GHL_API_TOKEN = import.meta.env.VITE_GHL_API_TOKEN
const GHL_LOCATION_ID = import.meta.env.VITE_GHL_LOCATION_ID

export async function submitLeadToGHL(formData: any) {
  if (!GHL_API_TOKEN || !GHL_LOCATION_ID) {
    throw new Error('GHL credentials not configured')
  }

  const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GHL_API_TOKEN}`,
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      firstName: formData.firstName,
      lastName: formData.businessName,
      email: formData.email,
      phone: formData.phone,
      customField: {
        monthlyRevenue: formData.revenue,
        fundingNeeded: formData.fundingNeeded,
        creditScore: formData.creditScore,
        industry: formData.industry,
        source: 'Capital Vault Funding Funnel',
        timestamp: new Date().toISOString(),
      },
      tags: ['vite-funnel', 'qualified-lead'],
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    console.error('GHL API error:', data)
    throw new Error('Failed to create contact in GHL')
  }

  return data
}
