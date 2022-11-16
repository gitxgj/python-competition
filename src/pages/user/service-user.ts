class DetailBase {
  /**
   * 下拉框选项数据
   *
   * @returns
   *
   * @memberOf DetailBase
   */
  getRadioOpetions() {
    return [
      {
        label: 'Web',
        value: 'Web',
      },
      {
        label: 'Mobile',
        value: 'Mobile',
      },
    ];
  }

  /**
   * 弹窗数据
   *
   * @returns
   *
   * @memberOf DetailBase
   */
  getBaseInfoData() {
    return [
      {
        name: '集群名',
        value: 'helloworld',
      },
      {
        name: '集群ID',
        value: 'cls - 2ntelvxw',
        type: {
          key: 'color',
          value: 'blue',
        },
      },
      {
        name: '状态',
        value: '运行中',
        type: {
          key: 'color',
          value: 'green',
        },
      },
      {
        name: 'K8S版本',
        value: '1.7.8',
      },
      {
        name: '配置',
        value: '6.73 核 10.30 GB',
      },
      {
        name: '所在地域',
        value: '广州',
      },
      {
        name: '新增资源所属项目',
        value: '默认项目',
      },
      {
        name: '节点数量',
        value: '4 个',
      },
      {
        name: '节点网络',
        value: 'vpc - 5frmkm1x',
        type: {
          key: 'color',
          value: 'blue',
        },
      },
      {
        name: '容器网络',
        value: '172.16.0.0 / 16',
      },
      {
        name: '集群凭证',
        value: '显示凭证',
        type: {
          key: 'color',
          value: 'blue',
        },
      },
      {
        name: '创建/更新',
        value: '2018-05-31 22:11:44 2018-05-31 22:11:44',
        type: {
          key: 'contractAnnex',
          value: 'pdf',
        },
      },
      {
        name: '描述',
        value: 'istio_test',
      },
    ];
  }

  /**
   * 表格定义基础数据
   *
   * @returns
   *
   * @memberOf DetailBase
   */
  getTableColumns() {
    return [
      {
        minWidth: '100',
        ellipsis: true,
        colKey: 'id',
        title: '用户id',
      },
      {
        width: '100',
        ellipsis: true,
        colKey: 'userAccount',
        title: '账户',
      },
      {
        width: '100',
        ellipsis: true,
        colKey: 'userName',
        title: '用户名',
      },
      {
        width: '200',
        ellipsis: true,
        colKey: 'roleId',
        title: '用户角色',
      },
      {
        width: '224',
        ellipsis: true,
        colKey: 'email',
        title: '邮箱',
      },
      {
        width: '100',
        className: 'test',
        ellipsis: true,
        colKey: 'sex',
        title: '性别',
      },
      {
        align: 'left',
        width: '200',
        className: 'test2',
        ellipsis: true,
        colKey: 'totalCredit',
        fixed: 'left',
        title: '总积分',
      },
      {
        align: 'left',
        width: '200',
        className: 'test2',
        ellipsis: true,
        colKey: 'op',
        fixed: 'right',
        title: '操作',
      },
    ];
  }

  /**
   * 获取弹窗配置数据
   *
   * @memberOf DetailBase
   */
  getPropUpData() {
    const INITIAL_DATA = {
      name: '',
      warning: '',
      success: '',
      failB: '',
      warningB: '',
      loading: '',
      add: '',
      help: '',
    };

    return {
      formData: { ...INITIAL_DATA },
      courseOptions: [
        { label: '语文', value: '1' },
        { label: '数学', value: '2' },
        { label: '英语', value: '3' },
      ],
      options: [
        {
          label: '资源初始化后',
          value: 'beijing',
        },
        {
          label: '上海',
          value: 'shanghai',
        },
      ],
      options1: [
        {
          label: '资源初始化后',
          value: 'guangzhou',
        },
        {
          label: '深圳',
          value: 'shenzhen',
        },
        {
          label: '东莞',
          value: 'dongguang',
        },
      ],
      options2: [
        {
          label: '资源初始化后',
          value: 'nanjing',
        },
        {
          label: '苏州',
          value: '苏州',
        },
        {
          label: '无锡',
          value: 'wuxi',
        },
      ],
      tSelectOptions: [
        {
          label: 'Sanzhang',
          value: '1',
        },
        {
          label: 'ls',
          value: '2',
        },
        {
          label: 'James',
          value: '3',
        },
      ],
    };
  }
}

export default new DetailBase();
import { getChartListColor } from '@/utils/color';
import { getDateArray, getRandomArray } from '@/utils/charts';

export const lastYearList: Array<number> = [100, 120, 140, 160, 180, 200, 210];

/** 平滑图数据 */
// eslint-disable-next-line import/prefer-default-export
export function getSmoothLineDataSet({
                                       dateTime = [],
                                       placeholderColor,
                                       borderColor,
                                     }: { dateTime?: Array<string> } & Record<string, string>) {
  let dateArray: Array<string> = ['00:00', '02:00', '04:00', '06:00'];
  if (dateTime.length > 0) {
    const divideNum = 7;
    dateArray = getDateArray(dateTime, divideNum);
  }

  return {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '10px',
      left: '0',
      right: '20px',
      bottom: '36px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: dateArray,
      boundaryGap: false,
      axisLabel: {
        color: placeholderColor,
      },
      axisLine: {
        lineStyle: {
          color: borderColor,
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: placeholderColor,
      },
      splitLine: {
        lineStyle: {
          color: borderColor,
        },
      },
    },
    legend: {
      data: ['本月', '上月'],
      icon: 'circle',
      bottom: '0',
      itemGap: 48,
      itemHeight: 8,
      itemWidth: 8,
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
    },
    series: [
      {
        name: '上月',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        smooth: true,
        color: getChartListColor()[0],
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          normal: {
            opacity: 0.1,
          },
        },
      },
      {
        name: '本月',
        data: [
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
          getRandomArray(),
        ],
        type: 'line',
        smooth: true,
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        color: getChartListColor()[1],
      },
    ],
  };
}

/**
 * 柱状图数据结构
 *
 * @export
 * @param {boolean} [isMonth=false]
 * @returns {*}
 */
export function get2ColBarChartDataSet({
                                         isMonth = false,
                                         placeholderColor,
                                         borderColor,
                                       }: { isMonth?: boolean } & Record<string, string>) {
  let lastYearListCopy = lastYearList.concat([]);
  let thisYearListCopy = lastYearList.concat([]);

  if (isMonth) {
    lastYearListCopy = lastYearListCopy.reverse();
    thisYearListCopy = thisYearListCopy.reverse();
  }

  return {
    color: getChartListColor(),
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '10px',
      left: '0',
      right: '0',
      bottom: '36px',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: placeholderColor,
        },
        axisLine: {
          lineStyle: {
            color: borderColor,
            width: 1,
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          color: placeholderColor,
        },
        splitLine: {
          lineStyle: {
            color: borderColor,
          },
        },
      },
    ],
    legend: {
      data: ['去年', '今年'],
      bottom: '0',
      icon: 'rect',
      itemGap: 48,
      itemHeight: 4,
      itemWidth: 12,
      textStyle: {
        fontSize: 12,
        color: placeholderColor,
      },
    },
    series: [
      {
        name: '去年',
        type: 'bar',
        barWidth: '30%',
        data: lastYearListCopy,
      },
      {
        name: '今年',
        type: 'bar',
        barWidth: '30%',
        data: thisYearListCopy,
      },
    ],
  };
}
