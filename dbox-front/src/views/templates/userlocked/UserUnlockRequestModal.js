import { FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@material-ui/core";

export default function UserUnlockRequestModal({ retire, onRetireChange, absence, onAbsenceChange, threat, onThreatChange }) {
  return (
    <div>
      <Typography variant="subtitle1">해당 계정은 다운로드 횟수 기준 초과로 계정 잠금 처리되었습니다.</Typography>
      <br/>
      <Typography variant="subtitle2">1. 해제 사유 입력</Typography>
      <TextField fullWidth variant="outlined" style={{marginTop:'10px'}}></TextField>
      <br/>
      <br/>
      <div>
        <Typography variant="subtitle2">2. 퇴사가 예정되어 있으십니까?</Typography>
        <RadioGroup value={retire} onChange={onRetireChange} defaultValue="Y" row>
          <FormControlLabel value="Y" label="예" control={<Radio color="primary" />} />
          <FormControlLabel value="N" label="아니오" control={<Radio color="primary" />} />
        </RadioGroup>
      </div>
      <br/>
      <div>
        <Typography variant="subtitle2">3. 휴직이 예정되어 있으십니까?</Typography>
        <RadioGroup value={absence} onChange={onAbsenceChange} defaultValue="Y" row>
          <FormControlLabel value="Y" label="예" control={<Radio color="primary" />} />
          <FormControlLabel value="N" label="아니오" control={<Radio color="primary" />} />
        </RadioGroup>
      </div>
      <br/>
      <div>
        <Typography variant="subtitle2">4. 불필요한 다운로드/문서출력/복호화반출/외부저장매체반출 등은 보안 Risk를 키우는 주된 요인임을 알고 계십니까?</Typography>
        <RadioGroup value={threat} onChange={onThreatChange} defaultValue="Y" row>
          <FormControlLabel value="Y" label="예" control={<Radio color="primary" />} />
          <FormControlLabel value="N" label="아니오" control={<Radio color="primary" />} />
        </RadioGroup>
      </div>
    </div>
  );
}
