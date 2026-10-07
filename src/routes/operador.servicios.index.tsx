import { createFileRoute } from '@tanstack/react-router';
import { OperatorServicesPage } from '@/components/elia/operator-pages';
import { pageMeta } from '@/lib/elia-data';

export const Route = createFileRoute('/operador/servicios/')({
  head: () =>
    pageMeta(
      'Mis servicios',
      'Servicios logísticos asignados al operador.'
    ),
  component: OperatorServicesPage,
});