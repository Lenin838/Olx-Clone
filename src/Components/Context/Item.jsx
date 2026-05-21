import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";

const Context = createContext(null);
export const ItemsContext = () => useContext(Context) 

export const ItemsContextProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        
        const productsCollection = collection(fireStore, 'products');
        
        const unsubscribe = onSnapshot(productsCollection, (productSnapshot) => {
            const productsList = productSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setItems(productsList);
            setLoading(false);
        }, (err) => {
            console.error('Error fetching products:', err);
            setError(err.message || 'Failed to load products');
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Context.Provider value={{ items, setItems, loading, error }}>
            {children}
        </Context.Provider>
    )
}