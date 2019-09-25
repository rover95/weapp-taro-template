export default function getType(type){
  return {
    success:type+'_SUCCESS',
    fail:type+'_FAIL'
  }
}