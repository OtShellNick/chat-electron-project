import axios from 'axios'
import * as CookieHelper from '@helpers/cookie'
import { CONFIG } from '@config/config'
const server = CONFIG.development.REST
const Authorization = CookieHelper.get('authorization') || ''
axios.defaults.headers.common.authorization = Authorization

export const Server = (
  method,
  url,
  data
) => {
  return axios[method](`${server}${url}`, data).then((resp) => {
    if (resp.status === 200) return resp.data
  })
}
