import { json } from '@sveltejs/kit';
import { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } from '$env/static/private';

// Only allow POST - explicitly reject other methods
export function GET() {
  return json({ error: 'Method not allowed' }, { status: 405 });
}

export function PUT() {
  return json({ error: 'Method not allowed' }, { status: 405 });
}

export function DELETE() {
  return json({ error: 'Method not allowed' }, { status: 405 });
}

// Strict email validation - only allow safe characters
function isValidEmail(email) {
  // RFC 5322 compliant but restrictive - only common safe characters
  // Allows: letters, numbers, dots, hyphens, underscores, plus signs in local part
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return emailRegex.test(email);
}

// Sanitize against Airtable formula injection and control characters
function sanitizeForAirtable(str) {
  // Remove any control characters
  let sanitized = str.replace(/[\x00-\x1F\x7F]/g, '');
  
  // Prevent formula injection - Airtable formulas start with =, +, -, @
  // These are already blocked by our strict email regex, but double-check
  if (/^[=+\-@]/.test(sanitized)) {
    sanitized = "'" + sanitized; // Prefix with quote to escape
  }
  
  return sanitized;
}

export async function POST({ request }) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Only extract email field - ignore everything else
    const email = body?.email;

    // Validate email exists and is a string
    if (!email || typeof email !== 'string') {
      return json({ error: 'Email is required' }, { status: 400 });
    }

    // Normalize and sanitize
    const normalizedEmail = email.toLowerCase().trim();

    // Limit email length to prevent abuse (RFC 5321)
    if (normalizedEmail.length > 254) {
      return json({ error: 'Email too long' }, { status: 400 });
    }

    // Validate email format with strict regex
    if (!isValidEmail(normalizedEmail)) {
      return json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Final sanitization for Airtable
    const sanitizedEmail = sanitizeForAirtable(normalizedEmail);

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/RSVPs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Email: sanitizedEmail
              }
            }
          ]
        })
      }
    );

    if (!response.ok) {
      // Don't leak Airtable error details to client
      console.error('Airtable error:', await response.json());
      return json({ error: 'Failed to save RSVP' }, { status: 500 });
    }

    // Don't return any data from Airtable response
    return json({ success: true });
  } catch (error) {
    // Don't leak error details to client
    console.error('Server error:', error);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
