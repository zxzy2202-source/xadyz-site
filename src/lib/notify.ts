import { COMPANY } from './data';

/**
 * Notification system following H-track v2.1 standard.
 * Supports WeChat (Server酱) and Email (Resend).
 */

export interface NotifyPayload {
  type: 'contact' | 'quote' | 'sample' | 'tender';
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  content: string;
  subject?: string;
}

/**
 * Sends notifications to administrators and confirmation to customers.
 */
export async function notifyAll(payload: NotifyPayload) {
  const { type, customerName, customerEmail, content, subject } = payload;
  
  // 1. Prepare title with [COMPANY.name] prefix as per standard 3.5
  const title = `[${COMPANY.name}] New ${type.toUpperCase()} Lead: ${customerName}`;
  
  try {
    // In a real H-track setup, this would call a server-side API
    // that handles both Server酱 and Resend.
    const response = await fetch('/api/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        title,
      }),
    });
    
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Failed to send notification');
    }
    
    return await response.json();
  } catch (error) {
    // console.error('[Notify] Error:', error);
    // Don't throw here to prevent breaking the UI if notification fails
    return { success: false, error };
  }
}
