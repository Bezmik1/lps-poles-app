import { Badge } from '@mantine/core';
import type { PoleType } from '../types';
import { poleTypeLabels } from '../utils/labels';

export function PoleTypeBadge({ type }: { type: PoleType }) {
  return (
    <Badge variant="light" color="indigo">
      {poleTypeLabels[type]}
    </Badge>
  );
}