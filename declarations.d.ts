declare namespace React {
  type ReactNode = any;
  type FC<P = {}> = any;
  type FormEvent<T = any> = any;
  type ChangeEvent<T = any> = any;
  type CSSProperties = any;
  type RefObject<T> = any;
  
  function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  function useRef<T>(initialValue?: T): { current: T };
  function useContext<T>(context: any): T;
  function createContext<T>(defaultValue: T): any;
}

declare module 'react' {
  export = React;
}

declare module 'react-dom/client' {
  export const createRoot: any;
}

declare module 'react-router-dom' {
  export const BrowserRouter: any;
  export const Routes: any;
  export const Route: any;
  export const Link: any;
  export const useLocation: any;
  export const Outlet: any;
  export const useNavigate: any;
  export const useParams: any;
  export const Navigate: any;
}

declare module 'lucide-react';
