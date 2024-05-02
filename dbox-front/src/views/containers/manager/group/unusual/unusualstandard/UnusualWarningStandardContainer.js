import { React, useEffect, forwardRef, useState, useCallback, useRef } from "react";
import UnusualWarningStandard from "views/templates/manager/group/unusual/unusualstandard/UnusualWarningStandard";
import UnusualApi from "apis/unusual-api";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

console.debug("UnusualWarningStandardContainer.js");

const UnusualWarningStandardContainer = forwardRef((props, ref) => {
  const childRef = useRef(null);
  const [deptObjectId, setDeptObjectId] = useState("");
  const [comObjectId, setComObjectId] = useState("");
  const [countDownload, setCountDownload] = useState("");
  const [countTakeout, setCountTakeout] = useState("");
  const [countReqPermit, setCountReqPermit] = useState("");
  const [countPrint, setCountPrint] = useState("");
  const [countDelete, setCountDelete] = useState("");

  let comCode = props.comCode;
  let companyName = props.companyName;

  useEffect(() => {
    getData(comCode);
  }, []);

  /**
   * 사전Warning 기준값 조회 api
   */
  const getData = async (comCode, uUpDeptCode, deptCode) => {
    try {
      const response = await UnusualApi.getDeptInform({
        params: {
          uComCode: comCode,
          uUpDeptCode: uUpDeptCode,
          uDeptCode: deptCode ? deptCode : comCode,
        },
      });
      setDeptObjectId(response.data.response.deptObjectId);
      setComObjectId(response.data.response.comObjectId);
      setCountDownload(response.data.response.uCountDownload);
      setCountTakeout(response.data.response.uCountTakeout);
      setCountReqPermit(response.data.response.uCountReqPermit);
      setCountPrint(response.data.response.uCountPrint);
      setCountDelete(response.data.response.uCountDelete);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 사전Warning 기준값 사별 전체 api
   */
  const getDataAll = async (comCode) => {
    try {
      const response = await UnusualApi.getDeptInformAll({
        params: {
          uComCode: comCode,
          uDeptCode: comCode,
        },
      });

      return response;
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 엑셀다운로드
   */
  const handleExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(companyName);

    const response = await getDataAll(comCode);

    worksheet.columns = [
      { key: "deptName", width: 20 },
      { key: "download", width: 10 },
      { key: "takeout", width: 10 },
      { key: "permit", width: 10 },
      { key: "print", width: 10 },
      { key: "delete", width: 10 },
    ];

    worksheet.getRow(2).values = ["", "다운로드", "반출", "권한신청", "출력", "삭제"];

    response.data.response.map((item) => {
      worksheet.addRow({
        deptName: item.deptName,
        download: item.uCountDownload,
        takeout: item.uCountTakeout,
        permit: item.uCountReqPermit,
        print: item.uCountPrint,
        delete: item.uCountDelete,
      });
    });

    //병합
    worksheet.mergeCells("A1:A2");
    worksheet.getCell("A1").value = "부서";

    worksheet.getCell("A1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.mergeCells("B1:F1");
    worksheet.getCell("B1").value = "기준값";

    worksheet.getCell("B1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    ["A1", "B1", "B2", "C2", "D2", "E2", "F2"].map((key) => {
      worksheet.getCell(key).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c9c5ca" },
      };
    });

    ["A1", "B1", "B2", "C2", "D2", "E2", "F2"].map((key) => {
      worksheet.getCell(key).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
    const mimeType = { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], mimeType);
    saveAs(blob, "사전기준값.xlsx");
  };

  const onChangeDownload = useCallback((e) => {
    setCountDownload(e.target.value);
  }, []);

  const onChangeTakeout = useCallback((e) => {
    setCountTakeout(e.target.value);
  }, []);

  const onChangeReqPermit = useCallback((e) => {
    setCountReqPermit(e.target.value);
  }, []);

  const onChangePrint = useCallback((e) => {
    setCountPrint(e.target.value);
  }, []);

  const onChangeDelete = useCallback((e) => {
    setCountDelete(e.target.value);
  }, []);

  const onUpdate = async (uComCode, uDeptCode, type) => {
    try {
      const response = await UnusualApi.patchDeptInform({
        params: {
          type: type,
          uComCode: uComCode,
          uDeptCode: uDeptCode,
          uCountDownload: countDownload,
          uCountTakeout: countTakeout,
          uCountReqPermit: countReqPermit,
          uCountPrint: countPrint,
          uCountDelete: countDelete,
        },
      });

      if (response.status == 200) {
        console.log("OK");
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onSave = async () => {
    const updateDept = childRef.current.getUpdateDept();
    const childrenDept = childRef.current.getChildrenDept();

    /**
     * 자식 update
     */
    if (updateDept.orgId == comCode) {
      childrenDept.map((item) => {
        onUpdate(item.comOrgId, item.orgId, "C");
      });
    }

    onUpdate(updateDept ? updateDept.comOrgId : comCode, updateDept ? updateDept.orgId : comCode, "D");
  };

  return (
    <UnusualWarningStandard
      comCode={comCode}
      getData={getData}
      companyName={companyName}
      countDownload={countDownload}
      countTakeout={countTakeout}
      countReqPermit={countReqPermit}
      countPrint={countPrint}
      countDelete={countDelete}
      onChangeDownload={onChangeDownload}
      onChangeTakeout={onChangeTakeout}
      onChangeReqPermit={onChangeReqPermit}
      onChangePrint={onChangePrint}
      onChangeDelete={onChangeDelete}
      onSave={onSave}
      handleExcel={handleExcel}
      ref={childRef}
    />
  );
});

export default UnusualWarningStandardContainer;
