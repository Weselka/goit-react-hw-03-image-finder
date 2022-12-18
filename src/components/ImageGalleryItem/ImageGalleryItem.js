import { ImageGalleryLi, ImageGalleryImage } from './ImageGalleryItem.styled';


export const ImageGalleryItem = ( {images} ) => {
  console.log(images);
  return (
    <>
      {images.map(image => {
        return (
          <ImageGalleryLi key={image.id}>
            <ImageGalleryImage
              src={image.webformatURL}
              alt={image.tags}
              width="240"
              loading="lazy"
            ></ImageGalleryImage>
          </ImageGalleryLi>
        );
      })}
      
    </>
  );
};
