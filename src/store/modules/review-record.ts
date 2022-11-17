export interface msgDataItem {
  id: string;
  content: string;
  type: string;
  status: boolean;
  collected: boolean;
  date: string;
  quality: string;
}
// 定义的state初始值
const state: { msgData: Array<msgDataItem> } = {
  msgData: [
    {
      commonUserId:null,
      id:null,
      questionA:null,
      questionAComment:null,
      questionAId:null,
      questionAScore:null,
      questionB:null,
      questionBComment:null,
      questionBId:null,
      questionBScore:null,
      reviewUserId:null,
    },

  ],
};

const mutations = {
  setMsgData(state, data) {
    // eslint-disable-next-line no-param-reassign
    state.msgData = data;
  },
};

const getters = {
  unreadMsg: (state) => state.msgData.filter((item) => item.reviewUserId === null),
  readMsg: (state) => state.msgData.filter((item) => item.reviewUserId !== null),
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
