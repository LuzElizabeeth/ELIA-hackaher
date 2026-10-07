import { createFileRoute } from '@tanstack/react-router';
import { OperatorEvidencePage } from '@/components/elia/operator-pages';
import { pageMeta } from '@/lib/elia-data';

export const Route = createFileRoute('/operador/evidencias')({
  head: () =>
    pageMeta(
      'Evidencias del operador',
      'Registro de fotografías y documentos asociados a operaciones.'
    ),
  component: OperatorEvidencePage,
});