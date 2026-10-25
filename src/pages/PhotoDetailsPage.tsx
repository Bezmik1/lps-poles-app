import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Image,
  Title,
  Group,
  Stack,
  Text,
  Button,
  Card,
  Grid,
} from '@mantine/core';
import { mockPhotos } from '../shared/data/mockPhotos';
import { PoleConditionBadge } from '../entities/pole-photo/PoleConditionBadge';
import { materialLabels, poleTypeLabels } from '../shared/utils/labels';

export function PhotoDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const photo = mockPhotos.find((p) => p.id === id);

  if (!photo) {
    return (
      <Stack>
        <Title order={3}>Запись не найдена</Title>
        <Button component={Link} to="/">← К списку</Button>
      </Stack>
    );
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Title order={2}>Запись #{photo.id}</Title>
        <Group>
          <Button variant="default" component={Link} to="/">← К списку</Button>
          <Button onClick={() => navigate(`/photos/${photo.id}/edit`)}>
            Редактировать
          </Button>
        </Group>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Image
            src={photo.imageUrl}
            alt={photo.fileName}
            radius="md"
            fallbackSrc="https://placehold.co/800x600?text=No+image"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card withBorder>
            <Stack>
              <div>
                <Text size="sm" c="dimmed">Файл</Text>
                <Text>{photo.fileName}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Тип опоры</Text>
                <Text>{poleTypeLabels[photo.poleType]}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Материал</Text>
                <Text>{materialLabels[photo.material]}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">Состояние</Text>
                <PoleConditionBadge condition={photo.condition} />
              </div>
              <div>
                <Text size="sm" c="dimmed">Уверенность</Text>
                <Text>{(photo.confidence * 100).toFixed(0)}%</Text>
              </div>
              {photo.latitude !== undefined && photo.longitude !== undefined && (
                <div>
                  <Text size="sm" c="dimmed">Координаты</Text>
                  <Text>{photo.latitude}, {photo.longitude}</Text>
                </div>
              )}
              {photo.comment && (
                <div>
                  <Text size="sm" c="dimmed">Комментарий</Text>
                  <Text>{photo.comment}</Text>
                </div>
              )}
              <div>
                <Text size="sm" c="dimmed">Загружено</Text>
                <Text>{new Date(photo.uploadedAt).toLocaleString('ru-RU')}</Text>
              </div>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}