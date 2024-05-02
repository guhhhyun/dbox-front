import { PanoramaSharp } from "@material-ui/icons";
import httpUtil from "utils/http-util";

console.debug("userprest-api.js");

/**
 * 사전 설정 (preset) api
 */
const UserPresetApi = {
  async getUserPreset(options) {
    const { params, headers } = options || {};
    return await httpUtil.get({
      url: `/api/userpreset`,
      headers,
      params: {
        mode: params.mode,
      },
    });
  },

  async getUserPresetAll({ params, headers }) {
    return await httpUtil.get({
      url: `/api/userpreset/${encodeURIComponent(params.rObjectId)}`,
      headers,
      params: {},
    });
  },

  /**
   * preset 수정
   */
  async patchUserPreset({ params, headers }) {
    return await httpUtil.patch({
      url: `/api/userpreset/${encodeURIComponent(params.rObjectId)}`,
      headers,
      data: {
        uConfigName: params.uConfigName,
        liveRead: params.liveRead != "" ? params.liveRead : [],
        liveDelete: params.liveDelete != "" ? params.liveDelete : [],
        closedRead: params.closedRead != "" ? params.closedRead : [],
        uSecLevel: params.uSecLevel,
        uPcRegFlag: params.uPcRegFlag,
        uCopyFlag: params.uCopyFlag,
        uEditSaveFlag: params.uEditSaveFlag,
        uMailPermitFlag: params.uMailPermitFlag,
        uRegBaseFlag: params.uRegBaseFlag,
        uSecBaseFlag: params.uSecBaseFlag,
        uOpenFlag: params.uOpenFlag,
      },
    });
  },

  /**
   * preset repeating 중복 검사
   */
  async getUserPresetDetailCount({ params, headers }) {
    return await httpUtil.get({
      url: `/api/userpreset/count/${encodeURIComponent(params.rObjectId)}`,
      headers,
      params: {
        uLiveReadAuthor: params.uLiveReadAuthor,
        uLiveDeleteAuthor: params.uLiveDeleteAuthor,
        uClosedReadAuthor: params.uClosedReadAuthor,
      },
    });
  },

  /**
   * preset 추가
   */
  async createUserPreset({ params, headers }) {
    return await httpUtil.post({
      url: `/api/userpreset`,
      headers,
      data: {
        uConfigName: params.uConfigName,
        liveRead: params.liveRead != "" ? params.liveRead : [],
        liveDelete: params.liveDelete != "" ? params.liveDelete : [],
        closedRead: params.closedRead != "" ? params.closedRead : [],
        uSecLevel: params.uSecLevel,
        uPcRegFlag: params.uPcRegFlag,
        uCopyFlag: params.uCopyFlag,
        uEditSaveFlag: params.uEditSaveFlag,
        uMailPermitFlag: params.uMailPermitFlag,
        uOpenFlag: params.uOpenFlag,
      },
    });
  },
};

export default UserPresetApi;
