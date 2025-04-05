'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HeroData } from '@/components/HeroSection';

export interface PageData {
  hero?: HeroData;
  intro?: Record<string, unknown>;
  whyThisCourse?: Record<string, unknown>;
  benefits?: Record<string, unknown>;
  forWhom?: Record<string, unknown>;
  learningProcess?: Record<string, unknown>;
  program?: Record<string, unknown>;
  comparePlans?: Record<string, unknown>;
  testimonials?: Record<string, unknown>;
  faq?: Record<string, unknown>;
  footer?: Record<string, unknown>;
}

interface PageDataContextType {
  pageData: PageData;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

const PageDataContext = createContext<PageDataContextType | undefined>(undefined);

export function usePageData() {
  const context = useContext(PageDataContext);
  if (!context) {
    throw new Error('usePageData must be used within a PageDataProvider');
  }
  return context;
}

export function PageDataProvider({ children }: { children: ReactNode }) {
  const [pageData, setPageData] = useState<PageData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await fetch('/api/page-data');
      
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.success) {
        setPageData(data.sections);
      } else {
        setError(data.error || 'Failed to load page data');
      }
    } catch (err: unknown) {
      const error = err as Error;
      setError(error.message || 'Error loading page data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadAllData();
  }, []);
  
  return (
    <PageDataContext.Provider value={{
      pageData,
      loading,
      error,
      refreshData: loadAllData
    }}>
      {children}
    </PageDataContext.Provider>
  );
}
