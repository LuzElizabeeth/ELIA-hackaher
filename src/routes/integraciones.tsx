import { createFileRoute } from '@tanstack/react-router';
import { IntegrationsPage } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/integraciones')({head:()=>pageMeta('Integraciones','Conexiones con APIs de operadores logísticos, actividad de sincronización y estandarización de estados.'),component:IntegrationsPage});
