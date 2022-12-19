import { Component } from 'react';
import { ImageGalleryLi, ImageGalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { image } = this.props;

    return (
      <ImageGalleryLi key={image.id} onClick={this.toggleModal}>
        <ImageGalleryImage
          src={image.webformatURL}
          alt={image.tags}
          width="240"
          loading="lazy"
        ></ImageGalleryImage>
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img
              key={image.id}
              src={image.largeImageURL}
              alt={image.tags}
            ></img>
          </Modal>
        )}
      </ImageGalleryLi>
    );
  }
}
