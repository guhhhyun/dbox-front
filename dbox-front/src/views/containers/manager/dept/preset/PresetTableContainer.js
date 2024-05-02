import { React, useEffect, forwardRef, useState, useImperativeHandle, useRef } from "react";
import PresetTable from "views/templates/manager/dept/preset/PresetTable";
import UserPresetApi from "apis/userprest-api";

console.debug("PresetTableContainer.js");

const PresetTableContainer = forwardRef(({ getDetailData }, ref) => {
  const childRef = useRef(null);
  const [selectedID, setSelectedID] = useState();
  const [data, setData] = useState();
  const [checkedRegInputs, setCheckedRegInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useState([]);

  const [result, setResult] = useState("");

  useImperativeHandle(ref, () => ({
    getData,
    result,
    checkedRegInputs,
    checkedInputs,
  }));

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await UserPresetApi.getUserPreset({
        params: {},
      });
      setResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  const onRowSelected = (index, item) => {
    setSelectedID(index);
    setData(item);
    getDetailData(item);
  };

  return (
    <PresetTable
      getData={getData}
      checkedRegInputs={checkedRegInputs}
      setCheckedRegInputs={setCheckedRegInputs}
      checkedInputs={checkedInputs}
      setCheckedInputs={setCheckedInputs}
      selectedID={selectedID}
      data={data}
      result={result}
      onRowSelected={onRowSelected}
      ref={childRef}
    />
  );
});

export default PresetTableContainer;
