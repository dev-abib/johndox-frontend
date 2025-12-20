import React from "react";
import Maps from "@/Components/PageComponents/mainPages/BrowseDetails/Maps";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import BrowseDetails from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDetails";
import BrowseDescription from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDescription";

const page = () => {
  return (
    <>
      <BrowseDetails />
      <BrowseDescription />
      <Maps />
      {/* <ListPropertyCTA /> */}
    </>
  );
};

export default page;
