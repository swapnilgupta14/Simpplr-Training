import React, { useState, useRef, useEffect } from 'react';
import { searchMedia } from '../api/api';
import { SearchResult } from '../types';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    onViewAllResults?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onViewAllResults }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<SearchResult[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleSearch = async (searchQuery: string): Promise<void> => {
        if (!searchQuery.trim()) {
            setResults(null);
            return;
        }

        setLoading(true);
        try {
            const data = await searchMedia(searchQuery);
            setResults(data.slice(0, 10));
            setIsOpen(true);
        } catch (err) {
            setResults(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSearch(query);
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                searchRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const SearchIcon: React.FC = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-500"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );

    const ProfileIcon: React.FC = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
        >
            <circle cx="12" cy="8" r="5" />
            <path d="M20 21a8 8 0 1 0-16 0" />
        </svg>
    );

    return (
        <header className="bg-black p-3">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <div className="flex-shrink-0">
                    <h1 className="text-white text-5xl font-semibold logo-text">MOVIE-APP</h1>
                </div>

                <div className="flex-1 max-w-2xl relative" ref={searchRef}>
                    <div className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                            placeholder="Search movies & shows..."
                            className="w-full bg-zinc-900 text-white px-4 py-2 pl-10 rounded-lg border border-zinc-600 focus:outline-none focus:border-cyan-700 transition-colors placeholder:text-zinc-400"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <SearchIcon />
                        </div>
                    </div>

                    {isOpen && (query.trim() || loading) && (
                        <div
                            ref={dropdownRef}
                            className="absolute z-50 mt-2 w-full bg-black border border-zinc-700 rounded-lg shadow-lg overflow-hidden"
                        >
                            {loading ? (
                                <div className="p-4 text-zinc-400 text-center">Loading...</div>
                            ) : results && results.length > 0 ? (
                                <>
                                    <div className="max-h-[400px] overflow-y-auto">
                                        {results.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center gap-3 p-3 hover:bg-zinc-700 cursor-pointer transition-colors"
                                                onClick={() => navigate(`/item/${item.id}`)}
                                            >
                                                <img
                                                    src={
                                                        item.poster_path
                                                            ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                                                            : '/skeleton.jpg'
                                                    }
                                                    alt={item.title || item.name}
                                                    className="w-10 h-14 object-cover rounded"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-white font-medium truncate">
                                                        {item.title || item.name}
                                                    </h3>
                                                    <p className="text-sm text-zinc-400">
                                                        {item.media_type.toUpperCase()} • IMDb: {item.vote_average || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => {
                                            onViewAllResults?.(query);
                                            setIsOpen(false);
                                        }}
                                        className="w-full p-3 text-center text-orange-400 hover:bg-zinc-700 transition-colors border-t border-zinc-700"
                                    >
                                        View all results
                                    </button>
                                </>
                            ) : (
                                <div className="p-4 text-zinc-400 text-center">No results found</div>
                            )}
                        </div>
                    )}
                </div>

                <button className="p-2 bg-zinc-950 hover:bg-zinc-800 rounded-full transition-colors"
                    onClick={() => navigate("./Lists")}
                >
                    <ProfileIcon />
                </button>
            </div>
        </header>
    );
};

export default Header;