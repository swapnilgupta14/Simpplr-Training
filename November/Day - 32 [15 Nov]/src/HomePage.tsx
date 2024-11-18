import React from 'react';

// import SearchBar from './components/SearchBar';
import Trending from './components/Trending';
import UserLists from './components/UserLists';
import Upcoming from './components/Upcoming';
import Header from './components/Header';

const HomePage: React.FC = () => {
  return (

    <div>
      <Header />
      <Trending />
      <div className='flex gap-5 p-4'>
        <div className='w-2/3'><UserLists /></div>
        <div className='w-1/3'><Upcoming /></div>
      </div>
    </div>
  );
};

export default HomePage;
