import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import UnusualStatsForm from "views/templates/manager/group/unusual/unusualstats/UnusualStatsForm";

console.debug("UnusualStatsFormContainer.js");

export default function UnusualStatsFormContainer() {
  const childRef = useRef(null);
  const [state, setState] = useState("");
  const [list, setList] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const user = useSelector((state) => state.session.user);

  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;

  /**
   * 마지막 월로 검색(검색 버튼 클릭)
   */
  const getSearchData = (searchData, endDate) => {
    setSearchKeyword(searchData);
    setState({
      lastDate: endDate,
    });
    getNextData(searchData, endDate);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });

    getNextData(searchKeyword, event.target.value);
  };

  const onSearchData = (searchData, dataList) => {
    setList(dataList);
    setSearchKeyword(searchData);
  };

  const getNextData = (searchData, params) => {
    let startDate = params;
    const dateSplit = startDate.split("-");
    const curData = new Date(dateSplit[0], dateSplit[1]);
    startDate = dateSplit[0].concat(dateSplit[1]);

    let nextMonth = curData.getMonth() + 1;

    if (nextMonth != 10 && nextMonth != 11 && nextMonth != 12) {
      nextMonth = "0".concat(nextMonth);
    }
    const endData = curData.getFullYear().toString().concat(nextMonth);
    onSearch(searchData, startDate, endData);
  };

  const onSearch = (searchData, startDate, endData) => {
    childRef.current.getData(searchData, startDate, endData);
  };

  return (
    <UnusualStatsForm
      onSearch={onSearch}
      comCode={comCode}
      getSearchData={getSearchData}
      onSearchData={onSearchData}
      ref={childRef}
      handleChange={handleChange}
      state={state}
      searchKeyword={searchKeyword}
      list={list}
    />
  );
}
