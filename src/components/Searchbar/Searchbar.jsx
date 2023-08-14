import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit}) => {
  const [search, setSearch] = useState('');

  const searchResult = event => {
    setSearch(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  
  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={searchResult}
        />
      </SearchForm>
    </SearchbarContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};