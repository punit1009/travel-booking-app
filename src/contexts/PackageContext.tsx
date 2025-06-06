import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getPackages, 
  createPackage as createPackageApi, 
  updatePackage as updatePackageApi, 
  deletePackage as deletePackageApi,
  getMyPackages as getMyPackagesApi
} from '../services/api';
import { useAuth } from './AuthContext';

export interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  destinations: string[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface PackageContextType {
  packages: Package[];
  myPackages: Package[];
  loading: boolean;
  error: string | null;
  createPackage: (packageData: Omit<Package, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updatePackage: (id: string, packageData: Partial<Package>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;
  fetchPackages: () => Promise<void>;
  fetchMyPackages: () => Promise<void>;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

export const usePackages = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackages must be used within a PackageProvider');
  }
  return context;
};

export const PackageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [myPackages, setMyPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await getPackages();
      setPackages(data);
    } catch (err) {
      setError('Failed to fetch packages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyPackages = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const data = await getMyPackagesApi(token);
      setMyPackages(data);
    } catch (err) {
      setError('Failed to fetch your packages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPackage = async (packageData: Omit<Package, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (!token) throw new Error('Not authenticated');
    try {
      setLoading(true);
      const newPackage = await createPackageApi(packageData, token);
      setPackages(prev => [...prev, newPackage]);
      setMyPackages(prev => [...prev, newPackage]);
    } catch (err) {
      setError('Failed to create package');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePackage = async (id: string, packageData: Partial<Package>) => {
    if (!token) throw new Error('Not authenticated');
    try {
      setLoading(true);
      const updatedPackage = await updatePackageApi(id, packageData, token);
      setPackages(prev => prev.map(pkg => pkg._id === id ? updatedPackage : pkg));
      setMyPackages(prev => prev.map(pkg => pkg._id === id ? updatedPackage : pkg));
    } catch (err) {
      setError('Failed to update package');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePackage = async (id: string) => {
    if (!token) throw new Error('Not authenticated');
    try {
      setLoading(true);
      await deletePackageApi(id, token);
      setPackages(prev => prev.filter(pkg => pkg._id !== id));
      setMyPackages(prev => prev.filter(pkg => pkg._id !== id));
    } catch (err) {
      setError('Failed to delete package');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
    if (token) {
      fetchMyPackages();
    }
  }, [token]);

  return (
    <PackageContext.Provider
      value={{
        packages,
        myPackages,
        loading,
        error,
        createPackage,
        updatePackage,
        deletePackage,
        fetchPackages,
        fetchMyPackages,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export default PackageContext;
