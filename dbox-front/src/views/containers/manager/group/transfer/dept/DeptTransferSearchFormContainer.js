import DeptTransferSearchForm from "views/templates/manager/group/transfer/dept/DeptTransferSearchForm";

export default function DeptTransferSearchFormContainer(
  {
      row
    , opened
    , setOpened
    , setAlert
  }) {

  return (
    <DeptTransferSearchForm
      row={row}
      opened={opened}
      setOpened={setOpened}
      setAlert={setAlert}
    />
  );
}
