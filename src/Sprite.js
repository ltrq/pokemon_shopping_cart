import React from 'react';
import useFetchAPIObject from './FetchPokemonAPI';
import pokeball from './assets/pokeball_loading.png';
import { Link } from 'react-router-dom';

function Sprite({ index }) {
    const { pokemonObject, error, loading } = useFetchAPIObject(index);

    if (loading) return <img src={pokeball} alt="Loading" style={{ width: '200px', height: '200px' }} />;
    if (error) return <div>Error: {error.message}</div>;
    if (!pokemonObject) return <div>Pokémon not found</div>;

    return (
        <div className="Sprite">
            <Link to={`/store/${index}`}>
                <img
                    src={pokemonObject.sprites.front_default}
                    alt={`${pokemonObject.name} sprite`}
                    style={{ width: '230px', height: '230px', objectFit: 'contain' }}
                />
            </Link>
        </div>
    );
}

export default Sprite;
