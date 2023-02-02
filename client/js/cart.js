
export function allCheckBox(){
  const allSelector = document.querySelector('.all-check-box--false, .all-check-box--true');
  
  allSelector.addEventListener('click', changeCheck) 

function changeCheck (){
  if(allSelector.className === '.all-check-box--true') {
   return allSelector.className = 'all-check-box--false'
  } else {
   return allSelector.className = 'all-check-box--true'
  }
 }
}

export function coldListAct(){
  const viewMore = document.querySelector('.vector-1')
  const coldList = document.querySelector('.cart-list__cold--group')
  
  viewMore.addEventListener('click',show)

  function show (){
    if(viewMore.className === 'rotate-deg--bottom'){
      return viewMore.className = 'rotate-deg--top', coldList.style.display = 'none';
    } else {
      return viewMore.className = 'rotate-deg--bottom', coldList.style.display = 'block';
    }
    
  }
}

export function frozenListAct(){
  const viewMore = document.querySelector('.vector-2')
  const frozenList = document.querySelector('.cart-list__frozen--group')
  
  viewMore.addEventListener('click',show)

  function show (){
    if(viewMore.className === 'rotate-deg--bottom'){
      return viewMore.className = 'rotate-deg--top', frozenList.style.display = 'none';
    } else {
      return viewMore.className = 'rotate-deg--bottom', frozenList.style.display = 'block';
    }
    
  }
}

export function temperatureListAct(){
  const viewMore = document.querySelector('.vector-3')
  const temperatureList = document.querySelector('.cart-list__temperature--group')
  
  viewMore.addEventListener('click',show)

  function show (){
    if(viewMore.className === 'rotate-deg--bottom'){
      return viewMore.className = 'rotate-deg--top', temperatureList.style.display = 'none';
    } else {
      return viewMore.className = 'rotate-deg--bottom', temperatureList.style.display = 'block';
    }
    
  }
}

export function deleteList(){
  const deleteIcon = document.querySelector('.group-list__close')
  const list = document.querySelector('.group-list')

  deleteIcon.addEventListener('click',isDelete)

  function isDelete (){
    return list.style.display = 'none'
  }
}










// let isCheck = document.querySelector('.check-box__is-checked')

/* function test (){
  if(isCheck.src !== )
} */



// let isCheck = document.querySelector('.check-box__is-checked');
// // let test2 = document.getElementsByClassName('.check-box__is-checked').src;
// console.log(test);
// console.log(test3.src);