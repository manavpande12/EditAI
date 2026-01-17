import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export function useFirestoreDoc(collectionName, docId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoc = useCallback(async () => {
    if (!collectionName || !docId) return;

    setLoading(true);
    try {
      const ref = doc(firestore, collectionName, docId);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setData({ id: snap.id, ...snap.data() });
      } else {
        setData(null);
      }
    } catch (err) {
      console.error(`Error fetching ${collectionName}/${docId}:`, err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [collectionName, docId]);

  // fetch on mount or when params change
  useEffect(() => {
    fetchDoc();
  }, [fetchDoc]);

  return { data, loading, error, refetch: fetchDoc };
}
