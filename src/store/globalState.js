/* 全局状态 */
const state = {};

export const setState = (key,value)=>{
  state[key] = value
}

export const getState = (key) =>{
  return state[key]
}