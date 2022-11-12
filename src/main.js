import publishData from "../assets/json/publish.json" assert { type: "json" };
import frontData from "../assets/json/frontend.json" assert { type: "json" };

$(window).load(function () {
  $(".preloader").fadeOut(1000);
});

let activeMorePage = false;

$(document).ready(function () {
  addPortfolioItems(".publishing__slider", publishData);
  addPortfolioItems(".frontEnd__slider", frontData);

  const settings = {
    mode: "horizontal",
    speed: 500,
    easing: "ease-out",
    adaptiveHeight: true,
    adaptiveHeightSpeed: 500,
    startSlide: 0,
    infiniteLoop: true,
    preloadImages: "visible",
    responsive: true,
    pager: true,

    controls: true, // 좌,우 컨트롤 버튼 출력 여부

    prevText: "",
    nextText: "",
    captions: true,
    touchEnabled: false,
  };

  $(".publishing__slider").bxSlider({
    ...settings,
    pagerSelector: ".publishing__pager",
    nextSelector: ".publishing__controls_next",
    prevSelector: ".publishing__controls_prev",
  });

  $(".frontEnd__slider").bxSlider({
    ...settings,
    pagerSelector: ".frontEnd__pager",
    nextSelector: ".frontEnd__controls_next",
    prevSelector: ".frontEnd__controls_prev",
  });

  AOS.init({
    duration: 1000,
    ease: "ease-in-out",
    once: true,
  });

  $(".main > div > h2").fitText(1.2, {
    minFontSize: "50px",
    maxFontSize: "64px",
  });

  animateScroll();

  showMorePage();

  mui();

  typing($(".typing1"));

  setTimeout(function () {
    typing($(".typing2"));
  }, 1300);

  scrollUp();
});

function addPortfolioItems(selector, data) {
  const container = $(selector);
  data.forEach((item) => {
    const li = $(`
      <li>
        <img />
        <p class="slide_title">
          <span class="slide_view">View</span>
        </p>
      </li>
    `);
    const img = li.children("img");
    const title = li.children("p");
    img.attr("src", item.mainImage);
    title.attr("id", item.id);
    title.prepend(item.title);

    container.append(li);
    addMorePage(item);
  });
}

function addMorePage(item) {
  const container = $(".more_page");
  const page = $(`
    <div>
      <div class="more_wrapper">
        <a class="close" href=""><i class="bx bx-x-circle"></i></a>
        <ul class="page">
        </ul>
        <a href="#" class="scrollUp"><i class="fas fa-arrow-up"></i></a>
      </div>
    </div>
  `);
  page.attr("class", `page_inform ${item.id} 123`);
  const ul = page.find("ul");
  item.data.forEach((subData, index) => {
    ul.append(addPageItem(subData, item.webUrl, item.srcUrl, index));
  });

  container.append(page);
}

function addPageItem(data, webUrl, srcUrl, index) {
  const li = $(`
    <li>
      <img />
      <p></p>
    </li>
  `);
  const img = li.children("img");
  const p = li.children("p");

  if (index === 0) {
    p.before(`
      <a
        class="btn btn-primary page_link page_web"
        target="_blank"
        >홈페이지 바로가기</a
      >
      <a
        class="btn btn-primary page_link page_src"
        target="_blank"
        >소스코드 보기</a
      >
    `);
  }
  const link_web = li.children(".page_web");
  const link_src = li.children(".page_src");
  link_web.attr("href", webUrl);
  link_src.attr("href", srcUrl);
  img.attr("src", data.img);
  p.html(data.desc);

  return li;
}

function scrollUp() {
  $(".scrollUp").click(function (e) {
    e.preventDefault();
    $(this).closest(".page_inform").stop().animate({ scrollTop: 0 });
  });
}

function typing($target) {
  const $typing = $target;
  const text = $typing.text();
  $typing.html("");
  const chars = text.split("");

  $typing.css({ opacity: 1 });
  chars.forEach(function (item) {
    if (item == " ") {
      item = "&nbsp";
    }
    $("<span></span>").html(item).appendTo($typing);
  });
  const delayStart = 1000;
  const speed = 100;

  $typing
    .children()
    .hide()
    .each(function (index) {
      const delay = delayStart + speed * index;
      $(this).delay(delay).show(10);
    });
}

function animateScroll() {
  const $nav = $(".menu ul li");
  const duration = 1000;

  $nav.click(function (e) {
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    const areaId = $(this).attr("data-nav");
    moveScroll(areaId, duration);
  });

  $(".goToHome").click(function (e) {
    e.preventDefault();
    moveScroll("home", duration);
  });

  $(".goToAbout").click(function (e) {
    e.preventDefault();
    moveScroll("about", duration);
  });

  scrollToActiveNav();
}

function scrollToActiveNav() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const observer = new IntersectionObserver((entries) => {
    const $headerNav = $(".left_header ul li");
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.num;
        $headerNav
          .eq(index)
          .addClass("active")
          .siblings()
          .removeClass("active");
      }
    });
  }, options);

  const targets = $(".scroll_target");
  targets.each((_, target) => {
    observer.observe(target);
  });
}

function moveScroll(areaId, duration) {
  let areaDistance;
  if (areaId === "skill") {
    areaDistance = $("#" + areaId).offset().top - 200;
  } else {
    areaDistance = $("#" + areaId).offset().top;
  }

  $("html, body").stop().animate(
    {
      scrollTop: areaDistance,
    },
    duration
  );
}

function showMorePage() {
  const $view = $(".slide_title");
  const $close = $(".close");
  let id = "";
  let scrollY;

  $view.click(function (e) {
    e.preventDefault();
    activeMorePage = true;
    scrollY = $("html").scrollTop();
    id = "." + $(this).attr("id");
    $(".more_page").fadeIn();
    $(id).fadeIn();
    $("body").css({
      position: "fixed",
      top: `-${scrollY}px`,
      "overflow-y": "scroll",
    });
  });

  $close.click(function (e) {
    e.preventDefault();
    $(id).fadeOut();
    $(".more_page").fadeOut();
    $("body").css({
      position: "",
      top: ``,
    });
    $(window).scrollTop(scrollY);
  });
}

function mui() {
  $("#mui").click(function () {
    $("#mui").toggleClass("active");
    $(".mui").toggleClass("active");
  });

  $(".mui nav ul li").click(function () {
    $("#mui").removeClass("active");
    $(".mui").removeClass("active");
  });
}
