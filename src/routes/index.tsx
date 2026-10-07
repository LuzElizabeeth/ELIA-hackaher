import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/')({head:()=>pageMeta('Centro nacional de monitoreo','ELIA: torre de control para la trazabilidad y distribución logística de medicamentos en México.'),component:HomePage});
