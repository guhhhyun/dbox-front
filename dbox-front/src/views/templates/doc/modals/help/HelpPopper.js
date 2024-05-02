import { Paper, Typography, Box, Divider} from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
import Imghelp01 from "assets/imgs/help01.png";
import Imghelp02 from "assets/imgs/help02.png";

console.debug("HelpPopper.js");

export default function HelpPopper() {
  return (
    <Paper>
      <Box p={3}>
        <Typography variant="h5" color="secondary" align="center"><HelpOutline/> 도 움 말</Typography>
        <br />
        <Divider />
        <br />
          <Typography variant="body2" component="p" style={{width:"230px",margin:"auto"}}>
            <img src={Imghelp01} style={{verticalAlign:"bottom", marginRight:"10px"}}/>    통합검색 - 컨텐츠 검색 지원
            <br/>
            <br/>
            <img src={Imghelp02} style={{ verticalAlign: "bottom", marginRight:"10px"}}/>   일반검색 - 칼럼 검색
        </Typography>
        <br />
        <br />
        <Typography variant="caption" display="block" gutterBottom>
            ※ 권한이 없는 경우에도 검색결과에 제시됨. 단, Live 및 제한문서 제외
        </Typography>
      </Box>
    </Paper>
  );
}
