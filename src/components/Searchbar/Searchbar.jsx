import { useState } from 'react';
import PropTypes from 'prop-types';
import searchCss from '..//Searchbar/Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleValueChange = e => {
    let value = e.target.value;
    setSearch(value.trim());
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    const newSearch = true;
    const pages = 1;
    onSubmit({ newSearch, search, pages });
    setSearch('');
  };

  return (
    <header className={searchCss.searchbar}>
      <form onSubmit={onSubmitHandler} className={searchCss.form}>
        <button type="submit" className={searchCss.button}>
          <span className={searchCss.button_label}>Search</span>
        </button>
        <input
          className={searchCss.input}
          name="value"
          value={search}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleValueChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
