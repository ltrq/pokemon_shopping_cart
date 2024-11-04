import { useState, useEffect } from 'react';

const useFetchAPIObject = (index) => {
    const [pokemonObject, setPokemonObject] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`, { mode: 'cors' });
                if (!response.ok) {
                    throw new Error('Server error: ' + response.status);
                }
                const data = await response.json();
                setPokemonObject(data);
                setError(null);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (index) {
            fetchData();
        }
    }, [index]);

    return { pokemonObject, error, loading };
};

export default useFetchAPIObject;
