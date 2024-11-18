import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';

const SearchInput = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return <input type="text" value={query} onChange={handleChange} placeholder="Search..." />;
};

export default SearchInput;
