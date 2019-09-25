export const getLoginUrl = ()=>{
  return `/wxlogin`;
}; 
export const getSiteUrl = (id,portal) => {
  return `/projects/${id}/sites/structs/factors/stations?portal=${portal}`;
}; 