export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!token || !locationId) {
    console.error('Missing GHL_API_TOKEN or GHL_LOCATION_ID env vars');
    return res.status(500).json({ error: 'Server not configured' });
  }

  const { firstName, lastName, email, phone, revenue, message } = req.body;
  if (!email || !firstName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const ghlHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Version': '2021-07-28',
  };

  try {
    const upsertRes = await fetch('https://services.leadconnectorhq.com/contacts/upsert', {
      method: 'POST',
      headers: ghlHeaders,
      body: JSON.stringify({
        firstName,
        lastName: lastName || '',
        email,
        phone,
        locationId,
        source: 'Website - Capital Vault',
        tags: ['capital-vault-lead', 'website-form'],
      }),
    });

    const upsertData = await upsertRes.json();
    if (!upsertRes.ok) {
      console.error('GHL upsert error:', upsertData);
      return res.status(upsertRes.status).json({ error: upsertData });
    }

    // Revenue + capital need go on the contact as a note so they are
    // visible in GHL without depending on custom field IDs.
    const contactId = upsertData?.contact?.id;
    if (contactId && (revenue || message)) {
      const noteBody = [
        'Website form submission',
        revenue ? `Annual revenue: ${revenue}` : null,
        message ? `Capital need: ${message}` : null,
      ].filter(Boolean).join('\n');

      const noteRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: ghlHeaders,
        body: JSON.stringify({ body: noteBody }),
      });
      if (!noteRes.ok) {
        console.error('GHL note error:', await noteRes.text());
        // Contact was created; do not fail the submission over the note.
      }
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Submit lead error:', error);
    return res.status(500).json({ error: error.message });
  }
}
