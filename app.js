// UI Ctrl -------------------------------------------------------------
const UICtrl = (function () {
  const UISelectors = {
    hamburgerBtn: ".hamburger",
    navMobile: ".nav-mobile",
    navMobileActive: ".nav-mobile-active",
  };

  return {
    getSelectors: function () {
      return UISelectors;
    },
    showMobileNav: function (e) {
      const navMobile = document.querySelector(UISelectors.navMobile);

      navMobile.style.display = "block";

      setTimeout(function () {
        e.target.nextElementSibling.classList.add("nav-mobile-active");

        e.target.classList.add("hamburger-active");
      }, 50);

      console.log("haha");
    },
    hideMobileNav: function (e) {
      const navMobile = document.querySelector(UISelectors.navMobile);

      e.target.nextElementSibling.classList.remove("nav-mobile-active");

      e.target.classList.remove("hamburger-active");

      setTimeout(() => {
        navMobile.style.display = "none";
      }, 50);
    },
  };
})();

// App Ctrl ------------------------------------------------------------
const APP = (function (UICtrl) {
  // Load Event Listeners
  const loadEventListeners = function () {
    const UISelectors = UICtrl.getSelectors();

    // Open Mobile Navigation
    document
      .querySelector(UISelectors.hamburgerBtn)
      .addEventListener("click", openMobileNav);

    // Close Mobile Navigation
    document.addEventListener("click", closeMobileNav);
  };

  // Event Functions
  // # open mobile Navigation
  const openMobileNav = (e) => {
    if (e.target.className === "hamburger") {
      UICtrl.showMobileNav(e);
    }
    e.preventDefault();
  };

  //  # close mobile navigation
  const closeMobileNav = (e) => {
    if (e.target.classList.contains("hamburger-active")) {
      UICtrl.hideMobileNav(e);
    }
    e.preventDefault();
  };

  return {
    init: function () {
      loadEventListeners();
    },
  };
})(UICtrl);

// Initialize App
APP.init();
