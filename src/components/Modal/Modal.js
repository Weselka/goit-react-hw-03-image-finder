import { Component } from 'react';
import { Overlay, ModalBox } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    console.log('Modal componentDidMount');
  }
  componentWillUnmount() {
    console.log('Modal componentWillUnmount');
  }
  render() {
    return (
      <Overlay>
        <ModalBox>{this.props.children}</ModalBox>
      </Overlay>
    );
  }
}

// export const Modal = ({ images }) => {
//   console.log(images);
//   return (
//     <Overlay >
//       <ModalBox >
//         <img src="" alt="" />
//       </ModalBox>
//     </Overlay>
//   );
// };
