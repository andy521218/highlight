export function lastTime(e) {
    if(!e) return arguments[2]
    let time = new Date(e * 1);
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
    let hours = time.getHours();
    let min = time.getMinutes();
     month= month<10?'0'+String(month):month
     day= day<10?'0'+String(day):day
     hours=hours<10?'0'+String(hours):hours
     min=min<10?'0'+String(min):min  
    return `${year}-${month}-${day} ${hours}:${min}`;
  }

  export function messageTime(e) {
    if(!e) return arguments[2]
    let time = new Date(e * 1);
    let year = time.getFullYear();
    let month = time.getMonth()+1;
    let day = time.getDate();
     month= month<10?'0'+String(month):month
     day= day<10?'0'+String(day):day
    return `${year}-${month}-${day}`;
  }
 export function sortNumber(index,page){
    if(page=='1') return index+1
    if(page>'1') return page*10+arguments[0]+1-10
  }
export function duringTime(end,begin){
  if(end=='0')  return 0 
  let time=Math.round((end-begin)/60000 )
  return time+'min'
}

  export default {
    install(Vue) {
      Vue.filter('lastTime', lastTime);
      Vue.filter('sortNumber', sortNumber);
      Vue.filter('duringTime', duringTime);
      Vue.filter('messageTime', messageTime);
    }
  };