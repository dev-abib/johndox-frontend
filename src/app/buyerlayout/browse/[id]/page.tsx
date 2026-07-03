"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ListPropertyBrowse, useGetProperties } from "@/Hooks/api/cms_api";
import Maps from "@/Components/PageComponents/mainPages/BrowseDetails/Maps";
import { BrowseDetailsSkeleton } from "@/Components/Skeleton/BrowseDetailsSkeleton";
import CurrencyConverter from "@/Components/PageComponents/buyerPages/CurrencyConverter";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import LoanCalculatorForm from "@/Components/PageComponents/buyerPages/LoanCalculatorForm";
import BrowseDetails from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDetails";
import BrowseDescription from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDescription";

const page = () => {
  const params = useParams();
  const SingproductId = params.id;
  const { data, isLoading } = useGetProperties();
  const { data: Listproperty } = ListPropertyBrowse();

  if (isLoading) {
    return <BrowseDetailsSkeleton />;
  }

  const singleProductDetails = data?.data?.items?.find(
    (item: any) => item?._id === SingproductId,
  );

  return (
    <>
      <BrowseDetails data={singleProductDetails} />
      <BrowseDescription data={singleProductDetails} />
      <div className="lg:flex gap-5 container mx-auto items-start px-3 sm:px-4 lg:px-0">
        <div className="w-full">
          <Maps item={singleProductDetails} />
        </div>
        <div className="w-full mt-8 sm:mt-10 lg:mt-14">
          <LoanCalculatorForm data={singleProductDetails} />
        </div>
      </div>
      <CurrencyConverter />
      <ListPropertyCTA Listproperty={Listproperty} />
    </>
  );
};

export default page;
