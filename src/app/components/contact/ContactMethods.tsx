import React, { useState } from 'react';
import { MessageCircle, Send, Mail, Phone, Copy, Check } from 'lucide-react';
import { CONTACT } from '@/app/lib/contactConfig';

export interface ContactMethodsProps {
  methodsTitle: string;
  waNote?: string;
  tgNote?: string;
  emailNote?: string;
  phoneNote?: string;
  responseTime?: string;
}

export function ContactMethods({
  methodsTitle,
  waNote = '(Response within 24 hours)',
  tgNote = '(Convenient for long-term communication)',
  emailNote = '(For formal inquiries)',
  phoneNote = '(Direct call)',
  responseTime = `${CONTACT.responseTime}h`,
}: ContactMethodsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const methods = [
    {
      id: 'whatsapp',
      href: CONTACT.whatsappUrl,
      icon: <MessageCircle size={30} />,
      label: 'WhatsApp',
      value: CONTACT.phone,
      note: waNote,
      iconBg: 'bg-green-500',
      cardBorder: 'hover:border-green-400',
      cardBg: 'hover:bg-green-50/40',
      labelColor: 'group-hover:text-green-600',
      badgeBg: 'bg-green-100 text-green-700',
    },
    {
      id: 'telegram',
      href: CONTACT.telegramUrl,
      icon: <Send size={28} />,
      label: 'Telegram',
      value: `@${CONTACT.phoneRaw}`,
      note: tgNote,
      iconBg: 'bg-sky-500',
      cardBorder: 'hover:border-sky-400',
      cardBg: 'hover:bg-sky-50/40',
      labelColor: 'group-hover:text-sky-600',
      badgeBg: 'bg-sky-100 text-sky-700',
    },
    {
      id: 'email',
      href: `mailto:${CONTACT.email}`,
      icon: <Mail size={28} />,
      label: 'Email',
      value: CONTACT.email,
      note: emailNote,
      iconBg: 'bg-gray-700',
      cardBorder: 'hover:border-gray-400',
      cardBg: 'hover:bg-gray-50/60',
      labelColor: 'group-hover:text-gray-700',
      badgeBg: 'bg-gray-100 text-gray-600',
    },
    {
      id: 'phone',
      href: CONTACT.telUrl,
      icon: <Phone size={28} />,
      label: 'Phone',
      value: CONTACT.phone,
      note: phoneNote,
      iconBg: 'bg-blue-600',
      cardBorder: 'hover:border-blue-400',
      cardBg: 'hover:bg-blue-50/40',
      labelColor: 'group-hover:text-blue-600',
      badgeBg: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <section className="px-4 mb-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">{methodsTitle}</h2>
        <p className="text-gray-500 text-center mb-10">
          {responseTime} response · Mon–Fri GMT+8
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {methods.map((method) => (
            <a
              key={method.id}
              href={method.href}
              target={method.href.startsWith('http') ? '_blank' : undefined}
              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`relative bg-white border border-gray-200 rounded-2xl p-6 ${method.cardBorder} ${method.cardBg} hover:shadow-lg transition-all flex flex-col items-center text-center group`}
            >
              <div className={`w-14 h-14 rounded-2xl ${method.iconBg} flex items-center justify-center text-white mb-4 shadow-sm`}>
                {method.icon}
              </div>
              <div className={`font-bold text-gray-900 text-lg ${method.labelColor} transition-colors`}>
                {method.label}
              </div>
              <div className="text-sm text-gray-500 mt-1 font-mono break-all">{method.value}</div>
              <div className={`text-xs mt-2 px-2 py-1 rounded-full ${method.badgeBg}`}>{method.note}</div>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  copyToClipboard(method.value, method.id);
                }}
                className="mt-3 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Copy"
              >
                {copiedId === method.id ? (
                  <><Check size={13} className="text-green-500" /> Copied!</>
                ) : (
                  <><Copy size={13} /> Copy</>
                )}
              </button>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
