import { createFileRoute } from '@tanstack/react-router';
import { EvidencePage } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/evidencias')({head:()=>pageMeta('Evidencias logísticas','Archivo de documentos de recepción, fotografías y firmas de las operaciones ELIA.'),component:EvidencePage});
