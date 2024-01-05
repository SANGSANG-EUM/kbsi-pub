$(document).ready(function () {

  // 헤더 숨기기
  if ($(window).width() > 1024) {
    let last_scrollTop = 0;
    $(window).scroll(function () {
      if ($(this).scrollTop() > 150) {
        let tmp = $(this).scrollTop();
        if (tmp > last_scrollTop) {
          // scroll down event
          $('.header').addClass('hidden');
          $('.gnb2-ul').fadeOut(100);
          $('.head-bg').fadeOut(100);
        } else {
          // scroll up event
          $('.header').removeClass('hidden');
        }
        last_scrollTop = tmp;
      } else {
        $('.header').removeClass('hidden');
      }
    });
  }

  // 헤더 그림자
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('.header').addClass('shadow');
    } else {
      $('.header').removeClass('shadow');
    }
  });

  // 헤더 전체메뉴
  $('body').on('mouseenter', '.gnb-ul, .head-bg', function () {
    let menuHeight = $('.header').outerHeight();
    let dep2Height = 0;

    // 각 .gnb2-ul 요소의 높이를 체크하여 가장 큰 값을 찾습니다.
    $('.gnb2-ul').each(function () {
      let height = $(this).outerHeight();
      if (height > dep2Height) {
        dep2Height = height;
      }
    });

    $('.gnb2-ul').stop().slideDown(200);
    $('.head-bg').css({
      'top': menuHeight + 'px',
      height: dep2Height + 'px'
    }).stop().slideDown(200);
  });

  $('body').on('mouseleave', '.gnb-ul, .head-bg', function () {
    $('.gnb2-ul').stop().slideUp(200);
    $('.head-bg').stop().slideUp(200);
  });

  // 검색창
  $('body').on('click', '.tnb-sch-btn', function() {
    $('.sch-wr').fadeIn();
    $('body, html, .container').addClass('scroll-lock');
  });
  $('body').on('click', '.sch-wr', function(event) {
    if (!$(event.target).closest('.sch-form').length) {
      // '.sch-input-wr' 외부를 클릭한 경우, 원하는 동작을 수행
      $(this).fadeOut();
      $('body, html, .container').removeClass('scroll-lock');
    }
  });


});