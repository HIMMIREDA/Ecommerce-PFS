import React from "react";

const VariationInput = ({ variation }) => {
  return (
    <>
      <h2 className="mt-8 text-lg text-base-content">{variation.name}</h2>
      <div className="mt-3 flex select-none flex-wrap items-center gap-1">
        {variation.options?.map((variationOpt, index) => (
          <label className="" key={variationOpt?.id}>
            <input
              type="radio"
              name={variation?.name}
              value={variationOpt.value}
              className="peer sr-only"
              defaultChecked={index === 0}
            />
            <p className="peer-checked:bg-black peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold">
              {variationOpt.value}
            </p>
          </label>
        ))}
      </div>
    </>
  );
};

export default VariationInput;
