// @/Components/Data/data.ts

import { StaticImageData } from "next/image";
import Product1 from "../../Assets/product1.png";
import Product2 from "../../Assets/product2.png";
import Product3 from "../../Assets/product3.png";
import Product4 from "../../Assets/product4.png";
import Product5 from "../../Assets/product5.png";
import Product6 from "../../Assets/product6.png";
import Browse1 from "../../Assets/browse1.png";
import Browse2 from "../../Assets/browse2.png";
import Browse3 from "../../Assets/browse3.png";
import { Commercial, House, Land } from "../Svg/SvgContainer";
import { SVGProps } from "react";

export interface Property {
  price: string;
  title: string;
  location: string;
  details: string;
  Image: StaticImageData;
}

export const Featuredata: Property[] = [
  {
    price: "$240,000 USD",
    title: "Residential Land in Yocón",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product1,
  },
  {
    price: "$320,000 USD",
    title: "Downtown Office Space",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product2,
  },
  {
    price: "$620,000 USD",
    title: "Modern House in LA MIEL",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product3,
  },
  {
    price: "$720,000 USD",
    title: "Investment Land in Caldas",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product4,
  },
  {
    price: "$620,000 USD",
    title: "Commercial Space in Caldas",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product5,
  },
  {
    price: "$120,000 USD",
    title: "Modern House in LA MIEL",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product6,
  },
];
// browse data
export interface PropertyCategory {
  title: string;
  subtitle: string;
  listings: number;
  icon_name: React.ComponentType<SVGProps<SVGSVGElement>>;
  image: StaticImageData;
}

export const PropertyCategories: PropertyCategory[] = [
  {
    title: "Houses",
    subtitle: "Find your dream home",
    listings: 2450,
    icon_name: House,
    image: Browse1,
  },
  {
    title: "Land",
    subtitle: "Investment Opportunities",
    listings: 1890,
    icon_name: Land,
    image: Browse2,
  },
  {
    title: "Commercial",
    subtitle: "Business Space",
    listings: 456,
    icon_name: Commercial,
    image: Browse3,
  },
];
