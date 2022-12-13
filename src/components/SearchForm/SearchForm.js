// import PropTypes from 'prop-types';
import {
  FormBlock,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './SearchForm.styled';

export const SearchForm = () => {
  return (
    <FormBlock>
      <SearchFormButton type="submit">
        <SearchFormButtonLabel>Search</SearchFormButtonLabel>
      </SearchFormButton>

      <SearchFormInput
        type="text"
        autocomplete="off"
        autofocus
        placeholder="Search images and photos"
      />
    </FormBlock>
  );
};
