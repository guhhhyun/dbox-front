import { useState } from "react";
import ShareGroupAuthSearchButton from "views/templates/manager/group/share/sharegroup/ShareGroupAuthSearchButton";

console.debug("ShareGroupAuthSearchButtonContainer.js");

export default function ShareGroupAuthSearchButtonContainer({ onInputTextData }) {
  const [searchSelect, setSearchSelect] = useState("전체");
  const [searchText, setSearchText] = useState("");

  // 검색어 구분 선택(select)
  const choiceSelect = (event) => {
    setSearchSelect(event.target.value);
  };

  // 검색어 입력하는 내용
  const searchTextInput = (event) => {
    setSearchText(event.target.value);
  };

  // // 검색 아이콘 클릭 시

  const clickSearch = () => {
    onInputTextData(searchSelect, searchText);
  };

  return (
    <ShareGroupAuthSearchButton
      onIconClick={clickSearch}
      handleValueChange={searchTextInput}
      choiceSelect={choiceSelect}
      searchTextInput={searchTextInput}
      searchSelect={searchSelect}
    />
  );
}
