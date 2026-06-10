import { useState } from 'react';
import api from '../api/axios'; // ✅ use the configured instance (base URL + auth interceptor)

export default function SearchBar({ onResults }) {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const { data } = await api.post('/images/search', { query });
            onResults(data.results);
        } catch (err) {
            const data = err.response?.data;
            const errorMsg = data?.error ? `${data.message}: ${data.error}` : (data?.message || 'Search failed. Please try again.');
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-end">
            <form onSubmit={handleSearch} className="flex items-center border border-slate-600 rounded-lg overflow-hidden bg-slate-800 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all shadow-sm">
                <input
                    className="bg-transparent text-white px-4 py-2 outline-none w-64 md:w-80 placeholder-slate-400 text-sm"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search your images... e.g. "car"'
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 transition-colors disabled:opacity-50 text-sm font-medium border-l border-slate-600"
                >
                    {loading ? 'Searching...' : '🔍 Search'}
                </button>
            </form>
            {error && <p className="text-red-400 text-sm mt-2 text-right">{error}</p>}
        </div>
    );
}
