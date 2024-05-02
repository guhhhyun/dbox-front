import React, { useEffect, useState } from "react";
import GradeRedefinition from "views/templates/manager/group/grade/redefinition/GradeRedefinition";
import GradeRedefinitionApi from "apis/grade-api";

console.debug("GradeRedefinitionContainer.js");

export default function GradeRedefinitionContainer() {
  const [gradeData, setGradeData] = useState([]);
  const [gradeNameFirst, setGradeNameFirst] = useState("");
  const [gradeNameSecond, setGradeNameSecond] = useState("");
  const [gradeNameThird, setGradeNameThird] = useState("");
  const [gradeNameFourth, setGradeNameFourth] = useState("");

  /**
   * 데이터 불러오기
   */
  const getData = async () => {
    try {
      const response = await GradeRedefinitionApi.selectGradeRedefinition({
        params: {
          uCodeType: "SEC_LEVEL",
        },
      });
      setGradeData(response.data.response);
      setGradeNameFirst(response.data.response[0].uCodeName1);
      setGradeNameSecond(response.data.response[1].uCodeName1);
      setGradeNameThird(response.data.response[2].uCodeName1);
      setGradeNameFourth(response.data.response[3].uCodeName1);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  /**
   *  보안등급 재정의 입력 값 불러오는 함수
   */
  const firstGradeNameChange = (event) => {
    setGradeNameFirst(event.target.value);
  };
  const secondGradeNameChange = (event) => {
    setGradeNameSecond(event.target.value);
  };
  const thirdGradeNameChange = (event) => {
    setGradeNameThird(event.target.value);
  };
  const fourthGradeNameChange = (event) => {
    setGradeNameFourth(event.target.value);
  };

  return (
    <GradeRedefinition
      gradeData={gradeData}
      gradeNameFirst={gradeNameFirst}
      gradeNameSecond={gradeNameSecond}
      gradeNameThird={gradeNameThird}
      gradeNameFourth={gradeNameFourth}
      firstGradeNameChange={firstGradeNameChange}
      secondGradeNameChange={secondGradeNameChange}
      thirdGradeNameChange={thirdGradeNameChange}
      fourthGradeNameChange={fourthGradeNameChange}
      getData={getData}
    />
  );
}
