import React from "react";
import VariationInput from "./VariationInput";

const variations = [
  {
    id: 1,
    name: "color",
    options: [
      {
        id: 1,
        value: "red",
      },
      {
        id: 2,
        value: "green",
      },
      {
        id: 3,
        value: "blue",
      },
    ],
  },
  {
    id: 2,
    name: "size",
    options: [
      {
        id: 4,
        value: "small",
      },
      {
        id: 5,
        value: "medium",
      },
      {
        id: 6,
        value: "large",
      },
    ],
  },
  {
    id: 3,
    name: "made in",
    options: [
      {
        id: 7,
        value: "china",
      },
      {
        id: 8,
        value: "usa",
      },
      {
        id: 9,
        value: "morocco",
      },
    ],
  },
];

const VariationInputList = () => {
  return variations.map((variation) => (
    <VariationInput variation={variation} key={variation?.id} />
  ));
};

export default VariationInputList;
