import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Character from './components/Characters';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1 className="bg-black py-5 text-center text-white text-4xl font-bold">
          Rick And Morty Characters
        </h1>
        <Character />
      </div>
    </QueryClientProvider>
  );
};

export default App;