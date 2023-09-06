(function () {
  // Function to remove target attribute from links
  let overridesCount = 0;
  const linkMatches = [
    `a[target*="etsy"]`,
    `a[target="_blank"]:not([href^="/social"], [href^="https://play.google.com"], [href^="https://apps.apple.com"])`,
  ];

  const coerceToString = (input) => {
    if (typeof input === "object") return JSON.stringify(input);
    return input;
  };

  const removeTargetAttributes = () => {
    linkMatches.map((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        element.removeAttribute("target");

        // For debug purposes and to keep track of links that are overriden
        element.setAttribute("data-etsy-target-override", "");
      });
    });
  };

  // prettier-ignore
  const betsyDebug = (...i) => console.debug(`[BEtsy debug] ${i.length < 1 ? i.join(" ") : i.join("")}`);

  const betsyLsKey = "_betsyData";
  const betsyInit = {
    init_date: new Date().toISOString(),
    links_overriden: 0,
  };

  // Detect any DOM changes and re-execute the function when fetching listings through Etsy's API
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(({ type }) => {
      if (type === "childList" || type === "subtree") {
        removeTargetAttributes();
      }
    });

    // prettier-ignore
    const overridesDOM = document.querySelectorAll("[data-etsy-target-override]");
    const overrideDOMLen = overridesDOM.length;

    if (overridesCount == overridesDOM.length) {
      return;
    }

    overridesCount = overrideDOMLen;

    const lsGetItem = localStorage.getItem(betsyLsKey);

    if (!lsGetItem) {
      localStorage.setItem(betsyLsKey, coerceToString(betsyInit));
    }

    if (lsGetItem) {
      const { init_date, links_overriden: lo_temp } = JSON.parse(lsGetItem);
      localStorage.setItem(
        betsyLsKey,
        coerceToString({
          init_date,
          links_overriden: lo_temp + overridesCount,
        })
      );
    }

    // prettier-ignore
    const lsLinkOverriden = JSON.parse(lsGetItem || JSON.stringify(betsyInit)).links_overriden;

    // prettier-ignore
    betsyDebug(`Overrided ${overridesCount} links, ${lsLinkOverriden} in total`);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  removeTargetAttributes();
})();
