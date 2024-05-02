import TextField from "@material-ui/core/TextField";
import { Select, MenuItem, InputLabel, FormControl } from "@material-ui/core";

export default function ShareGroupAuthDialogContent({
  shareGroupName,
  shareGroupNameChange,
  shareGroupContent,
  shareGroupContentChange,
  handleChange,
  opt,
  comCode,
}) {
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-filled-label">회사 명</InputLabel>
          {comCode === "DKG" ? (
            <Select margin="dense" style={{ width: "200px" }} value={opt ?? ""} onChange={handleChange}>
              <MenuItem value={"DKS"}>동국제강</MenuItem>
              <MenuItem value={"UNC"}>동국시스템즈</MenuItem>
              <MenuItem value={"ITG"}>인터지스</MenuItem>
              <MenuItem value={"FEI"}>페럼인프라</MenuItem>
            </Select>
          ) : (
            <Select margin="dense" style={{ width: "200px" }} defaultValue={comCode}>
              <MenuItem value={comCode}>
                {comCode === "DKS" ? "동국제강" : comCode === "UNC" ? "동국시스템즈" : comCode === "ITG" ? "인터지스" : comCode === "FEI" ? "페럼인프라" : ""}
              </MenuItem>
            </Select>
          )}
        </FormControl>
      </div>
      <div>
        공유그룹 이름 :
        <TextField
          style={{ padding: "3px" }}
          error={shareGroupName === "" ? true : false}
          helperText={shareGroupName === "" ? "이름을 입력해주세요." : false}
          variant="outlined"
          defaultValue={shareGroupName}
          onChange={shareGroupNameChange}
        />
      </div>
      <div>
        공유그룹 설명 :
        <TextField
          style={{ padding: "3px" }}
          error={shareGroupContent === "" ? true : false}
          helperText={shareGroupContent === "" ? "설명을 입력해주세요." : false}
          variant="outlined"
          defaultValue={shareGroupContent}
          onChange={shareGroupContentChange}
        />
      </div>
    </div>
  );
}
