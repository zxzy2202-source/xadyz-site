/**
 * 模块化博客表单：Basics / Hero / Problem / Solution / Use Cases & Process / Comparison-FAQ-CTA
 */
import React from 'react';
import type { PostContent } from '@/lib/supabase/queries/blogContentSchema';
import { Plus, Trash2 } from 'lucide-react';

interface PostFormProps {
  content: PostContent;
  onChange: (content: PostContent) => void;
}

function ArrayField<T>({
  items,
  onChange,
  placeholder,
  renderItem,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  placeholder: string;
  renderItem: (item: T, i: number, onEdit: (v: T) => void, onRemove: () => void) => React.ReactNode;
}) {
  const add = () => onChange([...items, '' as T]);
  const set = (i: number, v: T) => onChange(items.map((x, j) => (j === i ? v : x)));
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          {renderItem(item, i, (v) => set(i, v), () => remove(i))}
        </div>
      ))}
      <button type="button" onClick={add} className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
        <Plus className="w-4 h-4" /> 添加
      </button>
    </div>
  );
}

export function PostForm({ content, onChange }: PostFormProps) {
  const set = <K extends keyof PostContent>(section: K, value: PostContent[K]) => {
    onChange({ ...content, [section]: value });
  };

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Headline</label>
            <input
              type="text"
              value={content.hero?.headline ?? ''}
              onChange={(e) => set('hero', { ...content.hero, headline: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subheadline</label>
            <input
              type="text"
              value={content.hero?.subheadline ?? ''}
              onChange={(e) => set('hero', { ...content.hero, subheadline: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Summary Bullets</label>
            <ArrayField
              items={content.hero?.summaryBullets ?? []}
              onChange={(v) => set('hero', { ...content.hero, summaryBullets: v })}
              placeholder="要点"
              renderItem={(item, _, onEdit, onRemove) => (
                <>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onEdit(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-700 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Problem</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Why It Matters</label>
            <textarea
              rows={3}
              value={content.problem?.whyItMatters ?? ''}
              onChange={(e) => set('problem', { ...content.problem, whyItMatters: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Common Symptoms</label>
            <ArrayField
              items={content.problem?.commonSymptoms ?? []}
              onChange={(v) => set('problem', { ...content.problem, commonSymptoms: v })}
              placeholder="症状"
              renderItem={(item, _, onEdit, onRemove) => (
                <>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onEdit(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-700 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Root Causes</label>
            <ArrayField
              items={content.problem?.rootCauses ?? []}
              onChange={(v) => set('problem', { ...content.problem, rootCauses: v })}
              placeholder="根因"
              renderItem={(item, _, onEdit, onRemove) => (
                <>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onEdit(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-700 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            />
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Solution</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overview</label>
            <textarea
              rows={3}
              value={content.solution?.overview ?? ''}
              onChange={(e) => set('solution', { ...content.solution, overview: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Principles</label>
            <ArrayField
              items={content.solution?.principles ?? []}
              onChange={(v) => set('solution', { ...content.solution, principles: v })}
              placeholder="原则"
              renderItem={(item, _, onEdit, onRemove) => (
                <>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onEdit(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-700 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            />
          </div>
        </div>
      </section>

      {/* Use Cases & Process */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Use Cases & Process</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Use Cases</label>
            <div className="space-y-4">
              {(content.useCasesAndProcess?.useCases ?? []).map((uc, i) => (
                <div key={i} className="p-4 border border-gray-200 rounded-lg space-y-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={uc.title}
                    onChange={(e) => {
                      const list = [...(content.useCasesAndProcess?.useCases ?? [])];
                      list[i] = { ...uc, title: e.target.value };
                      set('useCasesAndProcess', { ...content.useCasesAndProcess, useCases: list });
                    }}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                  <textarea
                    rows={2}
                    placeholder="Description"
                    value={uc.description}
                    onChange={(e) => {
                      const list = [...(content.useCasesAndProcess?.useCases ?? [])];
                      list[i] = { ...uc, description: e.target.value };
                      set('useCasesAndProcess', { ...content.useCasesAndProcess, useCases: list });
                    }}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                  />
                  <ArrayField
                    items={uc.steps ?? []}
                    onChange={(steps) => {
                      const list = [...(content.useCasesAndProcess?.useCases ?? [])];
                      list[i] = { ...uc, steps };
                      set('useCasesAndProcess', { ...content.useCasesAndProcess, useCases: list });
                    }}
                    placeholder="Step"
                    renderItem={(item, _, onEdit, onRemove) => (
                      <>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => onEdit(e.target.value)}
                          className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                        />
                        <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-700 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const list = (content.useCasesAndProcess?.useCases ?? []).filter((_, j) => j !== i);
                      set('useCasesAndProcess', { ...content.useCasesAndProcess, useCases: list });
                    }}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    删除用例
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  set('useCasesAndProcess', {
                    ...content.useCasesAndProcess,
                    useCases: [...(content.useCasesAndProcess?.useCases ?? []), { title: '', description: '', steps: [] }],
                  })
                }
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> 添加用例
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Steps (通用)</label>
            <ArrayField
              items={content.useCasesAndProcess?.steps ?? []}
              onChange={(v) => set('useCasesAndProcess', { ...content.useCasesAndProcess, steps: v })}
              placeholder="步骤"
              renderItem={(item, _, onEdit, onRemove) => (
                <>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onEdit(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-700 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            />
          </div>
        </div>
      </section>

      {/* Comparison / FAQ / CTA */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Comparison / FAQ / CTA</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comparison Points</label>
            <ArrayField
              items={content.comparisonFaqCta?.comparisonPoints ?? []}
              onChange={(v) => set('comparisonFaqCta', { ...content.comparisonFaqCta, comparisonPoints: v })}
              placeholder="对比点"
              renderItem={(item, _, onEdit, onRemove) => (
                <>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => onEdit(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                  />
                  <button type="button" onClick={onRemove} className="text-red-600 hover:text-red-700 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">FAQ (Q&A)</label>
            <div className="space-y-3">
              {(content.comparisonFaqCta?.qa ?? []).map((item, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="flex-1 space-y-1">
                    <input
                      type="text"
                      placeholder="Question"
                      value={item.q}
                      onChange={(e) => {
                        const list = [...(content.comparisonFaqCta?.qa ?? [])];
                        list[i] = { ...item, q: e.target.value };
                        set('comparisonFaqCta', { ...content.comparisonFaqCta, qa: list });
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1"
                    />
                    <textarea
                      rows={2}
                      placeholder="Answer"
                      value={item.a}
                      onChange={(e) => {
                        const list = [...(content.comparisonFaqCta?.qa ?? [])];
                        list[i] = { ...item, a: e.target.value };
                        set('comparisonFaqCta', { ...content.comparisonFaqCta, qa: list });
                      }}
                      className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const list = (content.comparisonFaqCta?.qa ?? []).filter((_, j) => j !== i);
                      set('comparisonFaqCta', { ...content.comparisonFaqCta, qa: list });
                    }}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  set('comparisonFaqCta', {
                    ...content.comparisonFaqCta,
                    qa: [...(content.comparisonFaqCta?.qa ?? []), { q: '', a: '' }],
                  })
                }
                className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" /> 添加 Q&A
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA</label>
            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                placeholder="Headline"
                value={content.comparisonFaqCta?.cta?.headline ?? ''}
                onChange={(e) =>
                  set('comparisonFaqCta', {
                    ...content.comparisonFaqCta,
                    cta: { ...content.comparisonFaqCta?.cta, headline: e.target.value },
                  })
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Subtext"
                value={content.comparisonFaqCta?.cta?.subtext ?? ''}
                onChange={(e) =>
                  set('comparisonFaqCta', {
                    ...content.comparisonFaqCta,
                    cta: { ...content.comparisonFaqCta?.cta, subtext: e.target.value },
                  })
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
              <input
                type="text"
                placeholder="Button Text"
                value={content.comparisonFaqCta?.cta?.buttonText ?? ''}
                onChange={(e) =>
                  set('comparisonFaqCta', {
                    ...content.comparisonFaqCta,
                    cta: { ...content.comparisonFaqCta?.cta, buttonText: e.target.value },
                  })
                }
                className="border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
