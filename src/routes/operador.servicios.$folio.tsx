import { createFileRoute } from '@tanstack/react-router';
import { OperatorServiceDetail } from '@/components/elia/operator-pages';
import { pageMeta } from '@/lib/elia-data';

export const Route = createFileRoute('/operador/servicios/$folio')({
  head: ({ params }) =>
    pageMeta(
      `Servicio ${params.folio}`,
      'Registro y seguimiento del servicio logístico asignado.'
    ),
  component: Detail,
});

function Detail() {
  const { folio } = Route.useParams();

  return <OperatorServiceDetail folio={folio} />;
}