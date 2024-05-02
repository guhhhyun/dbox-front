import { Tabs, withStyles } from "@material-ui/core";
import background from "assets/imgs/tab_w95.png";

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    backgroundColor: "transparent",
    height:"30px",
    minHeight: "30px",
    width: "120px",
    minWidth:"120px",
    "& > span": {
      maxWidth: "100%",
      width: "100%",
      background: `url(${background}) no-repeat 6px 0px`,
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export default StyledTabs;
