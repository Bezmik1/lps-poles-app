import type { PoleType, PoleMaterial, PoleCondition } from '../types';

export const poleTypeLabels: Record<PoleType, string> = {
  anchor: 'Анкерная',
  intermediate: 'Промежуточная',
  angle: 'Угловая',
  transposition: 'Транспозиционная',
  branch: 'Ответвительная',
};

export const materialLabels: Record<PoleMaterial, string> = {
  wood: 'Дерево',
  concrete: 'Бетон',
  steel: 'Сталь',
  reinforced_concrete: 'Железобетон',
};

export const conditionLabels: Record<PoleCondition, string> = {
  good: 'Исправна',
  needs_repair: 'Требует ремонта',
  critical: 'Критическое состояние',
  unknown: 'Не определено',
};

export const conditionColors: Record<PoleCondition, string> = {
  good: 'green',
  needs_repair: 'yellow',
  critical: 'red',
  unknown: 'gray',
};