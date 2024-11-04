function FilterBar({
    PrimaryType, 
    onPrimaryTypeChange, 
    SecondaryType, 
    onSecondaryTypeChange, 
    sortOrder, 
    onSortChange, 
    searchQuery, 
    onSearchChange, 
    selectedGeneration, 
    onGenerationChange 
}) {
    // Options for Primary Pokémon Types
    const PrimaryTypeOptions = [
        { display: 'All Types', value: 'all types' },
        { display: 'Normal',    value: 'normal' },
        { display: 'Fire',      value: 'fire' },
        { display: 'Water',     value: 'water' },
        { display: 'Electric',  value: 'electric' },
        { display: 'Grass',     value: 'grass' },
        { display: 'Ice',       value: 'ice' },
        { display: 'Fighting',  value: 'fighting' },
        { display: 'Poison',    value: 'poison' },
        { display: 'Ground',    value: 'ground' },
        { display: 'Flying',    value: 'flying' },
        { display: 'Psychic',   value: 'psychic' },
        { display: 'Bug',       value: 'bug' },
        { display: 'Rock',      value: 'rock' },
        { display: 'Ghost',     value: 'ghost' },
        { display: 'Dragon',    value: 'dragon' },
        { display: 'Dark',      value: 'dark' },
        { display: 'Steel',     value: 'steel' },
        { display: 'Fairy',     value: 'fairy' },
    ];

    // Options for Secondary Pokémon Types
    const SecondaryTypeOptions = [
        { display: 'None',      value: 'none' },
        { display: 'All Types', value: 'all types' },
        { display: 'Normal',    value: 'normal' },
        { display: 'Fire',      value: 'fire' },
        { display: 'Water',     value: 'water' },
        { display: 'Electric',  value: 'electric' },
        { display: 'Grass',     value: 'grass' },
        { display: 'Ice',       value: 'ice' },
        { display: 'Fighting',  value: 'fighting' },
        { display: 'Poison',    value: 'poison' },
        { display: 'Ground',    value: 'ground' },
        { display: 'Flying',    value: 'flying' },
        { display: 'Psychic',   value: 'psychic' },
        { display: 'Bug',       value: 'bug' },
        { display: 'Rock',      value: 'rock' },
        { display: 'Ghost',     value: 'ghost' },
        { display: 'Dragon',    value: 'dragon' },
        { display: 'Dark',      value: 'dark' },
        { display: 'Steel',     value: 'steel' },
        { display: 'Fairy',     value: 'fairy' },
    ];

    // Options for Pokémon Generations
    const generationOptions = [
        { display: 'All Pokémons',          value: 'generation 0' },
        { display: 'Generation 1: Kanto',   value: 'generation 1' },
        { display: 'Generation 2: Johto',   value: 'generation 2' },
        { display: 'Generation 3: Hoenn',   value: 'generation 3' },
        { display: 'Generation 4: Sinnoh',  value: 'generation 4' },
        { display: 'Generation 5: Unova',   value: 'generation 5' },
        { display: 'Generation 6: Kalos',   value: 'generation 6' },
        { display: 'Generation 7: Alola',   value: 'generation 7' },
        { display: 'Generation 8: Galar',   value: 'generation 8' },
        { display: 'Generation 9: Paldea',  value: 'generation 9' },
    ];

    return (
        <div className="filter-bar">
            {/* Search Input */}
            <div className='filter-bar-row'>
                <div className="filter-option">
                    <label>Search</label>
                    <input
                        type="text"
                        placeholder=" Search by name or id"
                        value={searchQuery} // Bind search query
                        onChange={(e) => onSearchChange(e.target.value)} // Handle input change
                    />
                </div>
            </div>

            {/* Type Filters */}
            <div className='filter-bar-row filter-type'>
                <div className="filter-option type-filter">
                    <label>Primary Type</label>
                    <select
                        value={PrimaryType}
                        onChange={(e) => onPrimaryTypeChange(e.target.value.toLowerCase())}
                    >
                        {PrimaryTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.display}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter-option type-filter">
                    <label>Secondary Type</label>
                    <select
                        value={SecondaryType}
                        onChange={(e) => onSecondaryTypeChange(e.target.value.toLowerCase())}
                    >
                        {SecondaryTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.display}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Generation Filter */}
            <div className='filter-bar-row'>
                <div className="filter-option">
                    <label>Generation</label>
                    <select value={selectedGeneration} onChange={(e) => onGenerationChange(e.target.value)}>
                        {generationOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.display}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Sort Order */}
            <div className='filter-bar-row'>
                <div className="filter-option">
                    <label>Sort by</label>
                    <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
                        <option value="Pokédex Number: Increasing">Pokédex Number: Increasing</option>
                        <option value="Pokédex Number: Decreasing">Pokédex Number: Decreasing</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default FilterBar;
