import React, { Fragment } from "react";
import { TextField, Typography, Grid, Box } from "@material-ui/core/";
import { MenuOpen, ArrowRightAlt} from "@material-ui/icons";
import styles from "./GradeRedefinition.module.css";
import GradeModalButtonContainer from "views/containers/manager/group/grade/redefinition/GradeModalButtonContainer";

console.debug("GradeRedefinition.js");

export default function GradeRedefinition({
  gradeData,
  gradeNameFirst,
  gradeNameSecond,
  gradeNameThird,
  gradeNameFourth,
  firstGradeNameChange,
  secondGradeNameChange,
  thirdGradeNameChange,
  fourthGradeNameChange,
  getData,
}) {
  return (
    <Fragment>
      <form action="submit" className={styles.box}>
        <Box className={styles.action}>
          <GradeModalButtonContainer
            gradeData={gradeData}
            gradeNameFirst={gradeNameFirst}
            gradeNameSecond={gradeNameSecond}
            gradeNameThird={gradeNameThird}
            gradeNameFourth={gradeNameFourth}
            getData={getData}
          />
        </Box>
        <Box>
          <Grid container>
            <Grid item xs={4}>
              <Typography color="textSecondary" style={{ marginBottom: "26px" }}>
                현재 보안 등급 분류
              </Typography>
              {gradeData.map((x, index) => (
                <Typography key={index} variant="h6" className={styles.title}>
                  {x.uCodeName1}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <Typography color="textSecondary">
                <ArrowRightAlt color="secondary" className={styles.icon} style={{ marginTop: "60px" }} />
              </Typography>
              <Typography color="textSecondary">
                <ArrowRightAlt color="secondary" className={styles.icon} />
              </Typography>
              <Typography color="textSecondary">
                <ArrowRightAlt color="secondary" className={styles.icon} />
              </Typography>
              <Typography color="textSecondary">
                <ArrowRightAlt color="secondary" className={styles.icon} />
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography color="textSecondary" style={{ marginBottom: "26px" }}>
                변경 보안 등급 분류
              </Typography>
              <TextField
                onChange={firstGradeNameChange}
                defaultValue={gradeNameFirst}
                placeholder={gradeNameFirst}
                id="outlined-input"
                variant="outlined"
                margin="dense"
              />
              <TextField
                onChange={secondGradeNameChange}
                defaultValue={gradeNameSecond}
                placeholder={gradeNameSecond}
                id="outlined-input"
                variant="outlined"
                margin="dense"
              />
              <TextField
                onChange={thirdGradeNameChange}
                defaultValue={gradeNameThird}
                placeholder={gradeNameThird}
                id="outlined-input"
                variant="outlined"
                margin="dense"
              />
              <TextField
                onChange={fourthGradeNameChange}
                defaultValue={gradeNameFourth}
                placeholder={gradeNameFourth}
                id="outlined-input"
                variant="outlined"
                margin="dense"
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </Fragment>
  );
}
