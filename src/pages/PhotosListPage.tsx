import { 
  SimpleGrid, 
  Title, 
  TextInput, 
  Select, 
  Group, 
  Text, 
  Skeleton, 
  Alert, 
  Button, 
  Transition 
} from '@mantine/core';
import { useMemo, useState, useEffect } from 'react';
import { mockPhotos } from '../shared/data/mockPhotos';
import { PolePhotoCard } from '../entities/pole-photo/PolePhotoCard';
import { poleTypeLabels } from '../shared/utils/labels';
import type { PolePhoto } from '../shared/types';

export function PhotosListPage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  // Состояния для симуляции API
  const [photos, setPhotos] = useState<PolePhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Имитация успешной загрузки (с 10% шансом ошибки)
  const fetchPhotos = () => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      const isError = Math.random() < 0.1; 
      if (isError) {
        setError('Не удалось загрузить данные. Проверьте соединение с сервером.');
        setIsLoading(false);
      } else {
        setPhotos(mockPhotos);
        setIsLoading(false);
      }
    }, 1000);
  };

  // Принудительная имитация ошибки (для кнопки)
  const simulateError = () => {
    setIsLoading(true);
    setError(null);
    
    setTimeout(() => {
      setError('Симуляция ошибки сети: не удалось получить данные от сервера.');
      setIsLoading(false);
    }, 1000);
  };

  // Загружаем данные при первом рендере
  useEffect(() => {
    fetchPhotos();
  }, []);

  // Фильтрация
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return photos.filter((p) => {
      const matchesQuery =
        !q ||
        p.fileName.toLowerCase().includes(q) ||
        (p.comment ?? '').toLowerCase().includes(q);
      const matchesType = !typeFilter || p.poleType === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [photos, query, typeFilter]);

  const typeOptions = Object.entries(poleTypeLabels).map(([value, label]) => ({
    value,
    label,
  }));

  // ЭКРАН ОШИБКИ
  if (error) {
    return (
      <Alert color="red" title="Ошибка!" mt="xl">
        {error}
        <Group mt="md">
          <Button variant="outline" color="red" onClick={fetchPhotos}>
            Попробовать снова
          </Button>
        </Group>
      </Alert>
    );
  }

  return (
    <>
      <Title order={2} mb="md">Обработанные фотографии</Title>

      <Group mb="md" align="flex-end">
        <TextInput
          label="Поиск"
          placeholder="Имя файла или комментарий"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          style={{ flex: 1, minWidth: 240 }}
        />
        <Select
          label="Тип опоры"
          placeholder="Все"
          data={typeOptions}
          value={typeFilter}
          onChange={setTypeFilter}
          clearable
          w={220}
        />
        {/* Кнопка для демонстрации ошибки на защите */}
        <Button color="red" variant="light" onClick={simulateError}>
          Симулировать ошибку
        </Button>
      </Group>

      {/* ЭКРАН ЗАГРУЗКИ (Скелетоны) */}
      {isLoading ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton height={180} radius="md" mb="sm" />
              <Skeleton height={20} width="70%" mb="xs" />
              <Skeleton height={15} width="40%" mb="xs" />
              <Skeleton height={20} width="30%" />
            </div>
          ))}
        </SimpleGrid>
      ) : (
        /* АНИМАЦИЯ И ПУСТОЕ СОСТОЯНИЕ */
        <Transition mounted={!isLoading} transition="fade" duration={400} timingFunction="ease">
          {(styles) => (
            <div style={styles}>
              {filtered.length === 0 ? (
                <Text c="dimmed" ta="center" mt="xl" size="lg">
                  Ничего не найдено. Попробуйте изменить параметры поиска.
                </Text>
              ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                  {filtered.map((p) => (
                    <PolePhotoCard key={p.id} photo={p} />
                  ))}
                </SimpleGrid>
              )}
            </div>
          )}
        </Transition>
      )}
    </>
  );
}