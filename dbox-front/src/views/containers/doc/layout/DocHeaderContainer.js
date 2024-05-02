import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Async } from "react-async";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import DocHeader from "views/templates/doc/layout/DocHeader";
import SnackbarMessage from "views/commons/snackbar/SnackbarMessage";
import CenterCircularProgress from "views/commons/progress/CenterCircularProgress";
import DeptApi from "apis/dept-api";
import { setNirisTheme } from "stores/setting";

console.debug("DocHeaderContainer.js");

export default function DocHeaderContainer({ pageKey, divided, onSearchClick }) {
  const pageKeyNodeId = `${pageKey}Id`;

  const dispatcher = useDispatch();
  const history = useHistory();

  const docPageDivided = useSelector((state) => state.setting.docPageDivided);
  const nirisTheme = useSelector((state) => state.setting.nirisTheme);
  const paths = useSelector((state) => state.doc.path[pageKey]);

  const [searchTypeChecked, setSearchTypeChecked] = useState(false);

  /**
   * iframe 밖으로부터의 요청 처리
   */
  useEffect(() => {
    const colorChangeMessage = ({ data }) => {
      if (data.theme) dispatcher(setNirisTheme(data.theme));
    };

    window.addEventListener("message", colorChangeMessage);
    return () => {
      window.removeEventListener("message", colorChangeMessage);
    };
  });

  /**
   * 2분할 버튼 토글
   */
  const toggleDivideButton = () => {
    const parsed = queryString.parse(history.location.search);
    parsed.divided = docPageDivided ? false : true;
    const stringified = queryString.stringify(parsed);
    history.push(`/doc?${stringified}`);
  };

  /**
   * 2분할 버튼 닫기
   */
  const closeDivide = () => {
    const parsed = queryString.parse(history.location.search);
    parsed.divided = false;
    const stringified = queryString.stringify(parsed);
    history.push(`/doc?${stringified}`);
  };

  /**
   * 통합검색 여부 체크
   */
  const toggleSearchTypeChecked = (event) => {
    event.preventDefault();
    setSearchTypeChecked(event.target.checked);
  };

  /**
   * 검색
   */
  const search = (event) => {
    onSearchClick(event, searchTypeChecked);
  };

  /**
   * 경로 클릭
   */
  const clickPath = (event, path) => {
    const parsed = queryString.parse(history.location.search);
    parsed[pageKeyNodeId] = path.key;
    const stringified = queryString.stringify(parsed);
    history.push(`/doc?${stringified}`);
  }

  return (
    <Async promiseFn={DeptApi.getDeptAdminUsers} params={{}}>
      <Async.Fulfilled>
        {(data) => (
          <DocHeader
            theme={nirisTheme}
            paths={paths}
            onPathClick={clickPath}
            deptManagers={data}
            searchTypeChecked={searchTypeChecked}
            onSearchTypeChange={toggleSearchTypeChecked}
            onSearchClick={search}
            onDivideClick={toggleDivideButton}
            onClose={closeDivide}
            divided={divided}
          />
        )}
      </Async.Fulfilled>
      <Async.Rejected>{(error) => <SnackbarMessage severity="error" title="Error" message={`에러: ${error.message}`} />}</Async.Rejected>
      <Async.Loading>
        <CenterCircularProgress />
      </Async.Loading>
    </Async>
  );
}
