import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const NAV_ITEMS = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
];

function NavBar() {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg octofit-nav px-3 py-2">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="mainNav">
        <ul className="navbar-nav d-flex flex-row flex-wrap gap-2">
          {NAV_ITEMS.map(({ path, label }) => (
            <li className="nav-item" key={path}>
              <Link
                className={`nav-link${location.pathname === path ? ' active' : ''}`}
                to={path}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <>
      <header className="octofit-header">
        <h1>🏋️ OctoFit Tracker</h1>
        <p className="subtitle">Your team fitness companion</p>
        <NavBar />
      </header>

      <main className="container pb-5">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
