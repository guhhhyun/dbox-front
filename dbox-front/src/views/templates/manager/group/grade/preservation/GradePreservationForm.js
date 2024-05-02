import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import GradeClosedSetting from "views/templates/manager/group/grade/preservation/GradeClosedSetting";
import GradeExtendDeadline from "views/templates/manager/group/grade/preservation/GradeExtendDeadline";
import GradeNotApply from "views/templates/manager/group/grade/preservation/GradeNotApply";
import ConfirmDialog from "views/commons/dialog/ConfirmDialog";
import PreservationPeriodApi from "apis/preservationperiod-api";
import DeptManagerApi from "apis/deptmanager-api";

function getComCodeByUser(user) {
  const comCode = user.mgr.groupComCode ? user.mgr.groupComCode : user.mgr.companyComCode;
  return comCode === "DKG" ? "DKS" : comCode;
}

export default function GradePreservationForm() {

  const user = useSelector((state) => state.session.user);
  const comCode = getComCodeByUser(user);
  console.log('comCode', comCode)
  const [depts, setDepts] = useState([]);
  const [filteredDept, setFilteredDept] = useState({orgNm: ""});
  const [filteredDepts, setFilteredDepts] = useState([]);
  const [deptsUnusedExt, setDeptsUnusedExt] = useState([]);

  const [company, setCompany] = useState(comCode)
  const [preservPeriod, setPreservPeriod] = useState({});

  const [opened, setOpened] = useState(false);
  const [options, setOptions] = useState({ opened: false });

  useEffect(() => {
    getDepts();
  }, []);

  useEffect(() => {
    getPreservationPeriodByComCode();
    getDeptsNotToUseExtend();
  }, [company]);

  useEffect(() => {
    setOpened(options.opened)
  }, [options]);

  const getPreservationPeriodByComCode = async () => {
    console.log('company', comCode, company)
    const response = await PreservationPeriodApi.getPreservationPeriodByComCode(company);
    const data = response.data.response;
    setPreservPeriod(data);
  }

  const getDepts = async () => {
    const response = await DeptManagerApi.getDepts();
    const data = response.data.response;
    setDepts(data);
    setFilteredDepts(getFilteredDepts(data, company));
  }

  const getDeptsNotToUseExtend = async () => {
    const response = await PreservationPeriodApi.getDeptsNotToUseExtend();
    const data = response.data.response;
    setDeptsUnusedExt(data)
  }

  const getFilteredDepts = (depts, company) => {
    const filter = depts.filter(item => item.comOrgId === company);
    if(filter.length > 0) {
      setFilteredDept(filter[0]);
    }
    return filter;
  }

  const onChangeCompany = (value) => {
    if(value) {
      const company = value.target.value;
      setCompany(company)
      setFilteredDepts(getFilteredDepts(depts, company));
    }
  }

  const onChangeDept = (event, value) => {
    if(value) {
      setFilteredDept(value)
    }
  }

  const onChangePeriod = (value) => {
    const target = value.target;
    if(target) {
      const checked = target?.checked;
      const isCheckbox = checked !== undefined;
      const preservPeriodToChange = { ...preservPeriod };
      preservPeriodToChange[target.name] = isCheckbox ? (checked ? 1 : 0) : target.value;
      setPreservPeriod(preservPeriodToChange);
    }
  }

  const closeDialog = () => setOpened(false);

  const onModalClose = () => {
    if(opened) {
      closeDialog();
    }
  }

  const actions = {
    patchPreservationPeriod: async () => {
      await PreservationPeriodApi.patchPreservationPeriod(preservPeriod)
    },
    patchAutoExtend: async () => {
      await PreservationPeriodApi.patchAutoExtend(preservPeriod)
    },
    patchDeptToUseAutoExtend: async () => {
      await PreservationPeriodApi.patchDeptToUseAutoExtend(preservPeriod.r_object_id, options.uNoExtDept);
      await getDeptsNotToUseExtend();
    },
    patchDeptNotToUseAutoExtend: async () => {
      options.patching(true);
      await PreservationPeriodApi.patchDeptNotToUseAutoExtend(preservPeriod.r_object_id, filteredDept.orgId);
      await getDeptsNotToUseExtend();
      options.patching(false);
    }
  };

  const onModalOkClick = async () => {
    actions[options.action]();
    closeDialog();
  }

  return (
    <>
      <ConfirmDialog open={opened} onOkClick={onModalOkClick} onClose={onModalClose} {...options} />
      <GradeClosedSetting
        company={company}
        preservPeriod={preservPeriod}
        setOptions={setOptions}
        onChangeCompany={onChangeCompany}
        onChangePeriod={onChangePeriod}
      />
      <GradeExtendDeadline
        preservPeriod={preservPeriod}
        setOptions={setOptions}
        onChangePeriod={onChangePeriod}
      />
      <GradeNotApply
        preservPeriod={preservPeriod}
        filteredDept={filteredDept}
        filteredDepts={filteredDepts}
        deptsUnusedExt={deptsUnusedExt.filter(item => item.u_com_code === company)}
        setOptions={setOptions}
        onChangeDept={onChangeDept}
      />
    </>
  );
}