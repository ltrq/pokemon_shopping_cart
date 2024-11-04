import React, { useState, useEffect } from 'react';
import NavigationBar from "./NavigationBar";
import FilterBar from "./FilterBar";
import Sprite from './Sprite';
import "./Store.css";

// Define ranges for each Pokémon generation
const generationRanges = {
    'generation 0': { start: 1, end: 1025 },
    'generation 1': { start: 1, end: 151 },
    'generation 2': { start: 152, end: 251 },
    'generation 3': { start: 252, end: 386 },
    'generation 4': { start: 387, end: 493 },
    'generation 5': { start: 494, end: 649 },
    'generation 6': { start: 650, end: 721 },
    'generation 7': { start: 722, end: 809 },
    'generation 8': { start: 810, end: 905 },
    'generation 9': { start: 906, end: 1025 },
};

function Store() {
    const [selectedPrimaryType, setSelectedPrimaryType] = useState("all types");
    const [selectedSecondaryType, setSelectedSecondaryType] = useState("all types");
    const [selectedSortOrder, setSelectedSortOrder] = useState("Pokédex Number: Increasing");
    const [selectedGeneration, setSelectedGeneration] = useState("generation 1"); // Default to Generation 1
    const [searchQuery, setSearchQuery] = useState("");
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredAndSortedPokemon, setFilteredAndSortedPokemon] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(30);
    const [totalPages, setTotalPages] = useState(0);
    const [numberofResults, setNumberofResults] = useState(0);

    // Fetch Pokémon data when the selected generation changes
    useEffect(() => {
        const { start, end } = generationRanges[selectedGeneration];

        const fetchPokemonData = async () => {
            try {
                const dataPromises = Array.from({ length: end - start + 1 }, (_, i) =>
                    fetch(`https://pokeapi.co/api/v2/pokemon/${start + i}`).then(response => {
                        if (!response.ok) {
                            throw new Error(`Error fetching Pokémon data: ${response.status}`);
                        }
                        return response.json();
                    })
                );
                const data = await Promise.all(dataPromises);
                setPokemonData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPokemonData();
    }, [selectedGeneration]);

    // Update filtered and sorted Pokémon list
    useEffect(() => {
        const getFilteredAndSortedPokemon = () => {
            let filteredList = pokemonData;

            if (selectedPrimaryType !== "all types") {
                filteredList = filteredList.filter(pokemon =>
                    pokemon.types[0].type.name === selectedPrimaryType
                );
            }

            if (selectedSecondaryType === "none") {
                filteredList = filteredList.filter(pokemon => !pokemon.types[1]);
            } else if (selectedSecondaryType !== "all types") {
                filteredList = filteredList.filter(pokemon =>
                    pokemon.types[1]?.type.name === selectedSecondaryType
                );
            }

            if (selectedSortOrder === "Pokédex Number: Increasing") {
                filteredList.sort((a, b) => a.id - b.id);
            } else if (selectedSortOrder === "Pokédex Number: Decreasing") {
                filteredList.sort((a, b) => b.id - a.id);
            }

            if (searchQuery) {
                if (!isNaN(searchQuery)) {
                    filteredList = filteredList.filter(pokemon =>
                        pokemon.id === Number(searchQuery)
                    );
                } else {
                    filteredList = filteredList.filter(pokemon =>
                        pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
                    );
                }
            }

            return filteredList;
        };

        const newFilteredAndSortedPokemon = getFilteredAndSortedPokemon();

        // Pagination for generation 0
        if (selectedGeneration === "generation 0") {
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            setFilteredAndSortedPokemon(newFilteredAndSortedPokemon.slice(indexOfFirstItem, indexOfLastItem));
            
        } else {
            setFilteredAndSortedPokemon(newFilteredAndSortedPokemon);
        }

        setTotalPages(Math.ceil(newFilteredAndSortedPokemon.length / itemsPerPage));
        setNumberofResults(newFilteredAndSortedPokemon.length);
    }, [pokemonData, selectedPrimaryType, selectedSecondaryType, selectedSortOrder, searchQuery, selectedGeneration, currentPage, itemsPerPage, totalPages, numberofResults]);

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div
            className="store-container"
            style={{
                overflowY: 'scroll',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}
        >
            <style>
                {`
        .store-container::-webkit-scrollbar {
            display: none; /* Hide scrollbar in Chrome/Safari */
        }
    `}
            </style>
            <NavigationBar />

            {selectedGeneration !== "generation 0" &&
                <div className="content">
                    <FilterBar
                        PrimaryType={selectedPrimaryType}
                        onPrimaryTypeChange={setSelectedPrimaryType}
                        SecondaryType={selectedSecondaryType}
                        onSecondaryTypeChange={setSelectedSecondaryType}
                        sortOrder={selectedSortOrder}
                        onSortChange={setSelectedSortOrder}
                        selectedGeneration={selectedGeneration}
                        onGenerationChange={setSelectedGeneration}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                    <div className="main-content">
                        {filteredAndSortedPokemon.map(pokemon => (
                            <div className="individual-content" key={pokemon.id}>
                                <Sprite index={pokemon.id} />
                            </div>
                        ))}
                    </div>
                </div>}

            {selectedGeneration === "generation 0" && (
                <div className="content">
                    <div style={{ width: '620px', display: 'flex', flexDirection: 'column' }}>
                        <FilterBar
                            PrimaryType={selectedPrimaryType}
                            onPrimaryTypeChange={setSelectedPrimaryType}
                            SecondaryType={selectedSecondaryType}
                            onSecondaryTypeChange={setSelectedSecondaryType}
                            sortOrder={selectedSortOrder}
                            onSortChange={setSelectedSortOrder}
                            selectedGeneration={selectedGeneration}
                            onGenerationChange={setSelectedGeneration}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                        />
                        <div style={{marginLeft:'235px', marginTop:'500px', fontSize:'20px'}} >Results:<b>{numberofResults}</b></div>
                        <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '-35px', marginLeft: '-30px' }}>
                            
                            <nav>
                                <div className="pagination">
                                    <button onClick={() => paginate(1)} disabled={currentPage === 1}>&lt;&lt;</button>
                                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
                                    {currentPage === totalPages && (totalPages - 2) > 1 && (
                                        <button onClick={() => paginate(totalPages - 2)}>{totalPages - 2}</button>
                                    )}
                                    {currentPage > 1 && (
                                        <button onClick={() => paginate(currentPage - 1)}>{currentPage - 1}</button>
                                    )}
                                    <button disabled>{(filteredAndSortedPokemon.length>0) ? currentPage:0}</button>
                                    {currentPage < totalPages && (
                                        <button onClick={() => paginate(currentPage + 1)}>{currentPage + 1}</button>
                                    )}
                                    {currentPage === 1 && totalPages >= 3 && (
                                        <button onClick={() => paginate(3)}>3</button>
                                    )}
                                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>&gt;</button>
                                    <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</button>
                                </div>
                            </nav>
                        </div>
                            <div style={{marginLeft:'235px', marginTop:'20px', fontSize:'20px'}}>
                                {(filteredAndSortedPokemon.length>0) ?`Page ${currentPage} of ${totalPages}`:"No Results"}
                                </div>
                    </div>
                    <div className="main-content" style={{ marginLeft: '20px', marginTop: '-40px' }}>
                        {filteredAndSortedPokemon.map(pokemon => (
                            <div className="individual-content" key={pokemon.id}>
                                <Sprite index={pokemon.id} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div >
    );
}

export default Store;
