import ShareGroupAuthForm from "views/templates/manager/group/share/sharegroup/ShareGroupAuthForm";
import { useState, useRef } from "react";

console.debug("ShareGroupAuthFormContainer.js");

export default function ShareGroupAuthFormContainer() {
  const [shareGroupGridData, setShareGroupGridData] = useState([]);
  const [deptGridData, setDeptGridData] = useState();
  const [selectComCode, setSelectComCode] = useState("ALL");
  const childRef = useRef();
  /**
   * 공유그룹 데이터
   */
  const clickGridData = (shareGroupGridData) => {
    setShareGroupGridData(shareGroupGridData);
    childRef.current.rightGrid.getData(shareGroupGridData.rObjectId);
  };

  /**
   *  부서그리드 row 데이터
   */
  const clickDeptGridData = (deptGridData) => {
    setDeptGridData(deptGridData);
  };

  /**
   * 검색창 입력 데이터
   */
  const onInputTextData = (searchSelectData, searchTextData) => {
    childRef.current.leftGrid.getData(searchSelectData, searchTextData, selectComCode);
  };

  const handleChange = (event, selectComCode) => {
    selectComCode = event.target.value;
    setSelectComCode(event.target.value);
    childRef.current.leftGrid.getData("전체", "", selectComCode);
    setShareGroupGridData([]);
    childRef.current.rightGrid.getData();
  };

  const leftGridgetData = () => {
    childRef.current.leftGrid.getData("전체", "", selectComCode);
  };

  const rightGridgetData = (data) => {
    childRef.current.rightGrid.getData(data);
  };

  return (
    <ShareGroupAuthForm
      clickGridData={clickGridData}
      clickDeptGridData={clickDeptGridData}
      onInputTextData={onInputTextData}
      deptGridData={deptGridData}
      shareGroupGridData={shareGroupGridData}
      handleChange={handleChange}
      ref={childRef}
      leftGridgetData={leftGridgetData}
      rightGridgetData={rightGridgetData}
    />
  );
}
