import { useState } from 'react';
import type React from 'react';
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
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useNavigate } from 'react-router-dom';
import type { PoleType, PoleMaterial, PoleCondition } from '../types';
import {
  poleTypeLabels,
  materialLabels,
  conditionLabels,
} from '../utils/labels';

export function PhotoUploadPage() {
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [poleType, setPoleType] = useState<PoleType | null>(null);
  const [material, setMaterial] = useState<PoleMaterial | null>(null);
  const [condition, setCondition] = useState<PoleCondition>('unknown');
  const [comment, setComment] = useState('');
  const [latitude, setLatitude] = useState<number | ''>('');
  const [longitude, setLongitude] = useState<number | ''>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const onDrop = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setErrors((e) => ({ ...e, file: '' }));
  };

  const onSubmit = () => {
    const next: Record<string, string> = {};
    if (!file) next.file = 'Загрузите фотографию';
    if (!poleType) next.poleType = 'Укажите тип опоры';
    if (!material) next.material = 'Укажите материал';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // В лабораторной работе №5 здесь будет POST /api/photos.
    console.log('Отправка (мок):', {
      file: file?.name,
      poleType,
      material,
      condition,
      comment,
      latitude: latitude === '' ? undefined : latitude,
      longitude: longitude === '' ? undefined : longitude,
    });
    navigate('/');
  };

  return (
    <Stack maw={720}>
      <Title order={2}>Загрузка фотографии опоры</Title>

      <Dropzone
        onDrop={onDrop}
        onReject={() =>
          setErrors((e) => ({ ...e, file: 'Недопустимый файл или превышен размер' }))
        }
        maxSize={10 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        maxFiles={1}
      >
        <Stack align="center" py="xl" gap={4}>
          <Text fw={500}>Перетащите фото сюда или нажмите для выбора</Text>
          <Text size="xs" c="dimmed">JPG/PNG, до 10 МБ</Text>
        </Stack>
      </Dropzone>

      {errors.file && <Text c="red" size="sm">{errors.file}</Text>}
      {preview && (
        <Image src={preview} alt="preview" radius="md" maw={400} />
      )}

      <Select
        label="Тип опоры"
        placeholder="Выберите тип"
        required
        data={Object.entries(poleTypeLabels).map(([value, label]) => ({ value, label }))}
        value={poleType}
        onChange={(v) => setPoleType((v as PoleType) ?? null)}
        error={errors.poleType}
      />

      <Select
        label="Материал"
        placeholder="Выберите материал"
        required
        data={Object.entries(materialLabels).map(([value, label]) => ({ value, label }))}
        value={material}
        onChange={(v) => setMaterial((v as PoleMaterial) ?? null)}
        error={errors.material}
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
        <Button variant="default" onClick={() => navigate(-1)}>Отмена</Button>
        <Button onClick={onSubmit}>Сохранить</Button>
      </Group>
    </Stack>
  );
}