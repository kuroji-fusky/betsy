(function () {
  const $body = document.body;
  const etsyHeader = document.getElementById("gnav-header");
  const domObserver = document.createElement("dom-observer");

  // Fix horizontal scroll when user visits the Settings page
  $body.style["overflow-x"] = "hidden";

  const etsyHeaderStyleOverrides = {
    position: "sticky",
    top: "0",
    transition: "box-shadow ease 300ms",
  };

  const observerStyles = {
    position: "absolute",
    width: "100%",
    height: "40px",
  };

  etsyHeader.setAttribute(
    "style",
    Object.entries(etsyHeaderStyleOverrides)
      .map(([k, v]) => `${k}:${v} !important`)
      .join("; ")
  );

  Object.entries(observerStyles).forEach(([sk, sv]) => {
    domObserver.style[sk] = sv;
  });

  const io = new IntersectionObserver(([entry]) => {
    !entry.isIntersecting
      ? (etsyHeader.style["box-shadow"] = "0 0 30px rgba(0, 0, 0, 0.5)")
      : (etsyHeader.style["box-shadow"] = "0 0 30px rgba(0, 0, 0, 0.0)");
  });

  io.observe(domObserver);

  $body.insertBefore(domObserver, etsyHeader);
})();
