import TemplateApi from "apis/template-api";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import CompanyTemplateList from "views/templates/manager/group/manageconfig/companytemplate/CompanyTemplateList";

console.debug("CompanyTemplateListContainer.js");

const CompanyTemplateListContainer = forwardRef(({ company }, ref) => {
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [warnModalOpened, setWarnModalOpened] = useState(false);
  const [warnModalOpened2, setWarnModalOpened2] = useState(false);
  const [fileWarnModalOpened, setFileWarnModalOpened] = useState(false);
  const [clearModalOpened, setClearModalOpened] = useState(false);
  const [modalParamNum, setModalParamNum] = useState("");
  const [templateData, setTemplateData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [templateName, setTemplateName] = useState(null);

  //파일선택, 확장자 유효성 검사
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTemplateNameChange = (event, templateName) => {
    templateName = event.target.value;
    setTemplateName(event.target.value);
  };

  useImperativeHandle(ref, () => ({
    getData,
  }));

  const onUpdateButtonClick = (params) => {
    if (templateData[params - 1].uDeleteStatus === "0") {
      setUpdateModalOpened(true);
      setModalParamNum(params);
    } else if (templateData[params - 1].uDeleteStatus === "1") {
      setWarnModalOpened(true);
    }
  };
  const onDeleteButtonClick = (params) => {
    if (templateData[params - 1].uDeleteStatus === "0") {
      setDeleteModalOpened(true);
      setModalParamNum(params);
    } else if (templateData[params - 1].uDeleteStatus === "1") {
      setWarnModalOpened(true);
    }
  };
  const onCreateButtonClick = (params) => {
    if (templateData[params - 1].uDeleteStatus === "1") {
      setCreateModalOpened(true);
      setModalParamNum(params);
    } else if (templateData[params - 1].uDeleteStatus === "0") {
      setWarnModalOpened2(true);
    }
  };

  const closeUpdateModal = () => {
    setUpdateModalOpened(false);
    setTemplateName(null);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpened(false);
  };
  const closeCreateModal = () => {
    setCreateModalOpened(false);
  };
  const closeWarnModal = () => {
    setWarnModalOpened(false);
  };
  const closeWarnModal2 = () => {
    setWarnModalOpened2(false);
  };
  const closeFileWarnModal = () => {
    setFileWarnModalOpened(false);
  };
  const closeClearModal = () => {
    setClearModalOpened(false);
  };

  /**
   * 템플릿 이름 수정
   */
  const updateOkButtonClick = async (num) => {
    if (templateData[num - 1].uDeleteStatus === "0") {
      try {
        await TemplateApi.templateNameUpdate({
          params: {
            rObjectId: templateData[num - 1].rObjectId,
            objectName: templateName === null ? templateData[num - 1].objectName : templateName,
          },
        });
      } catch (e) {
        console.error(e);
      }
      setClearModalOpened(true);
      setUpdateModalOpened(false);
      setTemplateName(null);
      getData(company);
    }
  };

  /**
   * 템플릿 삭제
   */
  const deleteOkButtonClick = async (num) => {
    try {
      await TemplateApi.deleteTemplate({
        params: {
          rObjectId: templateData[num - 1].rObjectId,
        },
      });
    } catch (e) {
      console.error(e);
    }
    setClearModalOpened(true);
    setDeleteModalOpened(false);
    getData(company);
  };

  /**
   * 데이터 불러오기
   */
  const getData = async (company) => {
    try {
      const response = await TemplateApi.getTemplateList({
        params: {
          comOrgId: company,
          delStatus: "all",
        },
      });
      setTemplateData(response.data.response);
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 템플릿 생성
   */
  const handleFileUpload = async (num) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    var rObjectId = templateData[num - 1].rObjectId;
    var objectName = templateName;
    var url = ("/api/templates/" + rObjectId + "/patch/" + objectName).toString();
    if (selectedFile != undefined && selectedFile != null && templateName != null && templateName != "") {
      try {
        await axios
          .patch(url, formData)
          .then((response) => {
            console.log("response : ", JSON.stringify(response, null, 2));
          })
          .catch((error) => {
            console.log("failed", error);
          });
      } catch (e) {
        console.error(e);
      }
      setClearModalOpened(true);
      setCreateModalOpened(false);
      setSelectedFile(null);
      getData(company);
    } else {
      setFileWarnModalOpened(true);
    }
  };

  useEffect(() => {
    getData(company);
  }, [company]);

  return (
    <CompanyTemplateList
      modalParamNum={modalParamNum}
      updateModalOpened={updateModalOpened}
      deleteModalOpened={deleteModalOpened}
      createModalOpened={createModalOpened}
      warnModalOpened={warnModalOpened}
      onUpdateButtonClick={onUpdateButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onCreateButtonClick={onCreateButtonClick}
      closeUpdateModal={closeUpdateModal}
      closeDeleteModal={closeDeleteModal}
      closeCreateModal={closeCreateModal}
      closeWarnModal={closeWarnModal}
      templateData={templateData}
      handleFileChange={handleFileChange}
      handleFileUpload={handleFileUpload}
      handleTemplateNameChange={handleTemplateNameChange}
      templateName={templateName}
      updateOkButtonClick={updateOkButtonClick}
      clearModalOpened={clearModalOpened}
      closeClearModal={closeClearModal}
      deleteOkButtonClick={deleteOkButtonClick}
      warnModalOpened2={warnModalOpened2}
      closeWarnModal2={closeWarnModal2}
      closeFileWarnModal={closeFileWarnModal}
      fileWarnModalOpened={fileWarnModalOpened}
    />
  );
});

export default CompanyTemplateListContainer;
