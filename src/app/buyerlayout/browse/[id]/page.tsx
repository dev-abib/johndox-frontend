import React from "react";
import Maps from "@/Components/PageComponents/mainPages/BrowseDetails/Maps";
import ListPropertyCTA from "@/Components/PageComponents/mainPages/Home/ListPropertyCTA";
import BrowseDetails from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDetails";
import BrowseDescription from "@/Components/PageComponents/mainPages/BrowseDetails/BrowseDescription";
import LoanCalculatorForm from "@/Components/PageComponents/buyerPages/LoanCalculatorForm";
import CurrencyConverter from "@/Components/PageComponents/buyerPages/CurrencyConverter";

const page = () => {
  return (
    <>
      <BrowseDetails />
      <BrowseDescription />
      <Maps />
      <LoanCalculatorForm />
      <CurrencyConverter />
      <ListPropertyCTA />
    </>
  );
};

export default page;
