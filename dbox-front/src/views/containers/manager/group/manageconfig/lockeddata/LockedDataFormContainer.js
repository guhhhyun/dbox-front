import { useRef } from "react";
import LockedDataForm from "views/templates/manager/group/manageconfig/lockeddata/LockedDataForm";

export default function LockedDataFormContainer() {
  const ref = useRef(null);

  const onSearchCompany = (response) => {
    ref.current.getSearchData(response);
  };

  const getData = () => {
    ref.current.getData();
  };

  return <LockedDataForm onSearchCompany={onSearchCompany} getData={getData} ref={ref} />;
}
