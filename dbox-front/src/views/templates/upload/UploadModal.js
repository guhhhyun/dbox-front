import { Box, Typography, IconButton, Button } from "@material-ui/core";
import styles from "./UploadModal.module.css";
import { Close, AttachFile } from "@material-ui/icons";
import img01 from "assets/imgs/img_upload.png"

export default function UserUnlockRequestModal() {
  return (
    <div>
      <Box className={styles.dropBox}>
        <Box className={styles.title} pl={1}>
          <Typography variant="overline">첨부파일 목록</Typography>
        </Box>
        {/* 파일 미첨부일 경우 */}
        <Box p={2} textAlign="center">
          <img src={img01} alt="Upload" className={styles.img} />
          <Button>파일을 업로드하려면 <br/> 해당영역을 클릭하거나 여기에 드롭하세요.</Button>
        </Box>
        {/* 파일 첨부일 경우 */}
        {/*
        <Box p={1} textAlign="left" className={styles.attached}>
          <Typography variant="body2"><AttachFile  className={styles.icon}/> test.txt</Typography>
          <IconButton size="small" style={{marginLeft:"10px"}}>
            <Close className={styles.icon}/>
          </IconButton>
        </Box>
        */}
      </Box>
    </div>
  );
}
