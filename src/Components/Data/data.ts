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
import {
  Access,
  Commercial,
  Community,
  Excellence,
  Expert,
  House,
  Innovation,
  Interactive,
  Intergrity,
  Land,
  Premium,
  Secure,
  Support,
  Trust,
  Verified,
} from "../Svg/SvgContainer";
import { SVGProps } from "react";
import {
  AnalyticsSvg,
  GraphSvg,
  MarketingSvg,
  MessageSvg,
  SecureSvg,
  SparkSvg,
} from "../Svg/SvgContainer2";

export interface Property {
  price: string;
  title: string;
  location: string;
  details: string;
  Image: StaticImageData;
  id: number;
}

export const Featuredata: Property[] = [
  {
    id: 1,
    price: "$240,000 USD",
    title: "Residential Land in Yocón",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product1,
  },
  {
    id: 2,
    price: "$320,000 USD",
    title: "Downtown Office Space",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product2,
  },
  {
    id: 3,
    price: "$620,000 USD",
    title: "Modern House in LA MIEL",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product3,
  },
  {
    id: 4,
    price: "$720,000 USD",
    title: "Investment Land in Caldas",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product4,
  },
  {
    id: 5,
    price: "$620,000 USD",
    title: "Commercial Space in Caldas",
    location: "LA MIEL, Honduras",
    details: "3 Beds • 2 Baths • 3200 M",
    Image: Product5,
  },
  {
    id: 6,
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

// Teralink Data

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const WhyChooseUsFeatures: FeatureItem[] = [
  {
    title: "Verified Listings",
    description: "All properties are verified and authenticated by our team",
    icon: Verified,
  },
  {
    title: "Secure Transactions",
    description: "Safe and secure payment processing for peace of mind",
    icon: Secure,
  },
  {
    title: "Expert Agents",
    description: "Connect with experienced real estate professionals",
    icon: Expert,
  },
  {
    title: "Interactive Maps",
    description: "Explore properties with our advanced mapping technology",
    icon: Interactive,
  },
  {
    title: "24/7 Support",
    description: "Get dedicated support from our experienced real estate team",
    icon: Support,
  },
  {
    title: "Premium Tools",
    description: "Advanced search filters and property comparison tools",
    icon: Premium,
  },
];
export const WhyChooseUsFeatures2: FeatureItem[] = [
  {
    title: "Reach More Buyers",
    description:
      "List your property and reach thousands of verified buyers across Honduras.",
    icon: GraphSvg,
  },
  {
    title: "Quick & Easy",
    description: "Publish your listing in just a few clicks — no complexity.",
    icon: SparkSvg,
  },
  {
    title: "Advanced Analytics",
    description:
      "Track views, inquiries, and engagement with detailed analytics.",
    icon: AnalyticsSvg,
  },
  {
    title: "Direct Messaging",
    description:
      "Connect instantly with verified buyers using our secure chat system.",
    icon: MessageSvg,
  },
  {
    title: "Targeted Marketing",
    description:
      "Promote your listings with featured placements and social media integration.",
    icon: MarketingSvg,
  },
  {
    title: "Secure & Safe",
    description: "All transactions and communications are secure and verified.",
    icon: SecureSvg,
  },
];
export const WhyChooseUsFeatures3: FeatureItem[] = [
  {
    title: "Integrity",
    description:
      "We operate with complete honesty and transparency in all our dealings.",
    icon: Intergrity,
  },
  {
    title: "Innovation",
    description:
      "We continuously improve our platform with cutting-edge technology.",
    icon: Innovation,
  },
  {
    title: "Community",
    description:
      "We build a supportive ecosystem for buyers, sellers, and agents.",
    icon: Community,
  },
  {
    title: "Excellence",
    description: "We strive for the highest standards in everything we do.",
    icon: Excellence,
  },
  {
    title: "Accessibility",
    description: "We make real estate opportunities available to everyone.",
    icon: Access,
  },
  {
    title: "Trust",
    description: "We earn trust through consistent, reliable service.",
    icon: Trust,
  },
];
export const HowItWorksdata = [
  {
    title: "Create Account",
    description: "Sign up as a seller and verify your email.",
    count: 1,
  },
  {
    title: "Add Listing",
    description: "Fill in property details, upload photos, and set your price.",
    count: 2,
  },
  {
    title: "Go Live",
    description: "Your listing appears on our marketplace immediately.",
    count: 3,
  },
  {
    title: "Connect with Buyers",
    description: "Connect with real buyers ready to make their move.",
    count: 4,
  },
];
