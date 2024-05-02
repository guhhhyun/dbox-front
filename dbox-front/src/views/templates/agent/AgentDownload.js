import React from "react";
import { Button, Box, Grid, Typography, Paper, InputBase, InputAdornment  } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import ExternalApi from "apis/external-api";
import { PREFIX_URL, HTTP_TIMEOUT } from "constants/http-constants";
import styles from "./AgentDownload.module.css";
import logoDK from "assets/imgs/logo_dk.svg"
import logoDBox from "assets/imgs/logo_dbox01.svg"
import img01 from "assets/imgs/img_dev.svg"


export default function AgentDownload() {
  const history = useHistory();
  const downAgentInstaller = async () => {
    // const response = await ExternalApi.getAgentInstaller({}, {'accept': 'application/octet-stream' });
    const newWindow = window.open(`${PREFIX_URL}/api/external/infs-installer`, '_blank');
    // const newWindow = window.open(`${PREFIX_URL}/api/external/infs-installer`, '', 'width=600,height=400,left=200,top=200');
    // newWindow.close();
  };

  return (
    // <div>
    //   <Button onClick={downAgentInstaller}>에이전트다운로드</Button>

    //   <Button
    //     onClick={() => {
    //       history.push("/");
    //     }}
    //   >
    //     설치 완료 시 돌아가기
    //   </Button>
    // </div>
    <Box className={styles.main}>
      <Grid container>
        <Grid item xs={4}>
          <Box className={styles.loginBox}>
            <img src={logoDBox} alt="Dbox" className={styles.imgLogoDbox} />
            <Typography variant="h1" className={styles.h1}>D'Box 이용을 위해 <br/> Agent설치가 필요합니다.</Typography>

              <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submit}  onClick={downAgentInstaller}>
                Agent 설치하기
            </Button>
            <Button type="submit" fullWidth variant="contained" color="secondary" className={styles.submit} onClick={() => { history.goBack(); }}>
                설치완료시 돌아가기
            </Button>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box>
            <img src={logoDK} className={styles.imgLogoDk} />
            <img src={img01} className={styles.img01}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
