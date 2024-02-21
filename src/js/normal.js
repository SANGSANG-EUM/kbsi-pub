$(document).ready(function () {
  // AOS 플러그인
  AOS.init();

  // 동일 박스 높이
  $(".match_h > *").matchHeight();

  // datepicker 플러그인
  $.datepicker.setDefaults({
    dateFormat: "yy.mm.dd(D)",
    // minDate: new Date(),
    // maxDate: new Date(),
    showOtherMonths: true, // 현재 월에 속하지 않는 날짜도 달력 위젯에 표시하도록 지시
    selectOtherMonths: true, // 이전 월 및 다음 월의 날짜를 선택할 수 있도록 함
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
  });

  $('.datepicker').datepicker();

  //시간 연장하기
  function dailyMissionTimer(duration) {
    let timer = duration * 3600;
    let hours, minutes, seconds;
    
    let interval = setInterval(function(){
        hours	= parseInt(timer / 3600, 10);
        minutes = parseInt(timer / 60 % 60, 10);
        seconds = parseInt(timer % 60, 10);
    
        hours 	= hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
    
        $('#time-hour').text(hours);
        $('#time-min').text(minutes);
        $('#time-sec').text(seconds);

        if (--timer < 0) {
            timer = 0;
            clearInterval(interval);
        }
    }, 1000);
  }

  dailyMissionTimer(1);


  // 헤더 숨기기
  // if ($(window).width() > 1024) {
  //   let last_scrollTop = 0;
  //   $(window).scroll(function () {
  //     if ($(this).scrollTop() > 150) {
  //       let tmp = $(this).scrollTop();
  //       if (tmp > last_scrollTop) {
  //         // scroll down event
  //         $('.header').addClass('hidden');
  //         $('.gnb2-ul').fadeOut(100);
  //         $('.head-bg').fadeOut(100);
  //       } else {
  //         // scroll up event
  //         $('.header').removeClass('hidden');
  //       }
  //       last_scrollTop = tmp;
  //     } else {
  //       $('.header').removeClass('hidden');
  //     }
  //   });
  // }

  

  // 헤더 그림자
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('.header').addClass('shadow');
    } else {
      $('.header').removeClass('shadow');
    }
  });

  // 헤더 전체메뉴
  if ($(window).width() > 1023) {
    $('body').on('mouseenter focusin', '.gnb-ul, .head-bg', function () {
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

      $('.header').addClass('open');
    });

    $('body').on('mouseleave focusout', '.gnb-ul, .head-bg', function () {
      $('.gnb2-ul').stop().slideUp(200);
      $('.head-bg').stop().slideUp(200);
      $('.header').removeClass('open');
    });
  } else {
    $('body').on('click', '.gnb-li', function () {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open');
        $(this).find('.gnb2-ul').stop().slideUp();
      } else {
        $('.gnb2-ul').stop().slideUp();
        $('.gnb-li').removeClass('open');
        $(this).addClass('open');
        $(this).find('.gnb2-ul').stop().slideDown();
      }
    });
  }

  // 모바일 햄버거
  $('body').on('click', '.hd-ham', function () {
    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
      $('.gnb-ul').fadeOut();
      $('.header').removeClass('white');
      $('.gnb2-ul').stop().slideUp();
      $('.gnb-li').removeClass('open');
    } else {
      $(this).addClass('open');
      $('.gnb-ul').fadeIn();
      $('.header').addClass('white');
    }
  });

  // 검색창
  $('body').on('click', '.tnb-sch-btn', function () {

    let sitemapHidden = $(".header");
    let sitemapTab = $('.sch-wr').find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
    let sitemapTabFirst = sitemapTab && sitemapTab.first();
    let sitemapTabLast = sitemapTab && sitemapTab.last();

    $('.sch-wr').fadeIn().focus();
    $('body, html, .container').addClass('scroll-lock');

    sitemapHidden.attr("aria-hidden", "true"); // 레이어 바깥 영역을 스크린리더가 읽지 않게

    sitemapTab.length ? sitemapTabFirst.focus().on("keydown", function (event) {
      // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
      if (event.shiftKey && (event.keyCode || event.which) === 9) {
        // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
        event.preventDefault();
        sitemapTabLast.focus();
      }
    }) : lpObj.attr("tabindex", "0").focus().on("keydown", function (event) {
      tabDisable = true;
      if ((event.keyCode || event.which) === 9) event.preventDefault();
      // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
    });

    sitemapTabLast.on("keydown", function (event) {
      if (!event.shiftKey && (event.keyCode || event.which) === 9) {
        // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
        event.preventDefault();
        sitemapTabFirst.focus();
      }
    });

    $('.sch-wr').keydown(function (event) {
      if (event.keyCode == 27 || event.which == 27) { //ecs키로 사이트맵 닫기
        $('.sch-wr').fadeOut();
        $('body, html, .container').removeClass('scroll-lock');
        $('.tnb-noti').focus();
      }
    });

  });

  $('body').on('click', '.sch-wr', function (event) {
    if (!$(event.target).closest('.sch-form').length) {
      // '.sch-input-wr' 외부를 클릭한 경우, 원하는 동작을 수행
      $(this).fadeOut();
      $('body, html, .container').removeClass('scroll-lock');
    }
  });
  $('body').on('click', '.sch-close', function (event) {
    $('.sch-wr').fadeOut();
    $('body, html, .container').removeClass('scroll-lock');
    $('.tnb-noti').focus();
  });


  // 서브로케이션
  // if ($('.sub-loca-ul').find('.sub-loca-li').length < 4) {
  //   $('.sub-loca-wr').addClass('sub-loca-wr--1');
  // }
  // if ($('.sub-loca-ul').find('.sub-loca-li').length > 1) {
  //   $('.sub-loca-wr').addClass('arrow');
  // }


  // 모바일 서브로케이션
  // $('.sub-loca-wr.arrow .sub-loca-btn').on('click', function () {
  //   $('.sub-loca-ul').stop().slideToggle();
  // });

  // 서브로케이션
  $('.sub-loca-btn').on('click', function() {

    if($(this).hasClass('open')) {
      $(this).attr('title', '열기');
      $(this).removeClass('open');
      $(this).siblings('.sub-loca-2dep-ul').stop().slideUp();
    } else {
      $('.sub-loca-btn').removeClass('open');
      $('.sub-loca-btn').attr('title', '열기');
      $('.sub-loca-2dep-ul').stop().slideUp();
      $(this).attr('title', '닫기');
      $(this).addClass('open');
      $(this).siblings('.sub-loca-2dep-ul').stop().slideDown();
    }
  });

  // 서브로케이션 외의 영역 클릭시 박스 사라짐
  $(document).on('mouseup focusout', function (e) {
    if ($(".sub-loca-ul").has(e.target).length === 0) {
      $('.sub-loca-btn').removeClass('open').attr('title', '열기');
      $('.sub-loca-2dep-ul').stop().slideUp();
    }
  });

  // 사이드바
  $('.side-bar-btn').on('click', function() {
    $(this).parents('.side-bar').toggleClass('open');
  });



  // Email Select
  $('.fm-mail-select').on('change', function () {
    let mailAddr = $(this).val();

    if (mailAddr == 'w') {
      $(this).siblings('.fm-mail-input2').val('').attr("readonly", false).focus();
    } else {
      $(this).siblings('.fm-mail-input2').val(mailAddr).attr("readonly", true);
    }
  });

  // JQuery 코드를 사용하지 않고 위의 input[type=file] 변경 이벤트 리스너만 사용할 경우
  // $(document).ready(function () {
  //   fileInput.addEventListener('change', function (event) {
  //     inputFileName(event);
  //   });
  // });

});