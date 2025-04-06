'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminPageDataContextType {
  pageData: Record<string, unknown>;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateSection: (sectionName: string, data: unknown) => Promise<boolean>;
}

const AdminPageDataContext = createContext<AdminPageDataContextType | undefined>(undefined);

export function useAdminPageData() {
  const context = useContext(AdminPageDataContext);
  if (!context) {
    throw new Error('useAdminPageData must be used within an AdminPageDataProvider');
  }
  return context;
}

export function AdminPageDataProvider({ children }: { children: ReactNode }) {
  const [pageData, setPageData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const cacheBuster = `cacheBust=${Date.now()}`;
      const res = await fetch(`/api/page-data?${cacheBuster}`);
      
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

  const updateSection = async (sectionName: string, data: unknown): Promise<boolean> => {
    try {
      const res = await fetch('/api/direct-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section: sectionName,
          data,
        }),
      });
      
      const responseData = await res.json();
      
      if (!res.ok || !responseData.success) {
        throw new Error(responseData.error || `Failed to update: ${res.status}`);
      }
      
      setPageData(prevData => ({
        ...prevData,
        [sectionName]: data,
      }));

      return true;
    } catch (error) {
      console.error('Update section error:', error);
      return false;
    }
  };
  
  useEffect(() => {
    loadAllData();
  }, []);
  
  return (
    <AdminPageDataContext.Provider value={{
      pageData,
      loading,
      error,
      refreshData: loadAllData,
      updateSection,
    }}>
      {children}
    </AdminPageDataContext.Provider>
  );
}
