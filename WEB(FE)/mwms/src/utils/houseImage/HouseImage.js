import { useEffect, useState } from 'react';

function HouseImage({imageList, setImageList, currHouse}) {
  const [imageSrc, setImageSrc] = useState(imageList[currHouse]);

  useEffect(() => {
    setImageSrc(imageList[currHouse]);
  }, [currHouse]);

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        let copyArray = [...imageList];
        copyArray[currHouse] = reader.result;
        setImageList(copyArray);
        resolve();
      };
    });
  };

  return (
    <main className="container px-3">
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>
      <input type="file" onChange={(e) => {
        encodeFileToBase64(e.target.files[0]);
      }} />
    </main>
  );
}

export default HouseImage;