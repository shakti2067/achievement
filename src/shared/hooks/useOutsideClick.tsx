import { useEffect, RefObject } from "react";

function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  action: () => void
): void {
  function handleClickOutside(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      action();
    }
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => handleClickOutside(event);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useOutsideClick;
