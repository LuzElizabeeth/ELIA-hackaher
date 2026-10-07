import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Bell,
  Menu,
  X,
  ChevronDown,
  Circle,
  ShieldCheck,
  Truck,
} from 'lucide-react';

import { Button } from './ui';
import { useEliaRole } from '@/lib/elia-role';

const supervisorLinks = [
  ['Inicio', '/'],
  ['Operaciones', '/operaciones'],
  ['Mapa logístico', '/mapa-logistico'],
  ['Incidencias', '/incidencias'],
  ['Operadores', '/operadores'],
  ['Integraciones', '/integraciones'],
] as const;

const operatorLinks = [
  ['Inicio', '/operador'],
  ['Mis servicios', '/operador/servicios'],
  ['Incidencias', '/operador/incidencias'],
  ['Evidencias', '/operador/evidencias'],
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { role, setRole } = useEliaRole();

  const links = role === 'supervisor' ? supervisorLinks : operatorLinks;

  const changeRole = (newRole: 'supervisor' | 'operador') => {
  setRole(newRole);
  setProfileOpen(false);
  setOpen(false);

  if (newRole === 'supervisor') {
    window.location.href = '/';
  } else {
    window.location.href = '/operador';
  }
};

  return (
    <>
      <nav className="navbar">
        <Link
          to={role === 'supervisor' ? '/' : '/operador'}
          className="brand brand-logo"
          aria-label="ELIA inicio"
        >
          <img src="/elia-logo.png" alt="ELIA" />
        </Link>

        <div className={`nav-links ${open ? 'mobile-open' : ''}`}>
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact: to === '/' || to === '/operador' }}
              activeProps={{ className: 'nav-active' }}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="nav-user">
          <div className="notification-wrap">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Notificaciones"
              title="Notificaciones"
              onClick={() => setNotifications(!notifications)}
              className="notification-button"
            >
              <Bell size={19} />
              <i />
            </Button>

            {notifications && (
              <div className="notification-popover">
                <h3>Notificaciones</h3>

                {role === 'supervisor' ? (
                  <>
                    <p>
                      <Circle size={8} />
                      Incidencia crítica · ELIA-2026-00479
                    </p>

                    <p>
                      <Circle size={8} />
                      Error de sincronización · RutaSalud API
                    </p>

                    <p>
                      <Circle size={8} />
                      Entrega completada · Puebla
                    </p>

                    <Link
                      to="/incidencias"
                      onClick={() => setNotifications(false)}
                    >
                      Ver incidencias →
                    </Link>
                  </>
                ) : (
                  <>
                    <p>
                      <Circle size={8} />
                      Servicio ELIA-2026-00482 en tránsito
                    </p>

                    <p>
                      <Circle size={8} />
                      Evidencia de entrega pendiente
                    </p>

                    <p>
                      <Circle size={8} />
                      ETA programada · 16:30 h
                    </p>

                    <Link
                      to="/operador/servicios"
                      onClick={() => setNotifications(false)}
                    >
                      Ver mis servicios →
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <span className="nav-divider" />

          <div className="profile-switcher">
            <button
              className="profile-trigger"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <span className="user-avatar">
                {role === 'supervisor' ? 'AV' : 'CM'}
              </span>

              <span className="user-name">
                <strong>
                  {role === 'supervisor'
                    ? 'Alejandra Vargas'
                    : 'Miguel Mendoza'}
                </strong>

                <small>
                  {role === 'supervisor'
                    ? 'Supervisor logístico'
                    : 'Operador · TransMed'}
                </small>
              </span>

              <ChevronDown size={13} className="user-chevron" />
            </button>

            {profileOpen && (
              <div className="profile-menu">
                <span className="profile-menu-title">
                  Vista de demostración
                </span>

                <button
                  className={role === 'supervisor' ? 'active' : ''}
                  onClick={() => changeRole('supervisor')}
                >
                  <span className="profile-menu-icon">
                    <ShieldCheck size={16} />
                  </span>

                  <span>
                    <strong>Supervisor logístico</strong>
                    <small>Supervisión nacional y cumplimiento</small>
                  </span>
                </button>

                <button
                  className={role === 'operador' ? 'active' : ''}
                  onClick={() => changeRole('operador')}
                >
                  <span className="profile-menu-icon">
                    <Truck size={16} />
                  </span>

                  <span>
                    <strong>Operador logístico</strong>
                    <small>Servicios asignados y registro</small>
                  </span>
                </button>
              </div>
            )}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="mobile-menu-button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>
    </>
  );
}

export function AppFooter() {
  return (
    <footer className="app-footer">
      <img src="/elia-logo-foot.png" alt="" className="footer-logo" />

      <span>
        <strong>ELIA</strong> · Enlace Logístico Integral de Abastecimiento
      </span>

      <span className="footer-demo">
        Prototipo hackaher · HACKATECNM 2026
      </span>
    </footer>
  );
}