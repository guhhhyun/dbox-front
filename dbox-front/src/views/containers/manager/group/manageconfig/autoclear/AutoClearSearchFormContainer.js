import {useEffect, useState} from "react";
import AutoClearSearchForm from "./AutoClearSearchForm";
import DeptManagerApi from "apis/deptmanager-api";
import { format, subDays } from 'date-fns'

export default function AutoClearSearchFormContainer(props) {

  const [selectedCompany, setSelectedCompany] = useState({ key: "", desc: "전체" });

  const [depts, setDepts] = useState([]);
  const [selectedDept, setSelectedDept] = useState({ orgId: "", orgNm: "전체" });
  const [filteredDepts, setFilteredDepts] = useState([]);

  const [objectName, setObjectName] = useState("");
  const [versionCount, setVersionCount] = useState(1);

  const [startDate, setStartDate] = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    getDepts();
  }, []);

  const getDepts = async () => {
    const response = await DeptManagerApi.getDepts();
    const data = response.data.response;
    if(data) {
      setDepts(data);
      data.unshift({orgId: "", orgNm: "전체"});
      setFilteredDepts(data);
    }
  };

  const onChangeCompany = (event, value) => {
    if(value) {
      const comCode = value.key;
      if(depts.length > 0) {
        const filtered = depts.filter(item => item.comOrgId === comCode);
        filtered.unshift({orgId: "", orgNm: "전체"})
        setSelectedDept(filtered[0]);
        setFilteredDepts(filtered);
      }
      setSelectedCompany(value);
    }
  }

  const onChangeDept = (event, value) => {
    if(value) {
      setSelectedDept(value)
    }
  }

  const onChangeObjectName = (event) => {
    const value = event.target.value;
    setObjectName(value);
  }

  const onChangeVersionCount = (event) => {
    const value = event.target.value;
    if(value > 0) {
      setVersionCount(value)
    }
  }

  const startChangeDate = (event, value) => {
    setStartDate(value);
  };

  const endChangeDate = (event, value) => {
    setEndDate(value);
  };

  const onSearch = async () => {
    const dataToSearchFor = {
      comCode: selectedCompany.key,
      orgId: selectedDept.orgId,
      versionCount: versionCount,
      objectName: objectName,
      startDate: startDate,
      endDate: endDate
    }
    props.setDataToSearchFor(dataToSearchFor);
  };

  return (
    <AutoClearSearchForm
      selectedCompany={selectedCompany}
      selectedDept={selectedDept}
      filteredDepts={filteredDepts}
      versionCount={versionCount}
      onChangeObjectName={onChangeObjectName}
      onChangeVersionCount={onChangeVersionCount}
      startDate={startDate}
      startChangeDate={startChangeDate}
      endDate={endDate}
      endChangeDate={endChangeDate}
      onChangeCompany={onChangeCompany}
      onChangeDept={onChangeDept}
      onSearch={onSearch}
    />
  );
}
