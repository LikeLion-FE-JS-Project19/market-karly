
export function f() {
  const closeButton = document.querySelector('.top-bar__btn-today-close');
  const topBar = document.querySelector('.top-bar');


  closeButton.addEventListener('click', closeHandler)


  function closeHandler(){
    topBar.style.display = 'none';
  }
}


export function z(){
  const closeButton = document.querySelector('.main-modal__btn-close');
  const mainModal = document.querySelector('.main-modal')

  closeButton.addEventListener('click',closeHandler)

  function closeHandler(){
    mainModal.style.display = 'none'
  }
}

















