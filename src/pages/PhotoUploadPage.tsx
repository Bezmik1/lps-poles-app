import { useState } from 'react';
import type React from 'react';
import {
  Title, Stack, Group, Button, Select, Textarea, NumberInput, Text, Image,
} from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications'; // <-- Импорт уведомлений
import type { PoleType, PoleMaterial, PoleCondition } from '../shared/types';
import {
  poleTypeLabels, materialLabels, conditionLabels,
} from '../shared/utils/labels';

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
  const [isSubmitting, setIsSubmitting] = useState(false); // Состояние загрузки кнопки

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
    
    // Строгая валидация координат
    if (latitude !== '' && (latitude < -90 || latitude > 90)) {
      next.latitude = 'Широта должна быть от -90 до 90';
    }
    if (longitude !== '' && (longitude < -180 || longitude > 180)) {
      next.longitude = 'Долгота должна быть от -180 до 180';
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Имитация отправки на сервер
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Отправка (мок):', { file: file?.name, poleType, material, condition, comment, latitude, longitude });
      
      // Показываем зеленое уведомление об успехе
      notifications.show({
        title: 'Успешно сохранено',
        message: 'Фотография добавлена в базу данных',
        color: 'green',
      });

      setIsSubmitting(false);
      navigate('/');
    }, 1000); // Имитация задержки сети 1 сек
  };

  return (
    <Stack maw={720}>
      <Title order={2}>Загрузка фотографии опоры</Title>

      <Dropzone
        onDrop={onDrop}
        onReject={() => setErrors((e) => ({ ...e, file: 'Недопустимый файл или превышен размер' }))}
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
      {preview && <Image src={preview} alt="preview" radius="md" maw={400} />}

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

      <Group grow align="flex-start">
        <NumberInput
          label="Широта"
          value={latitude}
          onChange={handleNumberChange(setLatitude)}
          decimalScale={6}
          error={errors.latitude}
        />
        <NumberInput
          label="Долгота"
          value={longitude}
          onChange={handleNumberChange(setLongitude)}
          decimalScale={6}
          error={errors.longitude}
        />
      </Group>

      <Group justify="flex-end">
        <Button variant="default" onClick={() => navigate(-1)} disabled={isSubmitting}>
          Отмена
        </Button>
        <Button onClick={onSubmit} loading={isSubmitting}>
          Сохранить
        </Button>
      </Group>
    </Stack>
  );
}