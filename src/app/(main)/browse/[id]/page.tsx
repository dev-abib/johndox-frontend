"use client";
import React from "react";
import { useParams } from "next/navigation";
import { ListPropertyBrowse, useGetProperties } from "@/Hooks/api/cms_api";
import Maps from "@/Components/PageComponents/mainPages/BrowseDetails/Maps";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import BrowseDetails from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDetails";
import BrowseDescription from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDescription";
import { BrowseDetailsSkeleton } from "@/Components/Skeleton/BrowseDetailsSkeleton";

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
      {/* <Maps /> */}
      <ListPropertyCTA Listproperty={Listproperty} />
    </>
  );
};

export default page;
