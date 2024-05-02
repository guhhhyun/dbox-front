import React, { useEffect } from "react";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import StatOddApi from "apis/statodd-api";
import LogOddApi from "apis/logodd-api";
import UnusualApi from "apis/unusual-api";
import UnusualStatsGrid from "views/templates/manager/group/unusual/unusualstats/UnusualStatsGrid";

console.debug("UnusualStatsGridContainer.js");

const UnusualStatsGridContainer = forwardRef(({ comCode }, ref) => {
  const [gridApi, setGridApi] = useState(null);
  const [opened, setOpened] = useState(false);
  const [data, setData] = useState("");
  const [result, setResult] = useState("");
  const [cntResult, setCntResult] = useState(0);
  const gridRef = useRef(null);

  const [search, setSearch] = useState("A");
  let date = new Date();
  const [month, setMonth] = useState();

  const defaultStartData =
    date
      .getFullYear()
      .toString()
      .concat(date.getMonth() + 1) + "01";
  const defaultEndData =
    date
      .getFullYear()
      .toString()
      .concat(date.getMonth() + 2) + "01";

  useImperativeHandle(ref, () => ({
    getSearchData,
    getData,
  }));

  useEffect(() => {}, [search]);

  const getSearchData = (response) => {
    gridRef.current.api.setRowData(response.data.response);
  };

  const getData = async (searchKeyword, startDate, endDate) => {
    setSearch(searchKeyword?.gubun ? searchKeyword.gubun : "A");
    try {
      const response = await StatOddApi.getStatOddAll({
        params: {
          uComCode: searchKeyword?.company ? searchKeyword.company : comCode,
          uDeptCode: searchKeyword?.dept,
          uUserId: searchKeyword?.user,
          statStartDate: startDate ? startDate.concat("01") : defaultStartData,
          statEndDate: endDate ? endDate.concat("01") : defaultEndData,
        },
      });
      getCntData(searchKeyword?.dept);
      setMonth(startDate ? startDate.substring(0, 4) + "-" + startDate.substring(4, 6) : date.getFullYear().toString() + "-" + (date.getMonth() + 1));

      gridRef.current.api.setRowData(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 경고 기준 조회 api
   */
  const getCntData = async (deptCode) => {
    try {
      const response = await UnusualApi.getDeptInform({
        params: {
          uComCode: comCode,
          uDeptCode: deptCode ? deptCode : comCode,
        },
      });
      setCntResult(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 그리드 초기화
   */
  const onGridReady = (params) => {
    getData();
    setGridApi(params.api);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  const onRowSelected = async (params) => {
    await getChartData(params.data);
    setOpened(true);
  };

  const getChartData = async (params) => {
    const dateSplit = params.uLogDate.split(" ");
    const date = dateSplit[0].split("-");
    const logDate = new Date(date[0], date[1]);
    let logStartDate = date[0].concat(date[1]);
    let nextMonth = logDate.getMonth() + 1;

    if (nextMonth != 10 && nextMonth != 11 && nextMonth != 12) {
      nextMonth = "0".concat(nextMonth);
    }

    const logEndDate = logDate.getFullYear().toString().concat(nextMonth);

    try {
      const response = await LogOddApi.getLogOddAll({
        params: {
          logStartDate: logStartDate.concat("01"),
          logEndDate: logEndDate.concat("01"),
          userId: params.uUserId,
        },
      });
      setResult(params);
      setData(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UnusualStatsGrid
      ref={gridRef}
      onGridReady={onGridReady}
      onRowSelected={onRowSelected}
      opened={opened}
      onModalClose={closeModal}
      search={search}
      result={result}
      data={data}
      cntResult={cntResult}
      month={month}
    />
  );
});

export default UnusualStatsGridContainer;
