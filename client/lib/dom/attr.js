
import { getNode } from "./getNode.js";

/* 

// IIFE 패턴 

const attr = (function(){
  function getAttr(node,prop){
    // node = '.first'
    // prop = 'class'
    
    if(typeof node === 'string'){
      node = getNode(node);
    }
  
    return node.getAttribute(prop);
    
  }
  
  
  
  // computed property
  function setAttr(node,prop,value){
    // validation : 확인 
    if(typeof node === 'string') node = getNode(node);
    if(typeof prop !== 'string') throw new TypeError('setAttr 함수의 두 번째 인자는 문자 타입 이어야 합니다.')
  
    if(prop.includes('data')){
      let rest = prop.slice(5);
      node.dataset[rest] = value;
    }
  
    if(!value) throw new SyntaxError('setAttr 함수의 세 번째 인자는 필수값입니다.')
    
    node.setAttribute(prop,value);
  
  }
  
  
  
  
  // const attr = (node,prop,value) => !value ? getAttr(node,prop) : setAttr(node,prop,value);
  
  function attr(node,prop,value){
  
    // if(!value){
    //   return getAttr(node,prop);
    // }else{
    //   setAttr(node,prop,value);
    // }
  
    return !value ? getAttr(node,prop) : setAttr(node,prop,value);
  
  
  }
   
  // incapsulation // 캡슐화 
  // 정보 은닉 


  return attr
  
})()


// incapsulation // 캡슐화
// 정보 은닉


attr()

 */



function getAttr(node, prop) {
  // node = '.first'
  // prop = 'class'

  if (typeof node === 'string') {
    node = getNode(node);
  }

  return node.getAttribute(prop);
}

// computed property
function setAttr(node, prop, value) {
  // validation : 확인
  if (typeof node === 'string') node = getNode(node);
  if (typeof prop !== 'string')
    throw new TypeError(
      'setAttr 함수의 두 번째 인자는 문자 타입 이어야 합니다.'
    );

  if (prop.includes('data')) {
    let rest = prop.slice(5);
    node.dataset[rest] = value;
  }

  if (!value)
    throw new SyntaxError('setAttr 함수의 세 번째 인자는 필수값입니다.');

  node.setAttribute(prop, value);
}

// const attr = (node,prop,value) => !value ? getAttr(node,prop) : setAttr(node,prop,value);

export function attr(node, prop, value) {
  // if(!value){
  //   return getAttr(node,prop);
  // }else{
  //   setAttr(node,prop,value);
  // }

  return !value ? getAttr(node, prop) : setAttr(node, prop, value);
}
