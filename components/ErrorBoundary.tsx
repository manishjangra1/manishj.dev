'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center flex flex-col items-center gap-6">
              <div className="w-16 h-16 rounded-full border border-red-500/30 flex items-center justify-center bg-red-500/5">
                <span className="text-red-500 text-2xl font-bold">!</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-text-primary uppercase tracking-tighter mb-2">Application Error</h1>
                <p className="text-text-muted text-xs font-mono uppercase tracking-widest">An unexpected error occurred</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="glass px-8 py-3 rounded-xl text-[10px] uppercase tracking-widest text-text-secondary hover:text-text-primary transition-all cursor-pointer"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

