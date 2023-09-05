"use client"
import React, { useEffect, useState } from 'react'
import Input from './Input'
import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debounceValue = useDebounce<string>(value, 500);
  
  useEffect(() => {
     // Prepare the query
     let searchParams = new URLSearchParams(window.location.search);
     searchParams.set("title", debounceValue);
     const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
     router.push(newPathname);

  }, [debounceValue, router])

  return (
    <div className="px-6">
       <Input
          placeholder="What do you want to listen to?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
    </div>
  )
}

export default SearchInput
