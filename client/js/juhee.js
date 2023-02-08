export function getNodes(node) {
  if (typeof node !== 'string') {
    throw new Error('getNode 함수의 인자는 문자 타입 이여야 합니다.');
  }
  return document.querySelectorAll(node);
}

export function onClickAddCartHandler(e) {
  e.preventDefault();
  console.log('장바구니 담기 완료~');
}
