import { useState, useEffect } from 'react';

interface windowSizeTypes {
  width: number | undefined;
  height: number | undefined
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<windowSizeTypes>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);

    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
