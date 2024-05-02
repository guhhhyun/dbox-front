import { Fragment, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import queryString from "query-string";
import CommonUtil from "utils/common-util";
import { useSnackbar } from "notistack";
import DocAuthRequestModalContainer from "views/containers/doc/modals/auth/DocAuthRequestModalContainer";
import UrlDownload from "views/templates/download/UrlDownload";
import DocOpenModalContainer from "../doc/modals/download/DocOpenContainer";
import DataApi from "apis/data-api";
import { KUPLOAD_ID } from "constants/global-constants";
import { PERMIT_TYPE } from "constants/code-constants";
import { HttpStatus, TOKEN } from "constants/http-constants";
import ExternalApi from "apis/external-api";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";

console.debug("UrlDownloadContainer.js");

export default function UrlDownloadContainer({ match, location }) {
  const history = useHistory();

  const parsed = queryString.parse(history.location.search);

  const dataId = match.params.dataId;

  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({
    objectName: parsed.name,
  });
  const [show, setShow] = useState(false);

  const authRef = useRef(null);
  const openRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        if (CommonUtil.isObjectId(dataId)) {
          if (CommonUtil.isMobile()) {
            // 모바일일 경우 뷰어 화면 표시
            const token = CommonUtil.getCookie(TOKEN);
            const response = await ExternalApi.getViewer({ params: { dataId, token } });
            window.location.href = response.data.response;
          } else {
            setShow(true);
            const response = await DataApi.getDataOne({ params: { dataId, isUDocKey: true } });
            setData(response.data.response);

            // 편집/삭제 권한이 있을 경우 읽기모드/편집모드 선택 모달 표시
            if (response.data.response.maxLevel === PERMIT_TYPE.DELETE.level) openRef.current.openModal();
            // 읽기/다운로드 권한만 있을 경우 읽기모드 열기
            if (response.data.response.maxLevel === PERMIT_TYPE.READ.level) openRef.current.clickRead();
          }
        } else {
          alert("정상적인 아이디가 아닙니다.");
        }
      } catch (error) {
        if (error?.response?.status === HttpStatus.FORBIDDEN) return authRef.current.openModal(dataId);
        CommonUtil.printAuthorizedError(error, enqueueSnackbar);
      }
    })();
  }, []);

  /**
   * 다운로드 버튼 클릭
   */
  const clickDownload = () => {
    const fileKey = data.rObjectId;
    const fileName = data.objectName;
    const fileSize = data.rContentSize;
    window.RAONKUPLOAD.AddUploadedFile(fileKey, fileName, fileKey, fileSize, "", KUPLOAD_ID);

    if (window.RAONKUPLOAD.GetTotalFileCount() > 0) {
      window.RAONKUPLOAD.AddHttpHeader("Cookie", document.cookie, KUPLOAD_ID);
      window.RAONKUPLOAD.DownloadAllFile(KUPLOAD_ID);
      window.RAONKUPLOAD.DeleteAllFile(KUPLOAD_ID);
    } else {
      alert("다운로드할 파일이 없습니다.");
    }
  };

  return (
    <Fragment>
      {show ? <UrlDownload data={data} downloadable={data?.maxLevel >= PERMIT_TYPE.READ.level} onDownloadClick={clickDownload} /> : <CenterCircularProgress />}
      <DocAuthRequestModalContainer ref={authRef} />
      <DocOpenModalContainer ref={openRef} data={data} />
    </Fragment>
  );
}
