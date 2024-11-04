import { useState, useEffect } from 'react';
import catchRateToPrice from './CatchRatetoPrice';
import useFetchAPIObject from './FetchPokemonAPI';
import pokeball from './assets/pokeball_loading.png';

const isBabyPrice = 1000;
const isStarterMultiplier = 3;
const isUltraBeastMultiplier = 1500;
const isLegendaryMultiplier = 2000;
const isMythicalMultiplier = 5000;

function mapRange(value, inMin = 100, inMax = 1530, outMin = 0.1, outMax = 2.5) {
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

function roundToNearestFive(value) {
    return Math.round(value / 5) * 5;
}

const useFetchAPIPokemonContent = (index) => {
    const [pokemonContent, setPokemonContent] = useState(null);
    const [ContentError, setContentError] = useState(null);
    const [ContentLoading, setContentLoading] = useState(true);
    const { pokemonObject, error, loading } = useFetchAPIObject(index);

    const ultraBeastList = [
        793, 794, 795, 796, 797, 798, 799, 800, 
        803, 804, 805, 806
    ];

    const starterPokemonPokedexNumbers = [
        1,   // Bulbasaur
        4,   // Charmander
        7,   // Squirtle
        152, // Chikorita
        155, // Cyndaquil
        158, // Totodile
        252, // Treecko
        255, // Torchic
        258, // Mudkip
        387, // Turtwig
        390, // Chimchar
        393, // Piplup
        495, // Snivy
        498, // Tepig
        501, // Oshawott
        650, // Chespin
        653, // Fennekin
        656, // Froakie
        722, // Rowlet
        725, // Litten
        728, // Popplio
        810, // Grookey
        813, // Scorbunny
        816, // Sobble
        906, // Sprigatito
        909, // Fuecoco
        912  // Quaxly
    ];

    const extendedStarterPokemonPokedexNumbers = starterPokemonPokedexNumbers.flatMap(num => [num, num + 1, num + 2]);

    useEffect(() => {
        const fetchData = async () => {
            setContentLoading(true);
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${index}/`, { mode: 'cors' });
                if (!response.ok) {
                    throw new Error('Server error: ' + response.status);
                }
                const data = await response.json();
                setPokemonContent(data);
                setContentError(null);
            } catch (error) {
                setContentError(error);
            } finally {
                setContentLoading(false);
            }
        };

        if (index) {
            fetchData();
        }
    }, [index]);

    if (loading) {
        return <div><img src={pokeball} alt="Loading" style={{ width: '200px', height: '200px' }} /></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const pokemon_BaseStat = pokemonObject?.stats?.map(stat => stat.base_stat).reduce((acc, stat) => acc + stat, 0);

    const pokemon_CaptureRate = pokemonContent?.capture_rate;
    const ContentFlavorText = pokemonContent?.flavor_text_entries
    .find(entry => entry.language.name === "en")?.flavor_text || "No flavor text available.";
    const pokemon_isBaby = pokemonContent?.is_baby;
    const pokemon_isLegendary = pokemonContent?.is_legendary;
    const pokemon_isMythical = pokemonContent?.is_mythical;

    function isPokemonStarter (index){
        return extendedStarterPokemonPokedexNumbers.includes(index);
    };

    function isPokemonUltraBeast (index){
        return ultraBeastList.includes(index);
    }

    const pokemon_isStarter = isPokemonStarter(index);
    const pokemon_isUltraBeast = isPokemonUltraBeast(index);

    const pricefromCatchRate = catchRateToPrice(pokemon_CaptureRate);
    const pricefromBaby = pokemon_isBaby ? isBabyPrice : 0;
    const pricefromLegendary = pokemon_isLegendary ? isLegendaryMultiplier : 1;
    const pricefromMythical = pokemon_isMythical ? isMythicalMultiplier : 1;
    const pricefromStarter = pokemon_isStarter? isStarterMultiplier : 1;
    const pricefromUltraBeast = pokemon_isUltraBeast? isUltraBeastMultiplier : 1;

    const calculatedPrice = pricefromCatchRate * pricefromLegendary * pricefromMythical * pricefromStarter * pricefromUltraBeast * mapRange(pokemon_BaseStat) + pricefromBaby;

    // Apply the rounding and minimum check
    const finalPrice = Math.max(10, roundToNearestFive(calculatedPrice));

    // const ContentPrice = finalPrice.toLocaleString("en-US", {
    //     style: "currency",
    //     currency: "USD",
    //     minimumFractionDigits: 0,
    //     maximumFractionDigits: 0,
    // });

    const ContentPrice = finalPrice;

    return { ContentPrice, ContentFlavorText, pokemon_isBaby, pokemon_isLegendary, pokemon_isMythical, pokemon_isStarter, pokemon_isUltraBeast, ContentError, ContentLoading };
};

export default useFetchAPIPokemonContent;
