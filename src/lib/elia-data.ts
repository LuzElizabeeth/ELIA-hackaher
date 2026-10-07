export type Operation = { folio: string; origin: string; destination: string; operator: string; initials: string; progress: number; date: string; time: string; status: string; route: string };
export const operations: [Operation, Operation, Operation, Operation, Operation, Operation] = [
 { folio:'ELIA-2026-00482',origin:'Ciudad de México',destination:'Hospital General Cancún',operator:'Miguel Mendoza',initials:'CM',progress:68,date:'07 oct 2026',time:'16:30 h',status:'En ruta',route:'CDMX → Cancún' },
 { folio:'ELIA-2026-00481',origin:'Guadalajara',destination:'Hospital Universitario Monterrey',operator:'Ana Martínez',initials:'AM',progress:42,date:'07 oct 2026',time:'17:45 h',status:'En ruta',route:'Guadalajara → Monterrey' },
 { folio:'ELIA-2026-00480',origin:'Ciudad de México',destination:'Hospital Regional Veracruz',operator:'Roberto Sánchez',initials:'RS',progress:81,date:'07 oct 2026',time:'14:15 h',status:'Atención',route:'CDMX → Veracruz' },
 { folio:'ELIA-2026-00479',origin:'Villahermosa',destination:'Hospital General Mérida',operator:'Luis Hernández',initials:'LH',progress:56,date:'07 oct 2026',time:'15:00 h',status:'Retrasada',route:'Villahermosa → Mérida' },
 { folio:'ELIA-2026-00478',origin:'Ciudad de México',destination:'Hospital General Puebla',operator:'María López',initials:'ML',progress:100,date:'07 oct 2026',time:'11:20 h',status:'Entregada',route:'CDMX → Puebla' },
 { folio:'ELIA-2026-00477',origin:'Mérida',destination:'Hospital General Cancún',operator:'Jorge Ramírez',initials:'JR',progress:100,date:'07 oct 2026',time:'10:45 h',status:'Entregada',route:'Mérida → Cancún' },
];
export const incidents = [
 {type:'Desviación de temperatura',folio:'ELIA-2026-00479',route:'Villahermosa → Mérida',location:'Campeche, Campeche',priority:'Crítica',elapsed:'Hace 12 min',date:'07 oct · 12:18 h',status:'En atención'},
 {type:'Demora en punto de entrega',folio:'ELIA-2026-00480',route:'CDMX → Veracruz',location:'Veracruz, Veracruz',priority:'Alta',elapsed:'Hace 28 min',date:'07 oct · 12:02 h',status:'En atención'},
 {type:'Desvío de ruta',folio:'ELIA-2026-00481',route:'Guadalajara → Monterrey',location:'San Luis Potosí, SLP',priority:'Media',elapsed:'Hace 45 min',date:'07 oct · 11:45 h',status:'En atención'},
 {type:'Documentación incompleta',folio:'ELIA-2026-00478',route:'CDMX → Puebla',location:'Puebla, Puebla',priority:'Media',elapsed:'Hace 2 h',date:'07 oct · 10:30 h',status:'Resuelta'},
];
export const medicines = [
 {name:'Insulina glargina',detail:'Solución inyectable · 100 UI/ml',lot:'INS-26-0841',quantity:'1,200 unidades',folio:'ELIA-2026-00482',destination:'Hospital General Cancún',status:'En ruta'},
 {name:'Amoxicilina',detail:'Cápsulas · 500 mg',lot:'AMX-26-0216',quantity:'3,600 cajas',folio:'ELIA-2026-00482',destination:'Hospital General Cancún',status:'En ruta'},
 {name:'Paracetamol',detail:'Tabletas · 500 mg',lot:'PAR-26-1104',quantity:'5,000 cajas',folio:'ELIA-2026-00482',destination:'Hospital General Cancún',status:'En ruta'},
 {name:'Metformina',detail:'Tabletas · 850 mg',lot:'MET-26-0672',quantity:'2,400 cajas',folio:'ELIA-2026-00481',destination:'Hospital Universitario Monterrey',status:'En ruta'},
 {name:'Ceftriaxona',detail:'Solución inyectable · 1 g',lot:'CEF-26-0308',quantity:'800 unidades',folio:'ELIA-2026-00480',destination:'Hospital Regional Veracruz',status:'Atención'},
 {name:'Insulina glargina',detail:'Solución inyectable · 100 UI/ml',lot:'INS-26-0842',quantity:'240 unidades',folio:'ELIA-2026-00479',destination:'Hospital General Mérida',status:'Retrasada'},
 {name:'Losartán',detail:'Tabletas · 50 mg',lot:'LOS-26-0912',quantity:'1,800 cajas',folio:'ELIA-2026-00479',destination:'Hospital General Mérida',status:'Retrasada'},
];
export const evidence = [
 {name:'Acta de recepción',format:'PDF · 248 KB',category:'Recepción',folio:'ELIA-2026-00478',operator:'María López',location:'Hospital General Puebla',date:'07 oct 2026 · 11:20 h'},
 {name:'Registro de recolección',format:'JPG · 1.8 MB',category:'Fotografías',folio:'ELIA-2026-00482',operator:'Miguel Mendoza',location:'Almacén central CDMX',date:'07 oct 2026 · 06:45 h'},
 {name:'Firma de entrega',format:'PDF · 124 KB',category:'Firmas',folio:'ELIA-2026-00477',operator:'Jorge Ramírez',location:'Hospital General Cancún',date:'07 oct 2026 · 10:45 h'},
 {name:'Reporte de temperatura',format:'PDF · 312 KB',category:'Incidencias',folio:'ELIA-2026-00479',operator:'Luis Hernández',location:'Campeche, Campeche',date:'07 oct 2026 · 12:18 h'},
 {name:'Salida de almacén',format:'JPG · 2.1 MB',category:'Fotografías',folio:'ELIA-2026-00482',operator:'Miguel Mendoza',location:'Almacén central CDMX',date:'07 oct 2026 · 07:10 h'},
];
export function pageMeta(title: string, description: string) { return {meta:[{title:`${title} | ELIA`},{name:'description',content:description},{property:'og:title',content:`${title} | ELIA`},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}; }

export function operationContext(op: Operation) {
 const partial = op.folio === 'ELIA-2026-00478';
 const cold = medicines.some(m => m.folio === op.folio && m.name === 'Insulina glargina');
 const pendingEvidence = !evidence.some(e => e.folio === op.folio && ['Recepción','Firmas'].includes(e.category));
 const stage = op.status === 'Entregada' ? (partial ? 4 : 5) : 3;
 const tags = [cold ? 'Cadena fría' : '', partial ? 'Entrega parcial' : '', pendingEvidence ? 'Evidencia pendiente' : ''].filter(Boolean);
 return {cold, partial, pendingEvidence, stage, tags};
}
export const recentActivity = [
 {time:'12:34',type:'position',title:'Ubicación recibida · API TransMed',detail:'En tránsito · Veracruz, Ver.',folio:'ELIA-2026-00482',tone:'normal',source:'API'},
 {time:'12:21',type:'position',title:'Punto intermedio · API LogiSalud',detail:'San Luis Potosí, SLP',folio:'ELIA-2026-00481',tone:'normal',source:'API'},
 {time:'12:20',type:'alert',title:'Error de sincronización · RutaSalud',detail:'Sin datos desde 10:18 h · cadena fría en riesgo',folio:'ELIA-2026-00479',tone:'critical',source:'ELIA'},
 {time:'12:06',type:'alert',title:'ETA excedido · API MediCargo',detail:'En reparto · Hospital Regional Veracruz',folio:'ELIA-2026-00480',tone:'attention',source:'API'},
 {time:'11:20',type:'delivery',title:'Entrega parcial · API TransMed',detail:'Hospital General Puebla',folio:'ELIA-2026-00478',tone:'normal',source:'API'},
];

/* ---------- Multioperador: seguimiento unificado (mock) ---------- */
export type EventSource = 'API' | 'Manual' | 'ELIA';
export type Tracking = { carrier: string; unified: string; lastLocation: string; lastUpdate: string; eta: string; source: string; scheduled: string };
export const unifiedStates = ['Asignado','Recolectado','En tránsito','Punto intermedio','En reparto','Entregado','Incidencia'] as const;
export const carriers = ['TransMed','LogiSalud','MediCargo','RutaSalud'] as const;
export const tracking: Record<string, Tracking> = {
 'ELIA-2026-00482': {carrier:'TransMed',unified:'En tránsito',lastLocation:'Veracruz, Ver.',lastUpdate:'12:34 h',eta:'16:30 h',source:'API TransMed',scheduled:'07 oct 2026 · 16:30 h'},
 'ELIA-2026-00481': {carrier:'LogiSalud',unified:'Punto intermedio',lastLocation:'San Luis Potosí, SLP',lastUpdate:'12:21 h',eta:'18:10 h',source:'API LogiSalud',scheduled:'07 oct 2026 · 17:45 h'},
 'ELIA-2026-00480': {carrier:'MediCargo',unified:'En reparto',lastLocation:'Veracruz, Ver.',lastUpdate:'12:06 h',eta:'14:40 h',source:'API MediCargo',scheduled:'07 oct 2026 · 14:15 h'},
 'ELIA-2026-00479': {carrier:'RutaSalud',unified:'Incidencia',lastLocation:'Campeche, Camp.',lastUpdate:'10:18 h',eta:'17:20 h',source:'Registro manual',scheduled:'07 oct 2026 · 15:00 h'},
 'ELIA-2026-00478': {carrier:'TransMed',unified:'Entregado',lastLocation:'Puebla, Pue.',lastUpdate:'11:20 h',eta:'11:20 h',source:'API TransMed',scheduled:'07 oct 2026 · 11:30 h'},
 'ELIA-2026-00477': {carrier:'LogiSalud',unified:'Entregado',lastLocation:'Cancún, Q. Roo',lastUpdate:'10:45 h',eta:'10:45 h',source:'API LogiSalud',scheduled:'07 oct 2026 · 11:00 h'},
};
export const trackingFor = (folio: string): Tracking => tracking[folio] ?? {carrier:'—',unified:'Asignado',lastLocation:'—',lastUpdate:'—',eta:'—',source:'Sistema ELIA',scheduled:'—'};

export type TrackEvent = { time: string; title: string; location: string; source: EventSource; pending?: boolean; tone?: 'critical' | 'attention' };
export const operationEvents: Record<string, TrackEvent[]> = {
 'ELIA-2026-00482': [
  {time:'06:15',title:'Operación asignada a TransMed',location:'Coordinación nacional',source:'ELIA'},
  {time:'08:15',title:'Recolección confirmada',location:'Almacén central CDMX',source:'API'},
  {time:'09:40',title:'Salida del centro logístico',location:'Ciudad de México',source:'API'},
  {time:'11:18',title:'Ubicación actualizada',location:'Puebla, Pue.',source:'API'},
  {time:'12:34',title:'Ubicación actualizada',location:'Veracruz, Ver.',source:'API'},
  {time:'Pendiente',title:'Punto intermedio',location:'Mérida, Yuc.',source:'API',pending:true},
  {time:'Pendiente',title:'Entrega en destino',location:'Hospital General Cancún',source:'API',pending:true},
 ],
 'ELIA-2026-00481': [
  {time:'06:40',title:'Operación asignada a LogiSalud',location:'Coordinación nacional',source:'ELIA'},
  {time:'07:30',title:'Recolección confirmada',location:'CEDIS Guadalajara',source:'API'},
  {time:'08:05',title:'Salida del centro logístico',location:'Guadalajara, Jal.',source:'API'},
  {time:'11:45',title:'Posible desviación de ruta',location:'San Luis Potosí, SLP',source:'ELIA',tone:'attention'},
  {time:'12:21',title:'Llegada a punto intermedio',location:'San Luis Potosí, SLP',source:'API'},
  {time:'Pendiente',title:'Entrega en destino',location:'Hospital Universitario Monterrey',source:'API',pending:true},
 ],
 'ELIA-2026-00480': [
  {time:'05:50',title:'Operación asignada a MediCargo',location:'Coordinación nacional',source:'ELIA'},
  {time:'06:30',title:'Recolección confirmada',location:'Almacén central CDMX',source:'API'},
  {time:'07:00',title:'Salida del centro logístico',location:'Ciudad de México',source:'API'},
  {time:'11:40',title:'Unidad en reparto local',location:'Veracruz, Ver.',source:'API'},
  {time:'12:02',title:'Demora en punto de entrega',location:'Hospital Regional Veracruz',source:'Manual',tone:'attention'},
  {time:'Pendiente',title:'Recepción en destino',location:'Hospital Regional Veracruz',source:'API',pending:true},
 ],
 'ELIA-2026-00479': [
  {time:'05:30',title:'Operación asignada a RutaSalud',location:'Coordinación nacional',source:'ELIA'},
  {time:'06:10',title:'Recolección confirmada',location:'CEDIS Villahermosa',source:'API'},
  {time:'06:45',title:'Salida del centro logístico',location:'Villahermosa, Tab.',source:'API'},
  {time:'10:18',title:'Última ubicación recibida',location:'Campeche, Camp.',source:'API'},
  {time:'12:18',title:'Desviación de temperatura · 9.8 °C',location:'Campeche, Camp.',source:'Manual',tone:'critical'},
  {time:'12:20',title:'Error de sincronización con RutaSalud',location:'Integración API',source:'ELIA',tone:'critical'},
  {time:'Pendiente',title:'Entrega en destino',location:'Hospital General Mérida',source:'API',pending:true},
 ],
 'ELIA-2026-00478': [
  {time:'06:00',title:'Operación asignada a TransMed',location:'Coordinación nacional',source:'ELIA'},
  {time:'07:05',title:'Recolección confirmada',location:'Almacén central CDMX',source:'API'},
  {time:'07:40',title:'Salida del centro logístico',location:'Ciudad de México',source:'API'},
  {time:'10:30',title:'Documentación incompleta',location:'Puebla, Pue.',source:'Manual',tone:'attention'},
  {time:'11:20',title:'Entrega parcial confirmada',location:'Hospital General Puebla',source:'API'},
  {time:'11:32',title:'Acta de recepción validada',location:'Sistema ELIA',source:'ELIA'},
 ],
 'ELIA-2026-00477': [
  {time:'05:45',title:'Operación asignada a LogiSalud',location:'Coordinación nacional',source:'ELIA'},
  {time:'06:20',title:'Recolección confirmada',location:'CEDIS Mérida',source:'API'},
  {time:'06:50',title:'Salida del centro logístico',location:'Mérida, Yuc.',source:'API'},
  {time:'10:45',title:'Entrega confirmada',location:'Hospital General Cancún',source:'API'},
  {time:'10:52',title:'Firma de entrega registrada',location:'Hospital General Cancún',source:'Manual'},
  {time:'11:00',title:'Operación validada',location:'Sistema ELIA',source:'ELIA'},
 ],
};

export type AutoAlert = { type: string; folio: string; severity: 'Crítica' | 'Alta' | 'Media'; detail: string; time: string };
export const autoAlerts: AutoAlert[] = [
 {type:'Incidencia crítica',folio:'ELIA-2026-00479',severity:'Crítica',detail:'Desviación de temperatura en cadena fría · Campeche',time:'12:18 h'},
 {type:'Error de sincronización con operador',folio:'ELIA-2026-00479',severity:'Crítica',detail:'RutaSalud API sin respuesta desde 10:18 h',time:'12:20 h'},
 {type:'Sin actualización durante más de 2 horas',folio:'ELIA-2026-00479',severity:'Alta',detail:'Última ubicación reportada: Campeche, Camp. · 10:18 h',time:'12:18 h'},
 {type:'ETA excedido',folio:'ELIA-2026-00480',severity:'Alta',detail:'ETA 14:15 h recalculado a 14:40 h',time:'12:06 h'},
 {type:'Posible desviación de ruta',folio:'ELIA-2026-00481',severity:'Media',detail:'Unidad fuera del corredor previsto · SLP',time:'11:45 h'},
 {type:'Entrega retrasada',folio:'ELIA-2026-00481',severity:'Media',detail:'ETA 18:10 h frente a 17:45 h programada',time:'12:21 h'},
 {type:'Entrega parcial',folio:'ELIA-2026-00478',severity:'Media',detail:'Recepción parcial documentada en Puebla',time:'11:20 h'},
 {type:'Evidencia pendiente',folio:'ELIA-2026-00482',severity:'Media',detail:'Falta comprobante de recepción y firma',time:'12:30 h'},
];

export const coldChain: Record<string, {current: string; range: string; last: string; status: string; reading: number}> = {
 'ELIA-2026-00482': {current:'4.6 °C',range:'2 – 8 °C',last:'12:30 h',status:'Normal',reading:4.6},
 'ELIA-2026-00479': {current:'9.8 °C',range:'2 – 8 °C',last:'12:18 h',status:'Crítica',reading:9.8},
};

export const integrations = [
 {name:'TransMed API',carrier:'TransMed',status:'Conectado',sync:'hace 2 min',active:18,events:642,protocol:'REST · Webhook'},
 {name:'LogiSalud API',carrier:'LogiSalud',status:'Conectado',sync:'hace 5 min',active:11,events:418,protocol:'REST'},
 {name:'MediCargo API',carrier:'MediCargo',status:'Sincronización retrasada',sync:'hace 24 min',active:7,events:187,protocol:'Webhook'},
 {name:'RutaSalud API',carrier:'RutaSalud',status:'Error de conexión',sync:'hace 2 h 12 min',active:4,events:37,protocol:'SFTP · CSV'},
];
export const syncActivity = [
 {time:'12:34',title:'Evento recibido de TransMed',detail:'IN_TRANSIT → En tránsito · ELIA-2026-00482',tone:'normal'},
 {time:'12:21',title:'Ubicación actualizada',detail:'LogiSalud · San Luis Potosí · ELIA-2026-00481',tone:'normal'},
 {time:'12:20',title:'Error de sincronización',detail:'RutaSalud API · tiempo de espera agotado (3 reintentos)',tone:'critical'},
 {time:'12:10',title:'Sincronización retrasada',detail:'MediCargo API · última respuesta hace 24 min',tone:'attention'},
 {time:'11:20',title:'Entrega confirmada',detail:'TransMed · DELIVERED_PARTIAL → Entregado · ELIA-2026-00478',tone:'normal'},
 {time:'10:45',title:'Entrega confirmada',detail:'LogiSalud · POD recibido → Entregado · ELIA-2026-00477',tone:'normal'},
];
export const stateMapping = [
 {carrier:'TransMed',raw:'ASSIGNED',standard:'Asignado'},
 {carrier:'LogiSalud',raw:'RECOLECTADO_OK',standard:'Recolectado'},
 {carrier:'TransMed',raw:'IN_TRANSIT',standard:'En tránsito'},
 {carrier:'LogiSalud',raw:'HUB_SCAN',standard:'Punto intermedio'},
 {carrier:'MediCargo',raw:'OUT_FOR_DELIVERY',standard:'En reparto'},
 {carrier:'TransMed',raw:'DELIVERED',standard:'Entregado'},
 {carrier:'RutaSalud',raw:'EXC-07 TEMP',standard:'Incidencia'},
];
export const carrierPerformance = [
 {name:'TransMed',active:18,completed:412,onTime:97,delay:'08 min',incidents:1,compliance:98,api:'Conectado'},
 {name:'LogiSalud',active:11,completed:286,onTime:94,delay:'14 min',incidents:2,compliance:95,api:'Conectado'},
 {name:'MediCargo',active:7,completed:174,onTime:89,delay:'26 min',incidents:2,compliance:91,api:'Sincronización retrasada'},
 {name:'RutaSalud',active:4,completed:98,onTime:82,delay:'41 min',incidents:3,compliance:84,api:'Error de conexión'},
];
