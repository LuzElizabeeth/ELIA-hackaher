import { createFileRoute } from '@tanstack/react-router';
import { IncidentsPage } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/incidencias')({head:()=>pageMeta('Incidencias logísticas','Eventos prioritarios y seguimiento de incidencias en la distribución de medicamentos.'),component:IncidentsPage});
