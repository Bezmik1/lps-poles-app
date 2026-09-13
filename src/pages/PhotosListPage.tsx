import { SimpleGrid, Title, TextInput, Select, Group, Text } from '@mantine/core';
import { useMemo, useState } from 'react';
import { mockPhotos } from '../data/mockPhotos';
import { PolePhotoCard } from '../components/PolePhotoCard';
import { poleTypeLabels } from '../utils/labels';

export function PhotosListPage() {
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockPhotos.filter((p) => {
      const matchesQuery =
        !q ||
        p.fileName.toLowerCase().includes(q) ||
        (p.comment ?? '').toLowerCase().includes(q);
      const matchesType = !typeFilter || p.poleType === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [query, typeFilter]);

  const typeOptions = Object.entries(poleTypeLabels).map(([value, label]) => ({
    value,
    label,
  }));

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
      </Group>

      {filtered.length === 0 ? (
        <Text c="dimmed">Ничего не найдено</Text>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>
          {filtered.map((p) => (
            <PolePhotoCard key={p.id} photo={p} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
}