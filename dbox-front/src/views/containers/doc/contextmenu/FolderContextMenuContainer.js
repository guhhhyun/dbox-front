import { useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Typography } from "@material-ui/core";
import FolderContextMenu from "views/templates/doc/contextmenu/FolderContextMenu";
import { useContextMenu } from "views/containers/doc/contextmenu/ContextMenuProvider";
import DataApi from "apis/data-api";
import { KUPLOAD_ID } from "constants/global-constants";
import { CLIPBOARD_TYPE, DATA_TYPE, TREE_KEY_DIVIDER } from "constants/code-constants";
import { ALERT_DIALOG, useGlobalDialog } from "views/commons/dialog/GlobalDialogProvider";
import CommonUtil from "utils/common-util";
import FormatUtil from "utils/format-util";

console.debug("FolderContextMenuContainer.js");

export default function FolderContextMenuContainer({ open, pos, data, gridRef }) {
  const { enqueueSnackbar } = useSnackbar();
  const { closeContextMenu } = useContextMenu();
  const { openDialog } = useGlobalDialog();

  const user = useSelector((state) => state.session.user);
  const contextMenuRef = useRef(null);

  /**
   * 폴더 잠금 클릭
   */
  const clickLock = async () => {
    try {
      const dataId = data.data.key.split(TREE_KEY_DIVIDER)[0];

      await DataApi.lockDataOne({ params: { dataId } });
      window.location.reload();
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
  };

  /**
   * 폴더 잠금해제 클릭
   */
  const clickUnlock = async () => {
    try {
      const dataId = data.data.key.split(TREE_KEY_DIVIDER)[0];

      await DataApi.unlockDataOne({ params: { dataId } });
      window.location.reload();
    } catch (error) {
      CommonUtil.printAuthorizedError(error, enqueueSnackbar);
    }
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
   * 폴더 속성 열기
   */
  const openFolderProperty = () => {
    const dataId = data.data.key.split(TREE_KEY_DIVIDER)[0];
    contextMenuRef.current?.folderProperty.openModal(dataId);
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
  const clickDownload = async () => {
    if (window.RAONKUPLOAD.GetTotalFileCount() > 0) {
      window.RAONKUPLOAD.DeleteAllFile(KUPLOAD_ID); //기존 upload내역이 남아있는 경우가 있어서 추가
    }
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
            window.RAONKUPLOAD.AddUploadedFile(fileKey, filePath, fileKey, fileSize, "", KUPLOAD_ID);
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
        window.RAONKUPLOAD.AddUploadedFile(fileKey, newFileName, fileKey, fileSize, "", KUPLOAD_ID);
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
      if (total == ++index) {
        openDialog(ALERT_DIALOG, {
          title: "다운로드 실패",
          children: (
            <Fragment>
              [ {failedList.toString()} ] 항목 다운로드에 실패했습니다.
              <br />
            </Fragment>
          ),
        });
      }
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
    const filteredFolders = selectedRows.filter((item) => item.data?.dataType === DATA_TYPE.FOLDER.key);
    const mappedFolders = filteredFolders.map((item) => item.data?.rObjectId);

    const form = {
      uptPthGbn: CLIPBOARD_TYPE.MOVE,
      sourceFolders: mappedFolders,
      sourceFiles: [],
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
    const filteredFolders = selectedRows.filter((item) => item.data?.dataType === DATA_TYPE.FOLDER.key);
    const mappedFolders = filteredFolders.map((item) => item.data?.rObjectId);

    const form = {
      uptPthGbn: CLIPBOARD_TYPE.COPY,
      sourceFolders: mappedFolders,
      sourceFiles: [],
      sourcePjts: [],
      sourceRscs: [],
    };
    const json = JSON.stringify(form);
    CommonUtil.copyString(json);
  };

  return (
    <FolderContextMenu
      ref={contextMenuRef}
      open={open}
      posX={pos?.x}
      posY={pos?.y}
      data={data?.data?.data}
      onLockClick={clickLock}
      onUnlockClick={clickUnlock}
      onDeleteClick={clickDelete}
      onEditNameClick={clickEditName}
      onFolderPropertyClick={openFolderProperty}
      onMultipleAuthPropertyClick={clickMultipleAuthProperty}
      onDownloadClick={clickDownload}
      onTransferClick={openTransfer}
      onMoveClick={clickMove}
      onCopyClick={clickCopy}
      onClose={closeContextMenu}
    />
  );
}
