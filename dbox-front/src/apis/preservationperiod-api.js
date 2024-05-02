import httpUtil from "utils/http-util";

const PreservationPeriodApi = {

  async getPreservationPeriodByComCode(comCode) {
    return await httpUtil.get({ url: `/api/preservation-periods/${comCode}` });
  },

  async getDeptsNotToUseExtend() {
    return await httpUtil.get({ url: '/api/preservation-periods/depts' });
  },

  async patchDeptToUseAutoExtend(rObjectId, uNoExtDept) {
    return await httpUtil.patch({
      url: `/api/preservation-periods/dept/${rObjectId}/use-auto-extend`,
      data: {
        uNoExtDept
      }
    });
  },

  async patchDeptNotToUseAutoExtend(rObjectId, uNoExtDept) {
    return await httpUtil.patch({
      url: `/api/preservation-periods/dept/${rObjectId}/disuse-auto-extend`,
      data: {
        uNoExtDept
      }
    });
  },

  async patchPreservationPeriod(params) {
    const data = {
      uSecSYear: params.u_sec_s_year,
      uSecTYear: params.u_sec_t_year,
      uSecCYear: params.u_sec_c_year,
      uSecGYear: params.u_sec_g_year,
      uPjtEverFlag: params.u_pjt_ever_flag
    }
    return await httpUtil.patch({
      url: `/api/preservation-periods/${params.r_object_id}`,
      data
    });
  },

  async patchAutoExtend(params) {
    return await httpUtil.patch({
      url: `/api/preservation-periods/${params.r_object_id}/auto-extend`,
      data : {
        uAutoExtend: params.u_auto_extend
      }
    });
  }
};

export default PreservationPeriodApi;
