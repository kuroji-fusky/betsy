import { betsyFeatures, betsyDebug, _$$ } from "./utils"
/**
 * ======================================================================================================================
 * @name noNewTabs
 * @description Removes the `target="_blank"` attribute from links that causes to open link to a new tab
 * ======================================================================================================================
 */
const noNewTabs = () => {
  betsyFeatures("noNewTabs() init")

  let overridesCount = 0

  const linkMatches = [
    `a[target*="etsy"]`,
    `a[href^="https://www.etsy.com/"][target="_blank"]:not([href^="/social"], [href^="https://play.google.com"], [href^="https://apps.apple.com"])`,
  ]

  const removeTargetAttributes = () => {
    linkMatches.map((selector) => {
      _$$(selector).forEach((element) => {
        element.removeAttribute("target")

        // Add data attribute keep track of links that are overriden
        element.setAttribute("data-etsy-target-override", "")
      })
    })
  }

  // Detect any DOM changes and re-execute the function when fetching listings through Etsy's API
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(({ type }) => {
      if (type === "childList") {
        removeTargetAttributes()
      }
    })

    const strippedLinksLen = _$$("a[data-etsy-target-override]").length

    if (overridesCount === strippedLinksLen) {
      return
    }

    overridesCount = strippedLinksLen
    betsyDebug(`noNewTabs: found ${overridesCount} links`)
  })

  observer.observe($body, { childList: true, subtree: true })

  removeTargetAttributes()
}
