import React from 'react';

const PokemonTypeDescription = ({ type }) => {
    const typeDescriptions = {
        normal: "Normal-type Pokémon are versatile and adaptable, often showcasing a variety of abilities. They are usually strong against Ghost types but have no weaknesses.",
        fire: "Fire-type Pokémon are known for their intense heat and flames. They excel in attack power and are super effective against Grass, Bug, Ice, and Steel types.",
        water: "Water-type Pokémon are often associated with the oceans and rivers. They are agile and fluid in battle, strong against Fire, Ground, and Rock types.",
        electric: "Electric-type Pokémon harness the power of electricity. They are quick and energetic, dealing significant damage to Water and Flying types.",
        grass: "Grass-type Pokémon are connected to nature and plant life. They can heal and support their allies, while being effective against Water, Rock, and Ground types.",
        ice: "Ice-type Pokémon are known for their chilling abilities. They excel at slowing down opponents and are particularly effective against Grass, Ground, Flying, and Dragon types.",
        fighting: "Fighting-type Pokémon are strong and determined. They excel in close combat and are powerful against Normal, Rock, Steel, Ice, and Dark types.",
        poison: "Poison-type Pokémon use toxins and venom to weaken their foes. They are effective against Grass and Fairy types, but weak to Ground and Psychic types.",
        ground: "Ground-type Pokémon are sturdy and grounded, often possessing powerful physical attacks. They are strong against Fire, Electric, Poison, Rock, and Steel types.",
        flying: "Flying-type Pokémon are agile and can soar through the skies. They have the upper hand against Grass, Fighting, and Bug types.",
        psychic: "Psychic-type Pokémon possess extraordinary mental abilities. They can manipulate their surroundings and are strong against Fighting and Poison types.",
        bug: "Bug-type Pokémon are quick and numerous. They excel at overwhelming opponents with sheer numbers and are effective against Grass, Psychic, and Dark types.",
        rock: "Rock-type Pokémon are tough and resilient, often showcasing strong defensive capabilities. They are effective against Fire, Flying, Ice, and Bug types.",
        ghost: "Ghost-type Pokémon are mysterious and elusive. They are known for their trickery and are effective against Psychic and Ghost types.",
        dragon: "Dragon-type Pokémon are powerful and majestic, often possessing high stats and versatility. They are strong against other Dragon types, but weak to Ice, Fairy, and Dragon attacks.",
        dark: "Dark-type Pokémon are cunning and stealthy. They excel at ambushing opponents and are effective against Psychic and Ghost types.",
        steel: "Steel-type Pokémon are incredibly durable and resistant to many types. They are strong against Fairy, Ice, and Rock types.",
        fairy: "Fairy-type Pokémon are whimsical and enchanting. They are known for their healing abilities and are effective against Dragon, Dark, and Fighting types."
    };

    // Get the description for the provided type, or a default message if the type doesn't exist
    const description = typeDescriptions[type] || "Type not found.";

    return <p>• {description}</p>;
};

export default PokemonTypeDescription;
