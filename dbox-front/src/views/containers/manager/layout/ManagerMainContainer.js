import React from "react";
import ManagerMain from "views/templates/manager/layout/ManagerMain";

console.debug("ManagerSidebarContainer.js");

export default function ManagerMainContainer({ children }) {
  return <ManagerMain>{children}</ManagerMain>;
}
