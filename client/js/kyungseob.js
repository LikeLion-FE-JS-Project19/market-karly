export function protection() {
  const protect = document.querySelector('.protect');

  function protectShow() {
    setTimeout(() => {
      protect.style.display = 'block';
    }, 100);
  }
  protectShow();
}

export function closeTopBarButton() {
  const closeButton = document.querySelector('.top-bar__btn-today-close');
  const topBar = document.querySelector('.top-bar');

  closeButton.addEventListener('click', closeHandler);

  function closeHandler() {
    topBar.remove();
  }
}

export function closeMainModalButton() {
  const closeTodayButton = document.querySelector(
    '.main-modal__btn-today-close'
  );
  const closeButton = document.querySelector('.main-modal__btn-close');
  const mainModal = document.querySelector('.main-modal');

  closeTodayButton.addEventListener('click', closeModalDuringToday);

  window.addEventListener('DOMContentLoaded', function () {
    if (getCookie('modalClose')) closeModal();
  });

  function getCookie(name) {
    const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    if (value) return value[2];
    else return null;
  }
  function closeModalDuringToday() {
    // 하루 후의 데이터 값
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = `modalClose=T; expires=${date}`;
    closeModal();
  }

  function closeModal() {
    const modal = mainModal;
    modal.remove();
  }

  closeButton.addEventListener('click', closeHandler);

  function closeHandler() {
    closeModal();
  }
}

export function listToggle() {
  const viewMore = document.querySelectorAll('.toggle-list');
  const allList = document.querySelectorAll('.groups');

  viewMore.forEach(function (item, index) {
    item.addEventListener('click', show);
    function show() {
      if (viewMore[index].className === 'cart-list--button--bottom') {
        (viewMore[index].className = 'cart-list--button--top'),
          (allList[index].style.display = 'block');
      } else {
        (viewMore[index].className = 'cart-list--button--bottom'),
          (allList[index].style.display = 'none');
      }
    }
  });
}

export function allSelector() {
  const totalSelector = document.querySelectorAll(
    '.all-check-box, .all-check-box.active'
  );
  const singleSelector = document.querySelectorAll(
    '.single-check-box',
    '.single-check-box.active'
  );

  totalSelector.forEach(function (item, index) {
    totalSelector[index].addEventListener('click', select);

    function select() {
      if (totalSelector[index].className === 'all-check-box active') {
        totalSelector[0].className = 'all-check-box';
        totalSelector[1].className = 'all-check-box';
        singleSelector.forEach(function (item) {
          item.className = 'single-check-box';
        });
      } else {
        totalSelector[0].className = 'all-check-box active';
        totalSelector[1].className = 'all-check-box active';
        singleSelector.forEach(function (item, index) {
          item.className = 'single-check-box active';
        });
      }
      getNumber();
    }
  });
}

export function deleteList() {
  const deleteButton = document.querySelectorAll('.group-list__close');

  deleteButton.forEach(function (target) {
    target.addEventListener('click', deleteAct);
    function deleteAct(event) {
      target.closest('li').remove();
      reloadGroup();
    }
  });
}

export function selectDelete() {
  const deleteButton = document.querySelectorAll('.selector-delete');
  const activeCheck = document.querySelectorAll('.single-check-box.active');
  const groupList = document.querySelectorAll('.group-list');

  deleteButton.forEach(function (item, index) {
    deleteButton[index].addEventListener('click', deleteAct);
    function deleteAct() {
      activeCheck.forEach(function (item, index) {
        if (activeCheck[index].className === 'single-check-box active') {
          groupList[index].remove();
        }
      });
      reloadGroup();
    }
  });
}

export function productOrder() {
  const orderButton = document.querySelector('.summary-bottom__order');
  const alert = document.querySelector('.alert-order');

  orderButton.addEventListener('click', order);

  function order() {
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 1500);
  }
}

export function eachSelect() {
  const activeCheck = document.querySelectorAll('.single-check-box');

  activeCheck.forEach(function (item, index) {
    activeCheck[index].addEventListener('click', select);

    function select() {
      if (activeCheck[index].className === 'single-check-box') {
        activeCheck[index].className = 'single-check-box active';
      } else {
        activeCheck[index].className = 'single-check-box';
      }
      getNumber();
    }
  });
}

export function getNumber() {
  const totalNumber = document.querySelectorAll('.single-check-box').length;
  const selectNumber = document.querySelectorAll(
    '.single-check-box.active'
  ).length;
  const allSelectText = document.querySelectorAll('.cart-feature__text');

  allSelectText.forEach(function (item) {
    item.textContent = '';
    item.textContent = `전체선택(${selectNumber}/${totalNumber})`;
  });
}

export function totalExpectedPrice() {
  const basicPrice = Number(
    document.querySelector('.product-result__basic--price').textContent
  );
  const salePrice = Number(
    document.querySelector('.product-result__sale--price').textContent
  );
  const deliveryPrice = Number(
    document.querySelector('.product-result__delivery--price').textContent
  );
  const expectedPrice = document.querySelector(
    '.product-result__expected--price'
  );

  expectedPrice.textContent = '';
  expectedPrice.textContent = basicPrice - salePrice + deliveryPrice;
}

export function totalBasicPrice() {
  const productBasicPrice = document.querySelectorAll('.product-price');
  const basicPrice = document.querySelector('.product-result__basic--price');

  let total = Number(0);

  productBasicPrice.forEach(function (item, index) {
    total = total + Number(productBasicPrice[index].textContent);
    basicPrice.textContent = '';
    basicPrice.textContent = total;
  });
  if (productBasicPrice.length === 0) {
    basicPrice.textContent = 0;
  }
}

export function totalSalePrice() {
  const productSalePrice = document.querySelectorAll('.product-price-sale');
  const salePrice = document.querySelector('.product-result__sale--price');

  let total = Number(0);

  productSalePrice.forEach(function (item, index) {
    total = total + Number(productSalePrice[index].textContent);
    salePrice.textContent = '';
    salePrice.textContent = total;
  });
  if (productSalePrice.length === 0) {
    salePrice.textContent = Number(0);
  }
}

function reloadGroup() {
  getNumber();
  totalBasicPrice();
  totalSalePrice();
  totalExpectedPrice();
}
