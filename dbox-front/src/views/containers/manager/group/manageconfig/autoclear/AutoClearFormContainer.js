import AutoClearForm from "views/templates/manager/group/manageconfig/autoclear/AutoClearForm";
import AutoClosingApi from "apis/autoclosing-api";
import {useEffect, useState} from "react";

export default function AutoClearFormContainer() {

  // FIXME 사용자에 따라서?
  const defaultCompany = 'DKS';

  const [autoClosingData, setAutoClosingData] = useState([]);

  useEffect(() => {
    getAutoClosingPeriodFor();
  }, [])

  const getAutoClosingPeriodFor = async (company = defaultCompany) => {
    const response = await AutoClosingApi.getAutoClosingPeriodFor(company);
    if(response.status === 200) {
      setAutoClosingData(response.data.response);
    }
    // TODO Handle exception.
  }

  const onChangeCompany = ({ target: { value } }) => {
    getAutoClosingPeriodFor(value);
  }

  const onChangeElapsedPeriod = ({ target: { value } }) => {
    const assigned = Object.assign({}, autoClosingData, {u_code_val2: value});
    setAutoClosingData(assigned);
  }

  const onChangeNonUsePeriod = ({ target: { value } }) => {
    const assigned = Object.assign({}, autoClosingData, {u_code_val3: value});
    setAutoClosingData(assigned);
  }

  return (
    <AutoClearForm
      autoClosingData={autoClosingData}
      onChangeCompany={onChangeCompany}
      onChangeElapsedPeriod={onChangeElapsedPeriod}
      onChangeNonUsePeriod={onChangeNonUsePeriod}
    />
  );
}
