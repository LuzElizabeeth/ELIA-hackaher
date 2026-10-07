import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type EliaRole = 'supervisor' | 'operador';

type RoleContextType = {
  role: EliaRole;
  setRole: (role: EliaRole) => void;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<EliaRole>('supervisor');

  useEffect(() => {
    const saved = localStorage.getItem('elia-role') as EliaRole | null;

    if (saved === 'supervisor' || saved === 'operador') {
      setRoleState(saved);
    }
  }, []);

  const setRole = (newRole: EliaRole) => {
    setRoleState(newRole);
    localStorage.setItem('elia-role', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useEliaRole() {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error('useEliaRole debe utilizarse dentro de RoleProvider');
  }

  return context;
}