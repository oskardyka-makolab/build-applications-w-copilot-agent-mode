import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        console.log('Users endpoint:', endpoint);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log('Users fetched data:', data);
        const normalized = Array.isArray(data) ? data : (Array.isArray(data?.results) ? data.results : []);
        setItems(normalized);
      } catch (err) {
        console.error('Users fetch error:', err);
        setError('Could not load users.');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="card section-card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>👤 Users</span>
        <span className="badge bg-light text-dark">{items.length} users</span>
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
                  <th>Email</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan={4} className="text-center text-muted py-4">No users found.</td></tr>
                ) : items.map((item, index) => (
                  <tr key={item.id ?? index}>
                    <td>{index + 1}</td>
                    <td><strong>{item.name ?? item.username ?? '—'}</strong></td>
                    <td><a href={`mailto:${item.email}`} className="text-decoration-none">{item.email ?? '—'}</a></td>
                    <td>{item.team?.name ?? item.team ?? <span className="text-muted">—</span>}</td>
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

export default Users;
