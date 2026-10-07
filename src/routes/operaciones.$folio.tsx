import { createFileRoute } from '@tanstack/react-router';
import { OperationDetail } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/operaciones/$folio')({head:({params})=>pageMeta(`Operación ${params.folio}`,'Expediente de trazabilidad con ruta, medicamentos transportados, evidencias e incidencias.'),component:Detail});
function Detail(){const {folio}=Route.useParams();return <OperationDetail folio={folio}/>;}
