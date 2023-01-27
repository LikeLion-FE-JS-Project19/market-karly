






export const memo = (() => {
  const cache = {}

  return (key,callback) => {
    if(!callback) return cache[key];

    if(cache[key]){
      console.warn(`${key} 값은 이미 캐시된 값이 존재합니다.`);
      return;
    }
  
    cache[key] = callback();
  
    // console.log(cache);
  }
})()



memo('name',()=>'tiger')
// memo('name')

// console.log(memo('name',()=>'tttt'));




// memo()('cube',()=> document.querySelector('#cube'));



// console.log( memo()('cube') );









