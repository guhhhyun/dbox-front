import { useHistory } from "react-router-dom";
import { Button, Box, Grid, Typography} from "@material-ui/core";
import Logout from "./commons/logout/Logout";
import AgentCheck from "views/templates/agent/AgentCheck";
import styles from "./templates/agent/AgentDownload.module.css";
import logoDK from "assets/imgs/logo_dk.svg"
import logoDBox from "assets/imgs/logo_dbox01.svg"
import img01 from "assets/imgs/img_dev.svg"


import UploadModalButtonContainer from "views/containers/upload/UploadModalButtonContainer";
import ExternalStorageModalButtonContainer from "views/containers/externalstorage/ExternalStorageModalButtonContainer";

export default function DevIndexPage() {
  const history = useHistory();

  return (
    <Box className={styles.main}>
      <Grid container>
        <Grid item xs={4}>
          <Box className={styles.loginBox}>
            <img src={logoDBox} alt="Dbox" className={styles.imgLogoDbox} />
            <Typography variant="h1" className={styles.h1} >개발단</Typography>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Button onClick={() => {history.push("/doc");}} fullWidth variant="contained" color="primary" className={styles.submit}>
                  자료실
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => {history.push("/manager/group/unusual");}} fullWidth variant="contained" color="primary" className={styles.submit}>
                  관리자
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => {history.push("/history/sample");}} fullWidth variant="contained" color="primary" className={styles.submit}>
                  이력관리
                </Button>
              </Grid>
              <Grid item xs={3}>
                <ExternalStorageModalButtonContainer /> 
              </Grid>
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={3}>
                <Button onClick={() => {history.push("/locked");}} fullWidth variant="contained" color="secondary" className={styles.submit}>
                  잠금화면
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => {history.push("/agent-download");}} fullWidth variant="contained" color="secondary" className={styles.submit}>
                  에이전트<br/>다운로드
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button onClick={() => {history.push("/download/090004d28000760e");}} fullWidth variant="contained" color="secondary" className={styles.submit}>
                링크<br/>다운로드
                </Button>
              </Grid>
              <Grid item xs={3}>
                <UploadModalButtonContainer />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <AgentCheck></AgentCheck>
                <Logout />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box className={styles.bgImg}>
            <img src={logoDK} className={styles.imgLogoDk} />
            <img src={img01} className={styles.img01} style={{width:"54%"}}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
