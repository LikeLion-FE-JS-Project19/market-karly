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

export let swiper = new Swiper('.mySwiper', {
  direction: 'vertical',
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.side-bar__bottom-button',
    prevEl: '.side-bar__top-button',
  },
  spaceBetween: 10,
});

export function allSelector() {
  const totalSelector = document.querySelectorAll(
    '.all-check-box, .all-check-box.active'
  );
  const singleSelector = document.querySelectorAll(
    '.single-check-box',
    '.single-check-box.active'
  );

  totalSelector.forEach(function (item, index) {
    totalSelector[index].addEventListener('click', test1);

    function test1() {
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
    }
  });
}

export function coldListAct() {
  const viewMore = document.querySelector('.vector-1');
  const coldList = document.querySelector('.cart-list__cold--group');

  viewMore.addEventListener('click', show);

  function show() {
    if (viewMore.className === 'rotate-deg--bottom') {
      return (
        (viewMore.className = 'rotate-deg--top'),
        (coldList.style.display = 'none')
      );
    } else {
      return (
        (viewMore.className = 'rotate-deg--bottom'),
        (coldList.style.display = 'block')
      );
    }
  }
}

export function frozenListAct() {
  const viewMore = document.querySelector('.vector-2');
  const frozenList = document.querySelector('.cart-list__frozen--group');

  viewMore.addEventListener('click', show);

  function show() {
    if (viewMore.className === 'rotate-deg--bottom') {
      return (
        (viewMore.className = 'rotate-deg--top'),
        (frozenList.style.display = 'none')
      );
    } else {
      return (
        (viewMore.className = 'rotate-deg--bottom'),
        (frozenList.style.display = 'block')
      );
    }
  }
}

export function temperatureListAct() {
  const viewMore = document.querySelector('.vector-3');
  const temperatureList = document.querySelector(
    '.cart-list__temperature--group'
  );

  viewMore.addEventListener('click', show);

  function show() {
    if (viewMore.className === 'rotate-deg--bottom') {
      return (
        (viewMore.className = 'rotate-deg--top'),
        (temperatureList.style.display = 'none')
      );
    } else {
      return (
        (viewMore.className = 'rotate-deg--bottom'),
        (temperatureList.style.display = 'block')
      );
    }
  }
}

export function deleteList() {
  const deleteButton = document.querySelectorAll('.group-list__close');

  deleteButton.forEach(function (target) {
    target.addEventListener('click', deleteAct);
    function deleteAct(event) {
      target.closest('li').remove();
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
    }
  });
  // deleteButton.addEventListener('click', deleteAct);
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

export function totalPrice() {
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

  function calculation() {
    return basicPrice - salePrice + deliveryPrice;
  }

  expectedPrice.insertAdjacentHTML('beforeend', calculation().toLocaleString());
}

export function allPricesToLocaleString() {
  const allPrice = document.querySelectorAll('.prices');

  allPrice.forEach(function (item, index) {
    const inputValue = Number(item.textContent).toLocaleString();

    item.textContent = '';
    item.insertAdjacentHTML('beforeend', inputValue);
  });
}

export function eachSelect() {
  const activeCheck = document.querySelectorAll('.single-check-box');

  activeCheck.forEach(function (item, index) {
    activeCheck[index].addEventListener('click', select);

    function select() {
      if (activeCheck[index].className === 'single-check-box') {
        activeCheck[index].className = 'single-check-box active';
      } else activeCheck[index].className = 'single-check-box';
    }
  });

  // console.log(activeCheck);
}
