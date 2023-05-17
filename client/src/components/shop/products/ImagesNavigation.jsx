import React, { useEffect, useState } from "react";

function ImagesNavigation({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(images?.length && images[0]?.url);
  }, [images]);

  return (
    <div className="lg:col-span-3 lg:row-end-1">
      <div className="lg:flex lg:items-start">
        <div className="lg:order-2 lg:ml-5">
          <div className="max-w-xl overflow-hidden rounded-lg">
            <img
              className="h-full w-full max-w-full object-cover"
              src={selectedImage}
              alt=""
            />
          </div>
        </div>

        <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
          <div className="flex flex-row items-start lg:flex-col">
            {images?.map((image) => (
              <button
                key={image?.id}
                type="button"
                className={`flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 ${
                  selectedImage === image?.url && "border-yellow-400"
                } text-center`}
                onClick={() => setSelectedImage(image?.url)}
              >
                <img
                  className="h-full w-full object-cover"
                  src={image?.url}
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ImagesNavigation.defaultProps = {
  images: [],
};

export default ImagesNavigation;
