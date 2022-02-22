// import base from '../api/base'
const utils = {
  fetch: function(key) {
    return JSON.parse(localStorage.getItem(key))
  },

  save: function(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },

  removeKey: function(key){
		localStorage.removeItem(key);//删除名称为“key”的信息
	},
  setSession: function(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  getSession: function(key) {
    return JSON.parse(sessionStorage.getItem(key))
  },
  removeSession: function(key) {
    sessionStorage.removeItem(key)
  },

  setCookie: function(key, value, t) {
    if(t) {
      let oDate = new Date();
      oDate.setDate(oDate.getDate() + t);
      document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString() + ";path=/";
    } else {
      document.cookie = key + '=' + value + ";path=/";
    }
  },
  getCookie: function(name) {
    let cookie = document.cookie;
    if(cookie.length) {
      name += '=';
      let list=cookie.split(';');
      for(let i=0;i<list.length;i++){
        let c=list[i].trim();
        if(c.indexOf(name)!=-1){
          return c.slice(name.length,c.length);
        }else{
          if(i==list.length-1){
            return null;
          };
        };
      };
      // list.forEach((el,ind) => {
      //   let c = el.trim()
      //   if (c.indexOf(name) != -1) {
      //     return decodeURIComponent(c.substring(name.length,c.length))
      //   } else {
      //     if(ind == list.length-1){
      //       return null;
      //     };
      //   }
      // })
    }else{
      return null;
    };
  },

  logout:function (){
		void localStorage.clear();
		localStorage.removeItem('userInfo');
		this.setCookie('login','',-1);
		// let loginOutUrl = base.interface.logoutUrl;
		// let redirectUrl = encodeURIComponent(base.interface.loginNewUrl);
   
   
		window.location.href = loginOutUrl + "?loginType=mixLogin&redirectUrl=" + redirectUrl;
	},
}

export default utils