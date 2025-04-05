'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HeroData } from '@/components/HeroSection';

export interface PageData {
  hero?: HeroData;
  intro?: any;
  whyThisCourse?: any;
  benefits?: any;
  forWhom?: any;
  learningProcess?: any;
  program?: any;
  comparePlans?: any;
  testimonials?: any;
  faq?: any;
  footer?: any;
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
        const debugRes = await fetch('/api/debug-data');
        const debugData = await debugRes.json();
        
        if (debugRes.ok && debugData.success && debugData.sections) {
          setPageData(debugData.sections);
          return;
        }
        
        setError(data.error || 'Failed to load page data');
      }
    } catch (err: any) {
      setError(err.message || 'Error loading page data');
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
