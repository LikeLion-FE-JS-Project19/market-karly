
export function closeBtn() {
  const closeButton = document.querySelector('.top-bar__btn-today-close');
  const topBar = document.querySelector('.top-bar');

  closeButton.addEventListener('click', closeHandler)

  function closeHandler(){
    topBar.remove()
  }
}


export function closeBtns(){
  const closeTodayButton = document.querySelector('.main-modal__btn-today-close');
  const closeButton = document.querySelector('.main-modal__btn-close');
  const mainModal = document.querySelector('.main-modal')
  
  closeTodayButton.addEventListener('click', closeModalDuringToday)

  window.addEventListener('DOMContentLoaded', function() {
    if (getCookie('modalClose')) closeModal();
  });
  
  function getCookie(name) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (value) return value[2]
    else return null
  }
  function closeModalDuringToday() {
    // 하루 후의 데이터 값
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = `modalClose=T; expires=${date}`
    closeModal();
  }
  
  function closeModal() {
    const modal = mainModal;
    modal.remove()
  }
  
  closeButton.addEventListener('click',closeHandler)
  
  function closeHandler(){
    closeModal()
  }
}



