import { forwardRef } from "react";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import ContextMenu from "views/commons/contextmenu/ContextMenu";

console.debug("ColumnContextMenu.js");

const ColumnContextMenu = forwardRef(function (props, ref) {
  return (
    <ContextMenu
      ref={ref}
      menus={[
        {
          element: <Typography>모든 열 너비 조정(A)</Typography>,
          onClick: () => {
            alert("모든 열 너비 조정(A)");
          },
        },
        {
          element: <Typography>필터</Typography>,
          onClick: () => {
            alert("필터");
          },
        },
        {
          element: <Typography>정렬</Typography>,
          onClick: () => {
            alert("정렬");
          },
        },
        {
          divider: true,
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="이름" />,
          onClick: () => {
            alert("이름");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="상태" />,
          onClick: () => {
            alert("상태");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="작성자" />,
          onClick: () => {
            alert("작성자");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="Feedback" />,
          onClick: () => {
            alert("Feedback");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="결재정보" />,
          onClick: () => {
            alert("결재정보");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="최종결재자" />,
          onClick: () => {
            alert("최종결재자");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="수정일" />,
          onClick: () => {
            alert("수정일");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="버전" />,
          onClick: () => {
            alert("버전");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="크기" />,
          onClick: () => {
            alert("크기");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="보안등급" />,
          onClick: () => {
            alert("보안등급");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="생성일" />,
          onClick: () => {
            alert("생성일");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="태그" />,
          onClick: () => {
            alert("태그");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="확장자" />,
          onClick: () => {
            alert("확장자");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="분류" />,
          onClick: () => {
            alert("분류");
          },
        },
        {
          element: <FormControlLabel control={<Checkbox />} label="만료일" />,
          onClick: () => {
            alert("만료일");
          },
        },
      ]}
      {...props}
    />
  );
});

export default ColumnContextMenu;
