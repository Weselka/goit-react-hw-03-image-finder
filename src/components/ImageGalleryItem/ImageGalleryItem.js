import { ImageGalleryLi, ImageGalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components';

export const ImageGalleryItem = ({ images, onClick }) => {
  console.log(images);
  return (
    <>
      {images.map(image => {
        const { id, webformatURL, tags, largeImageURL } = image;
        return (
          <ImageGalleryLi key={id} onShowModal={onClick}>
            <ImageGalleryImage
              src={webformatURL}
              alt={tags}
              width="240"
              loading="lazy"
            ></ImageGalleryImage>
            {onClick && (
              <Modal>
                <img src={largeImageURL} alt={tags}></img>
              </Modal>
            )}
            {/* <Modal /> */}
          </ImageGalleryLi>
        );
      })}
    </>
  );
};
