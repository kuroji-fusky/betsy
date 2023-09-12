import { betsyFeatures, _$$, _$, $body, appendInlineStyles } from "./utils"
/**
 * ======================================================================================================================
 * @name stickyHeader
 * @description Makes the header "stick" to the window
 * ======================================================================================================================
 */
export const stickyHeader = () => {
  betsyFeatures("stickyHeader() init")

  const etsyHeader = _$("#gnav-header")
  const domObserver = document.createElement("betsy-dom-observer")

  const etsyHeaderStyleOverrides = {
    position: "sticky",
    top: "0",
    transition: "box-shadow ease 300ms",
  }

  etsyHeader!.setAttribute(
    "style",
    Object.entries(etsyHeaderStyleOverrides)
      .map(([k, v]) => `${k}:${v} !important`)
      .join("; ")
  )

  appendInlineStyles(domObserver, {
    position: "absolute",
    top: "0",
    height: "40px",
  })

  const io = new IntersectionObserver(([entry]) => {
    !entry.isIntersecting
      ? (etsyHeader!.style["box-shadow"] = "0 0 30px rgba(0, 0, 0, 0.5)")
      : (etsyHeader!.style["box-shadow"] = "0 0 30px rgba(0, 0, 0, 0.0)")
  })

  io.observe(domObserver)

  $body.insertBefore(domObserver, etsyHeader)
}
