import { insertLast, insertBefore } from '../lib/dom/insert.js';
import { getNode } from '../lib/dom/getNode.js';
import { addClass, removeClass, toggleClass } from '../lib/dom/css.js';
import { attr } from '../lib/dom/attr.js';

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

const openReviewModalButton = getNode('.review-write-button');
const announcementTitleList = getNodes('.announcement-title');

export function openReviewModal() {
  openReviewModalButton.addEventListener('click', openReviewModalHandler);

  function openReviewModalHandler() {
    const productName = getNode('.product-summary__title').textContent;
    const productImg = attr('.product-summary__img', 'src');

    let template = `
		<div class="modal-review-background">
					<section class="modal-review">
						<div class="modal-review__top">
							<h2 class="modal-review__title">후기 작성</h2>
							<button class="modal-review__close-button" aria-label="닫기버튼">
								<img src="./assets/product-detail/cancel.svg" />
							</button>
						</div>
						<div class="modal-review__product-info">
							<img src="${productImg}" />
							<span class="product-name">${productName}</span>
						</div>
						<form class="modal-review__form">
							<div class="modal-review-title">
								<label for="modal-review-title__input">제목</label>
								<input type="text" id="modal-review-title__input" placeholder="제목을 입력해주세요" name="new-review-title">
							</div>
							<div class="modal-review-content">
								<label for="modal-review-content__textarea">내용</label>
								<textarea id="modal-review-content__textarea" name="new-review-content"></textarea>
								<div class="modal-review-content__placeholder">
									<span class="review-placeholder-intro">컬리는 믿을 수 있는 후기문화를 함께 만들어가고자 합니다. 식품 등의 표시광고에 대한 법률을 준수하고자 다음과 같은 부당한 상품평에 대해서는 별도 고지 없이 임시 대처, 비공개 전환, 삭제, 적립금 회수 등의 필요한 조치가 취해 질 수 있습니다.</span>
									<p class="review-notice-title">후기 작성 시 유의사항</p>
									<ul class="review-notice-list">
										<li>개인의 주관적인 의견으로 인해 상품의 기능 및 효과에 대하여 오해의 소지가 있는 내용</li>
										<li>식품/건강기능식품과 관련하여 질병의 예방 및 치료, 체중감량(다이어트)에 효능효과가 있다는 내용</li>
										<li>일반 화장품을 기능성화장품의 효능효과가 있다는 내용을 통한 오인 표현</li>
										<li>의약외품을 의약품으로 오인하게 하는 표현</li>
										<li>생활화학제품을 본래 용도와 다르게 사용하는 내용 및 효능효과를 과장하는 내용</li>
										<li>욕설, 폭력성, 음란성, 상업성 등의 게시물 또는 구매 상품과 무관하거나 반복되는 동일 단어나 문장을 사용하여 판매자나 다른 이용자의 후기 이용을 방해한다고 판단되는 경우</li>
										<li>구매한 상품이 아닌 캡쳐 사진, 타인 사진 도용, 포장 박스, 퍼플박스, 구매 상품을 구분할 수 없는 전체 사진 등 상품과 관련 없는 이미지, 동영상을 사용한 경우</li>
										<li>본인 또는 타인의 주민등록번호, (휴대)전화번호, 이메일 등 개인정보가 포함된 경우</li>
										<li>그 밖에 상품평으로 인해 다른 회원 또는 제3자에게 피해가 가해질 내용</li>
									</ul>
									<span class="warning-message">※ 작성된 글과 첨부된 멀티미디어 파일 등으로 이루어진 각 상품평은 개인의 의견을 반영하므로, 게시된 내용에 대한 모든 책임은 작성자에게 있습니다. 또한 비정상적인 방법을 통해 후기를 작성하고 적립금을 취득한 경우 작성자에 법적 책임의 소지가 있음을 알려드립니다.</span>
								</div>
								<span class="count-char">0/5000</span>
							</div>
							</form>
						<div class="modal-review-button-group">
							<button class="modal-review-button modal-review-button--cancel">취소</button>
							<button class="modal-review-button modal-review-button--submit" type="submit">등록</button>
						</div>
					</section>
				</div>
				`;

    insertBefore('.review', template);

    const reviewModal = getNode('.modal-review-background');
    const closeTopButton = getNode('.modal-review__close-button');
    const closeBottomButton = getNode('.modal-review-button--cancel');
    const reviewTitle = getNode('#modal-review-title__input');
    const placeholderText = getNode('.modal-review-content__placeholder');
    const reviewContent = getNode('#modal-review-content__textarea');
    const submitButton = getNode('.modal-review-button--submit');
    const countChar = getNode('.count-char');

    closeBottomButton.addEventListener('click', closeModalButtonHandler);
    closeTopButton.addEventListener('click', closeModalButtonHandler);
    reviewTitle.addEventListener('input', activateSubmitButton);
    reviewContent.addEventListener('input', activateSubmitButton);
    reviewContent.addEventListener('input', onKeyUpTextarea);
    reviewContent.addEventListener('keydown', writeReviewContent);
    placeholderText.addEventListener('click', writeReviewContent);
    submitButton.addEventListener('click', submitNewReview);

    function closeModalButtonHandler() {
      closeReviewModal(reviewModal);
    }

    function writeReviewContent() {
      placeholderText.remove();
      reviewContent.focus();
    }

    function activateSubmitButton() {
      if (reviewTitle.value && reviewContent.value) {
        addClass(submitButton, 'active');
      } else {
        removeClass(submitButton, 'active');
      }
    }

    function onKeyUpTextarea() {
      countCharNum(reviewContent, 5000, countChar);
    }

    function submitNewReview() {
      const date = getDate();

      let reviewTemplate = `
			<li class="reivew-id">
			<div class="review-content">
			<div class="review-writer-info">
			<span class="tag-best">베스트</span>
			<span class="tag-membership tag-membership__purple">퍼플</span>
			<span class="name">윤*한</span>
			</div>
			<div class="review-text-container">
			<p class="review-product-name">${productName}</p>
			<p class="review-text-field">${reviewContent.value}</p>
			<p class="review-date">${date}</p>
			</div>
			</div>
			</li>
			`;
      insertLast('.review-container', reviewTemplate);
      closeReviewModal(reviewModal);
    }
  }
}

announcementTitleList.forEach((el) => {
  el.addEventListener('click', openAnnouncement);
});

export function openAnnouncement(e) {
  const target = e.target;
  const parentTarget = target.parentElement;
  const grandTarget = parentTarget.parentElement;
  const openTarget = grandTarget.children[1];

  toggleClass(openTarget, 'hidden');
}

function closeReviewModal(node) {
  node.remove();
}

function countCharNum(text, length, countArea) {
  let limit = length;
  let str = text.value.length;
  if (str > limit) {
    console.log('5000자 이상 입력했습니다!');
    text.value = text.value.substring(0, limit);
    text.focus();
  }
  countArea.innerHTML = str + '/' + limit;
}

function getDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const dateString = year + '.' + month + '.' + day;
  return dateString;
}
