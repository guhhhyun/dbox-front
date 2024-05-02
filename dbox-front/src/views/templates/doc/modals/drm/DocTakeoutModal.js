
import { forwardRef, Fragment, useImperativeHandle, useState, theme, useRef } from "react";
import { Grid, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, makeStyles, RadioGroup, Radio } from "@material-ui/core";
// import { EXPORT_TYP_1, EXPORT_TYP_2 } from "constants/code-constants";

console.debug("DocTakeoutModal.js");

const useStyles = makeStyles((theme) => ({
  input: {
    width: '150px',
    marginTop: '2px'
  },
  pd2: {
    padding:'6px'
  }
}));

const DocTakeoutModal = forwardRef(function ({ uExportFlag, uExportTyp1, uExportTyp2, exportReasons, onChange }, ref) {
  const exportFlag1Ref = useRef(null);
  const exportFlag2Ref = useRef(null);

  useImperativeHandle(ref, () => ({
    exportFlag1:exportFlag1Ref.current,
    exportFlag2:exportFlag2Ref.current
  }));

  const classes = useStyles();

  return (
    <Fragment>
      {/* EXPORT_TYP_1 : {JSON.stringify(EXPORT_TYP_1)}<br/> */}
      {/* uExportFlag : {uExportFlag}<br/> */}
      {/* uExportTyp1 : {uExportTyp1}<br/> */}
      {/* uExportTyp2 : {uExportTyp2}<br/> */}
      <Grid Container>
      <RadioGroup value={uExportFlag} onChange={onChange} name="uExportFlag" defaultValue="P" row>
        <Grid item xs={12}>
          <FormControlLabel control={<Radio size="small" color="primary" />} value="P" label="사전승인" />
        </Grid>
        <Grid item xs={12} style={{margin:'10px 0'}}>
          <FormControlLabel control={<Radio size="small" color="primary" className={classes.pd2} disabled={exportReasons.uAutoApprYn!=='Y'? true:false} />} value="A" label="자동승인" />
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel id="autoTakeoutLabel">목 록</InputLabel>
            <Select labelId="autoTakeoutLabel" value={uExportTyp1} name="uExportTyp1" disabled={exportReasons.uAutoApprYn!=='Y'? true:false} 
            onFocus={(e)=>{
                onChange({target:{name:"uExportFlag", value:"A"}});
              }} 
              onChange={(event) => onChange(event)} ref={exportFlag1Ref}>
              {
                Object.keys(exportReasons.autoNames).map((key)=>{
                  if (exportReasons.autoNames[key] != null)
                    return <MenuItem key={key} value={key}>{exportReasons.autoNames[key]}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} style={{margin:'10px 0'}}>
          <FormControlLabel control={<Radio size="small" color="primary" className={classes.pd2} disabled={exportReasons.uFreePassYn!=='Y'? true:false}/>} value="F" label="프리패스" />
          <FormControl variant="outlined" className={classes.input}>
            <InputLabel id="freepassTakeoutLabel">목 록</InputLabel>
            <Select labelId="freepassTakeoutLabel" value={uExportTyp2} name="uExportTyp2" disabled={exportReasons.uFreePassYn!=='Y'? true:false}
              onFocus={(e)=>{
                onChange({target:{name:"uExportFlag", value:"F"}});
              }} 
              // onChange={(event) => onChange(event, exportReasons[event.target.value].uFreeName)} ref={exportFlag2Ref}  >
              onChange={(event) => onChange(event)} ref={exportFlag2Ref}  >
            {
                Object.keys(exportReasons.freeNames).map((key)=>{
                  if (exportReasons.freeNames[key] != null)
                    return <MenuItem key={key} value={key}>{exportReasons.freeNames[key]}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </RadioGroup>
        
      </Grid>
    </Fragment>
  );
});
export default DocTakeoutModal;

