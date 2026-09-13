import { Badge } from '@mantine/core';
import type { PoleCondition } from '../types';
import { conditionLabels, conditionColors } from '../utils/labels';

export function PoleConditionBadge({ condition }: { condition: PoleCondition }) {
  return (
    <Badge color={conditionColors[condition]} variant="light">
      {conditionLabels[condition]}
    </Badge>
  );
}