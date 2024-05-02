import { useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import DocContextMenu from "views/templates/doc/contextmenu/DocContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";
import DataApi from "apis/data-api";
import { KUPLOAD_ID } from "constants/global-constants";
import { CLIPBOARD_DIVIDER, CLIPBOARD_TYPE, DATA_TYPE } from "constants/code-constants";
import { ALERT_DIALOG, useGlobalDialog } from "views/commons/dialog/GlobalDialogProvider";
import { DOWNLOAD_LINK } from "constants/url-constants";
import { CATEGORY_FOLDER } from "constants/code-constants";
import format from "string-format";
import FormatUtil from "utils/format-util";
import CommonUtil from "utils/common-util";

console.debug("DocContextMenuContainer.js");

export default function DocContextMenuContainer({ open, pageKey, pos, data, gridRef }) {
  const { closeContextMenu } = useContextMenu();
  const { openDialog } = useGlobalDialog();

  const user = useSelector((state) => state.session.user);
  const nodeId = useSelector((state) => state.doc.id[pageKey]);
  const contextMenuRef = useRef(null);

  /**
   * URL 복사
   */
  const clickUrlCopy = () => {
    const linkUrl = format(DOWNLOAD_LINK, data.data.data.rObjectId);

    CommonUtil.copyString(linkUrl);

    alert("URL이 정상적으로 복사되었습니다.");
  };

  /**
   * 자료버전 갱신 열기
   */
  const clickVersionUp = () => {
    contextMenuRef.current?.versionUp.openModal();
  };

  /**
   * 복호화 반출 요청 열기
   */
  const clickTakeout = () => {
    contextMenuRef.current?.takeout.openModal(data.data.key.split("_")[0]);
  };

  /**
   * 문서 속성 열기
   */
  const clickDocProperty = () => {
    contextMenuRef.current?.docProperty.openModal(data.data.key.split("_")[0]);
  };

  /**
   * 삭제 클릭
   */
  const clickDelete = () => {
    contextMenuRef.current?.delete.deleteDoc({});
  };

  /**
   * 이름바꾸기 클릭
   */
  const clickEditName = () => {
    gridRef.current.grid.api.startEditingCell({
      colKey: "name",
      rowIndex: data.rowIndex,
    });
  };

  /**
   * 권한일괄변경 클릭
   */
  const clickMultipleAuthProperty = () => {
    contextMenuRef.current?.multipleAuthProperty.openModal();
  };

  /**
   * 다운로드 클릭
   */
  const clickDownload = async (event) => {
    if (window.RAONKUPLOAD.GetTotalFileCount() > 0) {
      window.RAONKUPLOAD.DeleteAllFile(KUPLOAD_ID); //기존 upload내역이 남아있는 경우가 있어서 추가
    }
    const isTakeout = data.data.isTakeout ? true : false;
    if (isTakeout && data.data.reqStatusCode !== "A") {
      openDialog(ALERT_DIALOG, {
        title: "미승인 문서",
        children: (
          <Fragment>
            [ {data.data.name} ]은 반출 승인된 문서가 아닙니다.
            <br />
          </Fragment>
        ),
      });
      return;
    }
    console.log(data);
    let total = 0,
      index = 0;
    const failedList = new Array();
    const dataList = gridRef.current?.grid.api.getSelectedNodes().map((item) => item.data.data);
    for await (let data of dataList) {
      if (data.dataType === DATA_TYPE.FOLDER.key) {
        try {
          const response = await DataApi.getDataDescendants({ params: { dataId: data.rObjectId, download: true } });
          const descendantList = response.data.response;
          descendantList.forEach((item) => {
            const fileKey = item.rObjectId;
            const fileSize = item.rContentSize;
            const filePath = item.path;
            window.RAONKUPLOAD.AddUploadedFile(fileKey, filePath, fileKey, fileSize, isTakeout, KUPLOAD_ID);
            total++;
          });
        } catch (e) {
          failedList.push(data.uFolName);
        }
      } else if (data.dataType === DATA_TYPE.DOCUMENT.key) {
        const fileKey = data.rObjectId;
        const fileName = data.objectName;
        const fileSize = data.rContentSize;
        const newFileName = FormatUtil.fileNameFormat(data, user);
        window.RAONKUPLOAD.AddUploadedFile(fileKey, newFileName, fileKey, fileSize, isTakeout, KUPLOAD_ID);
        total++;
      }
    }
    if (window.RAONKUPLOAD.GetTotalFileCount() > 0) {
      window.RAONKUPLOAD.AddHttpHeader("Cookie", document.cookie, KUPLOAD_ID);
      window.RAONKUPLOAD.DownloadAllFile(KUPLOAD_ID);
      window.RAONKUPLOAD.DeleteAllFile(KUPLOAD_ID);
    } else {
      alert("다운로드할 파일이 없습니다.");
    }

    window.RAONKUPLOAD_DownloadCompleteFile = async (uploadId, paramObj) => {
      console.log("다운로드 RAONKUPLOAD_DownloadCompleteFile");
      // debugger
      // console.log("aaa");
      // if (total == ++index) {
      //   console.log("---bbb");
      //   openDialog(ALERT_DIALOG, {
      //     title: "다운로드 실패",
      //     children: (
      //       <Fragment>
      //         [ {failedList.toString()} ] 항목 다운로드에 실패했습니다.
      //         <br />
      //       </Fragment>
      //     ),
      //   });
      // }
    };
  };

  /**
   * 자료이관 열기
   */
  const openTransfer = () => {
    contextMenuRef.current?.transfer.openModal();
  };

  /**
   * 자료 이동
   */
  const clickMove = () => {
    const selectedRows = gridRef.current?.grid.api.getSelectedRows();
    const filteredFiles = selectedRows.filter((item) => item.data?.dataType === DATA_TYPE.DOCUMENT.key);
    const mappedFiles = filteredFiles.map((item) => item.data?.rObjectId);

    const form = {
      uptPthGbn: CLIPBOARD_TYPE.MOVE,
      sourceFolders: [],
      sourceFiles: mappedFiles,
      sourcePjts: [],
      sourceRscs: [],
    };
    const json = JSON.stringify(form);
    CommonUtil.copyString(json);
  };

  /**
   * 자료 복사
   */
  const clickCopy = () => {
    const selectedRows = gridRef.current?.grid.api.getSelectedRows();
    const filteredFiles = selectedRows.filter((item) => item.data?.dataType === DATA_TYPE.DOCUMENT.key);
    const mappedFiles = filteredFiles.map((item) => item.data?.rObjectId);

    const form = {
      uptPthGbn: CLIPBOARD_TYPE.COPY,
      sourceFolders: [],
      sourceFiles: mappedFiles,
      sourcePjts: [],
      sourceRscs: [],
    };
    const json = JSON.stringify(form);
    CommonUtil.copyString(json);
  };

  return (
    <DocContextMenu
      ref={contextMenuRef}
      nodeId={nodeId}
      open={open}
      posX={pos?.x}
      posY={pos?.y}
      data={data}
      onUrlCopyClick={clickUrlCopy}
      onTakeoutClick={clickTakeout}
      onDocPropertyClick={clickDocProperty}
      onDeleteClick={clickDelete}
      onEditNameClick={clickEditName}
      onMultipleAuthPropertyClick={clickMultipleAuthProperty}
      onDownloadClick={clickDownload}
      onTransferClick={openTransfer}
      onMoveClick={clickMove}
      onCopyClick={clickCopy}
      onClose={closeContextMenu}
    />
  );
}
