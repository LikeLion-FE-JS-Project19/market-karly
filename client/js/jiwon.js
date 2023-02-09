import { axios, insertLast } from '../lib/index.js';

export const renderFooter = (target) => {
  insertLast(target, createFooter());
};
export const renderModal = (data) => {
  const qnaPopupBtn = document.querySelector('.qna__popup-btn');
  qnaPopupBtn.insertAdjacentHTML('afterend', createModal(data));
  const qnaModalContainer = document.querySelector('.qna__modal-container');
  const qnaModalCloseBtn = document.querySelector('.qna__modal-close-btn');
  const qnaModalCancel = document.querySelector('.qna__modal-cancel');
  const qnaModalSubmit = document.querySelector('.qna__modal-submit');

  qnaModalSubmit.addEventListener('click', qnaModalSubmitHandler);

  qnaPopupBtn.addEventListener('click', (e) => {
    qnaModalContainer.classList.remove('hidden');
  });

  qnaModalCloseBtn.addEventListener('click', (e) => {
    qnaModalContainer.classList.add('hidden');
  });

  qnaModalCancel.addEventListener('click', () => {
    qnaModalContainer.classList.add('hidden');
  });

  // 모달 placeHolder
  const placeHolder = document.querySelector(
    '.qna__modal-form-contents-placeholder'
  );
  const textArea = document.querySelector('#qna__modal-form-contents');
  const wordCount = document.querySelector('.qna__modal-word-count');

  textArea.onfocus = () => {
    placeHolder.style.display = 'none';
  };

  textArea.onblur = (e) => {
    if (e.target.value !== '') {
      return;
    }
    placeHolder.style.display = 'block';
  };

  function count(e) {
    wordCount.innerText = e.target.value.length;
    if (e.target.value.length > 5000) {
      e.target.value = e.target.value.substring(0, 5000);
    }
  }
  textArea.addEventListener('keyup', count);

  placeHolder.addEventListener('click', (e) => {
    e.target.closest('.qna__modal-form-contents-placeholder').style.display =
      'none';
    textArea.focus();
  });
};
export const qnaModalSubmitHandler = async (event) => {
  const qnaModalProductId = document.querySelector('#qna__modal-product-id')
    ?.dataset.productId;
  const qnaModalFormTitle = document.querySelector(
    '#qna__modal-form-title'
  )?.value;
  const qnaModalFormContents = document.querySelector(
    '#qna__modal-form-contents'
  )?.value;
  const qnaModaFormPrivate = document.querySelector('#qna__modal-form-private')
    ?.checked
    ? 'private'
    : 'public';
  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  let date = now.getDate();
  date = date < 10 ? '0' + date : date;
  const questionDatetime = `${year}${month}${date}`;

  if (qnaModalFormTitle.trim() === '' || qnaModalFormContents.trim() === '') {
    alert('제목과 내용을 입력해주세요.');
  } else {
    const response = await fetch('http://localhost:3001/QnAs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        id: '',
        type: qnaModaFormPrivate,
        product: qnaModalProductId,
        title: qnaModalFormTitle,
        writer: '홍길동',
        contents: qnaModalFormContents,
        questionDatetime: questionDatetime,
      }),
    });
    const result = await response.json();
    location.reload();
  }
};
export const renderQnATable = async (productId) => {
  try {
    let result = [];
    const qnaNoticesResult = await axios.get(
      'http://localhost:3001/QnANotices'
    );
    const qnasResult = await axios.get(
      `http://localhost:3001/QnAs?product=${productId}`
    );
    result.push(...qnaNoticesResult.data, ...qnasResult.data);

    renderQnANoticeList(qnaNoticesResult.data);
    renderQnaList(qnasResult.data);

    toggleContent(result);

    return result;
  } catch (error) {
    console.log(error);
    alert('예기치 못한 에러로 실패했습니다.');
    return error;
  }
};

// 푸터
function createFooter() {
  return /* html */ `
  <footer class="footer">
  <div class="footer__inner">
    <div class="footer__inner-top">
      <div class="footer__customer-service">
        <h2 class="footer__customer-service-title">고객행복센터</h2>
        <div class="footer__customer-service-info">
          <p class="footer__customer-service-number">1644-1107</p>
          <p class="footer__customer-service-time">
            월~토요일 오전 7시 - 오후 6시
          </p>
        </div>
        <ul class="footer__inquiry-list">
          <li class="footer__inquiry-item">
            <a class="footer__inquiry-item-button" href="#"
              >카카오톡 문의</a
            >
            <div>
              <p>
                <span>월~토요일</span>
                <span class="divider" aria-hidden="true">|</span>
                <span>오전 7시 - 오후 6시</span>
              </p>
              <p>
                <span>일/공휴일</span>
                <span class="divider" aria-hidden="true">|</span>
                <span>오전 7시 - 오후 1시</span>
              </p>
            </div>
          </li>
          <li class="footer__inquiry-item">
            <a class="footer__inquiry-item-button" href="#">1:1 문의</a>
            <div>
              <p>
                <span>365일</span>
              </p>
              <p>
                <span
                  >고객센터 운영시간에 순차적으로 답변드리겠습니다.</span
                >
              </p>
            </div>
          </li>
          <li class="footer__inquiry-item">
            <a class="footer__inquiry-item-button" href="#"
              >대량주문 문의</a
            >
            <div>
              <p>
                <span>월~금요일</span>
                <span class="divider" aria-hidden="true">|</span>
                <span>오전 9시 - 오후 6시</span>
              </p>
              <p>
                <span>점심시간</span>
                <span class="divider" aria-hidden="true">|</span>
                <span>낮 12시 - 오후 1시</span>
              </p>
            </div>
          </li>
        </ul>
        <div class="footer__mail">
          <p>
            비회원 문의 :
            <a class="primary-color" href="mailto:help@karlycorp.com"
              >help@karlycorp.com</a
            >
          </p>
          <p>
            비회원 대량주문 문의 :
            <a class="primary-color" href="mailto:help@karlycorp.com"
              >help@karlycorp.com</a
            >
          </p>
        </div>
      </div>
      <div class="footer__about">
        <ul class="footer__navigation">
          <li><a href="#">칼리소개</a></li>
          <li><a href="#">칼리소개영상</a></li>
          <li><a href="#">인재채용</a></li>
          <li><a href="#">이용약관 </a></li>
          <li><a href="#">개인정보처리방침</a></li>
          <li><a href="#">이용안내</a></li>
        </ul>
        <address class="footer__address">
          <span>법인명(상호) : 주식회사 컬리</span>
          <span class="divider" aria-hidden="true">|</span>
          <span>사업자등록번호 : 261-81-23567</span>
          <span class="divider" aria-hidden="true">|</span>
          <a class="primary-color" href="#">사업자정보확인</a>
          <br />
          <span>통신판매업 : 제 2018-서울강남-01646 호</span>
          <span class="divider" aria-hidden="true">|</span>
          <span>개인정보보호책임자 : 이원준</span>
          <br />
          <span>주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)</span>
          <span class="divider" aria-hidden="true">|</span>
          <span>대표이사 : 김슬아</span>
          <br />
          <span>입점문의 : 입정문의하기</span>
          <span class="divider" aria-hidden="true">|</span>
          <span
            >제휴문의 :
            <a class="primary-color" href="mailto:business@karlycorp.com"
              >business@karlycorp.com</a
            ></span
          >
          <br />
          <span
            >채용 문의 :
            <a class="primary-color" href="mailto:recruit@karlycorp.com"
              >recruit@karlycorp.com</a
            ></span
          >
          <br />
          <span>팩스 : 070 - 7500 - 6098</span>
        </address>
        <div>
          <ul class="footer__sns-list">
            <li class="footer__sns-item">
              <a target="_blank" href="#"
                ><img
                  class="footer__sns-img"
                  src="./assets/footer/ic-blog.svg"
                  alt="컬리 네이버블로그 바로가기"
              /></a>
            </li>
            <li class="footer__sns-item">
              <a target="_blank" href="#"
                ><img
                  class="footer__sns-img"
                  src="./assets/footer/ic-face-book.svg"
                  alt="컬리 페이스북 바로가기"
              /></a>
            </li>
            <li class="footer__sns-item">
              <a target="_blank" href="#"
                ><img
                  class="footer__sns-img"
                  src="./assets/footer/ic-instagram.svg"
                  alt="컬리 인스타그램 바로가기"
              /></a>
            </li>
            <li class="footer__sns-item">
              <a target="_blank" href="#"
                ><img
                  class="footer__sns-img"
                  src="./assets/footer/ic-naver-post.svg"
                  alt="컬리 네이버포스트 바로가기"
              /></a>
            </li>
            <li class="footer__sns-item">
              <a target="_blank" href="#"
                ><img
                  class="footer__sns-img"
                  src="./assets/footer/ic-youtube.svg"
                  alt="컬리 유튜브 바로가기"
              /></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer__inner-middle">
      <ul class="footer__certified-list">
        <li>
          <a href="#" target="_blank" class="footer__certified-item">
            <img
              class="footer__certified-img"
              src="./assets/footer/logo-isms.svg"
              alt="I.S.M.S 로고"
            />
            <p class="footer__certified-info">
              [인증범위] 마켓칼리 쇼핑몰 서비스 개발 운영
              <br />
              (심사받지 않은 물리적 인프라 제외)
              <br />
              [유효기간] 2022.01.19 ~ 2025.01.18
            </p>
          </a>
        </li>
        <li>
          <a href="#" target="_blank" class="footer__certified-item">
            <img
              class="footer__certified-img"
              src="./assets/footer/logo-privacy.svg"
              alt="E.privacy plus 로고"
            />
            <p class="footer__certified-info">
              개인정보보호 우수 웹사이트<br />
              개인정보처리시스템 인증<br />
              (ePRIVACY PLUS)
            </p>
          </a>
        </li>
        <li>
          <a href="#" target="_blank" class="footer__certified-item">
            <img
              class="footer__certified-img"
              src="./assets/footer/logo-tosspayments.svg"
              alt="payments 로고"
            />
            <p class="footer__certified-info">
              토스페이먼츠 구매안전(에스크로) 서비스를 <br />
              이용하실 수 있습니다.
            </p>
          </a>
        </li>
        <li>
          <a href="#" target="_blank" class="footer__certified-item">
            <img
              class="footer__certified-img"
              src="./assets/footer/logo-woori-bank.svg"
              alt="우리은행 로고"
            />
            <p class="footer__certified-info">
              고객님이 현금으로 결제한 금액에 대해 우리은행과
              <br />채무지급보증 계약을 체결하여 안전거래를 보장하고
              <br />있습니다.
            </p>
          </a>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <p>
      마켓컬리에서 판매되는 상품 중에는 마켓컬리에 입점한 개별 판매자가
      판매하는 마켓플레이스(오픈마켓) 상품이 포함되어 있습니다.
    </p>
    <p>
      마켓플레이스(오픈마켓) 상품의 경우 컬리는 통신판매중개자로서
      통신판매의 당사자가 아닙니다. 컬리는 해당 상품의 주문, 품질, 교환/환불
      등 의무와 책임을 부담하지 않습니다.
    </p>
    <br />
    <p>© KURLY CORP. ALL RIGHTS RESERVED</p>
  </div>
</footer>
  `;
}

// 모달
function createModal({ name, image, id } = data) {
  return /* html */ `
  <div class="qna__modal-container hidden" role="dialog" aria-labelledby="qna-submit-title-dialog">
    <div class="qna__modal" role="document">
      <div class="qna__modal-header">
        <h3 class="qna__modal-title" id="qna-submit-title-dialog">상품 문의하기</h3>
        <button class="qna__modal-close-btn" type="button"><img src="./assets/product-detail/ic-cancel.svg" alt="모달 닫기"></button>
      </div>
      <div class="qna__modal-product">
        <img src="${image.thumbnail}" alt="${image.alt}">
        <span data-product-id="${id}" id="qna__modal-product-id">${name}</span>
      </div>
      <div class="qna__modal-form-container">
        <div class="qna__modal-form-title-container">
          <label for="qna__modal-form-title">제목</label>
          <input type="text" name="qna__modal-form-title" id="qna__modal-form-title" placeholder="제목을 입력해 주세요">
        </div>
        <div class="qna__modal-form-contents-container">
          <label for="qna__modal-form-contents">내용</label>
          <textarea name="qna__modal-form-contents" id="qna__modal-form-contents"></textarea>
          <div class="qna__modal-form-contents-placeholder">
            <div>
              <h4>상품 문의 작성 전 확인해 주세요.</h4>
              <ul>
                <li>답변은 영업일 기준 2~3일 소요됩니다.</li>
                <li>해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.</li>
                <li>배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이칼리 내 1:1 문의에 남겨주세요.</li>
              </ul>
            </div>
            <div>
              <h4>제품</h4>
              <ul>
                <li>입고일 : 품절 상품 입고 일이 확정된 경우, 섬네일에 기재되어 있습니다. (종 모양을 클릭하여, 재입고 알림 설정 가능)</li>
                <li>제품 상세정보 : 영양성분 및 함량, 용량, 보관 및 취급 방법 등 제품 정보는 상세이미지 또는 상세정보에서 확인 가능합니다. &#10;</li>
              </ul>
            </div>
            <div>
              <h4>주문취소</h4>
              <ul>
                <li>배송 단계별로 주문취소 방법이 상이합니다.</li>
                <li>[입금확인] 단계 : [마이칼리 > 주문내역 상세페이지] 에서 직접 취소 가능</li>
                <li>[입금확인] 이후 단계 : 고객센터로 문의</li>
                <li>생산이 시작된 [상품 준비중] 이후에는 취소가 제한되는 점 고객님의 양해 부탁드립니다.</li>
                <li>비회원은 모바일 App 또는 모바일 웹사이트에서 [마이칼리 > 비회원 주문 조회 페이지] 에서 취소가 가능합니다.</li>
                <li>일부 예약상품은 배송 3~4일 전에만 취소 가능합니다.</li>
                <li class="red-color">※ 주문상품의 부분 취소는 불가능합니다. 전체 주문 취소 후 재구매 해주세요.</li>
              </ul>
            </div>
            <div>
              <h4>배송</h4>
              <ul>
                <li>주문 완료 후 배송 방법(샛별/택배)은 변경이 불가능합니다.</li>
                <li>배송일 배송시간 지정은 불가능합니다. (예약배송 포함)</li>
                <li class="red-color">※ 전화번호, 이메일, 주소, 계좌번호 등의 상세 개인정보가 문의 내용에 저장되지 않도록 주의해 주시기 바랍니다.</li>
              </ul>
            </div>
          </div>


          <div class="qna__modal-word-count-container">
            <span>(</span>
            <span class="qna__modal-word-count">0</span>
            <span>/ 5000 )</span>
          </div>


        </div>

        <div class="qna__modal-form-private-container">
          <input type="checkbox" name="qna__modal-form-private" id="qna__modal-form-private" class="a11yHidden">
          <label for="qna__modal-form-private">비밀글로 문의하기</label>
        </div>
      </div>
      <div class="qna__modal-dicision-container">
        <button class="qna__modal-cancel" type="button">취소</button>
        <button class="qna__modal-submit" type="button">등록</button>
      </div>
    </div>
  </div>
  `;
}

// 문의하기 테이블 행
function renderQnANoticeList(qnaNoticeList) {
  const qnaTable = document.querySelector('.qna__table');
  const tbody = document.querySelector('.qna__table tbody');
  qnaNoticeList.sort(function (a, b) {
    if (a.datetime < b.datetime) return 1;
    if (a.datetime === b.datetime) return 1;
    if (a.datetime > b.datetime) return -1;
  });
  qnaNoticeList.forEach((data) => {
    tbody.insertAdjacentHTML('afterbegin', createNoticeTr(data));
  });
}
function renderQnaList(qnaList) {
  const qnaTable = document.querySelector('.qna__table');
  const tbody = document.querySelector('.qna__table tbody');
  if (qnaList.length === 0) {
    tbody.insertAdjacentHTML('beforeend', createEmptyQnaTr());
  }
  qnaList.sort(function (a, b) {
    if (a.questionDatetime < b.questionDatetime) return 1;
    if (a.questionDatetime === b.questionDatetime) return 1;
    if (a.questionDatetime > b.questionDatetime) return -1;
  });
  qnaList.forEach((data) => {
    if (data.type === 'private') {
      // type이 비밀글일 때, 제목을 `비밀글입니다`로, 클래스를 `qna__item--private`로, 작성자명 마스킹 처리
      tbody.insertAdjacentHTML('beforeend', createPrivateTr(data));
    } else if (data.type === 'public') {
      // type이 공개글일 때, 작성자명 마스킹 처리
      tbody.insertAdjacentHTML('beforeend', createPublicTr(data));
    }
  });
}
function toggleContent(records) {
  const qnaTable = document.querySelector('.qna__table');
  qnaTable.addEventListener('click', (e) => {
    const tr = e.target.closest('tr');
    if (tr.dataset.kind === 'private') {
      alert('비밀글입니다.');
      return;
    } else if (tr.dataset.kind === 'public' || tr.dataset.kind === 'notice') {
      const content = document.querySelector('.content');
      if (content) {
        if (content.previousElementSibling.dataset.id === tr.dataset.id) {
          // 클릭하여 열려는 행이 이미 열려있는 행과 같으면 닫고 끝난다(토글).
          content.previousElementSibling.ariaExpanded = false;
          content.remove();
          return;
        } else {
          content.previousElementSibling.ariaExpanded = false;
          content.remove();
        }
      }
      const recordData = records.find(
        (item) =>
          item.id === Number(tr.dataset.id) && item.type === tr.dataset.kind
      );
      tr.ariaExpanded = true;
      tr.insertAdjacentHTML('afterend', createContentTr(recordData));
    }
  });
}
function maskingName(strName) {
  if (strName.length > 2) {
    var originName = strName.split('');
    originName.forEach(function (name, i) {
      if (i === 0 || i === originName.length - 1) return;
      originName[i] = '*';
    });
    var joinName = originName.join();
    return joinName.replace(/,/g, '');
  } else {
    var pattern = /.$/; // 정규식
    return strName.replace(pattern, '*');
  }
}
function createEmptyQnaTr() {
  return /* html */ `
    <tr class="qna__item--empty">
      <td colspan="4">문의글이 없습니다.</td>
    </tr>
  `;
}
function createNoticeTr(notice) {
  const { id, type, title, writer, contents, datetime } = notice;
  return /* html */ `
  <tr class="qna__item--notice" data-kind=${type} data-id="${id}" role="button" aria-expanded="false" tabindex="0">
    <td>
      ${title}
    </td>
    <td>
      ${writer}
    </td>
    <td>
      ${datetime}
    </td>
    <td>
      -
    </td>
  </tr>
  `;
}
function createPublicTr(data) {
  const {
    id,
    type,
    title,
    writer,
    contents,
    questionDatetime,
    answer,
    answerDatetime,
  } = data;
  const answerStatusClass = answerDatetime ? 'qna__item--complete' : '';
  const answerStatus = answerDatetime ? '답변완료' : '답변대기';
  return /* html */ `
  <tr class="${answerStatusClass}" data-kind="public" data-id="${id}" role="button" aria-expanded="false" tabindex="0">
    <td>${title}</td>
    <td>${maskingName(writer)}</td>
    <td>${questionDatetime}</td>
    <td>${answerStatus}</td>
  </tr>
  `;
}
function createPrivateTr(data) {
  const {
    id,
    type,
    title,
    writer,
    contents,
    questionDatetime,
    answer,
    answerDatetime,
  } = data;
  const answerStatusClass = answerDatetime ? 'qna__item--complete' : '';
  const answerStatus = answerDatetime ? '답변완료' : '답변대기';
  return /* html */ `
  <tr class="qna__item--private ${answerStatusClass}" data-kind="private" data-id="${id}" role="button" aria-expanded="false"  tabindex="0">
    <td>비밀글입니다.</td>
    <td>${maskingName(writer)}</td>
    <td>${questionDatetime}</td>
    <td>${answerStatus}</td>
  </tr>
  `;
}
function createContentTr({
  id,
  type,
  title,
  writer,
  contents,
  questionDatetime,
  answer,
  answerDatetime,
  datetime,
} = record) {
  const splitedContents = contents.split('\n');
  const contentsResult = splitedContents.map((item) => `<span>${item}</span>`);
  const contentsHtml = contentsResult.join('');

  if (type === 'notice') {
    return /* html */ `
    <tr class="content">
      <td colspan="4">
        <div class="qna__notice-container">
          <div class="qna__notice">
          ${contentsHtml}
          </div>
        </div>
      </td>
    </tr>
    `;
  }

  if (answerDatetime) {
    const splitedAnswer = answer.split('\n');
    const answerResult = splitedAnswer.map((item) => `<span>${item}</span>`);
    const answerHtml = answerResult.join('');

    return /* html */ `
    <tr class="content">
      <td colspan="4">
        <div class="qna__question-container">
          <div class="qna__question">
          ${contentsHtml}
          </div>
        </div>
        <div class="qna__answer-container">
          <div class="qna__answer">
          ${answerHtml}
          <span>${answerDatetime}</span>
          </div>
        </div>
      </td>
    </tr>
    `;
  } else {
    return /* html */ `
    <tr class="content">
      <td colspan="4">
        <div class="qna__question-container">
          <div class="qna__question">
          ${contentsHtml}
          </div>
        </div>
      </td>
    </tr>
    `;
  }
}
