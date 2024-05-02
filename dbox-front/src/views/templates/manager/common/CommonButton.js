import { Button } from "@material-ui/core";

console.debug("CommonButton.js");

export default function CommonButton({ buttonName, onClick }) {
  return (
    <Button variant="contained" onClick={onClick} color="primary">
      {buttonName}
    </Button>
  );
}
