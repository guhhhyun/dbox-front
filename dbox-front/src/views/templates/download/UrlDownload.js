import { Button, Box, Grid, Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import styles from "./UrlDownload.module.css";
import logoDK from "assets/imgs/logo_dk.svg";
import logoDBox from "assets/imgs/logo_dbox01.svg";
import img01 from "assets/imgs/img_login.svg";

export default function UrlDownload({ data, downloadable, onDownloadClick }) {
  return (
    <Box className={styles.main}>
      <Grid container className={styles.boxLogo}>
        <Grid item xs={6} style={{ textAlign: "left" }}>
          <img src={logoDBox} alt="Dbox" className={styles.imgLogoDbox} />
        </Grid>
        <Grid item xs={6} style={{ textAlign: "right" }}>
          <img src={logoDK} className={styles.imgLogoDk} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6} style={{ margin: "auto" }}>
          <Typography variant="h1" className={styles.h1}>
            링크 다운로드
          </Typography>
          <TableContainer component={Paper} elevation={1}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">파일 명</TableCell>
                  <TableCell align="left">소유부서</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">{data?.objectName || "파일명을 알 수 없습니다."}</TableCell>
                  <TableCell align="left">{data.ownDeptDetail?.orgNm || "-"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          {downloadable && (
            <Button variant="contained" color="primary" size="small" className={styles.submit} onClick={onDownloadClick}>
              다운로드
            </Button>
          )}
        </Grid>
      </Grid>
      <img src={img01} className={styles.img01} />
    </Box>
  );
}
