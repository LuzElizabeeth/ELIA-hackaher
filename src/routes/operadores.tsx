import { createFileRoute } from '@tanstack/react-router';
import { OperatorsPage } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/operadores')({head:()=>pageMeta('Operadores logísticos','Actividad, entregas y cumplimiento de los operadores de la red nacional ELIA.'),component:OperatorsPage});
