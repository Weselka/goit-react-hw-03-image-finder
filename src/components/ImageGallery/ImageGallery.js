import { Component } from 'react';
import { ImageGalleryItem } from 'components';

export class ImageGallery extends Component {

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.imagesName !== this.props.imagesName) {
  //     console.log('prevProps.imagesName', prevProps.imagesName);
  //     console.log('this.props.imagesName', this.props.imagesName);
  //     console.log('Changes name images');
  //   }
  // }

  render() {
    return (
      <ImageGallery>
        {/* <p>{this.props.imagesName}</p> */}
        <ImageGalleryItem />
      </ImageGallery>
    );
  }
}
