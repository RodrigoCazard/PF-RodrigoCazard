import { useEffect } from 'react';

function ScrollToTopOnRefresh() {
  useEffect(() => {
    const handleScrollPosition = () => {
      localStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    const restoreScrollPosition = () => {
      const scrollPosition = localStorage.getItem('scrollPosition');
      if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        localStorage.removeItem('scrollPosition');
      }
    };

    window.addEventListener('scroll', handleScrollPosition);
    window.addEventListener('load', restoreScrollPosition);

    return () => {
      window.removeEventListener('scroll', handleScrollPosition);
      window.removeEventListener('load', restoreScrollPosition);
    };
  }, []);

  return null;
}

export default ScrollToTopOnRefresh;
