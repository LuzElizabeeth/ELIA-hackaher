import { createFileRoute } from '@tanstack/react-router';
import { OperatorIncidentsPage } from '@/components/elia/operator-pages';
import { pageMeta } from '@/lib/elia-data';

export const Route = createFileRoute('/operador/incidencias')({
  head: () =>
    pageMeta(
      'Incidencias del operador',
      'Registro de incidencias asociadas a servicios logísticos.'
    ),
  component: OperatorIncidentsPage,
});