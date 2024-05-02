import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import RoleAuthGroupGrid from "views/templates/manager/group/manageauth/roleauth/RoleAuthGroupGrid";
import RoleAuthApi from "apis/roleauth-api";
console.debug("RoleAuthGroupGridContainer.js");

const RoleAuthGroupGridContainer = forwardRef(({ onGridDataClick, comCode, selectComCode }, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData,
  }));
  /**
   * 데이터 불러오기
   */
  const getData = async (selectComCode) => {
    if (comCode != "DKG") {
      selectComCode = comCode;
    } else if (comCode === "DKG") {
      selectComCode = selectComCode;
    } else {
      selectComCode = null;
    }

    try {
      const response = await RoleAuthApi.getRoleAuthGroup({
        params: {},
      });

      if (selectComCode === "DKG") {
        gridRef.current.api.setRowData(response.data.response);
      } else {
        let gridData = [];
        for (let i = 0; i < response.data.response.length; i++) {
          if (response.data.response[i].uComCode.includes(selectComCode)) {
            gridData = gridData.concat(response.data.response[i]);
            gridRef.current.api.setRowData(gridData);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    getData(selectComCode);
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    var selectedRows = gridApi.getSelectedRows();
    onGridDataClick(selectedRows[0]);
  };

  return <RoleAuthGroupGrid onGridReady={onGridReady} onSelectionChanged={onSelectionChanged} ref={gridRef} />;
});

export default RoleAuthGroupGridContainer;
