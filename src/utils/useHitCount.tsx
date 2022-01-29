import { updateDoc, doc, increment } from 'firebase/firestore/lite';
import { db } from './firebase';
const useHitCount = (): { addHit: () => void; addCopy: () => void } => {
  const addHit = () => {
    const docRef = doc(db, 'data/analytics');
    updateDoc(docRef, {
      hits: increment(1),
    });
  };

  const addCopy = () => {
    const docRef = doc(db, 'data/analytics');
    updateDoc(docRef, {
      copies: increment(1),
    });
  };

  return { addHit, addCopy };
};

export default useHitCount;
