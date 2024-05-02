import { useState } from "react";
import GradeModalButton from "views/templates/manager/group/grade/redefinition/GradeModalButton";
import GradeRedefinitionApi from "apis/grade-api";

console.debug("GradeModalButtonContainer.js");

export default function GradeModalButtonContainer({ gradeData, gradeNameFirst, gradeNameSecond, gradeNameThird, gradeNameFourth, getData }) {
  const [opened, setOpened] = useState(false);
  const [clearOpened, setClearOpened] = useState(false);

  /**
   * 보안 등급명 저장
   */
  const saveGrade = async () => {
    try {
      for (let i = 0; i < 4; i++) {
        let uCodeName = i === 0 ? gradeNameFirst : i === 1 ? gradeNameSecond : i === 2 ? gradeNameThird : i === 3 ? gradeNameFourth : "";

        await GradeRedefinitionApi.updateGradeRedefinition({
          params: {
            rObjectId: gradeData[i].rObjectId,
            uCodeName1: uCodeName,
          },
        });
      }
    } catch (e) {
      console.error(e);
    }

    setOpened(false);
    setClearOpened(true);
    getData();
  };

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

  const closeClearModal = () => {
    setClearOpened(false);
  };

  return (
    <GradeModalButton
      opened={opened}
      onButtonClick={openModal}
      onModalOkClick={saveGrade}
      onModalClose={closeModal}
      clearOpened={clearOpened}
      closeClearModal={closeClearModal}
      color="secondary"
    />
  );
}
