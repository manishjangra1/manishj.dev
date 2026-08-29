'use client';

import React, { Component, ReactNode, ErrorInfo } from 'react';

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
            <div className="text-center flex flex-col items-center gap-6 max-w-md p-8">
              <h1 className="text-xl font-medium">Application Error</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">An unexpected error occurred.</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-sm hover:bg-[var(--color-surface-hover)] cursor-pointer"
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
