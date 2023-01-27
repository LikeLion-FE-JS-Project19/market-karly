
import { getNode } from "./getNode.js";
import { typeError,refError } from "../error/index.js";


export function insertBefore(node, text) {
  if (typeof node === 'string') node = getNode(node);

  if (node.nodeType !== document.ELEMENT_NODE) {
    typeError('insertBefore 함수의 첫 번째 인자는 ELEMENT 노드여야 합니다.');
  }

  node.insertAdjacentHTML('beforebegin', text);
}

export function insertFirst(node, text) {
  if (typeof node === 'string') node = getNode(node);
  if (node.nodeType !== document.ELEMENT_NODE) typeError('insertFirst 함수의 첫 번째 인자는 ELEMENT 노드여야 합니다.');
  node.insertAdjacentHTML('afterbegin', text);
}


export function insertLast(node, text) {
  if (typeof node === 'string') node = getNode(node);
  if (node.nodeType !== document.ELEMENT_NODE) {
    refError('insertLast 함수의 첫 번째 인자는 ELEMENT 노드여야 합니다.');
  }
  node.insertAdjacentHTML('beforeend', text);
}

export function insertAfter(node, text) {
  if (typeof node === 'string') node = getNode(node);
  if (node.nodeType !== document.ELEMENT_NODE) {
    refError('insertAfter 함수의 첫 번째 인자는 ELEMENT 노드여야 합니다.');
  }
  node.insertAdjacentHTML('afterend', text);
}
