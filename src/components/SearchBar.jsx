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
        <div>
            <form onSubmit={handleSearch}>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search your images... e.g. "sunset at beach"'
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : '🔍 Search'}
                </button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
        </div>
    );
}
