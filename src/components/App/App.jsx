import { Component } from 'react';

import { Container, Heading, Section, Searchbar, SearchForm } from 'components';

export class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Container>
          <Searchbar></Searchbar>
          <SearchForm></SearchForm>
        </Container>
        <Container>
          <Section>
            <Heading marginBottom="50px" textAlign="center"></Heading>
          </Section>
        </Container>
      </>
    );
  }
}
