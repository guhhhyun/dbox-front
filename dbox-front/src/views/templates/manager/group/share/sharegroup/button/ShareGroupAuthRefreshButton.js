import { Button } from "@material-ui/core";

export default function ShareGroupAuthRefreshButton({ refreshButton }) {
  return (
    <div>
      <Button variant="contained" color="secondary" disableElevation onClick={refreshButton}>
        새로고침
      </Button>
    </div>
  );
}
