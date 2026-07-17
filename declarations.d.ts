declare namespace React {
  export type ReactNode = any;
  export type FC<P = {}> = any;
  export type FormEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export type CSSProperties = any;
  export type RefObject<T> = any;
  export type ComponentType<T = any> = any;
  
  export function useState<T = any>(initialState: T | (() => T)): [T, (val: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useRef<T = any>(initialValue: T): { current: T };
  export function useContext<T = any>(context: any): T;
  export function createContext<T = any>(defaultValue: T): any;
  export function memo<T = any>(component: T): T;
  export function useMemo<T = any>(factory: () => T, deps: any[] | undefined): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export const StrictMode: any;
  export const Component: any;
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
