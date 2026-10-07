import { useState } from 'react';
import { Link } from '@tanstack/react-router';

import {
  AlertTriangle,
  ArrowRight,
  Camera,
  CheckCircle2,
  Clock,
  FileCheck2,
  MapPin,
  PackageCheck,
  Route,
  Truck,
  Upload,
} from 'lucide-react';

import {
  operatorEvidence,
  operatorIncidents,
  operatorServices,
} from '@/lib/operator-data';

import {
  Button,
  PageHeader,
  ProgressBar,
  SectionTitle,
  StatBar,
  StatusBadge,
} from './ui';

export function OperatorHomePage() {
  const mainService = operatorServices[0];

  return (
    <div className="operator-page">
      <PageHeader
        eyebrow="Portal del operador"
        title="Buenos días, Miguel"
        description="Consulta tus servicios asignados y registra los eventos de cada operación."
      >
        <div className="operator-company">
          <span>Operador</span>
          <strong>TransMed</strong>
        </div>
      </PageHeader>

      <StatBar
        items={[
          { label: 'Servicios asignados', value: '03' },
          { label: 'En tránsito', value: '01' },
          { label: 'Próximos', value: '02' },
          { label: 'Incidencias abiertas', value: '01', tone: 'warning' },
        ]}
      />

      <section className="operator-focus-card">
        <div className="operator-focus-top">
          <div>
            <span className="operator-kicker">Servicio actual</span>
            <h2>{mainService.folio}</h2>
            <p>{mainService.route}</p>
          </div>

          <StatusBadge status={mainService.status} />
        </div>

        <div className="operator-service-progress">
          <div className="operator-progress-label">
            <span>Avance de la operación</span>
            <strong>{mainService.progress}%</strong>
          </div>

          <ProgressBar value={mainService.progress} />
        </div>

        <div className="operator-service-meta">
          <div>
            <MapPin />
            <span>
              <small>Última ubicación</small>
              <strong>{mainService.lastLocation}</strong>
            </span>
          </div>

          <div>
            <Clock />
            <span>
              <small>ETA</small>
              <strong>{mainService.eta}</strong>
            </span>
          </div>

          <div>
            <Truck />
            <span>
              <small>Unidad</small>
              <strong>{mainService.vehicle}</strong>
            </span>
          </div>
        </div>

        <div className="operator-actions">
          <Button asChild>
            <Link
              to="/operador/servicios/$folio"
              params={{ folio: mainService.folio }}
            >
              Abrir servicio
              <ArrowRight />
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/operador/incidencias">
              <AlertTriangle />
              Reportar incidencia
            </Link>
          </Button>
        </div>
      </section>

      <section className="operator-section">
        <SectionTitle
          title="Próximos servicios"
          subtitle="Operaciones asignadas a TransMed"
        />

        <div className="operator-service-list">
          {operatorServices.slice(1).map((service) => (
            <Link
              key={service.folio}
              to="/operador/servicios/$folio"
              params={{ folio: service.folio }}
              className="operator-service-row"
            >
              <div className="service-row-icon">
                <Truck />
              </div>

              <div className="service-row-main">
                <strong>{service.folio}</strong>
                <span>{service.route}</span>
              </div>

              <div className="service-row-date">
                <small>Programado</small>
                <strong>{service.scheduled}</strong>
              </div>

              <StatusBadge status={service.status} />

              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export function OperatorServicesPage() {
  return (
    <div className="operator-page">
      <PageHeader
        eyebrow="Operación"
        title="Mis servicios"
        description="Servicios logísticos asignados al operador TransMed."
      />

      <div className="operator-cards-grid">
        {operatorServices.map((service) => (
          <article className="operator-service-card" key={service.folio}>
            <div className="operator-card-header">
              <div>
                <span className="operator-kicker">Servicio asignado</span>
                <h2>{service.folio}</h2>
              </div>

              <StatusBadge status={service.status} />
            </div>

            <div className="operator-route">
              <div>
                <span className="route-dot active" />
                <small>Origen</small>
                <strong>{service.origin}</strong>
              </div>

              <span className="route-line" />

              <div>
                <span className="route-dot" />
                <small>Destino</small>
                <strong>{service.destination}</strong>
              </div>
            </div>

            <div className="operator-card-details">
              <span>
                <Clock />
                {service.scheduled}
              </span>

              <span>
                <Truck />
                {service.vehicle}
              </span>
            </div>

            {service.progress > 0 && (
              <div className="operator-service-progress">
                <div className="operator-progress-label">
                  <span>Progreso</span>
                  <strong>{service.progress}%</strong>
                </div>

                <ProgressBar value={service.progress} />
              </div>
            )}

            <Button asChild variant="outline">
              <Link
                to="/operador/servicios/$folio"
                params={{ folio: service.folio }}
              >
                Ver operación
                <ArrowRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function OperatorServiceDetail({ folio }: { folio: string }) {
  const service = operatorServices.find((item) => item.folio === folio);

  const [completedStep, setCompletedStep] = useState(-1);

  const [notice, setNotice] = useState('');

  if (!service) {
    return (
      <>
        <PageHeader
          title="Servicio no encontrado"
          description="El servicio solicitado no corresponde a una operación asignada."
        />

        <Button asChild variant="outline">
          <Link to="/operador/servicios">Volver a mis servicios</Link>
        </Button>
      </>
    );
  }

  const stages = [
  {
    name: 'Recolección',
    action: 'Registrar recolección',
    success: 'Recolección registrada correctamente',
  },
  {
    name: 'Salida',
    action: 'Registrar salida',
    success: 'Salida registrada correctamente',
  },
  {
    name: 'En tránsito',
    action: 'Iniciar tránsito',
    success: 'Inicio de tránsito registrado correctamente',
  },
  {
    name: 'Llegada',
    action: 'Registrar llegada',
    success: 'Llegada registrada correctamente',
  },
  {
    name: 'Entrega',
    action: 'Confirmar entrega',
    success: 'Entrega confirmada correctamente',
  },
];

  const registerNextStage = () => {
  const nextStep = completedStep + 1;

  if (nextStep >= stages.length) {
    return;
  }

  setCompletedStep(nextStep);
  setNotice(stages[nextStep].success);
};

const currentStatus =
  completedStep === -1
    ? 'Pendiente de recolección'
    : completedStep === 0
      ? 'Recolectado'
      : completedStep === 1
        ? 'Salida registrada'
        : completedStep === 2
          ? 'En tránsito'
          : completedStep === 3
            ? 'En destino'
            : 'Entregado';

const progress = Math.round(
  ((completedStep + 1) / stages.length) * 100
);

  return (
    <div className="operator-page">
      <div className="breadcrumb">
        <Link to="/operador/servicios">Mis servicios</Link>
        <span>›</span>
        <span>{folio}</span>
      </div>

      <PageHeader
        eyebrow="Servicio asignado"
        title={folio}
        description={`${service.origin} → ${service.destination}`}
      >
        <StatusBadge status={currentStatus} />
      </PageHeader>

      {notice && (
        <div className="operator-success">
          <CheckCircle2 />
          <div>
            <strong>{notice}</strong>
            <span>
  El evento fue añadido a la bitácora logística mediante registro manual.
</span>
          </div>
        </div>
      )}

      <div className="operator-detail-grid">
        <section className="operator-main-card">
          <SectionTitle
            title="Avance del servicio"
            subtitle="Registra manualmente los eventos cuando no sean recibidos por integración."
          />

          <div className="operator-live-progress">
  <div>
    <span>Progreso de registro</span>
    <strong>{progress}%</strong>
  </div>

  <div className="operator-live-progress-track">
    <span style={{ width: `${progress}%` }} />
  </div>
</div>

          <div className="operator-timeline">
  {stages.map((stage, index) => {
    const isCompleted = index <= completedStep;
    const isCurrent = index === completedStep + 1;
    const isPending = index > completedStep + 1;

    return (
      <div
        key={stage.name}
        className={`operator-step ${
          isCompleted
            ? 'completed'
            : isCurrent
              ? 'current'
              : 'pending'
        }`}
      >
        <div className="operator-step-marker">
          {isCompleted ? (
            <CheckCircle2 />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>

        <div>
          <strong>{stage.name}</strong>

          <small>
            {isCompleted
              ? 'Registrado'
              : isCurrent
                ? 'Siguiente paso'
                : 'Pendiente'}
          </small>
        </div>
      </div>
    );
  })}
</div>

          <div className="operator-event-actions">
  {completedStep < stages.length - 1 ? (
    <Button onClick={registerNextStage}>
      {completedStep === -1 && <PackageCheck />}
      {completedStep === 0 && <Truck />}
      {completedStep === 1 && <Route />}
      {completedStep === 2 && <MapPin />}
      {completedStep === 3 && <PackageCheck />}

      {stages[completedStep + 1].action}
    </Button>
  ) : (
    <div className="operator-delivery-complete">
      <CheckCircle2 />

      <div>
        <strong>Servicio completado</strong>
        <span>
          La entrega y sus eventos quedaron registrados en la bitácora.
        </span>
      </div>
    </div>
  )}

  <Button asChild variant="outline">
    <Link to="/operador/incidencias">
      <AlertTriangle />
      Reportar incidencia
    </Link>
  </Button>

  <Button asChild variant="outline">
    <Link to="/operador/evidencias">
      <Camera />
      Subir evidencia
    </Link>
  </Button>
</div>
        </section>

        <aside className="operator-side-card">
          <SectionTitle title="Información del servicio" />

          <dl className="operator-info-list">
            <div>
              <dt>
                <Route />
                Ruta
              </dt>
              <dd>{service.route}</dd>
            </div>

            <div>
              <dt>
                <Clock />
                Entrega programada
              </dt>
              <dd>{service.scheduled}</dd>
            </div>

            <div>
              <dt>
                <MapPin />
                Última ubicación
              </dt>
              <dd>{service.lastLocation}</dd>
            </div>

            <div>
              <dt>
                <Truck />
                Unidad
              </dt>
              <dd>{service.vehicle}</dd>
            </div>

            <div>
              <dt>Temperatura</dt>
              <dd>{service.temperature}</dd>
            </div>
          </dl>

          <div className="operator-source-note">
            <strong>Origen de los datos</strong>
            <span>
              API TransMed + registros manuales del operador
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function OperatorIncidentsPage() {
  const [reported, setReported] = useState(false);

  return (
    <div className="operator-page">
      <PageHeader
        eyebrow="Registro operativo"
        title="Incidencias"
        description="Reporta eventos que puedan afectar el cumplimiento de tus servicios."
      />

      <section className="operator-form-card">
        <SectionTitle
          title="Nueva incidencia"
          subtitle="Este formulario es demostrativo y no almacena información real."
        />

        <div className="operator-form-grid">
          <label>
            Folio
            <select defaultValue="ELIA-2026-00482">
              <option>ELIA-2026-00482</option>
              <option>ELIA-2026-00486</option>
              <option>ELIA-2026-00487</option>
            </select>
          </label>

          <label>
            Tipo de incidencia
            <select>
              <option>Demora</option>
              <option>Desvío de ruta</option>
              <option>Temperatura</option>
              <option>Daño de carga</option>
              <option>Documentación</option>
              <option>Otro</option>
            </select>
          </label>

          <label className="operator-form-full">
            Descripción
            <textarea
              placeholder="Describe brevemente lo ocurrido..."
              rows={4}
            />
          </label>
        </div>

        <Button onClick={() => setReported(true)}>
          <AlertTriangle />
          Registrar incidencia
        </Button>

        {reported && (
          <div className="operator-inline-success">
            <CheckCircle2 />
            Incidencia registrada correctamente.
          </div>
        )}
      </section>

      <section className="operator-section">
        <SectionTitle title="Incidencias reportadas" />

        {operatorIncidents.map((incident) => (
          <div className="operator-simple-row" key={incident.type}>
            <span className="simple-row-icon warning">
              <AlertTriangle />
            </span>

            <div>
              <strong>{incident.type}</strong>
              <span>
                {incident.folio} · {incident.location}
              </span>
            </div>

            <span>{incident.date}</span>

            <StatusBadge status={incident.status} />
          </div>
        ))}
      </section>
    </div>
  );
}

export function OperatorEvidencePage() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="operator-page">
      <PageHeader
        eyebrow="Documentación"
        title="Evidencias"
        description="Registra fotografías y comprobantes asociados a tus servicios."
      />

      <section className="operator-upload-card">
        <div className="upload-illustration">
          <Upload />
        </div>

        <div>
          <span className="operator-kicker">Nueva evidencia</span>
          <h2>Adjuntar documento o fotografía</h2>
          <p>
            Selecciona el folio correspondiente y registra la evidencia de la
            operación.
          </p>
        </div>

        <select defaultValue="ELIA-2026-00482">
          <option>ELIA-2026-00482</option>
          <option>ELIA-2026-00486</option>
          <option>ELIA-2026-00487</option>
        </select>

        <Button onClick={() => setUploaded(true)}>
          <Camera />
          Simular carga
        </Button>
      </section>

      {uploaded && (
        <div className="operator-success">
          <CheckCircle2 />

          <div>
            <strong>Evidencia registrada</strong>
            <span>
              La carga fue simulada correctamente para la demostración.
            </span>
          </div>
        </div>
      )}

      <section className="operator-section">
        <SectionTitle title="Evidencias registradas" />

        {operatorEvidence.map((item) => (
          <div
            className="operator-simple-row"
            key={item.name}
          >
            <span className="simple-row-icon">
              <FileCheck2 />
            </span>

            <div>
              <strong>{item.name}</strong>
              <span>{item.folio}</span>
            </div>

            <span>{item.date}</span>

            <StatusBadge status={item.status} />
          </div>
        ))}
      </section>
    </div>
  );
}