import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  collection, 
  getDocs, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { StationApplication, EVStation, ChargingInvoice } from '../types';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore with explicit Database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Mandatory connection test on boot
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client is offline or network is restricted.');
      return false;
    }
    // Any other response (like document not found or permission denied on test doc) means server responded
    return true;
  }
}

// Google Sign In helper
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err) {
    console.error('Sign-in failed:', err);
    throw err;
  }
}

export async function logOut(): Promise<void> {
  await signOut(auth);
}

// Firestore Applications Collection Helpers
const APPLICATIONS_COLLECTION = 'applications';

export async function fetchApplicationsFromDB(): Promise<StationApplication[]> {
  try {
    const snap = await getDocs(collection(db, APPLICATIONS_COLLECTION));
    return snap.docs.map(d => d.data() as StationApplication);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, APPLICATIONS_COLLECTION);
  }
}

export async function saveApplicationToDB(appData: StationApplication): Promise<void> {
  const docPath = `${APPLICATIONS_COLLECTION}/${appData.id}`;
  try {
    await setDoc(doc(db, APPLICATIONS_COLLECTION, appData.id), appData);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function updateApplicationStageInDB(
  appId: string, 
  currentStage: string, 
  completedStages: string[]
): Promise<void> {
  const docPath = `${APPLICATIONS_COLLECTION}/${appId}`;
  try {
    await updateDoc(doc(db, APPLICATIONS_COLLECTION, appId), {
      currentStage,
      completedStages,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, docPath);
  }
}

// Subscribe to real-time application updates
export function subscribeToApplications(
  onUpdate: (apps: StationApplication[]) => void,
  onError?: (err: any) => void
) {
  return onSnapshot(
    collection(db, APPLICATIONS_COLLECTION),
    (snapshot) => {
      const apps = snapshot.docs.map(doc => doc.data() as StationApplication);
      onUpdate(apps);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
      handleFirestoreError(error, OperationType.GET, APPLICATIONS_COLLECTION);
    }
  );
}

// User Wallet Balance Sync
const WALLET_COLLECTION = 'userWallets';

export async function saveWalletBalanceToDB(userId: string, balance: number): Promise<void> {
  const docPath = `${WALLET_COLLECTION}/${userId}`;
  try {
    await setDoc(doc(db, WALLET_COLLECTION, userId), {
      id: userId,
      balance,
      currency: 'INR',
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function fetchWalletBalanceFromDB(userId: string): Promise<number | null> {
  const docPath = `${WALLET_COLLECTION}/${userId}`;
  try {
    const snap = await getDocFromServer(doc(db, WALLET_COLLECTION, userId));
    if (snap.exists()) {
      return (snap.data() as any).balance;
    }
    return null;
  } catch (error) {
    // If not found or client offline, return null
    return null;
  }
}

// Charging Invoices Helpers
const INVOICES_COLLECTION = 'invoices';

export async function saveInvoiceToDB(invoice: ChargingInvoice): Promise<void> {
  const invoiceDocId = invoice.invoiceId;
  const docPath = `${INVOICES_COLLECTION}/${invoiceDocId}`;
  try {
    await setDoc(doc(db, INVOICES_COLLECTION, invoiceDocId), invoice);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath);
  }
}

export async function fetchInvoicesFromDB(): Promise<ChargingInvoice[]> {
  try {
    const snap = await getDocs(collection(db, INVOICES_COLLECTION));
    return snap.docs.map(d => d.data() as ChargingInvoice);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, INVOICES_COLLECTION);
  }
}
