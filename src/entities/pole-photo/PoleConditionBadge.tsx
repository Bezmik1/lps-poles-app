import { Badge } from '@mantine/core';
import type { PoleCondition } from '../../shared/types';
import { conditionLabels, conditionColors } from '../../shared/utils/labels';

export function PoleConditionBadge({ condition }: { condition: PoleCondition }) {
  return (
    <Badge color={conditionColors[condition]} variant="light">
      {conditionLabels[condition]}
    </Badge>
  );
}