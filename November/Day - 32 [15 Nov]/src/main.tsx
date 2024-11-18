import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import HomePage from './HomePage';
import IndividualItem from './IndividualItem';
import { MediaProvider } from './context/MediaContext';
import { UserListsProvider } from './context/UserlistContext';
import Lists from './Lists';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MediaProvider>
      <UserListsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/item/:id" element={<IndividualItem />} />
            <Route path="/Lists" element={<Lists />} />
          </Routes>
        </BrowserRouter>
      </UserListsProvider>
    </MediaProvider>
  </StrictMode>
);
