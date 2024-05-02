import { useSnackbar } from "notistack";
import { useEffect } from "react";

console.debug("EnqueueSnackbar.js");

export default function EnqueueSnackbar({ severity, title, message }) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    enqueueSnackbar({
      severity,
      title,
      message,
    });
  });

  return null;
}
