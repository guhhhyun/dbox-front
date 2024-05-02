import httpUtil from "utils/http-util";
import deptTree from "./testjson/dept-tree.json";
import nodeList from "./testjson/node-list.json";

console.debug("node-api.js");

const NodeApi = {
  async getNodeList({ params, headers }) {
    return Promise.resolve(deptTree);
    // return await httpUtil.get({
    //   url: `/api/nodes`,
    //   headers,
    //   params: {
    //     nodeTypeCodes: JSON.stringify(params.nodeTypeCodes),
    //     field: params.field,
    //     keyword: params.keyword,
    //     orders: JSON.stringify(params.orders),
    //     paging: JSON.stringify(params.paging),
    //     nodeId: params.nodeId,
    //     rootNodeId: params.rootNodeId,
    //     rootEntCode: params.rootEntCode,
    //     mode: params.mode,
    //     writableYn: params.writableYn,
    //     readableYn: params.readableYn,
    //     editableYn: params.editableYn,
    //     deletableYn: params.deletableYn,
    //     authNodeTypeCodes: JSON.stringify(params.authNodeTypeCodes),
    //   },
    // });
  },
  async getNodeChildren({ params, headers }) {
    return Promise.resolve({ data: { result: { list: nodeList } } });
    // return await httpUtil.get({
    //   url: `/api/nodes/${encodeURIComponent(params.nodeId)}/children`,
    //   headers,
    //   params: {
    //     nodeId: params.nodeId,
    //     rootNodeId: params.rootNodeId,
    //     rootEntCode: params.rootEntCode,
    //     id: params.id,
    //     nodeTypeCodes: JSON.stringify(params.nodeTypeCodes),
    //     field: params.field,
    //     keyword: params.keyword,
    //     orders: JSON.stringify(params.orders),
    //     paging: JSON.stringify(params.paging),
    //     mode: params.mode,
    //     writableYn: params.writableYn,
    //     readableYn: params.readableYn,
    //     editableYn: params.editableYn,
    //     deletableYn: params.deletableYn,
    //     authNodeTypeCodes: JSON.stringify(params.authNodeTypeCodes),
    //   },
    // });
  },

  async getNodeAllList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/depts/tree`,
      headers,
      params: {
        userYn: params.userYn,
        deptId: params.deptId,
      },
    });
  },

  async getChildrenAllList({ params, headers }) {
    return await httpUtil.get({
      url: `/api/depts/${encodeURIComponent(params.deptId)}/children/all`,
      headers,
      params: {
        deptId: params.deptId,
      },
    });
  },

  // async getNodeDeptList({ params, headers }) {
  //   return await httpUtil.get({
  //     url: `/api/depts/tree`,
  //     headers,
  //     params: {},
  //   });
  // },
};

export default NodeApi;
