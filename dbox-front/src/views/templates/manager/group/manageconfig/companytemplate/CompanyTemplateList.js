import { Fragment } from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@material-ui/core";
import { Create, Delete, AddCircle } from "@material-ui/icons";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import CompanyTemplateUpdateDialogContainer from "views/containers/manager/group/manageconfig/companytemplate/CompanyTemplateUpdateDialogContainer";
import CompanyTemplateCreateDialogContainer from "views/containers/manager/group/manageconfig/companytemplate/CompanyTemplateCreateDialogContainer";
import ModalDialog from "views/commons/dialog/ModalDialog";

console.log("CompanyTemplateList.js");

export default function CompanyTemplateList({
  modalParamNum,
  updateModalOpened,
  deleteModalOpened,
  createModalOpened,
  warnModalOpened,
  onUpdateButtonClick,
  onDeleteButtonClick,
  onCreateButtonClick,
  closeUpdateModal,
  closeDeleteModal,
  closeCreateModal,
  closeWarnModal,
  templateData,
  handleFileChange,
  handleFileUpload,
  handleTemplateNameChange,
  templateName,
  updateOkButtonClick,
  clearModalOpened,
  closeClearModal,
  deleteOkButtonClick,
  warnModalOpened2,
  closeWarnModal2,
  closeFileWarnModal,
  fileWarnModalOpened,
}) {
  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">템플릿 구분</TableCell>
              <TableCell align="center">템플릿 이름</TableCell>
              <TableCell align="center">그룹 공통</TableCell>
              <TableCell align="center" colSpan="3" padding="none"></TableCell>
            </TableRow>
          </TableHead>
          {templateData.map((x, index) => (
            <TableBody>
              <TableRow key={index}>
                <TableCell align="center" rowSpan="2">
                  {index === 0 || index === 1 ? "PowerPoint" : index === 2 ? "Excel" : index === 3 ? "Word" : ""}
                </TableCell>
                <TableCell align="center" style={{ padding: "12px" }}>
                  {x.uTemplateName}
                </TableCell>
                <TableCell align="center" style={{ padding: "12px" }}>
                  {x.objectName}
                </TableCell>
                <TableCell align="center" padding="none">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      onUpdateButtonClick(x.uSortOrder);
                    }}
                  >
                    <Create fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center" padding="none">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      onDeleteButtonClick(x.uSortOrder);
                    }}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </TableCell>
                <TableCell align="center" padding="none">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => {
                      onCreateButtonClick(x.uSortOrder);
                    }}
                  >
                    <AddCircle fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
          <ConfirmDialog
            open={updateModalOpened}
            title="템플릿 수정"
            maxWidth="sm"
            fullWidth
            okText="수정"
            cancelText="취소"
            onOkClick={() => {
              updateOkButtonClick(modalParamNum);
            }}
            onClose={closeUpdateModal}
          >
            <CompanyTemplateUpdateDialogContainer
              modalParamNum={modalParamNum}
              templateData={templateData}
              handleTemplateNameChange={handleTemplateNameChange}
              templateName={templateName}
            />
          </ConfirmDialog>
          <ConfirmDialog
            open={deleteModalOpened}
            title="템플릿 삭제"
            content="선택한 템플릿 파일을 삭제하시겠습니까?"
            maxWidth="sm"
            fullWidth
            okText="예"
            cancelText="아니요"
            onOkClick={() => {
              deleteOkButtonClick(modalParamNum);
            }}
            onClose={closeDeleteModal}
          ></ConfirmDialog>
          <ConfirmDialog
            open={createModalOpened}
            title="템플릿 등록"
            maxWidth="sm"
            fullWidth
            okText="예"
            cancelText="아니요"
            onOkClick={() => {
              handleFileUpload(modalParamNum);
            }}
            onClose={closeCreateModal}
          >
            <CompanyTemplateCreateDialogContainer
              templateData={templateData}
              modalParamNum={modalParamNum}
              handleFileChange={handleFileChange}
              handleTemplateNameChange={handleTemplateNameChange}
            />
          </ConfirmDialog>
          <ModalDialog
            open={warnModalOpened}
            content="파일이 존재하지 않습니다."
            okText="닫기"
            onOkClick={closeWarnModal}
            onClose={closeWarnModal}
            maxWidth="sm"
            fullWidth
          ></ModalDialog>
          <ModalDialog
            open={warnModalOpened2}
            content="파일이 이미 존재합니다."
            okText="닫기"
            onOkClick={closeWarnModal2}
            onClose={closeWarnModal2}
            maxWidth="sm"
            fullWidth
          ></ModalDialog>
          <ModalDialog
            open={fileWarnModalOpened}
            content="모든 내용을 입력해주세요."
            okText="닫기"
            onOkClick={closeFileWarnModal}
            onClose={closeFileWarnModal}
            maxWidth="sm"
            fullWidth
          ></ModalDialog>
          <ModalDialog
            open={clearModalOpened}
            content="변경사항이 반영되었습니다."
            okText="닫기"
            onOkClick={closeClearModal}
            onClose={closeClearModal}
            maxWidth="sm"
            fullWidth
          ></ModalDialog>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
