import { updateDoc, doc, increment } from 'firebase/firestore/lite';
import { db } from './firebase';
const useHitCount = (): { addHit: () => void } => {
  const addHit = () => {
    const docRef = doc(db, 'data/analytics');
    updateDoc(docRef, {
      hits: increment(1),
    });
  };

  return { addHit };
};

export default useHitCount;
