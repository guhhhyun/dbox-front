import { forwardRef, Fragment, useImperativeHandle, useState, theme } from "react";
import { Button, Checkbox, FormControlLabel, InputAdornment, Paper, InputBase, Grid, Box} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  inputRoot: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: '8px',
    flex: 1,
  },
  btnAction: {
    padding:"2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize:"13px"
  }
});


const FilterModal = forwardRef(function ({ onModalOkClick, onModalClose, columns }, ref) {
  const [opened, setOpened] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  /**
   * 필터 클릭
   */
  const openModal = () => {
    setOpened(true);
  };

  /**
   * 필터 적용 취소
   */
  const closeModal = () => {
    setOpened(false);
    if (typeof onModalClose === "function") onModalClose();
  };

  /**
   * 필터 적용
   */
  const clickModalOk = () => {
    setOpened(false);
    onModalOkClick();
  };

  const classes = useStyles();

  return (
    <DynamicButtonModalDialog
      open={opened}
      title="필 터"
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button color="primary" onClick={clickModalOk} className={classes.btnAction} >
            확인
          </Button>
          <Button color="default" onClick={closeModal} className={classes.btnAction}>
            취소
          </Button>
        </Fragment>
      }
      maxWidth="xs"
      fullWidth
    >
      <Paper component="form" className={classes.inputRoot} variant="outlined">
        <InputBase
          className={classes.input}
          placeholder="필터 검색"
          inputProps={{ style: { fontSize: "13px" }}}
          startAdornment={
            <InputAdornment position="start">
              <Search style={{ width: "20px" }} />
            </InputAdornment>
          }
        />
      </Paper>
      <Box p={1}>
        <Grid container>
          {columns.map((item, index) => (
            <Grid key={index} item xs={6}>
              <FormControlLabel control={<Checkbox size="small" color="primary"/>} label={item.name}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </DynamicButtonModalDialog>
  );
});

export default FilterModal;
