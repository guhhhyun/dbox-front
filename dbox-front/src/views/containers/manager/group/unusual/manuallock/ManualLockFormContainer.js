import React, { useRef } from "react";
import ManualLockForm from "views/templates/manager/group/unusual/manuallock/ManualLockForm";
import { setUser } from "stores/session";

console.debug("ManualLockFormContainer.js");

export default function ManualLockFormContainer() {
  const childRef = useRef(null);

  const onSearchCompany = (response) => {
    childRef.current.getSearchData(response);
  };

  const getData = () => {
    childRef.current.getData();
  };

  return <ManualLockForm onSearchCompany={onSearchCompany} getData={getData} ref={childRef} />;
}
