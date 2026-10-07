import { createFileRoute } from '@tanstack/react-router';
import { MapPage } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/mapa-logistico')({head:()=>pageMeta('Mapa logístico nacional','Rutas y puntos de entrega de medicamentos en México, con estados de la red logística.'),component:MapPage});
