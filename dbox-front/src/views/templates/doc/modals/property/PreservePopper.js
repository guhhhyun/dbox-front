import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import FormatUtil from "utils/format-util";
import styles from "./PreservePopper.module.css";

console.debug("PreservePopper.js");
console.debug("DocPropertyModal.js");

const useStyles = makeStyles((theme) => ({
  title: {
    lineHeight: 2,
    marginRight: theme.spacing(10),
    color: "#00254C",
    fontSize: "13px",
  },
  input: {
    width: "150px",
    marginTop: "2px",
  },
  mgb10: {
    marginBottom: theme.spacing(1),
  },
}));

export default function PreservePopper({ preserve, regDate, closedDate, expiredDate, onChangePreserverFlag }) {
  const classes = useStyles();
  return (
    <Box className={styles.contentBox}>
      <Box>
        <Typography variant="subtitle2" className={`${classes.title} ${classes.mgb10}`}>
          보존연한 상세내역
        </Typography>
      </Box>
      <Box className={styles.tableBox}>
        <TableContainer>
          <Table size="">
            <TableHead>
              <TableRow>
                <TableCell align="center">구분</TableCell>
                <TableCell align="center">일시</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">최초 작성일</TableCell>
                <TableCell align="center">{FormatUtil.formatDate(regDate)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">Close일</TableCell>
                <TableCell align="center">{FormatUtil.formatDate(closedDate)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">만료일</TableCell>
                <TableCell align="center">{FormatUtil.formatDate(expiredDate)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">보존연한</TableCell>
                <TableCell align="center">
                  <FormControl variant="outlined" className={classes.input}>
                    <Select value={preserve} onChange={onChangePreserverFlag}>
                      <MenuItem value={5}>5년</MenuItem>
                      <MenuItem value={10}>10년</MenuItem>
                      <MenuItem value={15}>15년</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Typography variant="overline">보존연한 변경을 원하시는 경우 변경일 날짜 선택 후 아래 "변경" 버튼을 클릭 바랍니다.</Typography>
    </Box>
  );
}
