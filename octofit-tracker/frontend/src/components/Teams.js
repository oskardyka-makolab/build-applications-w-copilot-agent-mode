import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        console.log('Teams endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('Teams fetched data:', data);
        const normalized = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
        setItems(normalized);
      } catch (err) {
        console.error('Teams fetch error:', err);
        setError('Could not load teams.');
      } finally {
        setLoading(false);
      }
    };
    loadTeams();
  }, []);

  return (
    <div className="card section-card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>👥 Teams</span>
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
                  <th>#</th>
                  <th>Team Name</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={3} className="text-center text-muted py-4">No teams found.</td></tr>
                ) : items.map((item, index) => (
                  <tr key={item.id ?? index}>
                    <td>{index + 1}</td>
                    <td><strong>{item.name ?? '—'}</strong></td>
                    <td>
                      {Array.isArray(item.members) && item.members.length > 0
                        ? item.members.map(m => m.name ?? m).join(', ')
                        : <span className="text-muted">—</span>}
                    </td>
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

export default Teams;
