import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import ShareGroupApi from "apis/sharegroup-api";

import ShareGroupAuthDeptGrid from "views/templates/manager/group/share/sharegroup/ShareGroupAuthDeptGrid";

console.debug("ShareGroupAuthDeptGridContainer.js");

const ShareGroupAuthDeptGridContainer = forwardRef(({ height, onGridDataClick }, ref) => {
  const [gridApi, setGridApi] = useState(null);

  const gridRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getData,
  }));

  /**
   * 데이터 불러오기
   */
  const getData = async (rObectIdGridData) => {
    try {
      const response = await ShareGroupApi.getDeptInShareGroup({
        params: {
          rObjectId: rObectIdGridData,
        },
      });
      gridRef.current.api.setRowData(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  /**
   * 그리드 클릭시 row 데이터 값
   */
  const onSelectionChanged = () => {
    var selectedDeptRows = gridApi.getSelectedRows();
    onGridDataClick(selectedDeptRows[0]);
  };

  return <ShareGroupAuthDeptGrid ref={gridRef} onGridReady={onGridReady} height={height} onSelectionChanged={onSelectionChanged} />;
});

export default ShareGroupAuthDeptGridContainer;
