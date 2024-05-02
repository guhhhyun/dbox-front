import React, {useEffect, useState} from "react";
import TransferApprovalApi from "apis/transferapproval-api";
import TransferApprovalSearchForm from "./TransferApprovalSearchForm";
import {format, subDays} from "date-fns";

export default function TransferApprovalSearchFormContainer(props) {

  const initValue = {u_req_user: "", display_name: "전체"};

  const [reqUser, setReqUser] = useState(initValue);
  const [reqUsers, setReqUsers] = useState([]);

  const [reqTitle, setReqTitle] = useState("");

  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    getReqUsers();
  }, []);

  const getReqUsers = async () => {
    const response = await TransferApprovalApi.getReqUsers();
    const data = response.data.response;
    if(data) {
      setReqUsers(data);
      data.unshift(initValue);
    }
  };

  const onChangeReqUser = (event, value) => {
    if(value) {
      setReqUser(value);
    }
  }

  const onChangeReqTitle = (event) => {
    const value = event.target.value;
    setReqTitle(value);
  }

  const onChangeStartDate = (event, value) => {
    setStartDate(value);
  }

  const onChangeEndDate = (event, value) => {
    setEndDate(value);
  }

  const onSearch = () => {
    const dataToSearchFor = {
      uReqUser: reqUser.u_req_user,
      uReqTitle: reqTitle,
      startDate: startDate,
      endDate: endDate
    }
    console.log('dataToSearchFor', dataToSearchFor)
    props.setDataToSearchFor(dataToSearchFor);
  }

  return (
    <TransferApprovalSearchForm
      reqUser={reqUser}
      reqUsers={reqUsers}
      startDate={startDate}
      endDate={endDate}
      onChangeReqUser={onChangeReqUser}
      onChangeReqTitle={onChangeReqTitle}
      onChangeStartDate={onChangeStartDate}
      onChangeEndDate={onChangeEndDate}
      onSearch={onSearch}
    />
  );
}
