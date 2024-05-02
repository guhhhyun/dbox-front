import React, { useRef } from "react";
import UnlockHistoryForm from "views/templates/manager/group/unusual/unlockhistory/UnlockHistoryForm";

console.debug("UnlockHistoryFormContainer.js");

export default function UnlockHistoryFormContainer() {
  const childRef = useRef(null);

  const onSearchCompany = (response) => {
    childRef.current.getSearchData(response);
  };

  const getData = () => {
    childRef.current.getData();
  };

  return <UnlockHistoryForm onSearchCompany={onSearchCompany} getData={getData} ref={childRef} />;
}
