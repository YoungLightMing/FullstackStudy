/*
 * @Desc: 文件描述
 * @Author: lumingming
 * @Date: 2020-06-12 20:35:53
 * @LastEditors: lumingming
 */ 

import Axios from 'axios';

const baseUrl = '/api/notes'

const getAll = () => Axios.get(baseUrl).then(res => res.data)
const create = (note) => Axios.post(baseUrl, note).then(res => res.data)
const modify = (id, note) => Axios.put(`${baseUrl}/${id}`, note).then(res => res.data)


export {
  getAll,
  create,
  modify
}