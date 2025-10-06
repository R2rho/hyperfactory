# HyperPrints Odoo Integration Setup

This document explains how to set up the Odoo integration for the HyperPrints waitlist functionality.

## Environment Variables

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Fill in your Odoo credentials** in `.env.local`:
   - `ODOO_DB_URL` - Your Odoo instance URL
   - `ODOO_DB_NAME` - Your database name
   - `ODOO_EMAIL` - Odoo user email with CRM access
   - `ODOO_API_KEY` - API key or password

3. **See `.env.example`** for detailed setup instructions and examples.

## Required Odoo Modules

Ensure the following modules are installed in your Odoo instance:

- `crm` - Customer Relationship Management
- `mail` - Email functionality
- `contacts` - Contact management

## What the Integration Does

### 1. Lead Management
- Creates new leads in Odoo CRM for each waitlist submission
- Checks for existing leads by email to prevent duplicates
- Associates leads with contact records (res.partner)

### 2. Tagging System
- Creates a "HyperPrints" tag if it doesn't exist
- Applies the tag to all waitlist leads for easy filtering

### 3. Sales Team
- Creates a "HyperPrints Waitlist" sales team
- Assigns all waitlist leads to this team
- Uses waitlist@hyperprints.com as the team email

### 4. Email Templates
- Creates a professional welcome email template
- Automatically sends welcome emails to new waitlist members
- Uses HyperPrints branding and styling

### 5. Spam Protection
- Rate limiting: Max 3 attempts per minute per IP
- 15-minute cooldown after exceeding rate limit
- Bot detection based on user agent and headers
- Email validation and duplicate prevention
- Name validation to prevent suspicious entries

### 6. Automatic Email Cleanup
- Periodically checks submitted emails against Odoo database
- Removes email blocks for leads that no longer exist in Odoo
- Allows re-submission if lead was deleted from Odoo
- Runs every 6 hours automatically
- Manual cleanup API endpoints available
- 7-day minimum wait before checking (prevents excessive API calls)

## API Endpoints

### POST /api/waitlist
Handles waitlist submissions with the following payload:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890", // optional
  "company": "Acme Corp" // optional
}
```

### GET /api/test-odoo (Development Only)
Tests the Odoo connection and authentication.

### GET /api/cleanup-emails
Gets the status of the email cleanup process:
```json
{
  "success": true,
  "isRunning": false,
  "stats": {
    "totalEmailSubmissions": 150,
    "emailsNeedingOdooCheck": 5,
    "rateLimitEntries": 2
  }
}
```

### POST /api/cleanup-emails
Triggers manual email cleanup process. Optional payload for force cleanup:
```json
{
  "email": "user@example.com",
  "force": true
}
```

### DELETE /api/cleanup-emails?email=user@example.com
Force removes a specific email from tracking (allows re-submission).

## Response Codes

- `201` - Successfully added to waitlist
- `409` - Already on waitlist
- `429` - Rate limited
- `400` - Invalid input
- `500` - Server error

## Error Handling

The system handles various error scenarios:
- Network connectivity issues
- Odoo authentication failures
- Invalid input validation
- Rate limiting and spam protection
- Duplicate email submissions

## Email Template

The system creates a professional email template with:
- HyperPrints branding and logo
- Modern paper-style design
- Company colors (blue and emerald)
- Responsive HTML layout
- Clear call-to-action

## Testing

1. Test Odoo connection: `GET /api/test-odoo` (development only)
2. Submit test waitlist entry: `POST /api/waitlist`
3. Check Odoo CRM for new leads
4. Verify email template creation
5. Test rate limiting with multiple rapid submissions

## Monitoring

Monitor the following in production:
- API response times
- Error rates
- Rate limiting effectiveness
- Email delivery success
- Odoo connection stability

## Security Considerations

- API keys are stored as environment variables
- Rate limiting prevents abuse
- Bot detection filters automated requests
- Input validation prevents injection attacks
- Error messages don't expose internal details
