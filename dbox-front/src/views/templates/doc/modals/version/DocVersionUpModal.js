import { Fragment } from "react";
import { Typography } from "@material-ui/core";

export default function DocVersionUpModal() {
  return (
    <Fragment>
      <Typography variant="subtitle2">"버전관리.pptx" 자료가 이미 존재합니다.</Typography>
      <Typography variant="subtitle2">기존 버전에 덮어쓰기를 진행하겠습니까? 혹은 버전을 갱신하겠습니까?</Typography>
      <Typography variant="subtitle2">(갱신 시 전전버전의 파일은 삭제됩니다.)</Typography>
    </Fragment>
  );
}
