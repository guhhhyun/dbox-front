import { Fragment, useRef, useState, useEffect } from "react";
import { Button, Popover, Typography, DialogActions, makeStyles } from "@material-ui/core";
import PreservePopper from "views/templates/doc/modals/property/PreservePopper";

console.debug("PreservePopperButton.js");

const useStyles = makeStyles({
  btnBox: {
    padding: "14px",
    backgroundColor: "#eef2f9",
  },
  btnAction: {
    height: "28px",
    padding: "0px 6px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize: "12px",
  },
});

export default function PreservePopperButton({ opened, preserve, regDate, closedDate, expiredDate, onButtonClick, onPopperOkClick, onClose }) {
  const buttonRef = useRef(null);

  const classes = useStyles();
  const [preserveMe, setPreserveMe] = useState(preserve);

  useEffect(() => {
    setPreserveMe(preserve);
  }, [preserve]);

  const onChangePreserverFlag = ({ target: { value } }) => {
    setPreserveMe(value);
  };

  return (
    <Fragment>
      <Button ref={buttonRef} onClick={onButtonClick} className={classes.btnAction}>
        보존연한
        <Typography variant="caption" color="secondary" style={{ paddingLeft: "4px" }}>
          {preserve}년
        </Typography>
      </Button>
      <Popover
        open={opened}
        anchorEl={buttonRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={onClose}
      >
        <PreservePopper
          preserve={preserveMe}
          regDate={regDate}
          closedDate={closedDate}
          expiredDate={expiredDate}
          onChangePreserverFlag={onChangePreserverFlag}
        />
        <DialogActions className={classes.btnBox}>
          <Button
            color="primary"
            onClick={() => {
              onPopperOkClick(preserveMe);
            }}
            className={classes.btnAction}
          >
            확인
          </Button>
          <Button color="default" onClick={onClose} className={classes.btnAction}>
            취소
          </Button>
        </DialogActions>
      </Popover>
    </Fragment>
  );
}
