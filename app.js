// UI Ctrl -------------------------------------------------------------
const UICtrl = (function () {
  const UISelectors = {
    hamburgerBtn: ".hamburger",
    navElement: "nav",
    navbarShadow: ".navbar-shadow",
    navMobile: ".nav-mobile",
    navMobileActive: ".nav-mobile-active",
    mobileLink: ".mobile-link",
  };

  return {
    getSelectors: function () {
      return UISelectors;
    },
    showMobileNav: function () {
      const navMobile = document.querySelector(UISelectors.navMobile);
      const hamburger = document.querySelector(UISelectors.hamburgerBtn);

      navMobile.style.display = "block";

      setTimeout(function () {
        navMobile.classList.add("nav-mobile-active");
        hamburger.classList.add("hamburger-active");
      }, 100);
    },
    hideMobileNav: function () {
      const navMobile = document.querySelector(UISelectors.navMobile);
      const hamburger = document.querySelector(UISelectors.hamburgerBtn);

      navMobile.classList.remove("nav-mobile-active");
      hamburger.classList.remove("hamburger-active");

      setTimeout(() => {
        navMobile.style.display = "none";
      }, 100);
    },
    doneMobileNavUI: function (e) {
      console.log(e.target);
      const navMobile = document.querySelector(UISelectors.navMobile);
      const hamburger = document.querySelector(UISelectors.hamburgerBtn);
      navMobile.classList.remove("nav-mobile-active");
      hamburger.classList.remove("hamburger-active");
      setTimeout(() => {
        navMobile.style.display = "none";
      }, 100);
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
    document
      .querySelector(UISelectors.hamburgerBtn)
      .addEventListener("click", closeMobileNav);

    // Close Mobile Navigation
    document
      .querySelector(UISelectors.navMobile)
      .addEventListener("click", doneMobileNav);

    // change nav background when scroll
    document.addEventListener("scroll", (e) => {
      if (window.scrollY >= 150) {
        document.querySelector(UISelectors.navbarShadow).style.opacity = 1;
      } else if (window.scrollY < 150) {
        document.querySelector(UISelectors.navbarShadow).style.opacity = 0;
      }
    });
  };

  // Event Functions
  // # open mobile Navigation
  const openMobileNav = (e) => {
    if (e.target.className === "hamburger") {
      UICtrl.showMobileNav();
    }
    e.preventDefault();
  };

  //  # close mobile navigation
  const closeMobileNav = (e) => {
    console.log(e.target);
    if (e.target.classList.contains("hamburger-active")) {
      UICtrl.hideMobileNav();
    }
    e.preventDefault();
  };

  // # done mobile navigation
  const doneMobileNav = (e) => {
    if (e.target.className === "mobile-link") {
      UICtrl.doneMobileNavUI(e);
    }
  };

  return {
    init: function () {
      loadEventListeners();
    },
  };
})(UICtrl);

// Initialize App
APP.init();

document.addEventListener("click", (e) => {
  console.log(e.target);
});
