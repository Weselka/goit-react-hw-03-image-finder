import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  SearchbarHeader,
  FormBlock,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  state = {
    imagesName: '',
  };

  handleChange = e => {
    this.setState({ imagesName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imagesName.trim() === '') {
      return toast.error('Add name');
      
    }
    this.props.onSubmit(this.state.imagesName);
    this.setState({ imagesName: '' });
  };

  render() {
    // const { name } = this.state;
    return (
      <SearchbarHeader>
        <FormBlock onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            // value={name}
            onChange={this.handleChange}
            name="imagesName"
            // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            // title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            // required
          />
        </FormBlock>
      </SearchbarHeader>
    );
  }
}
