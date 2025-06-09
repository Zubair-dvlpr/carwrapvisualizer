import loaderGif from '../../assets/loading.gif';

export const Amination = () => {
  return (
    <div className='absolute top-0 left-0 w-full  bg-[#000000d2] flex justify-center h-screen items-center'>
      <img src={loaderGif} alt='Loading...' className='w-36' />
    </div>
  );
};
