function attachSidebarCollapseClickedHandler() {
  var sidebarButton = document.getElementById("sidebarCollapse");
  if (sidebarButton != null && sidebarButton != undefined) {
    sidebarButton.addEventListener("click", function(e) {
      e.preventDefault();
      var sidebar = document.getElementById("sidebar");
      sidebar.classList.toggle("active");
    });
  }
}

function toggleSearchBoxDisplay() {
  var navBarSearchContainer = document.getElementById("container-searchbox");
  if (navBarSearchContainer != null && navBarSearchContainer != undefined) {
    navBarSearchContainer.classList.toggle("show");
  }
}

function openSideNavigationBar() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeSideNavigationBar() {
  document.getElementById("mySidenav").style.width = "0";
}

function swipeBannerOnGesture(direction) {
  if (direction === "swiperight") {
    $("#myCarousel").carousel("next");
  }

  // swipe left, previous avatar
  if (direction === "swipeleft") {
    $("#myCarousel").carousel("prev");
  }
}
function stopBodyScrolling (noscroll) {
  $('html').toggleClass('noscroll',noscroll);
  $('body').toggleClass('noscroll',noscroll);
  // if (noscroll === true) {      
  //     document.body.addEventListener("touchmove", freezeVp, false);
  // } else {
  //     document.body.removeEventListener("touchmove", freezeVp, false);
  // }
}
var freezeVp = function(e) {
  e.preventDefault();
};
function NextNavButtonHandler(event) {
  event.preventDefault();
  var navBarTravelDistance = 200;

  var container = $(event.target).parents("div.container-product");
  var productItems_Container = $(container).children("div.product-inner");

  var scrollDivScrollLeft = $(productItems_Container)[0].scrollLeft;
  var scrollDivWidth = $(productItems_Container).outerWidth(true);
  var scrollDivRightEdge = $(productItems_Container)[0].scrollWidth;
  if (scrollDivScrollLeft + scrollDivWidth < scrollDivRightEdge) {
    var availableScrollRight = Math.floor(scrollDivRightEdge - scrollDivWidth);
    var itemCount = $(productItems_Container).children("div.product-item")
      .length;
    var productItem_width = $(productItems_Container)
      .children("div.product-item")
      .outerWidth(true);

    //lastelementNumber: number of an element displayed at the end of the current slider view
    var lastelementNumber = 2;
    if (scrollDivScrollLeft == 0) {
      lastelementNumber = scrollDivWidth / productItem_width + 1;
    } else {
      lastelementNumber =
        (scrollDivScrollLeft + scrollDivWidth) / productItem_width + 1;
    }
    if (lastelementNumber - Math.floor(lastelementNumber) > 0.9) {
      lastelementNumber = Math.ceil(lastelementNumber);
    } else {
      lastelementNumber = Math.floor(lastelementNumber);
    }
    if (lastelementNumber > itemCount) {
      lastelementNumber = itemCount;
    }
    navBarTravelDistance = $(productItems_Container)
      .children("div.product-item:nth-child(" + lastelementNumber + ")")
      .position().left;

    // If the space available is less than two lots of our desired distance, just move the whole amount
    // otherwise, move by the amount in the settings
    if (availableScrollRight < navBarTravelDistance) {
      $(productItems_Container)[0].scrollLeft =
        $(productItems_Container)[0].scrollLeft + availableScrollRight;
      $(event.target)
        .parents("div.button-container-outer")
        .addClass("nav-button-disabled");
    } else {
      $(productItems_Container)[0].scrollLeft =
        $(productItems_Container)[0].scrollLeft + navBarTravelDistance;
    }
    var prevButton = $(container).children("div.button-previous-outer");
    $(prevButton).removeClass("nav-button-disabled");
  } else {
    $(event.target)
      .parents("div.button-container-outer")
      .addClass("nav-button-disabled");
  }
}
function PreviousNavButtonHandler(event) {
  event.preventDefault();
  var navBarTravelDistance = 200;

  var container = $(event.target).parents("div.container-product");
  var productItems_Container = $(container).children("div.product-inner");

  var scrollDivScrollLeft = $(productItems_Container)[0].scrollLeft;
  var scrollDivWidth = $(productItems_Container).outerWidth(true);

  var productItem_width = $(productItems_Container)
    .children("div.product-item")
    .outerWidth(true);

  if (scrollDivScrollLeft > 0) {
    //lastelementNumber: number of an element displayed at the starting of the current slider view
    var lastelementNumber = scrollDivScrollLeft / productItem_width;
    var itemPerView = scrollDivWidth / productItem_width;
    lastelementNumber = lastelementNumber - itemPerView;
    if (lastelementNumber - Math.floor(lastelementNumber) < 0.1) {
      lastelementNumber = Math.ceil(lastelementNumber);
    } else {
      lastelementNumber = Math.ceil(lastelementNumber) + 1;
    }
    if (lastelementNumber > 0) {
      navBarTravelDistance = $(productItems_Container)
        .children("div.product-item:nth-child(" + lastelementNumber + ")")
        .position().left;
    } else {
      navBarTravelDistance = scrollDivWidth;
    }
    // If the space available is less than two lots of our desired distance, just move the whole amount
    // otherwise, move by the amount in the settings
    if (scrollDivScrollLeft <= navBarTravelDistance * -1) {
      $(productItems_Container)[0].scrollLeft = 0;
      $(event.target)
        .parents("div.button-container-outer")
        .addClass("nav-button-disabled");
    } else {
      $(productItems_Container)[0].scrollLeft =
        $(productItems_Container)[0].scrollLeft + navBarTravelDistance;
    }

    var nextButton = $(container).children("div.button-next-outer");
    $(nextButton).removeClass("nav-button-disabled");
  } else {
    $(event.target)
      .parents("div.button-container-outer")
      .addClass("nav-button-disabled");
  }
}
function registerPreNextNavButtons() {
  $(".nav-button-next").unbind();
  $(".nav-button-next").bind("click", NextNavButtonHandler);
  $(".nav-button-prev").unbind();
  $(".nav-button-prev").bind("click", PreviousNavButtonHandler);
}

function handleProductContainerPadding(){
  setTimeout(function() {  
    if($('.header-product').css('position') == 'fixed')
    {
      $('.container-product').css('padding-top',$('.header-product').outerHeight());
    }
    else
    {
      $('.container-product').css('padding-top',0);
    }
 }, 500);
  
}
function stopLoadingAnimation()
{
  setTimeout(function() { 
    $(".busy").stop(true, true);
    $(".busy").finish();
  }, 500);
}
