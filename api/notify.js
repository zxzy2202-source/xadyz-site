/**
 * Serverless Function: notify
 * Handles WeChat (Server酱) and Email (Resend) notifications.
 */

const SERVERCHAN_SENDKEY = process.env.SERVERCHAN_SENDKEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'Sales@zxpapers.com';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { type, customerName, customerEmail, customerPhone, content, title } = req.body;

  if (!customerName || !customerEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const results = {
    wechat: { success: false },
    email: { success: false }
  };

  const notificationContent = `
# New Lead Received
- **Type**: ${type}
- **Customer**: ${customerName}
- **Email**: ${customerEmail}
- **Phone**: ${customerPhone || 'N/A'}
- **Message**: 
${content}

---
Sent from Zhixin Paper B2B System
  `.trim();

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
      <h2 style="color: #2563eb; margin-bottom: 20px;">${title || 'New B2B Lead Notification'}</h2>
      <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${customerPhone || 'N/A'}</p>
      </div>
      <div style="margin-bottom: 20px;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; color: #374151;">${content}</p>
      </div>
      <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
      <p style="font-size: 12px; color: #6b7280; text-align: center;">
        © 2026 Zhixin Paper Industry<br/>
        Building 15, Ronghao Industrial Park Phase 2, Gaoling District, Xi'an, Shaanxi, China<br/>
        <a href="https://xadyz.com" style="color: #2563eb;">xadyz.com</a>
      </p>
    </div>
  `;

  // 1. Send to Server酱 (WeChat)
  if (SERVERCHAN_SENDKEY) {
    try {
      const scResponse = await fetch(`https://sctapi.ftqq.com/${SERVERCHAN_SENDKEY}.send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          title: title || 'New B2B Lead',
          desp: notificationContent
        })
      });
      const scData = await scResponse.json();
      results.wechat = { success: scData.code === 0, data: scData };
    } catch (err) {
      results.wechat = { success: false, error: err.message };
    }
  }

  // 2. Send to Resend (Email)
  if (RESEND_API_KEY) {
    try {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: 'Zhixin Paper Leads <onboarding@resend.dev>', // Should be verified domain in production
          to: [ADMIN_EMAIL],
          subject: title || 'New B2B Lead Notification',
          html: htmlContent
        })
      });
      const emailData = await emailResponse.json();
      results.email = { success: emailResponse.ok, data: emailData };
    } catch (err) {
      results.email = { success: false, error: err.message };
    }
  }

  return res.status(200).json({
    success: results.wechat.success || results.email.success,
    results
  });
}
