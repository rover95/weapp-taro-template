import deepMerge from 'deepmerge';

/* 全局状态 */
const state = {};

export const setState = (key,value)=>{
  state[key] = value;
};

export const getState = (key) =>{
  let res = typeof state[key] === 'Object' ? deepMerge({}, state[key]) : state[key];
  return state[key]? res:undefined;
};