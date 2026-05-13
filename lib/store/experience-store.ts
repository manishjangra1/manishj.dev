import { create } from 'zustand';
import { Project } from '@/contexts/DataContext';

export type Section = 'home' | 'projects' | 'about' | 'experience' | 'skills' | 'contact';

interface ExperienceState {
  activeSection: Section;
  isLoaded: boolean;
  isLoading: boolean;
  progress: number;
  
  // Project Details State
  selectedProject: Project | null;
  isProjectDetailsOpen: boolean;
  
  // Camera & Spatial State
  cameraPosition: [number, number, number];
  cameraRotation: [number, number, number];
  
  // Actions
  setActiveSection: (section: Section) => void;
  setLoaded: (loaded: boolean) => void;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setSelectedProject: (project: Project | null) => void;
  setProjectDetailsOpen: (open: boolean) => void;
  updateCamera: (position: [number, number, number], rotation: [number, number, number]) => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  activeSection: 'home',
  isLoaded: false,
  isLoading: true,
  progress: 0,
  
  cameraPosition: [0, 0, 5],
  cameraRotation: [0, 0, 0],
  
  selectedProject: null,
  isProjectDetailsOpen: false,
  
  setActiveSection: (section) => {
    let position: [number, number, number] = [0, 0, 5];
    let rotation: [number, number, number] = [0, 0, 0];
    
    switch (section) {
      case 'home':
        position = [0, 0, 5];
        break;
      case 'projects':
        position = [5, 2, 8];
        rotation = [0, -Math.PI / 4, 0];
        break;
      case 'about':
        position = [-5, -2, 7];
        rotation = [0, Math.PI / 6, 0];
        break;
      case 'experience':
        position = [0, 5, 10];
        rotation = [-Math.PI / 8, 0, 0];
        break;
      case 'skills':
        position = [-8, 4, 6];
        rotation = [0, Math.PI / 3, 0];
        break;
      case 'contact':
        position = [0, -8, 5];
        rotation = [Math.PI / 2, 0, 0];
        break;
    }
    
    set({ activeSection: section, cameraPosition: position, cameraRotation: rotation });
  },
  setLoaded: (loaded) => set({ isLoaded: loaded }),
  setLoading: (loading) => set({ isLoading: loading }),
  setProgress: (progress) => set({ progress }),
  setSelectedProject: (project) => set({ selectedProject: project }),
  setProjectDetailsOpen: (open) => set({ isProjectDetailsOpen: open }),
  updateCamera: (position, rotation) => set({ cameraPosition: position, cameraRotation: rotation }),
}));
