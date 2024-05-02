import { Fragment, useState } from "react";
import { Box} from "@material-ui/core";
import { DataUsage, Equalizer} from "@material-ui/icons";
import HistoryStandard from "./HistoryStandard";
import HistoryGrid from "./HistoryGrid";
import HistoryItemGrid from "./HistoryItemGrid";
import styles from "./HistorySample.module.css";

console.log("HistorySample.js");

export default function HistorySample() {
  const now = new Date();
  const [startDate, setStartDate] = useState(now);
  const [endDate, setEndDate] = useState(now);

  /**
   * 날짜 입력 시 이벤트
   */
  const startChangeDate = (pickedDate) => {
    setStartDate(pickedDate);
  };

  const endChangeDate = (pickedDate) => {
    setEndDate(pickedDate);
  };

  return (
    <Fragment>
      <div className={styles.contentBox}>
        <Box p={3}>
          <HistoryStandard />
        </Box>
        <Box p={3} className={styles.mgb10}>
          <h3 className={styles.h3}><DataUsage /> 사용 현황</h3>
          <div className={styles.time}>
            <span>조회시간</span> <span>2021-07-14 14:00</span>
          </div>
        </Box>
        <div className={styles.gridBox}>
          <HistoryGrid />
        </div>
        <Box p={3} className={styles.mgb10}>
          <h3 className={styles.h3}><Equalizer /> 항목별 사용 현황</h3>
          <div className={styles.time}>
            <span>조회시간</span> <span>2021-07-14 14:00</span>
          </div>
        </Box>
        <div className={styles.gridBox}>
          <HistoryItemGrid />
        </div>
      </div>
    </Fragment>
  );
}
 