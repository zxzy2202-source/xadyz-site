import React from 'react';
import { MessageCircle, Send, Mail, FileText } from 'lucide-react';
import { Link } from 'react-router';
import { CONTACT } from '@/app/lib/contactConfig';

export interface ContactCtaSectionProps {
  ctaTitle: string;
  responseNote?: string;
  tenderPackLabel?: string;
  tenderPackPath?: string;
}

export function ContactCtaSection({
  ctaTitle,
  responseNote = `We typically reply within ${CONTACT.responseTime}h (Mon–Fri GMT+8).`,
  tenderPackLabel = 'Request Tender Pack',
  tenderPackPath = '/en/request-tender-pack',
}: ContactCtaSectionProps) {
  return (
    <section className="px-4">
      <div className="max-w-4xl mx-auto bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4">{ctaTitle}</h2>
        <p className="text-blue-100 text-sm md:text-base mb-8 max-w-lg mx-auto">{responseNote}</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 md:px-10 py-4 md:py-5 bg-white text-gray-900 font-bold rounded-2xl flex items-center justify-center gap-2 md:gap-3 shadow-xl hover:bg-gray-50 transition-colors"
          >
            <MessageCircle size={22} className="text-green-500" /> WhatsApp
          </a>
          <a
            href={CONTACT.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 md:px-10 py-4 md:py-5 bg-blue-400 text-white font-bold rounded-2xl flex items-center justify-center gap-2 md:gap-3 shadow-xl hover:bg-blue-300 transition-colors"
          >
            <Send size={22} /> Telegram
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="px-8 md:px-10 py-4 md:py-5 bg-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 md:gap-3 border-2 border-white/30 hover:bg-white/20 transition-colors"
          >
            <Mail size={22} /> Email
          </a>
          <Link
            to={tenderPackPath}
            className="px-8 md:px-10 py-4 md:py-5 bg-transparent text-white font-bold rounded-2xl flex items-center justify-center gap-2 md:gap-3 border-2 border-white hover:bg-white/10 transition-colors"
          >
            <FileText size={22} /> {tenderPackLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
