import { Fragment } from "react";
import { Typography, makeStyles, Button } from "@material-ui/core";
import { Folder, InsertDriveFile, Save } from "@material-ui/icons";
import { KUPLOAD_ID } from "constants/global-constants";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: theme.spacing(1),
    fontSize: "14px",
    verticalAlign: "middle",
  },
}));

// window.WSFileOpen(rObjectId, contentVersion, fileName, 1);  // 1: 덮어쓰기, 2: 버전갱신
export default function DocLockStatusModal({ opened, closeModal, docModalObj }) {
  const classes = useStyles();
  const downloadDoc = () => {
    //다운로드
    const fileKey = docModalObj.fileKey;
    const fileName = docModalObj.fileName;
    const fileSize = docModalObj.fileSize;
    window.RAONKUPLOAD.AddUploadedFile(fileKey, fileName, fileKey, fileSize, "", KUPLOAD_ID);

    window.RAONKUPLOAD.AddHttpHeader("Cookie", document.cookie, KUPLOAD_ID);
    window.RAONKUPLOAD.DownloadAllFile(KUPLOAD_ID);
    window.RAONKUPLOAD.DeleteAllFile(KUPLOAD_ID);
    closeModal();
  };
  const readOnly = () => { 
    window.WSFileOpen(docModalObj.rObjectId, docModalObj.contentVersion, docModalObj.fileName, "4");  // 1: 덮어쓰기, 2: 버전갱신
    closeModal();
  };
  return (
    <Fragment>
      <DynamicButtonModalDialog
        open={opened}
        title="문서 보기"
        content="문서가 잠금상태입니다."
        onClose={closeModal}
        buttons={
          <Fragment>
            <Button color="primary" onClick={readOnly} className={classes.btnAction}>
              읽기모드
            </Button>
            <Button color="default" onClick={downloadDoc} className={classes.btnAction}>
              다운로드
            </Button>
            <Button color="default" onClick={closeModal} className={classes.btnAction}>
              닫기
            </Button>
          </Fragment>
        }
        maxWidth="xs"
        fullWidth
      />
    </Fragment>
  );
}
