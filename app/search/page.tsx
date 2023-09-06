import getSongsByTitle from '@/actions/getSongsByTitle';
import Header from '@/components/Header';
import SearchInput from '@/components/SearchInput';
import React from 'react'
import SearchContent from './components/SearchContent';

interface SearchProps {
   searchParams: {
      title: string;
   }
}
const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title);
  
  return (
    <>
        <Header>
           <h1 className="text-2xl font-semibold py-5">Search</h1>
        </Header>
        <SearchInput/>
        <SearchContent songs={songs}/>
    </>
  )
}

export default Search
