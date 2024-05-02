import ManageIdForm from "views/templates/manager/group/managepolicy/manageid/ManageIdForm";
import { useRef } from "react";
import { useSelector } from "react-redux";

console.debug("ManageIdFormContainer.js");

export default function ManageIdFormContainer() {
  const user = useSelector((state) => state.session.user);
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  const childRef = useRef();

  const onSearchTreeData = (companyData, deptData, userData) => {
    childRef.current.getData(companyData, deptData, userData);
  };

  return <ManageIdForm ref={childRef} onSearchTreeData={onSearchTreeData} comCode={comCode} />;
}
