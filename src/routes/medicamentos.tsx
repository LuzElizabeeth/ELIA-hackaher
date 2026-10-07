import { createFileRoute } from '@tanstack/react-router';
import { MedicinesPage } from '@/components/elia/pages';
import { pageMeta } from '@/lib/elia-data';
export const Route = createFileRoute('/medicamentos')({head:()=>pageMeta('Medicamentos en distribución','Trazabilidad de los medicamentos transportados, sus lotes y operaciones logísticas activas.'),component:MedicinesPage});
