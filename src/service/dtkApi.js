import API from '@/service/api';
import { returnParams } from '@/utils/utils'

export const parseContent = (data) =>
  API.get(`dtk/api/tb-service/parse-content`, returnParams(data));