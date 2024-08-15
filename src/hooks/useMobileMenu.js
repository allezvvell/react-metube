import { useEffect, useState } from 'react';

export const useMobileMenu = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenu((prev) => !prev);
  };
  useEffect(() => {
    if (mobileMenu) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add('scroll-lock');
    } else {
      const y = document.body.style.top;
      document.body.style.removeProperty('top');
      document.body.classList.remove('scroll-lock');
      window.scrollTo(0, parseInt(y) * -1);
    }
  }, [mobileMenu]);
  return { mobileMenu, toggleMobileMenu };
};
