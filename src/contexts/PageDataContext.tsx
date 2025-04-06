'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface PageDataContextType {
  pageData: Record<string, unknown>;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
}

interface CacheData {
  timestamp: number;
  data: Record<string, unknown>;
  version: string;
}

const PageDataContext = createContext<PageDataContextType | undefined>(undefined);

export function usePageData() {
  const context = useContext(PageDataContext);
  if (!context) {
    throw new Error('usePageData має використовуватись всередині PageDataProvider');
  }
  return context;
}

export function PageDataProvider({ children }: { children: ReactNode }) {
  const [pageData, setPageData] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentVersion, setCurrentVersion] = useState<string | null>(null);
  
  const fetchData = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParam = forceRefresh ? `?t=${Date.now()}` : '';
      const res = await fetch(`/api/page-data${queryParam}`);
      
      if (!res.ok) {
        throw new Error(`Помилка завантаження даних: ${res.status}`);
      }
      
      const data = await res.json();
      
      if (data.success) {
        setPageData(data.sections);
        setCurrentVersion(data.version);
        
        const cacheData: CacheData = {
          timestamp: Date.now(),
          data: data.sections,
          version: data.version
        };
        localStorage.setItem('pageDataCache', JSON.stringify(cacheData));
      } else {
        throw new Error(data.error || 'Не вдалося завантажити дані');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Невідома помилка';
      console.error('Помилка завантаження даних:', errorMessage);
      setError(errorMessage);
      
      const cachedData = loadFromCache();
      if (cachedData) {
        setPageData(cachedData.data);
        setCurrentVersion(cachedData.version);
      }
    } finally {
      setLoading(false);
    }
  }, []);
  
  const refreshData = useCallback(async () => fetchData(true), [fetchData]);
  
  const loadFromCache = (): CacheData | null => {
    try {
      const cachedDataString = localStorage.getItem('pageDataCache');
      if (!cachedDataString) return null;
      
      const cachedData = JSON.parse(cachedDataString) as CacheData;
      const cacheAge = Date.now() - cachedData.timestamp;
      const maxCacheAge = 60 * 60 * 1000; // 1 година
      
      return cacheAge < maxCacheAge ? cachedData : null;
    } catch (error) {
      console.error('Помилка читання кешу:', error);
      return null;
    }
  };
  
  const checkForUpdates = useCallback(async () => {
    if (!currentVersion) return;
    
    try {
      const res = await fetch('/api/check-version');
      if (!res.ok) return;
      
      const data = await res.json();
      if (data.version && data.version !== currentVersion) {
        console.log('Виявлено оновлення контенту');
        refreshData();
      }
    } catch (error) {
      console.error('Помилка перевірки версії:', error);
    }
  }, [currentVersion, refreshData]);
  
  useEffect(() => {
    const cachedData = loadFromCache();
    
    if (cachedData) {
      setPageData(cachedData.data);
      setCurrentVersion(cachedData.version);
      setLoading(false);
    }
    
    fetchData().catch(console.error);
    
    const updateCheckInterval = setInterval(checkForUpdates, 5 * 60 * 1000);
    
    return () => {
      clearInterval(updateCheckInterval);
    };
  }, [fetchData, checkForUpdates]);
  
  return (
    <PageDataContext.Provider value={{ pageData, loading, error, refreshData }}>
      {children}
    </PageDataContext.Provider>
  );
}
