// UI Ctrl -------------------------------------------------------------
const UICtrl = (function () {
  const UISelectors = {
    logo: ".logo",
    footerLogo: ".footer-logo",
    hamburgerBtn: ".hamburger",
    navElement: "nav",
    navbarShadow: ".navbar-shadow",
    navMobile: ".nav-mobile",
    navDesktop: ".nav-desktop",
    navMobileLis: ".nav-mobile ul li",
    navDesktopLis: ".nav-desktop li",
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

      document.querySelector("nav").style.transform = "none";

      setTimeout(function () {
        navMobile.style.display = "block";
      }, 50);

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
    doneMobileNavUI: function () {
      const navMobile = document.querySelector(UISelectors.navMobile);
      const hamburger = document.querySelector(UISelectors.hamburgerBtn);
      navMobile.classList.remove("nav-mobile-active");
      hamburger.classList.remove("hamburger-active");
      setTimeout(() => {
        navMobile.style.display = "none";
      }, 100);
    },
    activateLinkMobileUI: function (e) {
      const lisNode = document.querySelectorAll(UISelectors.navMobileLis);

      const lis = Array.from(lisNode);

      lis.forEach((li) => {
        li.children[0].removeAttribute("id");
      });

      e.target.id = "nav-active-mobile";
    },

    activateLinkDesktopUI: function (e) {
      const lisNodeDesktop = document.querySelectorAll(
        UISelectors.navDesktopLis
      );

      const lisDesktop = Array.from(lisNodeDesktop);

      lisDesktop.forEach((li) => {
        li.children[0].removeAttribute("id");
      });

      e.target.id = "nav-active-desktop";
    },

    removeAllActiveStateUI: function (e) {
      const lisNodeDesktop = document.querySelectorAll(
        UISelectors.navDesktopLis
      );
      const lisNode = document.querySelectorAll(UISelectors.navMobileLis);

      const lisDesktop = Array.from(lisNodeDesktop);
      const lis = Array.from(lisNode);

      lis.forEach((li) => {
        li.children[0].removeAttribute("id");
      });

      lisDesktop.forEach((li) => {
        li.children[0].removeAttribute("id");
      });
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
    document.addEventListener("scroll", () => {
      if (window.scrollY >= 150 && window.scrollY <= 900) {
        document.querySelector(UISelectors.navbarShadow).style.opacity = 1;
      } else if (window.scrollY > 900) {
        document.querySelector(UISelectors.navbarShadow).style.opacity = 1;

        if (this.oldScroll > this.scrollY) {
          // if scrolling up ....
          // console.log("Scrolling up ....");
          document.querySelector("nav").style.transform = "none";
        } else {
          // if scrolling down ....
          // console.log("Scrolling down .....");
          document.querySelector("nav").style.transform = "translateY(-100%)";
        }
        this.oldScroll = this.scrollY;
      } else if (window.scrollY < 150) {
        document.querySelector(UISelectors.navbarShadow).style.opacity = 0;
      }
    });

    // adding active state on Navbar when clicking the links
    // #1 mobile (by clicking)
    document
      .querySelector(UISelectors.navMobile)
      .addEventListener("click", activeStateLinkMobile);

    // #1 desktop (by clicking)
    document
      .querySelector(UISelectors.navDesktop)
      .addEventListener("click", activeStateLinkDesktop);

    // Remove active tag link when clicking logo
    document
      .querySelector(UISelectors.logo)
      .addEventListener("click", removeAllActiveState);

    // Remove active tag link when clicking footer logo
    document
      .querySelector(UISelectors.footerLogo)
      .addEventListener("click", removeAllActiveState);
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

  // Active link mobile by clicking link
  const activeStateLinkMobile = (e) => {
    if (e.target.className === "mobile-link") {
      UICtrl.activateLinkMobileUI(e);
    }
  };

  // Active link desktop by clicking link
  const activeStateLinkDesktop = (e) => {
    if (e.target.className === "desktop-link") {
      UICtrl.activateLinkDesktopUI(e);
    }
  };

  // Remove all active state link desktop or mobile
  const removeAllActiveState = (e) => {
    UICtrl.removeAllActiveStateUI(e);
  };

  return {
    init: function () {
      loadEventListeners();
    },
  };
})(UICtrl);

// Initialize App
APP.init();

// TO DO list
// 1. kasih current class pas klik link navigasi
// 2. keluar menu navigasi mobile dengan cara klik X hamburger menu
//    atau klik luar area nav-mobile, atau scroll kemanapun
// 3. animasi hamburger to X ketika diklik
