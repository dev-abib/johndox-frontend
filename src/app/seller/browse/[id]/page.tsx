"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ListPropertyBrowse, useGetProperties } from "@/Hooks/api/cms_api";
import Maps from "@/Components/PageComponents/mainPages/BrowseDetails/Maps";
import { BrowseDetailsSkeleton } from "@/Components/Skeleton/BrowseDetailsSkeleton";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import BrowseDetails from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDetails";
import BrowseDescription from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDescription";

const SellerBrowseDetailPage = () => {
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
      <div className="container mx-auto px-3 sm:px-4 lg:px-0">
        <Maps item={singleProductDetails} />
      </div>
      <ListPropertyCTA Listproperty={Listproperty} />
    </>
  );
};

export default SellerBrowseDetailPage;
