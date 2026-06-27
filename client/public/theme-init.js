// Set the theme before first paint to avoid a flash.
// Default to dark for new visitors, but remember a returning visitor's choice.
(function () {
  try {
    var t = localStorage.getItem("cb-theme") || "dark";
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
