import { Stack, Title, Text, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <Stack align="center" mt="xl">
      <Title order={1}>404</Title>
      <Text c="dimmed">Страница не найдена</Text>
      <Button component={Link} to="/">На главную</Button>
    </Stack>
  );
}