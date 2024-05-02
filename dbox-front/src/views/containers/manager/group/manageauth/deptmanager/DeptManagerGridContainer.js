import {useEffect, useRef} from "react";
import DeptManagerGrid from "views/templates/manager/group/manageauth/deptmanager/DeptManagerGrid";
import DeptManagerApi from "apis/deptmanager-api"

export default function DeptManagerGridContainer( { dataToSearchFor }) {

  const gridRef = useRef(null);

  useEffect(() => {
    getDeptManagers(dataToSearchFor);
  }, [dataToSearchFor])

  const getDeptManagers = async () => {
    const response = await DeptManagerApi.getDeptManagers(dataToSearchFor);
    const rowData = response.data.response;
    const current = gridRef.current;
    if(current) {
      current.api.setRowData(rowData);
    }
  };

  const deleteDeptManager = async (objectId) => {
    const response = await DeptManagerApi.deleteDeptManager(objectId);
    if(response && response.status === 200) {
      await getDeptManagers();
    }
  }

  return (
    <DeptManagerGrid ref={gridRef} deleteDeptManager={deleteDeptManager} />
  );
};
