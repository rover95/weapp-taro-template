export default function getType(type){
  return {
    begin: type + '_BEGIN',
    success: type + '_SUCCESS',
    fail: type + '_FAIL',
    clear: type + '_CLEAR',
  };
}