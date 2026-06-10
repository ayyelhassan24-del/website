export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, revenue, message } = req.body;

  const GHL_API_TOKEN = process.env.GHL_API_TOKEN;
  const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

  if (!GHL_API_TOKEN || !GHL_LOCATION_ID) {
    return res.status(500).json({ error: 'GHL credentials not configured. Please add GHL_API_TOKEN and GHL_LOCATION_ID to environment.' });
  }

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
      let errorMsg = 'Failed to create contact';
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorData.error || JSON.stringify(errorData);
      } catch (e) {
        errorMsg = await response.text();
      }
      console.error('GHL Error:', response.status, errorMsg);
      return res.status(response.status).json({ error: errorMsg });
    }
  } catch (err) {
    console.error('GHL API error:', err);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
