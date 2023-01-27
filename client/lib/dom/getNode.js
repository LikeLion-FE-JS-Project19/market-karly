
import { isString } from '../utils/typeOf.js'
import { typeError } from '../error/typeError.js'

export function getNode(node){
  if(!isString(node)){
    typeError('getNode 함수의 인자는 문자 타입 이여야 합니다.');
  }

  // if(!isString(node)) typeError('에러가 발생했습니다.');
  
  return document.querySelector(node)
}


export function getNodes(node){
  if(!isString(node)){
    typeError('getNode 함수의 인자는 문자 타입 이여야 합니다.');
  }
  
  return document.querySelectorAll(node)
}




