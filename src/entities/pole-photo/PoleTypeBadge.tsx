import { Badge } from '@mantine/core';
import type { PoleType } from '../../shared/types';
import { poleTypeLabels } from '../../shared/utils/labels';

export function PoleTypeBadge({ type }: { type: PoleType }) {
  return (
    <Badge variant="light" color="indigo">
      {poleTypeLabels[type]}
    </Badge>
  );
}