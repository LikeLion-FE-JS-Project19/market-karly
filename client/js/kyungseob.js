
export function f() {
  const closeButton = document.querySelector('.top-bar__btn-today-close');
  const topBar = document.querySelector('.top-bar');


  closeButton.addEventListener('click', closeHandler)


  function closeHandler(){
    topBar.style.display = 'none';
  }
}

















