import { useRef } from "react";
import HistoryAttachForm from "views/templates/history/etc/HistoryAttachForm";

console.debug("HistoryDeleteContainer.js");

export default function HistoryDeleteFormContainer() {

  const ref = useRef(null);

  const onSearchCompany = (response) => {
    ref.current.getSearchData(response);
  };

  const getData = () => {
    ref.current.getData();
  };

  

  return <HistoryAttachForm onSearchCompany={onSearchCompany} getData={getData} ref={ref} />;
}
