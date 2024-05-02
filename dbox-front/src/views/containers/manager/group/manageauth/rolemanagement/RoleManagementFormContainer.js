import RoleManagementForm from "views/templates/manager/group/manageauth/rolemanagement/RoleManagementForm";
import { useState, useEffect, useRef } from "react";
import RoleManagementApi from "apis/rolemanagement-api";
import { get } from "js-cookie";

console.debug("RoleManagementFormContainer.js");

export default function RoleManagementFormContainer() {
  const [tableValue, setTableValue] = useState("G");
  const [roleTableData, setRoleTableData] = useState([]);
  const [alertModalOpened, setAlertModalOpend] = useState(false);
  const [companyCheckValue, setCompanyCheckValue] = useState("C1");
  const [deptCheckValue, setDeptCheckValue] = useState("D1");
  const [auditCheckValue, setAuditCheckValue] = useState("G1");
  const [modalDialogOpen, setModalDialogOpen] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);

  const childRef = useRef();

  const handleChange = (event, tableValue) => {
    tableValue = event.target.value;
    setTableValue(event.target.value);
    setCompanyCheckValue("C1");
    setDeptCheckValue("D1");
    setAuditCheckValue("G1");
  };

  const companyHandleChange = (event) => {
    setCompanyCheckValue(event.target.value);
  };

  const deptHandleChange = (event) => {
    setDeptCheckValue(event.target.value);
  };

  const auditHandleChange = (event) => {
    setAuditCheckValue(event.target.value);
  };

  const closeClearModal = () => {
    setClearOpened(false);
  };

  /**
   * 데이터 불러오기
   */
  const getData = async (tableValue) => {
    try {
      const response = await RoleManagementApi.getRoleManagement({
        params: {
          uDocFlag: tableValue,
        },
      });
      setRoleTableData(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData(tableValue);
  }, [tableValue]);

  /**
   * 알림 모달 열기
   */
  const openAlertDialog = () => {
    setAlertModalOpend(true);
  };

  /**
   * 알림 모달 닫기
   */
  const closeAlertDialog = () => {
    setAlertModalOpend(false);
  };

  /**
   * 업무역할 권한 설정저장
   */
  const updatePolicy = async () => {
    try {
      // 전사문서관리자
      if (companyCheckValue === "C0") {
        for (let i = 0; i < roleTableData.length; i++) {
          if (roleTableData[i].uSelected === "1" && roleTableData[i].uAuthScope === "C") {
            await RoleManagementApi.updatePolicy({
              params: {
                rObjectId: roleTableData[i].rObjectId,
                uSelected: "1",
                uOptionVal: roleTableData[i].uOptionVal === "A" ? "B" : "A",
                uAuthScope: roleTableData[i].uAuthScope,
                uDocFlag: tableValue,
              },
            });
          }
        }
      }
      // 감사
      if (auditCheckValue === "G0") {
        for (let i = 0; i < roleTableData.length; i++) {
          if (roleTableData[i].uSelected === "1" && roleTableData[i].uAuthScope === "G") {
            await RoleManagementApi.updatePolicy({
              params: {
                rObjectId: roleTableData[i].rObjectId,
                uSelected: "1",
                uOptionVal: roleTableData[i].uOptionVal === "A" ? "B" : "A",
                uAuthScope: roleTableData[i].uAuthScope,
                uDocFlag: tableValue,
              },
            });
          }
        }
      }

      // 부서문서관리자
      if (deptCheckValue === "D0") {
        setModalDialogOpen(true);
        for (let i = 0; i < roleTableData.length; i++) {
          if (roleTableData[i].uSelected === "1" && roleTableData[i].uAuthScope === "D") {
            await RoleManagementApi.updatePolicy({
              params: {
                rObjectId: roleTableData[i].rObjectId,
                uSelected: "1",
                uOptionVal: roleTableData[i].uOptionVal,
                unUOptionVal: roleTableData[i].uOptionVal === "A" ? "B" : "A",
                uAuthScope: roleTableData[i].uAuthScope,
                uDocFlag: tableValue,
              },
            });
          }
        }
      }
      setModalDialogOpen(false);
      setAlertModalOpend(false);
      setClearOpened(true);

      getData(tableValue);
      setCompanyCheckValue("C1");
      setDeptCheckValue("D1");
      setAuditCheckValue("G1");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <RoleManagementForm
      roleTableData={roleTableData}
      handleChange={handleChange}
      tableValue={tableValue}
      openAlertDialog={openAlertDialog}
      closeAlertDialog={closeAlertDialog}
      alertModalOpened={alertModalOpened}
      companyHandleChange={companyHandleChange}
      deptHandleChange={deptHandleChange}
      auditHandleChange={auditHandleChange}
      companyCheckValue={companyCheckValue}
      deptCheckValue={deptCheckValue}
      auditCheckValue={auditCheckValue}
      updatePolicy={updatePolicy}
      modalDialogOpen={modalDialogOpen}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
      ref={childRef}
    />
  );
}
