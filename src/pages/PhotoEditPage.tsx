import { useState } from 'react';
import type React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  Title,
  Stack,
  Group,
  Button,
  Select,
  Textarea,
  NumberInput,
  Text,
  Image,
  Card,
  Grid,
} from '@mantine/core';
import { mockPhotos } from '../shared/data/mockPhotos';
import type { PoleType, PoleMaterial, PoleCondition } from '../shared/types';
import { poleTypeLabels, materialLabels, conditionLabels } from '../shared/utils/labels';

export function PhotoEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const photo = mockPhotos.find((p) => p.id === id);

  const [poleType, setPoleType] = useState<PoleType | null>(photo?.poleType ?? null);
  const [material, setMaterial] = useState<PoleMaterial | null>(photo?.material ?? null);
  const [condition, setCondition] = useState<PoleCondition>(photo?.condition ?? 'unknown');
  const [comment, setComment] = useState(photo?.comment ?? '');
  const [latitude, setLatitude] = useState<number | ''>(photo?.latitude ?? '');
  const [longitude, setLongitude] = useState<number | ''>(photo?.longitude ?? '');

  const handleNumberChange =
    (setter: React.Dispatch<React.SetStateAction<number | ''>>) =>
    (value: number | string) => {
      if (value === '' || value === null || value === undefined) {
        setter('');
      } else if (typeof value === 'number') {
        setter(value);
      } else {
        const parsed = Number(value);
        setter(Number.isNaN(parsed) ? '' : parsed);
      }
    };

  if (!photo) {
    return (
      <Stack>
        <Title order={3}>Запись не найдена</Title>
        <Button component={Link} to="/">← К списку</Button>
      </Stack>
    );
  }

  const onSave = () => {
    // В лабораторной работе №5 здесь будет PUT /api/photos/:id.
    console.log('Обновление (мок):', {
      id: photo.id,
      poleType,
      material,
      condition,
      comment,
      latitude: latitude === '' ? undefined : latitude,
      longitude: longitude === '' ? undefined : longitude,
    });
    navigate(`/photos/${photo.id}`);
  };

  return (
    <Stack>
      <Title order={2}>Редактирование записи #{photo.id}</Title>

      <Grid>
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Card withBorder padding="sm">
            <Image
              src={photo.imageUrl}
              alt={photo.fileName}
              radius="md"
              fallbackSrc="https://placehold.co/600x400?text=No+image"
            />
            <Text size="xs" c="dimmed" mt="xs">{photo.fileName}</Text>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack maw={640}>
            <Select
              label="Тип опоры"
              data={Object.entries(poleTypeLabels).map(([value, label]) => ({ value, label }))}
              value={poleType}
              onChange={(v) => setPoleType((v as PoleType) ?? null)}
            />
            <Select
              label="Материал"
              data={Object.entries(materialLabels).map(([value, label]) => ({ value, label }))}
              value={material}
              onChange={(v) => setMaterial((v as PoleMaterial) ?? null)}
            />
            <Select
              label="Состояние"
              data={Object.entries(conditionLabels).map(([value, label]) => ({ value, label }))}
              value={condition}
              onChange={(v) => setCondition((v as PoleCondition) ?? 'unknown')}
            />
            <Textarea
              label="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.currentTarget.value)}
              autosize
              minRows={2}
            />
            <Group grow>
              <NumberInput
                label="Широта"
                value={latitude}
                onChange={handleNumberChange(setLatitude)}
                decimalScale={6}
              />
              <NumberInput
                label="Долгота"
                value={longitude}
                onChange={handleNumberChange(setLongitude)}
                decimalScale={6}
              />
            </Group>

            <Group justify="flex-end">
              <Button variant="default" component={Link} to={`/photos/${photo.id}`}>
                Отмена
              </Button>
              <Button onClick={onSave}>Сохранить</Button>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}