(function () {
  // Function to remove target attribute from links
  const linkMatches = [
    `a[target*="etsy"]`,
    `a[target="_blank"]:not([href^="/social"])`,
  ];

  const removeTargetAttributes = () => {
    linkMatches.map((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.removeAttribute("target");

        // For debug purposes
        element.setAttribute("data-etsy-target-override", "");
      });
    });
  };

  // Detect any DOM changes and re-execute the function when fetching listings through Etsy's API
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(({ type }) => {
      if (type === "childList" || type === "subtree") {
        removeTargetAttributes();
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  removeTargetAttributes();
})();
