import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import Home from './modules/Home';
import Dashboard from './components/Dashboard';
import Stratergies from './components/Stratergies';
import Subscriptions from './components/Subscriptions';
import Reports from './components/Reports';
import Createstratergy from './components/Createstratergy';
import Tradersignal from './components/Tradersignal';
import Profile from './components/Profile';
import Planandpricing from './components/Planandpricing';
import Tutorials from './components/Tutorials';

import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import Brokers from './components/Brokers.jsx';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>

          {/* ================= AUTH ROUTES ================= */}
          <Route
            path="/auth/login"
            element={
                <Login />
            }
          />

          <Route
            path="/auth/signup"
            element={
                <Signup />
            }
          />

          {/* ================= USER ROUTES ================= */}
          <Route
            path="/"
            element={
                <Home />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="strategies" element={<Stratergies />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="reports" element={<Reports />} />
            <Route path="create-strategy" element={<Createstratergy />} />
            <Route path="trader-signal" element={<Tradersignal />} />
            <Route path="profile" element={<Profile />} />
            <Route path="plans" element={<Planandpricing />} />
            <Route path="tutorials" element={<Tutorials />} />
            <Route path="broker" element={<Brokers />} />
          </Route>

        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;