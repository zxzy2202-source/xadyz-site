import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Header } from '@/app/components/Header';
import { FooterOptimized as Footer } from '@/app/components/FooterOptimized';
import { SEO } from '@/app/components/SEO';
import { PageHero } from '@/app/components/hero/PageHero';
import { Breadcrumb } from '@/app/components/Breadcrumb';
import { ImagePlaceholder } from '@/app/components/ImagePlaceholder';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/app/components/ui/accordion';
import { PLACEHOLDERS } from '@/app/lib/assets';
import type { PageAssetsConfig } from '@/app/lib/assets';
import { Calendar, Package, Wrench, ClipboardCheck, Layers, Users, ArrowRight, Send, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import {
  fetchFactoryJournalList,
  formatWeekOf,
  type FactoryJournalEntry,
} from '@/app/lib/factoryJournalFromSupabase';
import {
  type Lang,
  type WeeklyUpdateMock,
  type ClientCaseMock,
  type BehindScenesMock,
  WEEKLY_UPDATES_MOCK,
  CLIENT_CASES_MOCK,
  BEHIND_SCENES_MOCK,
  BEHIND_STATS,
  UI_TRANSLATIONS,
} from './FactoryJournalPage.content';

export const pageAssets: PageAssetsConfig = {
  seoImage: { src: PLACEHOLDERS.hero.factoryLine, alt: "Factory Journal - Real production updates" },
  hero: {
    src: PLACEHOLDERS.hero.factoryLine,
    alt: "Factory Journal - See how we manufacture thermal paper and solve client challenges",
    overlay: "dark",
    focal: "center",
  },
  gallery: [],
  cards: {},
  proofs: [],
};


function WeeklyUpdateCard({
  item,
  week,
  date,
  t,
  resolvedLang,
}: {
  item: WeeklyUpdateMock;
  week: string;
  date: string;
  t: Record<string, string>;
  resolvedLang: Lang;
}) {
  const [showNotes, setShowNotes] = React.useState(false);
  const dateFmt = item.postedDate ? new Date(item.postedDate).toLocaleDateString(resolvedLang === 'zh' ? 'zh-CN' : resolvedLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
  const weekStartFmt = item.weekOf ? new Date(item.weekOf).toLocaleDateString(resolvedLang === 'zh' ? 'zh-CN' : resolvedLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : date;
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
          <span>Week of {weekStartFmt}</span>
          <span>·</span>
          <span>Production Update {item.productionId}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
        <div className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded mb-3">{item.productType}</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 text-sm mb-3">
          <div><span className="text-gray-500 block">{t.quantity}</span><span className="font-medium">{item.quantity}</span></div>
          <div><span className="text-gray-500 block">{t.specs}</span><span className="font-medium">{item.specs}</span></div>
          <div><span className="text-gray-500 block">{t.destination}</span><span className="font-medium">{item.destination}</span></div>
          <div><span className="text-gray-500 block">{t.leadTime}</span><span className="font-medium">{item.leadTime}</span></div>
        </div>
        <div className="text-sm mb-3">
          <span className="text-gray-500 font-medium">{t.fullSpecs}</span>
          <p className="text-gray-700 mt-0.5 text-xs leading-relaxed">{item.fullSpecs}</p>
        </div>
        <div className="text-sm mb-3">
          <span className="text-gray-500 font-medium">{t.qualityControl}</span>
          <ul className="mt-0.5 space-y-0.5 text-xs text-gray-700">
            {item.qcTests.map((line, i) => <li key={i}>{line}</li>)}
          </ul>
        </div>
        {item.productionNotes && (
          <div className="mb-3">
            <button type="button" onClick={() => setShowNotes(!showNotes)} className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
              {showNotes ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showNotes ? t.hideNotes : t.showNotes}
            </button>
            {showNotes && <p className="mt-2 text-sm text-gray-600 pl-5">{item.productionNotes}</p>}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{t.posted}: {dateFmt} {t.byProductionTeam}</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-medium">{t.published}</span>
        </div>
      </div>
    </div>
  );
}

function ClientCaseCard({
  item,
  week,
  date,
  t,
  resolvedLang,
}: {
  item: ClientCaseMock;
  week: string;
  date: string;
  t: Record<string, string>;
  resolvedLang: Lang;
}) {
  const [showTech, setShowTech] = React.useState(false);
  const dateFmt = item.solvedDate ? new Date(item.solvedDate).toLocaleDateString(resolvedLang === 'zh' ? 'zh-CN' : resolvedLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-1">
          <span>Week of {date}</span>
          <span>·</span>
          <span>{item.title}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-medium text-gray-900">{item.client}</span>
          {item.verified && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-medium"><CheckCircle2 size={14} /> {t.verified}</span>}
        </div>
        <div className="space-y-2 text-sm">
          <div><span className="text-gray-500 font-medium block mb-0.5 text-xs">{t.caseProblem}</span><p className="text-gray-700 text-xs leading-relaxed">{item.problem}</p></div>
          <div><span className="text-gray-500 font-medium block mb-0.5 text-xs">{t.caseRootCause}</span><p className="text-gray-700 text-xs leading-relaxed">{item.rootCause}</p></div>
          <div><span className="text-gray-500 font-medium block mb-0.5 text-xs">{t.caseSolution}</span><p className="text-gray-700 text-xs leading-relaxed">{item.solution}</p></div>
          <div><span className="text-gray-500 font-medium block mb-0.5 text-xs">{t.caseResult}</span><p className="text-green-700 font-medium text-xs">{item.result}</p></div>
        </div>
        {item.technicalSpecs && (
          <div className="mt-3">
            <button type="button" onClick={() => setShowTech(!showTech)} className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
              {showTech ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              {showTech ? t.hideTechDetails : t.showTechDetails}
            </button>
            {showTech && <p className="mt-2 text-sm text-gray-600 pl-5">{item.technicalSpecs}</p>}
          </div>
        )}
        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.tags.map((tag) => <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{tag}</span>)}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 mt-4 border-t border-gray-100">
          <span className="text-xs text-gray-500">{t.solved}: {dateFmt}</span>
          {item.verified && <span className="inline-flex items-center gap-1 text-emerald-600 text-xs"><CheckCircle2 size={14} /> {t.verified}</span>}
        </div>
      </div>
    </div>
  );
}

interface FactoryJournalPageProps {
  lang: 'en' | 'ru' | 'zh';
}

export function FactoryJournalPage({ lang }: FactoryJournalPageProps) {
  const resolvedLang = lang;

  const t = UI_TRANSLATIONS[resolvedLang];

  const [weeklyEntries, setWeeklyEntries] = useState<FactoryJournalEntry[]>([]);
  const [caseEntries, setCaseEntries] = useState<FactoryJournalEntry[]>([]);
  const [behindEntries, setBehindEntries] = useState<FactoryJournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [archiveSearch, setArchiveSearch] = useState('');
  const [archiveProduct, setArchiveProduct] = useState<string>('all');
  const [archiveRegion, setArchiveRegion] = useState<string>('all');
  const [archiveMonth, setArchiveMonth] = useState<string>('all');
  const [archiveSortNewest, setArchiveSortNewest] = useState(true);
  const [archivePage, setArchivePage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchFactoryJournalList({ locale: resolvedLang, limit: 50 });
        if (cancelled) return;
        setWeeklyEntries(list.filter((e) => e.entry_type === 'weekly_update'));
        setCaseEntries(list.filter((e) => e.entry_type === 'client_solution'));
        setBehindEntries(list.filter((e) => e.entry_type === 'behind_scenes'));

        const latest = list.reduce<string | null>((acc, e) => {
          const candidate = e.published_at || e.week_of || e.created_at;
          if (!candidate) return acc;
          if (!acc) return candidate;
          return new Date(candidate) > new Date(acc) ? candidate : acc;
        }, null);
        setLastUpdated(latest);
      } catch (err) {
        console.warn('[FactoryJournalPage] fetch failed', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [resolvedLang]);

  const hasSupabaseData = weeklyEntries.length > 0 || caseEntries.length > 0;
  const weeklyUpdates = hasSupabaseData
    ? weeklyEntries.map((e): WeeklyUpdateMock => ({
        id: e.id,
        productionId: e.slug?.replace(/[^0-9]/g, '') ? `#${e.slug.replace(/[^0-9]/g, '').slice(-3)}` : '#000',
        weekOf: e.week_of || '',
        title: e.title,
        productType: e.product_category || 'Production',
        quantity: e.summary?.split(/[:\n]/)?.[1]?.trim() || '-',
        specs: e.product_category || '-',
        destination: e.client_region || '-',
        leadTime: '-',
        fullSpecs: e.summary || '',
        qcTests: e.summary ? [e.summary.slice(0, 80) + '...'] : [],
        productionNotes: e.body_md || '',
        postedDate: e.published_at?.slice(0, 10) || e.created_at?.slice(0, 10) || '',
      }))
    : WEEKLY_UPDATES_MOCK[resolvedLang];
  const clientCases = hasSupabaseData
    ? caseEntries.map((e): ClientCaseMock => ({
        id: e.id,
        caseId: e.slug?.replace(/[^0-9]/g, '') ? `#${e.slug.replace(/[^0-9]/g, '').slice(-3)}` : '#000',
        weekOf: e.week_of || '',
        title: e.title,
        client: e.client_region || '',
        problem: e.problem || '',
        rootCause: e.root_cause || '',
        solution: e.solution || '',
        result: e.result || '',
        technicalSpecs: e.body_md || '',
        tags: (e.tags ?? []).map((t) => `#${t.name.replace(/\s+/g, '')}`),
        solvedDate: e.published_at?.slice(0, 10) || e.created_at?.slice(0, 10) || '',
        verified: !!(e.result && e.result.trim().length > 0),
      }))
    : CLIENT_CASES_MOCK[resolvedLang];
  const behindScenes = behindEntries.length > 0
    ? behindEntries.map((e): BehindScenesMock => ({
        title: e.title,
        subtitle: '',
        month: e.week_of ? new Date(e.week_of).toLocaleDateString(resolvedLang === 'zh' ? 'zh-CN' : resolvedLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', year: 'numeric' }) : '',
        stat: '',
        desc: e.summary || '',
      }))
    : BEHIND_SCENES_MOCK[resolvedLang];
  const prefix = resolvedLang === 'en' ? '/en' : resolvedLang === 'zh' ? '/zh' : '/ru';

  const totalWeekly = weeklyUpdates.length;
  const totalCases = clientCases.length;
  const totalSolved = clientCases.filter((c) => c.verified).length;

  type ArchiveEntry = { id: string; entry_type: 'weekly_update' | 'client_solution'; week_of: string | null; title: string; product_category?: string; client_region?: string; published_at?: string | null; created_at?: string; fullWeekly?: WeeklyUpdateMock; fullCase?: ClientCaseMock };
  const weeklyMap = new Map(weeklyUpdates.map((w) => [w.id, w]));
  const caseMap = new Map(clientCases.map((c) => [c.id, c]));
  const allArchiveEntries: ArchiveEntry[] = hasSupabaseData
    ? [...weeklyEntries.map((e) => ({ ...e, product_category: e.product_category ?? undefined, client_region: e.client_region ?? undefined, fullWeekly: weeklyMap.get(e.id) as WeeklyUpdateMock | undefined })), ...caseEntries.map((e) => ({ id: e.id, entry_type: 'client_solution' as const, week_of: e.week_of, title: e.title, product_category: undefined, client_region: e.client_region ?? undefined, published_at: e.published_at, created_at: e.created_at, fullCase: caseMap.get(e.id) as ClientCaseMock | undefined }))]
    : [...weeklyUpdates.map((w) => ({ id: w.id, entry_type: 'weekly_update' as const, week_of: w.weekOf || null, title: w.title, product_category: w.productType, client_region: w.destination, published_at: w.postedDate, created_at: '', fullWeekly: w })), ...clientCases.map((c) => ({ id: c.id, entry_type: 'client_solution' as const, week_of: c.weekOf || null, title: c.title, product_category: undefined, client_region: c.client, published_at: c.solvedDate, created_at: '', fullCase: c }))];

  const archiveMonthOptions = Array.from(
    new Set(
      allArchiveEntries
        .map((e) => e.week_of)
        .filter((d): d is string => !!d)
        .map((d) => d.slice(0, 7))
    )
  ).sort().reverse();

  const archiveProductOptions = Array.from(
    new Set(allArchiveEntries.map((e) => e.product_category).filter((x): x is string => !!x))
  ).sort();

  const archiveRegionOptions = Array.from(
    new Set(allArchiveEntries.map((e) => e.client_region).filter((x): x is string => !!x))
  ).sort();

  const filteredArchive = allArchiveEntries
    .filter((e) => {
      if (archiveProduct !== 'all' && e.product_category !== archiveProduct) return false;
      if (archiveRegion !== 'all' && e.client_region !== archiveRegion) return false;
      if (archiveMonth !== 'all' && e.week_of && !e.week_of.startsWith(archiveMonth)) return false;
      if (archiveMonth !== 'all' && !e.week_of) return false;
      if (!archiveSearch.trim()) return true;
      const q = archiveSearch.toLowerCase();
      const searchable = [
        e.title,
        e.product_category,
        e.client_region,
        e.fullCase?.problem,
        e.fullCase?.solution,
        e.fullCase?.result,
        e.fullWeekly?.fullSpecs,
      ].filter(Boolean) as string[];
      return searchable.some((field) => field.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      const getDate = (x: ArchiveEntry) => x.week_of || x.published_at || x.created_at || '';
      const da = getDate(a);
      const db = getDate(b);
      if (!da || !db) return 0;
      const va = new Date(da).getTime();
      const vb = new Date(db).getTime();
      return archiveSortNewest ? vb - va : va - vb;
    });

  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredArchive.length / perPage));
  const safePage = Math.min(archivePage, totalPages);
  const pagedArchive = filteredArchive.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        lang={resolvedLang}
        path={{
          en: '/en/manufacturing/factory-journal',
          ru: '/ru/manufacturing/factory-journal',
          zh: '/zh/manufacturing/factory-journal',
        }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        <PageHero
          title={t.heroTitle}
          description={`${t.heroDesc} ${t.heroNote}`}
          image={{ src: pageAssets.hero.src, alt: pageAssets.hero.alt }}
          overlay={pageAssets.hero.overlay}
          align="center"
          placeholderKey="factory_journal_hero"
        />

        {/* Hero meta bar: updated weekly + last updated time */}
        <div className="w-full bg-slate-900 text-slate-100">
          <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center rounded-full bg-emerald-500/20 text-emerald-100 px-3 py-0.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
              {t.heroBadge}
            </span>
            <span className="opacity-80">
              {t.heroLastUpdatedPrefix}:{' '}
              {lastUpdated
                ? new Date(lastUpdated).toLocaleDateString(
                    resolvedLang === 'zh' ? 'zh-CN' : resolvedLang === 'ru' ? 'ru-RU' : 'en-US',
                    { year: 'numeric', month: 'short', day: 'numeric' }
                  )
                : t.heroLastUpdatedFallback}
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-50 py-4 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <Breadcrumb lang={resolvedLang} />
          </div>
        </div>

        {/* Transparency / Why We Share This */}
        <section className="py-10 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 italic text-center">
              {t.transparencyTitle}
            </h2>
            <p className="text-lg text-gray-600 mb-8 text-center italic">
              {t.transparencySubtitle}
            </p>
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>{t.transparencyP1}</p>
              <p>{t.transparencyP2}</p>
              <p>{t.transparencyP3}</p>
              <p>{t.transparencyP4}</p>
            </div>
          </div>
        </section>

        {/* Weekly Production Updates — Core Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{t.weeklyTitle}</h2>
            <p className="text-gray-600 mb-3 text-sm">{t.weeklyIntro}</p>
            <Link to="#archive" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 text-sm">
              {t.viewAllUpdates} <ArrowRight size={16} />
            </Link>

            <div className="mt-6 space-y-4">
              {loading && weeklyUpdates.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-500 text-sm">加载中…</div>
              ) : weeklyUpdates.length === 0 ? (
                <div className="col-span-full py-8 text-center text-gray-500 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                  {resolvedLang === 'zh' && '暂无生产更新'}
                  {resolvedLang === 'en' && 'No production updates yet'}
                  {resolvedLang === 'ru' && 'Пока нет производственных новостей'}
                </div>
              ) : (
                <>
                  {weeklyUpdates.map((item, idx) => {
                    const { week, date } = formatWeekOf(item.weekOf || null, resolvedLang);
                    return (
                      <WeeklyUpdateCard key={item.id} item={item} week={week} date={date} t={t} resolvedLang={resolvedLang} />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Client Problems & Solutions — Core Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{t.casesTitle}</h2>
            <p className="text-gray-600 mb-3 text-sm">{t.casesIntro}</p>
            <Link to="#archive" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 text-sm">
              {t.viewAllCases} <ArrowRight size={16} />
            </Link>

            <div className="mt-6 space-y-4">
              {clientCases.length === 0 ? (
                <div className="py-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200 text-sm">
                  {resolvedLang === 'zh' && '暂无客户案例'}
                  {resolvedLang === 'en' && 'No client cases yet'}
                  {resolvedLang === 'ru' && 'Пока нет кейсов'}
                </div>
              ) : (
                <>
                  {clientCases.map((c) => {
                    const { week, date } = formatWeekOf(c.weekOf || null, resolvedLang);
                    const weekStartFmt = c.weekOf ? new Date(c.weekOf).toLocaleDateString(resolvedLang === 'zh' ? 'zh-CN' : resolvedLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : date;
                    return <ClientCaseCard key={c.id} item={c} week={week} date={weekStartFmt} t={t} resolvedLang={resolvedLang} />;
                  })}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Behind the Scenes */}
        <section className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{t.behindTitle}</h2>
            <p className="text-gray-600 mb-6 text-sm">{t.behindIntro}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
                <div className="text-3xl font-black">{BEHIND_STATS.uptime}</div>
                <div className="text-sm text-slate-300 mt-1">{t.productionUptime}</div>
              </div>
              <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
                <div className="text-3xl font-black">{BEHIND_STATS.rejection}</div>
                <div className="text-sm text-slate-300 mt-1">{t.materialRejection}</div>
              </div>
              <div className="bg-slate-900 text-white rounded-xl p-4 text-center">
                <div className="text-3xl font-black">{BEHIND_STATS.certified}</div>
                <div className="text-sm text-slate-300 mt-1">{t.certifiedOperators}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {behindScenes.map((item, idx) => (
                <motion.div
                  key={item.title + idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="text-xs text-gray-500 mb-1">{item.month}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  {item.stat && <div className="text-2xl font-black text-blue-600 mb-2">{item.stat} {item.statLabel}</div>}
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Full Archive */}
        <section id="archive" className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{t.archiveTitle}</h2>
            <p className="text-gray-600 mb-4 text-sm">{t.archiveIntro}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              <span>{t.productionUpdatesCount} ({totalWeekly})</span>
              <span>{t.problemsSolvedCount} ({totalCases})</span>
            </div>

            <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    {resolvedLang === 'zh' && '关键字搜索'}
                    {resolvedLang === 'en' && 'Keyword search'}
                    {resolvedLang === 'ru' && 'Поиск по ключевым словам'}
                  </label>
                  <input
                    type="text"
                    value={archiveSearch}
                    onChange={(e) => {
                      setArchiveSearch(e.target.value);
                      setArchivePage(1);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    placeholder={t.searchPlaceholder}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-none md:w-1/2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {resolvedLang === 'zh' && '产品类型'}
                      {resolvedLang === 'en' && 'Product type'}
                      {resolvedLang === 'ru' && 'Тип продукции'}
                    </label>
                    <select
                      value={archiveProduct}
                      onChange={(e) => {
                        setArchiveProduct(e.target.value);
                        setArchivePage(1);
                      }}
                      className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm bg-white"
                    >
                      <option value="all">
                        {resolvedLang === 'zh' && '全部'}
                        {resolvedLang === 'en' && 'All'}
                        {resolvedLang === 'ru' && 'Все'}
                      </option>
                      {archiveProductOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {resolvedLang === 'zh' && '地区'}
                      {resolvedLang === 'en' && 'Region'}
                      {resolvedLang === 'ru' && 'Регион'}
                    </label>
                    <select
                      value={archiveRegion}
                      onChange={(e) => {
                        setArchiveRegion(e.target.value);
                        setArchivePage(1);
                      }}
                      className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm bg-white"
                    >
                      <option value="all">
                        {resolvedLang === 'zh' && '全部'}
                        {resolvedLang === 'en' && 'All'}
                        {resolvedLang === 'ru' && 'Все'}
                      </option>
                      {archiveRegionOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      {resolvedLang === 'zh' && '月份'}
                      {resolvedLang === 'en' && 'Month'}
                      {resolvedLang === 'ru' && 'Месяц'}
                    </label>
                    <select
                      value={archiveMonth}
                      onChange={(e) => {
                        setArchiveMonth(e.target.value);
                        setArchivePage(1);
                      }}
                      className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm bg-white"
                    >
                      <option value="all">
                        {resolvedLang === 'zh' && '全部'}
                        {resolvedLang === 'en' && 'All'}
                        {resolvedLang === 'ru' && 'Все'}
                      </option>
                      {archiveMonthOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                <span>
                  {resolvedLang === 'zh' && `共 ${filteredArchive.length} 条记录`}
                  {resolvedLang === 'en' && `${filteredArchive.length} entries`}
                  {resolvedLang === 'ru' && `${filteredArchive.length} записей`}
                </span>
                <button
                  type="button"
                  onClick={() => setArchiveSortNewest((v) => !v)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded border border-gray-300 bg-white"
                >
                  {archiveSortNewest ? (
                    <>
                      <span>↓</span>
                      <span>
                        {resolvedLang === 'zh' && '最新在前'}
                        {resolvedLang === 'en' && 'Newest first'}
                        {resolvedLang === 'ru' && 'Сначала новые'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>↑</span>
                      <span>
                        {resolvedLang === 'zh' && '最早在前'}
                        {resolvedLang === 'en' && 'Oldest first'}
                        {resolvedLang === 'ru' && 'Сначала старые'}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {pagedArchive.length === 0 ? (
                <div className="py-10 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                  {resolvedLang === 'zh' && '当前筛选条件下暂无记录'}
                  {resolvedLang === 'en' && 'No entries match the current filters.'}
                  {resolvedLang === 'ru' && 'Нет записей по текущим фильтрам.'}
                </div>
              ) : (
                <div className="space-y-6">
                  {pagedArchive.map((e) => {
                    const { week, date } = formatWeekOf(e.week_of, resolvedLang);
                    const weekStartFmt = e.week_of ? new Date(e.week_of).toLocaleDateString(resolvedLang === 'zh' ? 'zh-CN' : resolvedLang === 'ru' ? 'ru-RU' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : date;
                    if (e.entry_type === 'weekly_update' && e.fullWeekly) {
                      return <WeeklyUpdateCard key={e.id} item={e.fullWeekly} week={week} date={weekStartFmt} t={t} resolvedLang={resolvedLang} />;
                    }
                    if (e.entry_type === 'client_solution' && e.fullCase) {
                      return <ClientCaseCard key={e.id} item={e.fullCase} week={week} date={weekStartFmt} t={t} resolvedLang={resolvedLang} />;
                    }
                    return (
                      <div key={e.id} className="flex flex-col md:flex-row md:items-center gap-3 px-4 py-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-blue-700 mb-1">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-100">
                              {e.entry_type === 'weekly_update' && (resolvedLang === 'zh' ? '每周更新' : resolvedLang === 'ru' ? 'Еженедельно' : 'Weekly update')}
                              {e.entry_type === 'client_solution' && (resolvedLang === 'zh' ? '客户问题解决' : resolvedLang === 'ru' ? 'Кейс клиента' : 'Client solution')}
                            </span>
                            {week && <span>{week}</span>}
                            {date && <span className="text-gray-500">· {date}</span>}
                          </div>
                          <div className="font-semibold text-gray-900 truncate">{e.title}</div>
                          <div className="text-xs text-gray-500 truncate">{[e.product_category, e.client_region].filter(Boolean).join(' · ')}</div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {(e.published_at || e.week_of) && new Date((e.published_at || e.week_of || e.created_at) as string).toLocaleDateString(resolvedLang === 'zh' ? 'zh-CN' : resolvedLang === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6 text-xs">
                  <button
                    type="button"
                    disabled={safePage === 1}
                    onClick={() => setArchivePage((p) => Math.max(1, p - 1))}
                    className="px-3 py-1 rounded border border-gray-300 bg-white disabled:opacity-40"
                  >
                    {resolvedLang === 'zh' && '上一页'}
                    {resolvedLang === 'en' && 'Prev'}
                    {resolvedLang === 'ru' && 'Назад'}
                  </button>
                  <span className="px-2 py-1 text-gray-600">
                    {safePage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={safePage === totalPages}
                    onClick={() => setArchivePage((p) => Math.min(totalPages, p + 1))}
                    className="px-3 py-1 rounded border border-gray-300 bg-white disabled:opacity-40"
                  >
                    {resolvedLang === 'zh' && '下一页'}
                    {resolvedLang === 'en' && 'Next'}
                    {resolvedLang === 'ru' && 'Вперед'}
                  </button>
                </div>
              )}
            </div>
          </section>

        {/* Trust Signals Footer */}
        <section className="py-12 bg-slate-900 text-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 italic">
                  {resolvedLang === 'zh' && '工厂资质与可信信号'}
                  {resolvedLang === 'en' && 'Factory Credentials & Trust Signals'}
                  {resolvedLang === 'ru' && 'Факты о заводе и доверие'}
                </h2>
                <p className="text-slate-200 mb-6">
                  {resolvedLang === 'zh' && '我们从 2010 年开始运营热敏纸与标签生产工厂，通过持续的生产记录和质量认证，让采购方更容易做出判断。'}
                  {resolvedLang === 'en' && 'We have been operating our thermal paper and label factory since 2009, combining continuous production records with third‑party certifications so buyers can evaluate us with real evidence.'}
                  {resolvedLang === 'ru' && 'Наш завод по производству термобумаги и этикеток работает с 2010 года. Еженедельные отчеты и независимые сертификаты помогают покупателям оценивать нас по реальным фактам.'}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-slate-800/80 rounded-xl px-4 py-3 border border-emerald-400/40">
                    <div className="text-xs uppercase tracking-wide text-emerald-300 mb-1">{resolvedLang === 'zh' ? '周度更新' : resolvedLang === 'ru' ? 'Еженедельные отчеты' : 'Weekly Updates'}</div>
                    <div className="text-2xl font-black">{totalWeekly}</div>
                    <p className="text-xs text-slate-300 mt-1">{resolvedLang === 'zh' ? '已发布生产记录' : resolvedLang === 'ru' ? 'Зафиксированные недели' : 'Published production weeks'}</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-xl px-4 py-3 border border-sky-400/40">
                    <div className="text-xs uppercase tracking-wide text-sky-300 mb-1">{resolvedLang === 'zh' ? '客户问题案例' : resolvedLang === 'ru' ? 'Кейсы клиентов' : 'Client Problem Cases'}</div>
                    <div className="text-2xl font-black">{totalCases}</div>
                    <p className="text-xs text-slate-300 mt-1">{resolvedLang === 'zh' ? '已记录的客户问题与方案' : resolvedLang === 'ru' ? 'Задокументированные проблемы' : 'Documented problems with solutions'}</p>
                  </div>
                  <div className="bg-slate-800/80 rounded-xl px-4 py-3 border border-amber-400/40">
                    <div className="text-xs uppercase tracking-wide text-amber-300 mb-1">{resolvedLang === 'zh' ? '已验证解决' : resolvedLang === 'ru' ? 'Подтверждено решенных' : 'Verified Resolved'}</div>
                    <div className="text-2xl font-black">{totalSolved}</div>
                    <p className="text-xs text-slate-300 mt-1">{resolvedLang === 'zh' ? '带有验证结果的案例' : resolvedLang === 'ru' ? 'Кейсы с подтвержденным результатом' : 'Cases with verified result'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-500/70 text-xs font-semibold">ISO 9001</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-500/70 text-xs font-semibold">FSC</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-500/70 text-xs font-semibold">SGS Tested</span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-500/70 text-xs font-semibold">BPA FREE Grades</span>
                </div>
                <p className="text-sm text-slate-300">
                  {resolvedLang === 'zh' && '如需查看完整证书与检测报告，可前往“制造 / 认证资质”页面，或在联系表单中备注需要的标准与用途，我们会附上对应文件。'}
                  {resolvedLang === 'en' && 'To see full certificates and lab reports, visit our "Manufacturing / Certifications" page or mention the required standards in your inquiry, and we will attach the relevant documents.'}
                  {resolvedLang === 'ru' && 'Полный список сертификатов доступен на странице «Производство / Сертификаты». Укажите нужные стандарты в запросе.'}
                </p>
                <Link to={resolvedLang === 'zh' ? '/zh/manufacturing/certifications' : resolvedLang === 'ru' ? '/ru/manufacturing/certifications' : '/en/manufacturing/certifications'} className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 hover:text-emerald-200">
                  {resolvedLang === 'zh' ? '查看全部认证与测试报告' : resolvedLang === 'ru' ? 'Все сертификаты и протоколы' : 'View all certifications & lab reports'} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-4 italic">
              {t.ctaTitle}
            </h2>
            <p className="text-lg opacity-90 mb-6">{t.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`${prefix}/request-tender-pack`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ArrowRight size={20} />
                {t.ctaQuote}
              </Link>
              <Link
                to={`${prefix}/contact`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 border-2 border-white/30 transition-colors"
              >
                <Send size={20} />
                {t.ctaContact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={resolvedLang} />
    </>
  );
}
