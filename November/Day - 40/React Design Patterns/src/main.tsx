import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import App from './App';

import Render from './pages/Render';
import Hooks from './pages/Hooks';
import Container from './pages/Container';
import Compound from './pages/Compound';
import HOC from './pages/HOC';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/" element={<App />}></Route>
                <Route path="/Render" element={<Render />}></Route>
                <Route path="/Hooks" element={<Hooks />}></Route>
                <Route path="/Container" element={<Container />}></Route>
                <Route path="/HOC" element={<HOC />}></Route>
                <Route path="/Compound" element={<Compound />}></Route>

            </Routes>
        </BrowserRouter>
    </StrictMode>
);
