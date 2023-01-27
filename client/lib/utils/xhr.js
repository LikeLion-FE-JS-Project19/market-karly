

/* readyState
  0: uninitalized // 초기화 
  1: loading // 로딩
  2: loaded // 로딩이 완료된 
  3: interactive // 인터랙티브
  4: complete // 완료 
  */

import { typeError } from "../error/typeError.js";

  

// xhrData 함수 만들기 method, url 

//  콜백 방식 
export function xhrData({
  url = '',
  method = 'GET',
  body = null,
  onSuccess = null,
  onFail = null,
  headers = {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
  },
} = {}){

  // const {url,method,body} = options;

  const xhr = new XMLHttpRequest();
  // console.log(xhr);
  // 비동기 통신 오픈
  xhr.open( method, url)

  
  // Object.entries(headers).forEach(([key,value])=>{
  //   xhr.setRequestHeader(key,value);
  // })


  xhr.addEventListener('readystatechange',()=>{
    const {status,readyState,response} = xhr; // 객체 구조 분해 할당 

    if(status >= 200 && status < 400){
      if(readyState === 4){
        console.log('통신 성공');
        
        onSuccess(JSON.parse(response));
      }  
    }else{
      // console.error();
      onFail('통신 실패')
    }
  })


  // 서버에 요청
  xhr.send(JSON.stringify(body));
}

// shorthand property

xhrData.get = (url,onSuccess,onFail) =>{
  xhrData({
    url,
    onSuccess,
    onFail
  })
}

xhrData.post = (url,body,onSuccess,onFail) =>{
  xhrData({
    method:'POST',
    body,
    url,
    onSuccess,
    onFail
  })
}


xhrData.put = (url,body,onSuccess,onFail) =>{
  xhrData({
    method:'PUT',
    body,
    url,
    onSuccess,
    onFail
  })
}


xhrData.delete = (url,body,onSuccess,onFail) =>{
  xhrData({
    method:'DELETE',
    url,
    onSuccess,
    onFail
  })
}



/* 
xhrData.delete(
  'https://jsonplaceholder.typicode.com/users/3',
  (result)=>{
    console.log(result);
  },
  (err)=>{
    console.log(err);
  }
)

 */

/* 
xhrData('POST','https://jsonplaceholder.typicode.com/users',{
  "name": "kindtiger",
  "username": "seonbeom",
  "email": "tiger@euid.dev",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "010-7169-0262",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
})
 */



/* 

let movePage = function (주소,성공,실패){

  // 조건에 따라 조건이 잘 맞으면 성공() || 실패()

  if(주소 === '네이버'){
    성공(주소);
  }else{
    실패();
  }

};

movePage(
  '네이바',
  (주소)=>{
    console.log('3초후 '+ 주소 +'로 이동합니다.');
    setTimeout(() => {
      window.location.href = 'https://www.naver.com/'
    }, 3000);
  }
  ,
  ()=>{
    console.log('잘못된 주소를 입력했습니다.');
  })


 */





  // promise API


const defaultOptions = {
  url:'',
  method:'GET',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body:null
}


export function xhrPromise(options = {}){
  

  const xhr = new XMLHttpRequest();


  const {method,url,body,headers} = Object.assign({},defaultOptions,options);


  if(!url) typeError('서버와 통신할 url 인자는 반드시 필요합니다.');
              
  xhr.open(method,url);

  xhr.send(body ? JSON.stringify(body) : null)
  
  return new Promise((resolve, reject) => {

    xhr.addEventListener('readystatechange',()=>{
      const {status, readyState, response} = xhr;

      if(status >= 200 && status < 400){
         if(readyState === 4){
           resolve(JSON.parse(response));
         }
      }else{
        reject('에러입니다.');
      }
    })
  })
}



// xhrPromise({
//   url:'https://jsonplaceholder.typicode.com/users/1'
// })
// .then((res)=>{
//   console.log(res);
// })
// .catch((err)=>{
//   console.log(err);
// })



xhrPromise.get = (url) => {
  return xhrPromise({
    url
  })
}

xhrPromise.post = (url,body) => {
  return xhrPromise({
    url,
    body,
    method:'POST'
  })
}


xhrPromise.put = (url,body) => {
  return xhrPromise({
    url,
    body,
    method:'PUT'
  })
}


xhrPromise.delete = (url) => {
  return xhrPromise({
    url,
    method:'DELETE'
  })
}





















