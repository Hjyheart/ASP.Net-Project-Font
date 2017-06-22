/**
 * Created by hongjiayong on 2017/6/13.
 */


import {baseUrl} from '../../config/index'
import $ from 'jquery'

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {

  type = type.toUpperCase();
  url = baseUrl + url;

  let queryStr = '';
  if (type === 'GET') {
    Object.keys(data).forEach(key => {
      queryStr += key + '=' + data[key] + '&';
    });

    if (queryStr !== ''){
      queryStr = queryStr.substr(0, queryStr.lastIndexOf('&'));
      url += '?' + queryStr;
    }

    data = {}
  }

  return new Promise((resolve, reject) => {
    $.ajax({
      type: type,
      url: url,
      dataType: 'json',
      data: data,
      timeout: 5000
    }).done(res => {
      resolve(res)
    }).catch(err => {
      resolve(err)
    })
  })
}
