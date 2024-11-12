import React from 'react';
import Counter from './components/Counter';

function App() {
  return (
    <div className="App">
      <header className="h-screen flex items-center justify-center">
        <Counter
          prop={0}
        />
      </header>
    </div>
  );
}

export default App;
