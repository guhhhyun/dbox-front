import { Fragment } from "react";
import { ListAlt } from "@material-ui/icons";
import { Typography, Box, Divider} from "@material-ui/core";
import GradeModalButtonContainer from "views/containers/manager/group/grade/redefinition/GradeModalButtonContainer";
import GradeRedefinitionContainer from "views/containers/manager/group/grade/redefinition/GradeRedefinitionContainer";
import styles from "./GradeRedefinition.module.css";

console.log("GradeRedefinitionForm.js");

export default function GradeRedefinitionForm() {
  return (
    <Fragment>
      <Typography variant="h3" gutterBottom className={styles.h3}>
        <ListAlt /> 보안 등급 재정의
      </Typography>
      <Divider></Divider>
      <Box>
        <GradeRedefinitionContainer />
      </Box>
      <Box p={3} pt={10}>
          <Typography variant="subtitle1" gutterBottom>[보안 등급 재정의 안내]</Typography>
          <Typography variant="body2" display="block">※ 보안 등급 분류를 재정의하여 적용함과 동시에 시스템에 저장된 그룹사의 모든 문서는 일괄 적용</Typography>
          <Typography variant="body2" display="block">※ 보안등급 재정의 시에도 기존 등급의 권한 속성은 그대로 유지</Typography>
      </Box>
    </Fragment>
  );
}
