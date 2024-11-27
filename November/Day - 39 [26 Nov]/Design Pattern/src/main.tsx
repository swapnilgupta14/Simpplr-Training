import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import Singleton from './pages/Singleton';

import ProxyDemo from './pages/Proxy';

import PrototypeDemo from './pages/Prototype';
import ObserverDemo from './pages/Observer';
import MediatorDemo from './pages/Mediator';

import StaticDynamic from './pages/StaticDynamic';
import Factory from './pages/Factory';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}></Route>
                <Route path="/Singleton" element={<Singleton />}></Route>
                <Route path="/Proxy" element={<ProxyDemo />}></Route>
                <Route path="/PrototypeDemo" element={<PrototypeDemo />}></Route>
                <Route path="/Observer" element={<ObserverDemo />}></Route>
                <Route path="/Mediator" element={<MediatorDemo />}></Route>
                <Route path="/StaticDynamic" element={<StaticDynamic />}></Route>
                <Route path="/Factory" element={<Factory />}></Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
