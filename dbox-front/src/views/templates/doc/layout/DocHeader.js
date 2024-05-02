import { Fragment, useRef, useState } from "react";
import { Button, IconButton, InputAdornment, Paper, InputBase } from "@material-ui/core";
import { Close, Search, ViewAgenda, FolderSharp, FindInPageOutlined } from "@material-ui/icons";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { grey } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import ScrollContainer from "react-indiana-drag-scroll";
import AlarmModalButtonContainer from "views/containers/doc/modals/alarm/AlarmModalButtonContainer";
import DocManagerModalButtonContainer from "views/containers/doc/modals/docmanager/DocManagerModalButtonContainer";
import HelpPopperButtonContainer from "views/containers/doc/modals/help/HelpPopperButtonContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import iconDsearch from "assets/imgs/icon_dsearch.svg";
import styles from "./DocHeader.module.css";
import "react-resizable/css/styles.css";
import "rc-tree/assets/index.css";

console.debug("DocHeader.js");

const PathDivider = function () {
  return <span style={{ padding: "6px 3px", verticalAlign: "middle", fontWeight: "lighter" }}>&gt;</span>;
};

/**
 * Styling - 통합검색 여부 Toggle
 */
const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    border: "none",
    "&:not(:first-child)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-child": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function DocHeader({
  theme,
  paths,
  deptManagers,
  searchTypeChecked,
  onSearchTypeChange,
  onSearchClick,
  onPathClick,
  onDivideClick,
  onClose,
  divided,
}) {
  const [setSearchTypeChecked] = useState(false);

  const endPathRef = useRef(null);

  /**
   * 검색 및 토글
   */
  const [alignment, setAlignment] = useState("left");
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  /**
   * 통합검색 여부 체크
   */
  const toggleSearchTypeChecked = (event) => {
    setSearchTypeChecked(event.target.checked);
  };

  return (
    <div className={styles.root}>
      <ScrollContainer className={styles.path} vertical={false}>
        {paths?.map((item, index) => {
          if (index === 0)
            return (
              <Button key={index} startIcon={<FontAwesomeIcon icon={faFolderOpen} style={{fontSize:"18px"}}/>} onClick={(event) => onPathClick(event, item)}>
                {" "}
                {item.name}
              </Button>
            );
          else {
            return (
              <Fragment key={index}>
                <PathDivider />
                <Button onClick={(event) => onPathClick(event, item)}>{item.name}</Button>
              </Fragment>
            );
          }
        })}
      </ScrollContainer>

      <div>
        <DocManagerModalButtonContainer deptManagers={deptManagers} />
      </div>

      <div className={styles.search}>
        <Paper component="form" className={styles.searchContainer}>
          <InputBase
            className={styles.input}
            placeholder="부서함 검색"
            inputProps={{ "aria-label": "부서함 검색" }}
            startAdornment={
              <InputAdornment position="start">
                <Search style={{ width: "20px" }} />
              </InputAdornment>
            }
          />
          <StyledToggleButtonGroup size="small" value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
            <ToggleButton
              value="left"
              onChange={toggleSearchTypeChecked}
              aria-label="통합검색 포함검색"
              classes={{ root: "ToggleButton", selected: "selected" }}
            >
              <img src={iconDsearch} alt="loading" style={{ width: "12px", height: "12px" }} />
            </ToggleButton>
            <ToggleButton value="center" aria-label="일반 검색" classes={{ root: "ToggleButton", selected: "selected" }}>
              <FindInPageOutlined style={{ color: grey[400], width: "14px" }} />
            </ToggleButton>
          </StyledToggleButtonGroup>
        </Paper>
      </div>
      {!divided && (
        <div className={styles.tabIcons}>
          <HelpPopperButtonContainer />
        </div>
      )}
      {!divided && (
        <div className={styles.tabIcons}>
          <IconButton size="small" onClick={onDivideClick}>
            <ViewAgenda />
          </IconButton>
        </div>
      )}
      {!divided && (
        <div className={styles.tabIcons}>
          <AlarmModalButtonContainer onClick={onDivideClick} />
        </div>
      )}
      {divided && (
        <div className={styles.tabIcons}>
          <IconButton size="small" onClick={onClose}>
            <Close size="small" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
