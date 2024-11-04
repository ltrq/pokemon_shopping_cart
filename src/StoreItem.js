import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import NavigationBar from './NavigationBar';
import useFetchAPIObject from './FetchPokemonAPI';
import useFetchAPIPokemonContent from './FetchPokemonContentAPI';
import bug from './assets/Type_Bug.png';
import dark from './assets/Type_Dark.png';
import dragon from './assets/Type_Dragon.png';
import electric from './assets/Type_Electric.png';
import fairy from './assets/Type_Fairy.png';
import fighting from './assets/Type_Fighting.png';
import fire from './assets/Type_Fire.png';
import flying from './assets/Type_Flying.png';
import ghost from './assets/Type_Ghost.png';
import grass from './assets/Type_Grass.png';
import ground from './assets/Type_Ground.png';
import ice from './assets/Type_Ice.png';
import normal from './assets/Type_Normal.png';
import poison from './assets/Type_Poison.png';
import rock from './assets/Type_Rock.png';
import steel from './assets/Type_Steel.png';
import water from './assets/Type_Water.png';
import psychic from './assets/Type_Psychic.png';
import shiny from './assets/Shiny.webp';
import nonshiny from './assets/Non-Shiny.png';
import pokeballCart1 from './assets/pokeball_Cart1.png';
import addtoCartIcon from './assets/addToCard_Icon.png';
import './StoreItem.css';
import PokemonTypeDescription from './PokemonTypeDescription';
import pokeball from './assets/pokeball_loading.png';
// import Cart from './Cart';
import { useCart } from './CartItems';

const StoreItem = () => {
    const { id } = useParams();

    const [isShiny, setisShiny] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const { handleAddToCart } = useCart();
    const [scale, setScale] = useState(1);
    const [alertVisible, setAlertVisible] = useState(false);

    const { pokemonObject, error, loading } = useFetchAPIObject(Number(id));
    const {
        ContentPrice,
        ContentFlavorText,
        pokemon_isBaby,
        pokemon_isLegendary,
        pokemon_isMythical,
        pokemon_isStarter,
        pokemon_isUltraBeast,
        ContentError,
        ContentLoading
    } = useFetchAPIPokemonContent(Number(id));

    if (loading) {
        return (
            <div>
                <NavigationBar />
                <img src={pokeball} alt="Loading" style={{ width: '200px', height: '200px' }} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!pokemonObject) {
        return <div>Pokémon not found</div>;
    }

    if (ContentError) {
        return <div>Error: {ContentError.message}</div>;
    }

    if (ContentLoading) {
        return (
            <div>
                <NavigationBar />
                <div style={{ marginTop: '500px', display: 'flex', justifyContent: 'center' }}>
                    <img src={pokeball} alt="Loading" style={{ width: '500px', height: '500px' }} />
                </div>
            </div>
        );
    }

    const pokemonTypes = pokemonObject.types;

    const typetoIcon = (type) => {
        switch (type) {
            case 'bug': return bug;
            case 'dark': return dark;
            case 'dragon': return dragon;
            case 'electric': return electric;
            case 'fairy': return fairy;
            case 'fighting': return fighting;
            case 'fire': return fire;
            case 'flying': return flying;
            case 'ghost': return ghost;
            case 'grass': return grass;
            case 'ground': return ground;
            case 'ice': return ice;
            case 'normal': return normal;
            case 'poison': return poison;
            case 'rock': return rock;
            case 'steel': return steel;
            case 'water': return water;
            case 'psychic': return psychic;
            default: return null;
        }
    };

    const EditedContentFlavorText = ContentFlavorText ? ContentFlavorText.replace(/[\f\n]/g, ' ') : '';
    const extraText =
        " This Pokémon is admired by trainers around the world. It adapts to its surroundings with ease, using its special skills to overcome obstacles and defend itself against rivals. Its strength and agility make it a powerful ally in battles, while its rare characteristics spark curiosity and admiration. With an intriguing blend of power and charm, this Pokémon embodies the spirit of adventure, thriving in both wild and friendly environments.";

    const pokemonCries = pokemonObject.cries.latest;

    const playPokemonCry = () => {
        const audio = new Audio(pokemonCries);
        audio.play();
    };

    const handleImageClick = () => {
        playPokemonCry();
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
        }, 500);
    };

    function toggleShiny() {
        setisShiny(!isShiny);
    }

    const isShinyPrice = isShiny && typeof ContentPrice === 'number' ? ContentPrice * 264 : ContentPrice;

    const unformattedPrice = isShinyPrice ?? 0;
    const finalPrice = unformattedPrice.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    
    const handleClickAddtoCart = () => {
        const Cartitem = {
            id: id,
            name: pokemonObject.name,
            image: isShiny ? pokemonObject.sprites.front_shiny : pokemonObject.sprites.front_default,
            isShiny: isShiny,
            price: finalPrice,
            unformattedPrice: unformattedPrice,
            identifier: `${id}_${pokemonObject.name}_${isShiny ? 'shiny' : 'non-shiny'}`,
        };

        handleAddToCart(Cartitem);
        setAlertVisible(true);
        setScale(0.9); // Shrink the div

        // Automatically dismiss the alert after 3 seconds
        setTimeout(() => {
            setAlertVisible(false);
            setScale(1); // Reset scale after the alert disappears
        }, 3000);
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className="shop-item">
            <NavigationBar />
            <div className="item-container">
                <h1 className="item-title">{pokemonObject.name.toUpperCase()}</h1>
                <div className="item-image-container">
                    <img
                        src={
                            isShiny
                                ? pokemonObject.sprites.other["official-artwork"].front_shiny
                                : pokemonObject.sprites.other["official-artwork"].front_default
                        }
                        alt={`${pokemonObject.name} sprite`}
                        style={{ transform: isShiny ? 'scaleX(-1)' : 'none' }}
                        className={`item-image ${isAnimating ? (isShiny ? 'rotate-translate-shiny' : 'rotate-translate-non-shiny') : ''}`}
                        onClick={handleImageClick}
                    />
                    <p className="item-id">National Pokédex Number: {id}</p>
                    <div className="item-price-and-checkout" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>,
                        <div className="item-price-container" style={{ width: '1000px' }}>
                            <div className="isShiny" onClick={toggleShiny}>
                                {isShiny ? (
                                    <img src={nonshiny} alt="Non Shiny" style={{ width: '60px', height: '60px', margin: '0 5px' }} className="shinyIcon" />
                                ) : (
                                    <img src={shiny} alt="Shiny" style={{ width: '60px', height: '60px', margin: '0 5px' }} className="shinyIcon" />
                                )}
                            </div>
                            <div className="item-price"><strong>Price:</strong> {finalPrice}</div>
                        </div>
                        <div className='item-checkout' 
                            style={{ width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px' }}>
                             {alertVisible && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#ff3636',
                    padding: '10px',
                    marginTop: '130px',
                    marginRight: '230px',
                    border: '2px solid #ff0000',
                    borderRadius: '5px',
                    zIndex: 1000,
                    width: '200px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: 'white',
                }}>
                    Added {isShiny ? 'Shiny' : ''} {capitalizeFirstLetter(pokemonObject.name)} to cart!
                </div>
            )}
                            <div className='addToCart' style={{
                                display: 'flex',
                                width: '500px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: '100px',
                                backgroundImage: `url(${addtoCartIcon})`,
                                backgroundSize: '105%', // Adjust to your preference
                                 backgroundPosition: 'center',
                                 backgroundRepeat: 'no-repeat',
                                 transform: `scale(${scale})`, // Apply scaling based on state
                                 transition: 'transform 0.2s ease-in-out',
                            }}
                            onClick={handleClickAddtoCart}
                            >
                                <img
                                    src={pokeballCart1}
                                    alt="Checkout"
                                    style={{ width: '30%', height: 'auto', marginLeft: '-21px', marginTop:'9px' }}
                                    className="checkoutIcon"
                                />
                                <div style={{fontSize: '18px', marginLeft: '6px', color: 'white', fontWeight: 'bold'}}> Add to Cart</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-details">
                    <div className="item-type">
                        {pokemonTypes.map((type, index) => (
                            <img
                                key={index}
                                src={typetoIcon(type.type.name)}
                                alt={`${type.type.name} type icon`}
                                className="type-icon"
                            />
                        ))}
                    </div>

                    <p className="item-flavor-text"><strong>Description:</strong> {EditedContentFlavorText}{extraText}</p>
                    {pokemonTypes.map((type, index) => (
                        <div key={index} style={{ fontSize: '20px', marginLeft: '30px', marginTop: '10px' }}>
                            <PokemonTypeDescription type={type.type.name} />
                        </div>
                    ))}
                </div>

                <div className="item-attributes">
                    <p><strong>Attributes:</strong></p>
                    <ul>
                        <li>Baby: {pokemon_isBaby ? 'Yes' : 'No'}</li>
                        <li>Legendary: {pokemon_isLegendary ? 'Yes' : 'No'}</li>
                        <li>Mythical: {pokemon_isMythical ? 'Yes' : 'No'}</li>
                        <li>Starter: {pokemon_isStarter ? 'Yes' : 'No'}</li>
                        <li>Ultra Beast: {pokemon_isUltraBeast ? 'Yes' : 'No'}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StoreItem;
