import { Component } from 'react';

import {
  Container,
  // Section,
  Searchbar,
} from 'components';

export class App extends Component {
  state = {};

  render() {
    return (
      <>
        <Searchbar />
        <Container>
          {/* <Section>            
          </Section> */}
        </Container>
      </>
    );
  }
}
