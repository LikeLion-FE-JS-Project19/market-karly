
import { getNode } from "./getNode.js";
import { refError } from "../error/refError.js";

export function getInputValue(node){
  if(typeof node === 'string') node = getNode(node);
  if(node.tagName !== 'INPUT') refError('getInputValue 함수는 INPUT ELEMENT만 허용합니다.')
  return node.value
}
