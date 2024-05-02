import React, {useEffect, useState} from "react";
import DeptManagerApi from "apis/deptmanager-api";
import DeptManagerSearchForm from "./DeptManagerSearchForm";

export default function DeptManagerSearchFormContainer(props) {

  const [company, setCompany] = useState({ key: "", desc: "전체" });

  const [depts, setDepts] = useState([]);
  const [selectedDept, setSelectedDept] = useState({ orgId: "", orgNm: "전체" });

  const [user, setUser] = useState({user_id: "", display_name: "전체"});
  const [users, setUsers] = useState([]);
  
  const [position, setPosition] = useState({pstn_code: "", pstn_name: "전체"});
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    getDepts();
    getPositions();
    getDeptManagers();
  }, []);

  const getDepts = async () => {
    const response = await DeptManagerApi.getDepts();
    const data = response.data.response;
    if(data) {
      setDepts(data);
      data.unshift({orgId: "", orgNm: "전체"});
    }
  };

  const getPositions = async () => {
    const response = await DeptManagerApi.getPositions();
    const data = response.data.response;
    if(data) {
      setPositions(data);
      data.unshift({pstn_code: "", pstn_name: "전체"});
    }
  };

  const getDeptManagers = async () => {
    const response = await DeptManagerApi.getDeptManagers();
    const data = response.data.response;
    if(data) {
      setUsers(data);
      data.unshift({user_id: "", display_name: "전체"});
    }
  };

  const onChangeCompany = (event, value) => {
    if(value) {
      setCompany(value);
      setSelectedDept({ orgId: "", orgNm: "전체" })
    }
  }

  const onChangeDept = (event, value) => {
    if(value) {
      setSelectedDept(value)
    }
  }

  const onChangePosition = (event, value) => {
    if(value) {
      setPosition(value);
    }
  }

  const onChangeUser = (event, value) => {
    if(value) {
      setUser(value);
    }
  }

  const onSearch = () => {
    const pstnName = position.pstn_name;
    const dataToSearchFor = {
      comCode: company.key,
      deptCode: selectedDept.orgId,
      pstnName: pstnName === "전체" ? '' : pstnName,
      userId: user.user_id
    }
    console.log('dataToSearchFor', dataToSearchFor)
    props.setDataToSearchFor(dataToSearchFor);
  }

  return (
    <DeptManagerSearchForm
      company={company}
      selectedDept={selectedDept}
      depts={depts}
      user={user}
      users={users}
      position={position}
      positions={positions}
      onChangeCompany={onChangeCompany}
      onChangeDept={onChangeDept}
      onChangePosition={onChangePosition}
      onChangeUser={onChangeUser}
      onSearch={onSearch}
    />
  );
}
