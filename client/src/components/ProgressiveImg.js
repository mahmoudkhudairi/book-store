import { useEffect, useState } from 'react';
const ProgressiveImg = ({ placeholderSrc, src, ...props }) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const customClass = placeholderSrc && imgSrc === placeholderSrc ? 'loading' : 'loaded';
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
  }, [src]);
  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ''}
      className={`p-1 h-60 mx-auto border rounded-lg my-3 ${customClass}`}
    />
  );
};
export default ProgressiveImg;
