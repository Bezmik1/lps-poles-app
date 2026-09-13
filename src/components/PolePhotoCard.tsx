import { Card, Image, Text, Group, Badge, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';
import type { PolePhoto } from '../types';
import { PoleConditionBadge } from './PoleConditionBadge';
import { materialLabels, poleTypeLabels } from '../utils/labels';

export function PolePhotoCard({ photo }: { photo: PolePhoto }) {
  return (
    <Card
      withBorder
      padding="sm"
      component={Link}
      to={`/photos/${photo.id}`}
    >
      <Card.Section>
        <Image
          src={photo.imageUrl}
          alt={photo.fileName}
          h={180}
          fit="cover"
          fallbackSrc="https://placehold.co/400x300?text=No+image"
        />
      </Card.Section>
      <Stack gap={6} mt="sm">
        <Text fw={600}>{poleTypeLabels[photo.poleType]}</Text>
        <Text size="sm" c="dimmed">{materialLabels[photo.material]}</Text>
        <Group justify="space-between">
          <PoleConditionBadge condition={photo.condition} />
          <Badge variant="outline" color="gray">
            {(photo.confidence * 100).toFixed(0)}%
          </Badge>
        </Group>
        <Text size="xs" c="dimmed">
          {new Date(photo.uploadedAt).toLocaleString('ru-RU')}
        </Text>
      </Stack>
    </Card>
  );
}