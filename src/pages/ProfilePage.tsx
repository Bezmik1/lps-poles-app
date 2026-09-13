import { Stack, Title, Text, Card } from '@mantine/core';

export function ProfilePage() {
  return (
    <Stack maw={480}>
      <Title order={2}>Профиль</Title>
      <Card withBorder>
        <Text>
          Раздел профиля пользователя будет реализован в лабораторной работе №4.
        </Text>
      </Card>
    </Stack>
  );
}