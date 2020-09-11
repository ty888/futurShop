import API from '@/service/api';
import { apiKey, PID, tbName } from '@/utils/constants';


export const demo = (data) =>
  API.get(`hdk/itemlist/apikey/${apiKey}/nav/3/cid/0/back/10/min_id/1`, data);


// 商品详情
export const goodsDetail = (data) =>
  API.get(`hdk/item_detail/apikey/${apiKey}/itemid`, data);


// 高佣转链接
export const transformLink = (data) =>
  API.post(`hdk/ratesurl/apikey/${apiKey}`, {
    ...data,
    apikey: apiKey,
    pid: PID,
    tb_name: tbName,
    get_taoword: 1
  }, { contentType: 'application/x-www-form-urlencoded' });


// 超级搜索
export const superSearch = (data) =>
  API.get(`hdk/supersearch/apikey/${apiKey}`, data);



// 排行榜

// 各大榜单
export const rankList = (data) =>
  API.get(`hdk/sales_list/apikey/${apiKey}/sale_type/1`, data);


// 低价(9.9， 6.9， 3.9)
export const lowPriceList = (data) =>
  API.get(`hdk/low_price_Pinkage_data/apikey/${apiKey}/type/1/min_id/1`, data);


// 快抢商品
export const purchaseList = (data) =>
  API.get(`hdk/fastbuy/apikey/${apiKey}`, data);


// 今日值得买
export const everyDayGoodsList = () =>
API.get(`hdk/get_deserve_item/apikey/${apiKey}`);