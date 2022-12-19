import { Button } from './Button.styled';

export const LoadMore = ({onClick}) => {

  return (
    <Button onClick={onClick} type="button">
      Load More
    </Button>
  );
};
