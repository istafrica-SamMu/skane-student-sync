
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SyncStatus {
  isRunning: boolean;
  lastSync: string | null;
  nextSync: string | null;
  recordsUpdated: number;
  errors: string[];
}

export const useTravelCardSync = () => {
  const { toast } = useToast();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isRunning: false,
    lastSync: localStorage.getItem('travelCard-lastSync'),
    nextSync: null,
    recordsUpdated: 0,
    errors: []
  });

  // Calculate next sync time (daily at 2:00 AM)
  const getNextSyncTime = useCallback(() => {
    const now = new Date();
    const nextSync = new Date();
    nextSync.setHours(2, 0, 0, 0);
    
    // If it's already past 2 AM today, schedule for tomorrow
    if (now.getHours() >= 2) {
      nextSync.setDate(nextSync.getDate() + 1);
    }
    
    return nextSync.toISOString();
  }, []);

  // Simulate data sync process
  const performSync = useCallback(async () => {
    setSyncStatus(prev => ({ ...prev, isRunning: true, errors: [] }));
    
    try {
      // Simulate API call for data sync
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const now = new Date().toISOString();
      const recordsUpdated = Math.floor(Math.random() * 50) + 10; // Random between 10-60
      
      setSyncStatus(prev => ({
        ...prev,
        isRunning: false,
        lastSync: now,
        nextSync: getNextSyncTime(),
        recordsUpdated
      }));
      
      localStorage.setItem('travelCard-lastSync', now);
      
      toast({
        title: "Sync Completed",
        description: `Updated ${recordsUpdated} travel card records`,
      });
      
      console.log("Travel card data sync completed:", { recordsUpdated, timestamp: now });
      
    } catch (error) {
      const errorMessage = "Failed to sync travel card data";
      setSyncStatus(prev => ({
        ...prev,
        isRunning: false,
        errors: [errorMessage]
      }));
      
      toast({
        title: "Sync Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast, getNextSyncTime]);

  // Auto-sync check (runs every minute to check if it's time)
  useEffect(() => {
    const checkAutoSync = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      
      // Run at 2:00 AM daily
      if (hour === 2 && minute === 0) {
        const lastSync = localStorage.getItem('travelCard-lastSync');
        const today = new Date().toDateString();
        const lastSyncDate = lastSync ? new Date(lastSync).toDateString() : null;
        
        // Only sync if we haven't synced today
        if (lastSyncDate !== today) {
          performSync();
        }
      }
    };

    // Set next sync time on mount
    setSyncStatus(prev => ({ ...prev, nextSync: getNextSyncTime() }));

    // Check every minute
    const interval = setInterval(checkAutoSync, 60000);
    
    return () => clearInterval(interval);
  }, [performSync, getNextSyncTime]);

  return {
    syncStatus,
    performSync,
    isAutoSyncEnabled: true
  };
};
