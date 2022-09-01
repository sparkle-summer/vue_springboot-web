/**
 * @author fw 
 * @Time 2022年8月26日11:04:55 
 * @description 用与自己开发部分api配置
 */

 import request from '@/utils/request'
 // 某行新内管api配置方式
 // let qrCodeAPI={}
 
 // /**
 //  * @description 生成二维码，无logo图片,使用request方式获取参数
 //  * @param {*} params 
 //  * @returns 
 //  */
 //  qrCodeAPI.getQrcode = function(params){
 //   return request({
 //     url: '/api/qrCode/getQrcode',
 //     method: 'post',
 //     responseType: 'blob',
 //     data: params
 //   })
 // }
 
 // /**
 //  * @description 生成二维码，无logo图片
 //  * @param {*} params 
 //  * @returns 
 //  */
 //  qrCodeAPI.createQrCode = function(params){
 //   return request({
 //     url: '/api/pictures/createQrCode',
 //     method: 'post',
 //     responseType: 'blob',
 //     data: params
 //   })
 // }
 
 // /**
 //  * @description 生成二维码，有logo图片
 //  * @param {*} params 
 //  * @returns 
 //  */
 // qrCodeAPI.getQrCodePic = function(params){
 //   return request({
 //     url: '/api/qrCode/getQrCodePic',
 //     method: 'post',
 //     responseType: 'blob',
 //     headers: {
 //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
 //     },
 //     data: params
 //   })
 // }
 
 // export default qrCodeAPI
   
 // 商城配置方式
 /**
  * 无logo参数传入
  * @returns 
  */
 export function generateQrCodeReq(params) {
   return request({
     url: 'api/qrCode/generateQrCodeReq',
     method: 'post',
     responseType: 'blob',
     data: params
   })
 }
 /**
  * 无logo参数传入
  * @returns 
  */
 export function generateQrCodeDto(params) {
   return request({
     url: 'api/qrCode/generateQrCodeDto',
     method: 'post',
     responseType: 'blob',
     data: params
   })
 }
 /**
  * 有logo参数传入
  * @param {*} data 
  * @returns 
  */
 export function generateQrCodeLogo(params) {
   return request({
     url: 'api/qrCode/generateQrCodeLogo',
     method: 'post',
     responseType: 'blob',
     data: params
   })
 }

 export default { generateQrCodeReq, generateQrCodeDto, generateQrCodeLogo }
 