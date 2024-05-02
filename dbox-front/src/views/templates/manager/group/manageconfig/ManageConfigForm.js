import React from "react";
import {Accordion, AccordionDetails, AccordionSummary, IconButton, Typography, withStyles} from "@material-ui/core";
import {ExpandMore, Help, MenuOpen} from "@material-ui/icons";
import ApprovalFormContainer from "views/containers/manager/group/manageconfig/approval/ApprovalFormContainer";
import AutoChangeFormContainer from "views/containers/manager/group/manageconfig/autochange/AutoChangeFormContainer";
import StoragePeriodFormContainer
  from "views/containers/manager/group/manageconfig/storageperiod/StoragePeriodFormContainer";
import CompanyTemplateFormContainer
  from "views/containers/manager/group/manageconfig/companytemplate/CompanyTemplateFormContainer";
import AutoClearFormContainer from "views/containers/manager/group/manageconfig/autoclear/AutoClearFormContainer";
import LockedDataFormContainer from "views/containers/manager/group/manageconfig/lockeddata/LockedDataFormContainer";
import styles from "./ManageConfigForm.module.css";

console.log("ManageConfigForm.js");

const StyledAccordionSummary = withStyles(() => ({
   content: {
     justifyContent:'space-between'
   },
}))(AccordionSummary);

export default function ManageConfigForm() {
  return (
    <div className={styles.main}>
      <Typography variant="h6" className={styles.title}><MenuOpen /> 자료 관리</Typography>
      <div>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMore />}>
            <Typography>자료이관 승인 설정</Typography>
            <IconButton size="small" className={styles.spaceBetween}>
              <Help fontSize="inherit" />
            </IconButton>
          </StyledAccordionSummary>
          <AccordionDetails>
            <ApprovalFormContainer />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Live → Closed 자동 변환 기간 설정</Typography>
            <IconButton size="small" className={styles.spaceBetween}>
              <Help fontSize="inherit" />
            </IconButton>
          </StyledAccordionSummary>
          <AccordionDetails>
            <AutoChangeFormContainer />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMore />}>
            <Typography>삭제 완료 및 폐기 승인 문서 시스템 보관 기간 설정</Typography>
            <IconButton size="small" className={styles.spaceBetween}>
              <Help fontSize="inherit" />
            </IconButton>
          </StyledAccordionSummary>
          <AccordionDetails>
            <StoragePeriodFormContainer />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMore />}>
            <Typography>사별 표준 문서 템플릿 등록</Typography>
            <IconButton size="small" className={styles.spaceBetween}>
              <Help fontSize="inherit" />
            </IconButton>
          </StyledAccordionSummary>
          <AccordionDetails>
            <CompanyTemplateFormContainer />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMore />}>
            <Typography>편집 중 → 편집 가능 문서 상태 전환 설정</Typography>
            {/* <Typography>Live 문서 수정 중 상태 자동 해제 기간 설정</Typography> */}
            <IconButton size="small" className={styles.spaceBetween}>
              <Help fontSize="inherit" />
            </IconButton>
          </StyledAccordionSummary>
          <AccordionDetails>
            <LockedDataFormContainer />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <StyledAccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Closed 문서 버전 삭제 설정</Typography>
            <IconButton size="small" className={styles.spaceBetween}>
              <Help fontSize="inherit" />
            </IconButton>
          </StyledAccordionSummary>
          <AccordionDetails>
            <AutoClearFormContainer />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
