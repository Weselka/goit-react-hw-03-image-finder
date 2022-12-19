import { Button, UserInfo } from './Button.styled';

export const LoadMore = ({onClick}) => {

  return (
    <UserInfo>
      <Button onClick={onClick} type="button">
        Load More
      </Button>
    </UserInfo>
  );
};
