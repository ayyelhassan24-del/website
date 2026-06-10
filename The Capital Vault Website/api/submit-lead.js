export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, revenue, message } = req.body;

  const GHL_API_TOKEN = 'pit-cc259dd7-7a18-4c6a-8c41-c7d2a89c10a0';
  const GHL_LOCATION_ID = 'rDTLsvkHq9OuSN0o4j2Y';

  try {
    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GHL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        locationId: GHL_LOCATION_ID,
        customFields: {
          annual_revenue: revenue,
          capital_needs: message,
        }
      }),
    });

    if (response.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await response.json();
      return res.status(response.status).json({ error: error.message || 'Failed to create contact' });
    }
  } catch (err) {
    console.error('GHL API error:', err);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
