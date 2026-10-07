import { createFileRoute } from '@tanstack/react-router';
import { OperationsPage } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/operaciones/')({head:()=>pageMeta('Operaciones logísticas','Seguimiento de rutas, entregas y operadores en la distribución nacional de medicamentos.'),component:OperationsPage});
