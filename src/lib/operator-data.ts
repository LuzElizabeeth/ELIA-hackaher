export const operatorServices = [
  {
  folio: 'ELIA-2026-00482',
  origin: 'Almacén central CDMX',
  destination: 'Hospital General Cancún',
  route: 'CDMX → Cancún',
  scheduled: '07 oct 2026 · 16:30 h',
  eta: '16:30 h',
  status: 'Asignado',
  progress: 0,
  vehicle: 'ELIA-UT-482',
  lastLocation: 'Almacén central CDMX',
  temperature: '4.6 °C',
},
  {
    folio: 'ELIA-2026-00486',
    origin: 'CEDIS Mérida',
    destination: 'Hospital Regional Valladolid',
    route: 'Mérida → Valladolid',
    scheduled: '07 oct 2026 · 18:15 h',
    eta: '18:15 h',
    status: 'Asignado',
    progress: 0,
    vehicle: 'ELIA-UT-486',
    lastLocation: 'CEDIS Mérida',
    temperature: '—',
  },
  {
    folio: 'ELIA-2026-00487',
    origin: 'CEDIS Cancún',
    destination: 'Hospital General Playa del Carmen',
    route: 'Cancún → Playa del Carmen',
    scheduled: '08 oct 2026 · 09:00 h',
    eta: '09:00 h',
    status: 'Programado',
    progress: 0,
    vehicle: 'ELIA-UT-487',
    lastLocation: 'CEDIS Cancún',
    temperature: '—',
  },
];

export const operatorIncidents = [
  {
    folio: 'ELIA-2026-00482',
    type: 'Demora por tráfico',
    date: '07 oct · 11:42 h',
    location: 'Veracruz, Veracruz',
    status: 'Reportada',
  },
];

export const operatorEvidence = [
  {
    folio: 'ELIA-2026-00482',
    name: 'Registro de recolección',
    date: '07 oct · 08:15 h',
    status: 'Registrada',
  },
  {
    folio: 'ELIA-2026-00482',
    name: 'Fotografía de salida',
    date: '07 oct · 09:40 h',
    status: 'Registrada',
  },
];