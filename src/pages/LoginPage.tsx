import { Stack, Title, Text, Card } from '@mantine/core';

export function LoginPage() {
  return (
    <Stack maw={480}>
      <Title order={2}>Вход</Title>
      <Card withBorder>
        <Text>
          Форма входа и аутентификация будут реализованы в лабораторной работе №4
          (JWT, access и refresh токены).
        </Text>
      </Card>
    </Stack>
  );
}