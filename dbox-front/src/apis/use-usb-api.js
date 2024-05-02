import httpUtil from "utils/http-util";

console.debug("use-usb-api.js");

const UseUsbApi = {
  async getUseUsb({params,headers}) {
    let response = await httpUtil.post({
      url: `/api/usb-request/info`,
      headers,
      data: params
    });
    return response.data?.response;
  },
  async reqUseUsb({params,headers}) {
    let response = await httpUtil.post({
      url: `/api/usb-request`,
      headers,
      data: params
    });
    return response.data?.response;
  },
  
  async approveUseUsb({params,headers}) {
    let response = await httpUtil.patch({
      url: `/api/usb-request/${params.rObjectId}/approve`,
      headers,
      data: params
    });
    return response.data?.response;
  },

  async rejectUseUsb({params,headers}) {
    let response = await httpUtil.patch({
      url: `/api/usb-request/${params.rObjectId}/reject`,
      headers,
      data: params
    });
    return response.data?.response;
  },

  async approveAllUseUsb({params,headers}) {
    let response = await httpUtil.patch({
      url: `/api/usb-request/approve`,
      headers,
      data: params
    });
    return response.data?.response;
  },

  async rejectAllUseUsb({params,headers}) {
    let response = await httpUtil.patch({
      url: `/api/usb-request/reject`,
      headers,
      data: params
    });
    return response.data?.response;
  },
};

export default UseUsbApi;
