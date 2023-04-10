import { Watch } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Watch
      height="60"
      width="60"
      radius="48"
      color="#4fa94d"
      ariaLabel="watch-loading"
      wrapperStyle={{ display: 'flex', justifyContent: 'center' }}
      wrapperClassName=""
      visible={true}
    />
  );
};
