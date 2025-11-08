// Global type declarations for React Three Fiber
// This extends JSX to include Three.js primitives

declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      ambientLight: any;
      pointLight: any;
      directionalLight: any;
      boxGeometry: any;
      sphereGeometry: any;
      meshStandardMaterial: any;
      points: any;
      pointMaterial: any;
    }
  }
}

export {};

