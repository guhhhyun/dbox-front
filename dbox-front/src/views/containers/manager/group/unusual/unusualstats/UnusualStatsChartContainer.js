import React, { Fragment, useEffect, useState, useRef } from "react";
import LogOddApi from "apis/logodd-api";
import UnusualStatsChart from "views/templates/manager/group/unusual/unusualstats/UnusualStatsChart";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

console.debug("UnusualStatsChartContainer.js");

export default function UnusualStatsChartContainer({ search, result, cntResult, data, month }) {
  const [searchData, setSearchData] = useState();
  const [searchDataName, setSearchDataName] = useState();
  const [downloadData, setDownloadData] = useState();
  const [takeoutData, setTakeoutData] = useState();
  const [authReqData, setAuthReqData] = useState();
  const [printData, setPrintData] = useState();
  const [deleteData, setDeleteData] = useState();

  const [downloadExcelData, setDownloadExcelData] = useState();
  const [takeoutExcelData, setTakeoutExcelData] = useState();
  const [authReqExcelData, setAuthReqExcelData] = useState();
  const [printExcelData, setPrintExcelData] = useState();
  const [deleteExcelData, setDeleteExcelData] = useState();

  let chartColumn = ["x", "일별이력", "전월이력(부서)", "전월이력(개인)", "안내기준"];

  let downloadList = new Array(chartColumn);
  let takeoutList = new Array(chartColumn);
  let authReqList = new Array(chartColumn);
  let printList = new Array(chartColumn);
  let deleteList = new Array(chartColumn);

  let excelColumn = { c1: "일자", c2: "일별이력" };

  let downloadExcelList = new Array(excelColumn);
  let takeoutExcelList = new Array(excelColumn);
  let authReqExcelList = new Array(excelColumn);
  let printExcelList = new Array(excelColumn);
  let deleteExcelList = new Array(excelColumn);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = () => {
    try {
      /**
       * 전월 이력, 개인이력 데이터
       */
      if (data.length === 0) {
        downloadList = [...downloadList, [0, 0, 0, 0, 0]];
        takeoutList = [...takeoutList, [0, 0, 0, 0, 0]];
        authReqList = [...authReqList, [0, 0, 0, 0, 0]];
        printList = [...printList, [0, 0, 0, 0, 0]];
        deleteList = [...deleteList, [0, 0, 0, 0, 0]];
      } else {
        data.map((item) => {
          downloadList = [
            ...downloadList,
            [
              Number(item.day),
              Number(item.uDownloadCnt),
              Number(result.uDownloadCntLmonDept),
              Number(result.uDownloadCntLmonUser),
              Number(cntResult.uCountDownload),
            ],
          ];
          takeoutList = [
            ...takeoutList,
            [
              Number(item.day),
              Number(item.uTakeoutCnt),
              Number(result.uTakeoutCntLmonDept),
              Number(result.uTakeoutCntLmonUser),
              Number(cntResult.uCountTakeout),
            ],
          ];
          authReqList = [
            ...authReqList,
            [
              Number(item.day),
              Number(item.uAuthreqCnt),
              Number(result.uAuthreqCntLmonDept),
              Number(result.uAuthreqCntLmonUser),
              Number(cntResult.uCountReqPermit),
            ],
          ];
          printList = [
            ...printList,
            [Number(item.day), Number(item.uPrintCnt), Number(result.uPrintCntLmonDept), Number(result.uPrintCntLmonUser), Number(cntResult.uCountPrint)],
          ];
          deleteList = [
            ...deleteList,
            [Number(item.day), Number(item.uDeleteCnt), Number(result.uDeleteCntLmonDept), Number(result.uDeleteCntLmonUser), Number(cntResult.uCountDelete)],
          ];

          /**
           * 엑셀 데이터
           */

          downloadExcelList = [
            ...downloadExcelList,
            {
              c1: month + "-" + Number(item.day),
              c2: Number(item.uDownloadCnt),
            },
          ];

          takeoutExcelList = [
            ...takeoutExcelList,
            {
              c1: month + "-" + Number(item.day),
              c2: Number(item.uTakeoutCnt),
            },
          ];

          authReqExcelList = [
            ...authReqExcelList,
            {
              c1: month + "-" + Number(item.day),
              c2: Number(item.uAuthreqCnt),
            },
          ];

          printExcelList = [
            ...printExcelList,
            {
              c1: month + "-" + Number(item.day),
              c2: Number(item.uPrintCnt),
            },
          ];

          deleteExcelList = [
            ...deleteExcelList,
            {
              c1: month + "-" + Number(item.day),
              c2: Number(item.uDeleteCnt),
            },
          ];
        });
      }

      switch (search) {
        case "DL":
          setSearchDataName("다운로드 이력");
          setDownloadData(downloadList);
          break;
        case "TO":
          setSearchDataName("반출 이력");
          setSearchData(takeoutList);
          break;
        case "AR":
          setSearchDataName("권한신청 이력");
          setSearchData(authReqList);
          break;
        case "PT":
          setSearchDataName("출력 이력");
          setSearchData(printList);
          break;
        case "DT":
          setSearchDataName("삭제 이력");
          setSearchData(deleteList);
          break;
        default:
          setDownloadData(downloadList);
          setTakeoutData(takeoutList);
          setAuthReqData(authReqList);
          setPrintData(printList);
          setDeleteData(deleteList);
          break;
      }
      setDownloadExcelData(downloadExcelList);
      setTakeoutExcelData(takeoutExcelList);
      setAuthReqExcelData(authReqExcelList);
      setPrintExcelData(printExcelList);
      setDeleteExcelData(deleteExcelList);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 엑셀다운로드
   */
  const handleExcel = async (param, e) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(month);
    let fileName = "";

    worksheet.columns = [
      { key: "c1", width: 10 },
      { key: "c2", width: 10 },
    ];

    worksheet.getRow(1).values = ["전월이력(부서)", "전월이력(개인)", "안내기준"];

    switch (param) {
      case "DL":
        fileName = "다운로드";
        worksheet.getRow(2).values = [result.uDownloadCntLmonDept, result.uDownloadCntLmonUser, cntResult.uCountDownload];
        Object.values(downloadExcelData).map((item) => {
          worksheet.addRow({
            c1: item.c1,
            c2: item.c2,
          });
        });
        break;
      case "TO":
        fileName = "반출";
        worksheet.getRow(2).values = [result.uTakeoutCntLmonDept, result.uTakeoutCntLmonUser, cntResult.uCountTakeout];
        Object.values(takeoutExcelData).map((item) => {
          worksheet.addRow({
            c1: item.c1,
            c2: item.c2,
          });
        });

        break;
      case "AR":
        fileName = "권한신청";
        worksheet.getRow(2).values = [result.uAuthreqCntLmonDept, result.uAuthreqCntLmonUser, cntResult.uCountReqPermit];
        Object.values(authReqExcelData).map((item) => {
          worksheet.addRow({
            c1: item.c1,
            c2: item.c2,
          });
        });
        break;
      case "PT":
        fileName = "출력";
        worksheet.getRow(2).values = [result.uPrintCntLmonDept, result.uPrintCntLmonUser, cntResult.uCountPrint];
        Object.values(printExcelData).map((item) => {
          worksheet.addRow({
            c1: item.c1,
            c2: item.c2,
          });
        });
        break;
      case "DT":
        fileName = "삭제";
        worksheet.getRow(2).values = [result.uDeleteCntLmonDept, result.uDeleteCntLmonUser, cntResult.uCountDelete];
        Object.values(deleteExcelData).map((item) => {
          worksheet.addRow({
            c1: item.c1,
            c2: item.c2,
          });
        });
        break;
      default:
        break;
    }
    const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], mimeType);
    saveAs(blob, fileName + " 이력.xlsx");
  };

  const options = {
    title: " ",
    // curveType: "function",
    legend: { position: "bottom" },
  };

  return (
    <UnusualStatsChart
      search={search}
      searchData={searchData}
      searchDataName={searchDataName}
      downloadData={downloadData}
      takeoutData={takeoutData}
      authReqData={authReqData}
      printData={printData}
      deleteData={deleteData}
      options={options}
      handleExcel={handleExcel}
    />
  );
}
