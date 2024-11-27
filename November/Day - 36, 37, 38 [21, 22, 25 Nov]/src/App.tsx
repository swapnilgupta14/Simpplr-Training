import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { restoreSession } from './redux/authSlice';

import Dashboard from './pages/Dashboard';
import Auth from './component/Auth';
import ProtectedRoute from './component/ProtectedRoute';

const App: React.FC = () => {
    useEffect(() => {
        store.dispatch(restoreSession());
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route element={<ProtectedRoute allowedRoles={["Admin", "Team Manager", "Team Member"]} />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="/" element={<Navigate to="/login" replace />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
