import {
  MdCamera,
  MdHeadset,
  MdLaptop,
  MdSmartphone,
  MdTv,
} from "react-icons/md";

export const options = [
  {
    type: "Smartphone",
    link: "smartphone",
    icon: <MdSmartphone />,
  },

  {
    type: "TV",
    link: "tv",
    icon: <MdTv />,
  },
  {
    type: "Laptop",
    link: "laptop",
    icon: <MdLaptop />,
  },
  {
    type: "Camera",
    link: "camera",
    icon: <MdCamera />,
  },
  {
    type: "Headphone",
    link: "headphone",
    icon: <MdHeadset />,
  },
];
