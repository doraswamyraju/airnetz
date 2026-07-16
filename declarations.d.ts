declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useContext: any;
  export const createContext: any;
  export const memo: any;
  export const useMemo: any;
  export const useCallback: any;
  export const StrictMode: any;
  export type ReactNode = any;
  export type FC<P = {}> = any;
  export type FormEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;
  export type CSSProperties = any;
  export type RefObject<T> = any;
  export type ComponentType<T = any> = any;

  const React: {
    useState: typeof useState;
    useEffect: typeof useEffect;
    useRef: typeof useRef;
    useContext: typeof useContext;
    createContext: typeof createContext;
    memo: typeof memo;
    useMemo: typeof useMemo;
    useCallback: typeof useCallback;
    StrictMode: typeof StrictMode;
    FC: FC;
    Component: any;
  };
  
  export default React;
}

declare module 'react-dom/client' {
  export const createRoot: any;
  const ReactDOM: {
    createRoot: typeof createRoot;
  };
  export default ReactDOM;
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
