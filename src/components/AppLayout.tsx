import { AppShell, Group, Title, NavLink, Badge } from '@mantine/core';
import { Link, Outlet, useLocation } from 'react-router-dom';

export function AppLayout() {
  const { pathname } = useLocation();

  const isExact = (to: string) => pathname === to;
  const isPrefix = (to: string) => pathname.startsWith(to);

  return (
    <AppShell header={{ height: 64 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between" wrap="nowrap">
          <Group gap="sm" wrap="nowrap">
            <Title order={3}>Опоры ЛЭП</Title>
            <Badge variant="light" color="blue">MVP</Badge>
          </Group>
          <Group gap="xs" wrap="nowrap">
            <NavLink
              component={Link}
              to="/"
              label="Список"
              active={isExact('/')}
            />
            <NavLink
              component={Link}
              to="/photos/upload"
              label="Загрузить"
              active={isPrefix('/photos/upload')}
            />
            <NavLink
              component={Link}
              to="/profile"
              label="Профиль"
              active={isPrefix('/profile')}
            />
            <NavLink
              component={Link}
              to="/login"
              label="Войти"
              active={isPrefix('/login')}
            />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}