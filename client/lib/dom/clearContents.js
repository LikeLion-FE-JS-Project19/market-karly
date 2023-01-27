
import { getNode } from "./getNode.js";

export function clearContents(node){
  if(typeof node === 'string') node = getNode(node);
  node.textContent = '';
}
