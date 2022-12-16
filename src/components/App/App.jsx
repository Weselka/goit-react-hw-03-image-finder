import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

import {
  Container,
  // Section,
  Searchbar,
  ImageGallery,
} from 'components';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '30883328-4550d73a5a5d91ad50d778095';
export class App extends Component {
  state = {
    // images: null,
    imagesName: '',
    // loading: false,
  };

  componentDidMount() {
    // this.setState({ loading: true });
    // fetch(
    //   'https://pixabay.com/api/?key=30883328-4550d73a5a5d91ad50d778095&q=${car}&page=1'
    // )
    //   .then(res => res.json())
    //   .then(images => this.setState({ ...images }))
    //   .finally(() => this.setState({ loading: false }));
  }

  handleSearchFormSubmit = imagesName => {
    console.log(imagesName);
    this.setState({ imagesName });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />
        <Container>
          <div>
            <ImageGallery imagesName={this.state.imagesName} />
            {/* {this.state.images} */}
          </div>
          {/* <Section></Section> */}
        </Container>
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

// {
//   this.state.images && (
//     <div>
//       {this.state.loading && <h1>Download</h1>}
//       {/* {this.state.images} */}
//       images fetch
//     </div>
//   );
// }

// addContact = data => {
//   const presence = this.state.contacts.some(
//     contact => contact.name === data.name
//   );
//   if (presence) {
//     Notify.warning(`${data.name} is already in contacts.`);
//     return;
//   }

//   this.setState(({ contacts }) => ({
//     contacts: [{ ...data, id: nanoid() }, ...contacts],
//   }));
// };

// deleteContact = contactId => {
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//   }));
// };

// changesFilter = e => {
//   this.setState({ filter: e.currentTarget.value });
// };

// getVisibleContacts = () => {
//   const { contacts, filter } = this.state;
//   const normalized = filter.toLowerCase();
//   return contacts.filter(contact =>
//     contact.name.toLowerCase().includes(normalized)
//   );
// };
