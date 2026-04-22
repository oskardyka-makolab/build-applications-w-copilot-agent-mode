import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        console.log('Workouts endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('Workouts fetched data:', data);
        const normalized = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
        setItems(normalized);
      } catch (err) {
        console.error('Workouts fetch error:', err);
        setError('Could not load workouts.');
      } finally {
        setLoading(false);
      }
    };
    loadWorkouts();
  }, []);

  return (
    <div className="card section-card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>💪 Workouts</span>
        <span className="badge bg-light text-dark">{items.length} workouts</span>
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
                  <th>Name</th>
                  <th>Description</th>
                  <th>Suggested For</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={4} className="text-center text-muted py-4">No workouts found.</td></tr>
                ) : items.map((item, index) => (
                  <tr key={item.id ?? index}>
                    <td>{index + 1}</td>
                    <td><strong>{item.name ?? '—'}</strong></td>
                    <td>{item.description ?? <span className="text-muted">—</span>}</td>
                    <td>
                      {Array.isArray(item.suggested_for) && item.suggested_for.length > 0
                        ? item.suggested_for.map((t, i) => (
                            <span key={i} className="badge bg-secondary me-1">{t.name ?? t}</span>
                          ))
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

export default Workouts;
