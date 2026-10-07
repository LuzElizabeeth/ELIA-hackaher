import { createFileRoute } from '@tanstack/react-router';
import { OperatorHomePage } from '@/components/elia/operator-pages';
import { pageMeta } from '@/lib/elia-data';

export const Route = createFileRoute('/operador/')({
  head: () =>
    pageMeta(
      'Portal del operador',
      'Servicios asignados y registro de eventos logísticos en ELIA.'
    ),
  component: OperatorHomePage,
});