export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, revenue, message } = req.body;

  const ghlData = {
    firstName,
    lastName,
    email,
    phone,
    locationId: 'rDTLsvkHq9OuSN0o4j2Y',
    source: 'Website - Capital Vault',
    tags: ['capital-vault-lead', 'website-form'],
    customFields: {
      annualRevenue: revenue,
      capitalNeeded: message,
    }
  };

  try {
    const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pit-cc259dd7-7a18-4c6a-8c41-c7d2a89c10a0'
      },
      body: JSON.stringify(ghlData),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('GHL API error:', data);
      return res.status(response.status).json({ error: data });
    }

    return res.status(200).json({ success: true, contact: data });
  } catch (error) {
    console.error('Submit lead error:', error);
    return res.status(500).json({ error: error.message });
  }
}
