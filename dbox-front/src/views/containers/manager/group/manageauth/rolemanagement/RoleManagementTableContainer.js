import RoleManagementTable from "views/templates/manager/group/manageauth/rolemanagement/RoleManagementTable";
import { useState } from "react";
console.debug("RoleManagementTableContainer.js");

export default function RoleManagementTableContainer({
  roleTableData,
  tableValue,
  companyHandleChange,
  deptHandleChange,
  auditHandleChange,
  companyCheckValue,
  deptCheckValue,
  auditCheckValue,
}) {
  return (
    <RoleManagementTable
      roleTableData={roleTableData}
      tableValue={tableValue}
      companyHandleChange={companyHandleChange}
      deptHandleChange={deptHandleChange}
      auditHandleChange={auditHandleChange}
      companyCheckValue={companyCheckValue}
      deptCheckValue={deptCheckValue}
      auditCheckValue={auditCheckValue}
    />
  );
}
