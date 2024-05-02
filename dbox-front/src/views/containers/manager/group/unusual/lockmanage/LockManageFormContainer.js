import React, { useRef } from "react";
import LockManageForm from "views/templates/manager/group/unusual/lockmanage/LockManageForm";

console.debug("LockManageFormContainer.js");

export default function LockManageFormContainer() {
  const childRef = useRef(null);

  const onSearchCompany = (response) => {
    childRef.current.getSearchData(response);
  };

  const getData = () => {
    childRef.current.getData();
  };

  return <LockManageForm onSearchCompany={onSearchCompany} getData={getData} ref={childRef} />;
}
