import { forwardRef, useRef, useState, useImperativeHandle } from "react";
import RoleAuthGroupUserGrid from "views/templates/manager/group/manageauth/roleauth/RoleAuthGroupUserGrid";
import RoleAuthApi from "apis/roleauth-api";
console.debug("RoleAuthGroupGridContainer.js");

const RoleAuthGroupUserGridContainer = forwardRef(({ onGridUserDataClick }, ref) => {
  const [gridApi, setGridApi] = useState(null);

  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData,
  }));

  /**
   * 데이터 불러오기
   */
  const getData = async (searchText, roleAuthGridData) => {
    try {
      const response = await RoleAuthApi.getRoleAuthGroupUsers({
        params: {
          uAuthGroup: roleAuthGridData.uAuthGroup,
          uConfigFlag: roleAuthGridData.uConfigFlag,
          uCodeType: "COM_CODE",
          uGroupScope: roleAuthGridData.uGroupScope,
        },
      });

      if (searchText != "") {
        let searchResult = [];
        for (let i = 0; i < response.data.response.length; i++) {
          if (response.data.response[i].userId.includes(searchText) || response.data.response[i].displayName.includes(searchText)) {
            searchResult = searchResult.concat(response.data.response[i]);
            gridRef.current.api.setRowData(searchResult);
          }
        }
        if (searchResult.length === 0) {
          gridRef.current.api.setRowData(searchResult);
        }
      } else {
        gridRef.current.api.setRowData(response.data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onSelectionChanged = () => {
    var selectedDeptRows = gridApi.getSelectedRows();
    onGridUserDataClick(selectedDeptRows[0]);
  };

  return <RoleAuthGroupUserGrid onGridReady={onGridReady} onSelectionChanged={onSelectionChanged} ref={gridRef} />;
});

export default RoleAuthGroupUserGridContainer;
