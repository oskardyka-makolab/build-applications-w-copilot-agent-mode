import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        console.log('Leaderboard endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('Leaderboard fetched data:', data);
        const normalized = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
        setItems(normalized);
      } catch (err) {
        console.error('Leaderboard fetch error:', err);
        setError('Could not load leaderboard data.');
      } finally {
        setLoading(false);
      }
    };
    loadLeaderboard();
  }, []);

  return (
    <div className="card section-card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>🏆 Leaderboard</span>
        <span className="badge bg-light text-dark">{items.length} teams</span>
      </div>
      <div className="card-body p-0">
        {error && <div className="alert alert-danger error-alert m-3">{error}</div>}
        {loading && <div className="text-center py-4"><div className="spinner-border text-danger" role="status"><span className="visually-hidden">Loading...</span></div></div>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={3} className="text-center text-muted py-4">No leaderboard data found.</td></tr>
                ) : items
                    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                    .map((item, index) => (
                  <tr key={item.id ?? index}>
                    <td>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </td>
                    <td>{item.team?.name ?? item.team ?? item.name ?? '—'}</td>
                    <td><span className="badge bg-success fs-6">{item.score ?? 0}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
