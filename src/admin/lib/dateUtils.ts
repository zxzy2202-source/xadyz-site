/**
 * 日期工具（后台用）
 */

/** 获取本周一日期 YYYY-MM-DD */
export function getThisMonday(): string {
  const today = new Date();
  const day = today.getDay();
  const mon = new Date(today);
  mon.setDate(today.getDate() - (day === 0 ? 6 : day - 1));
  return mon.toISOString().slice(0, 10);
}
