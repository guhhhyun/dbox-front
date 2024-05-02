import {COM_CODE} from "constants/code-constants";
import {Typography} from "@material-ui/core";
import DialogContainer from "views/containers/manager/common/DialogContainer";
import AutoClosingApi from "apis/autoclosing-api";

export default function AutoClearModalButtonContainer({ autoClosingData, setAlert }) {

  const getContent = (data) => {
    const comCode = data.u_code_val1;
    return (
      <>
        <Typography variant="body1"><strong>{COM_CODE[comCode]?.desc} </strong> 의 Closed 문서 버전 삭제 설정 기간을</Typography>
        <Typography variant="body1">처리 후 경과기간 <strong>{data.u_code_val2}</strong> 년, 문서 非사용기간 <strong>{data.u_code_val3}</strong> 개월로 적용합니다.</Typography>
      </>
    )
  }

  const option = {
    title: "Closed 문서 버전 삭제 설정",
    children: getContent(autoClosingData),
    buttonName: "적용",
    okText: "예",
    cancelText: "아니오"
  };

  const onModalSave = async () => {
    const params = {
      params: {
        ...autoClosingData
      }
    }
    const response = await AutoClosingApi.patchAutoClosingPeriodFor(params);
    if(response.status === 200) {
      setAlert({ open: true, content: "적용되었습니다." });
    }
  };

  return <DialogContainer onModalSave={onModalSave} option={option}/>;
}
