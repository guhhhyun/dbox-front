import TextField from "@material-ui/core/TextField";

export default function ShareGroupAuthUpdateDialogContent({ shareGroupNameChange, shareGroupContentChange, shareGroupGridData }) {
  return (
    <div>
      <div style={{ padding: "10px" }}>
        공유그룹 이름 수정 :
        <TextField
          // error={shareGroupGridName === "" ? true : false}
          // helperText={shareGroupGridName === "" ? "이름을 입력해주세요." : false}
          variant="outlined"
          defaultValue={shareGroupGridData.uShareName}
          placeholder={shareGroupGridData.uShareName}
          onChange={shareGroupNameChange}
        />
      </div>
      <div>
        공유그룹 설명 수정 :
        <TextField
          onChange={shareGroupContentChange}
          defaultValue={shareGroupGridData.uShareDesc}
          placeholder={shareGroupGridData.uShareDesc}
          variant="outlined"
        />
      </div>
    </div>
  );
}
