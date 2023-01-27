
import { getNode } from "./getNode.js";
import { typeError } from "../error/index.js";


export function bindEvent(node,type,handler){
  if(typeof node === 'string'){
    node = getNode(node);
  }

  if(!(/mouseenter|click|mousemove|mouseleave/g.test(type))){
    typeError('bindEvent 함수의 두 번째 인자는 유효한 이벤트 타입 이어야 합니다.')
  }


  node.addEventListener(type,handler);
  
  return ()=> node.removeEventListener(type,handler);

}
