import { Fragment, forwardRef, useImperativeHandle, useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import DynamicButtonModalDialog from "views/commons/dialog/DynamicButtonModalDialog";
import OrgSelectModal from "views/templates/doc/modals/org/OrgSelectModal";
import ModalTreeContainer from "../../tree/ModalTreeContainer";

console.debug("OrgSelectModalContainer.js");

const useStyles = makeStyles({
  btnAction: {
    padding: "2px 30px",
    border: "1px solid #c4c4c4",
    borderRadius: "0px",
    color: "#222",
    fontSize: "13px",
  },
});

const OrgSelectModalContainer = forwardRef(function ({ targets, onOrgSelect, withUser, selectOnlyUser, multiple }, ref) {
  const classes = useStyles();

  const [opened, setOpened] = useState(false);
  const [targetIds, setTargetIds] = useState([]);

  useImperativeHandle(ref, () => ({
    openModal,
  }));

  /**
   * 모달 열기
   */
  const openModal = () => {
    setOpened(true);
  };

  /**
   * 모달 닫기
   */
  const closeModal = () => {
    setOpened(false);
  };

  /**
   * 대상 선택
   */
  const selectTarget = (targets) => {
    setTargetIds(targets);
  };

  return (
    <DynamicButtonModalDialog
      open={opened}
      title="조직도"
      onClose={closeModal}
      buttons={
        <Fragment>
          <Button
            color="primary"
            onClick={() => {
              onOrgSelect(targetIds);
              setOpened(false);
            }}
            className={classes.btnAction}
          >
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
      <ModalTreeContainer targets={targets} onTargetSelect={selectTarget} withUser={withUser} selectOnlyUser={selectOnlyUser} multiple={multiple} />
    </DynamicButtonModalDialog>
  );
});

export default OrgSelectModalContainer;
