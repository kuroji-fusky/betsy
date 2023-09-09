const consoleHeaderBg = (c) =>
  `background-color:${c};color:#f5f5f5;padding:2px 5px;border-radius:4px;font-weight:bold`

/**
 * @param {any[]} i
 * @returns {void}
 */
const betsyFeatures = (...i) =>
  console.debug(
    `%c🔧 BEtsy Features%c ${i}`,
    consoleHeaderBg("#166292"),
    "color:currentColor"
  )
/**
 * @param {any[]} i
 * @returns {void}
 */
const betsyDebug = (...i) =>
  console.debug(
    `%c🐞 BEtsy Debug%c ${i}`,
    consoleHeaderBg("#f1641e"),
    "color:currentColor"
  )

const $body = document.body
/**
 * @param {keyof HTMLElementTagNameMap | string} element
 * @param {any} target
 * @returns {Element}
 */
const _$ = (element, target = document) => target.querySelector(element)
/**
 * @param {keyof HTMLElementTagNameMap | string} element
 * @param {any} target
 * @returns {NodeListOf<Element>}
 */
const _$$ = (element, target = document) => target.querySelectorAll(element)

/**
 * Forces any input type to string
 * @param {any} input
 * @returns {string}
 */
const coerceToString = (input) => {
  if (typeof input === "number") return input.toString()
  if (typeof input === "object") return JSON.stringify(input)
  return input
}

const _BETSY_INIT =
  "If there are any bugs or features you'd like to add, create a new issue on GitHub!"

console.info(
  `%c✂️ BEtsy%c ${_BETSY_INIT}`,
  consoleHeaderBg("#af54ed"),
  "color:currentColor",
  "https://github.com/kuroji-fusky/betsy/issues"
)

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

        // For debug purposes and to keep track of links that are overriden
        element.setAttribute("data-etsy-target-override", "")
      })
    })
  }

  const betsyLsKey = "_betsyData"
  const betsyInit = {
    init_date: new Date().toISOString(),
    links_overriden: 0,
  }

  // Detect any DOM changes and re-execute the function when fetching listings through Etsy's API
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(({ type }) => {
      if (type === "childList") {
        removeTargetAttributes()
      }
    })

    const overridesDOM = _$$("[data-etsy-target-override]")
    const overrideDOMLen = overridesDOM.length

    if (overridesCount == overrideDOMLen) {
      return
    }

    overridesCount = overrideDOMLen

    const lsGetItem = localStorage.getItem(betsyLsKey)

    if (!lsGetItem) {
      localStorage.setItem(betsyLsKey, coerceToString(betsyInit))
    }

    if (lsGetItem) {
      const { init_date, links_overriden: lo_temp } = JSON.parse(lsGetItem)
      localStorage.setItem(
        betsyLsKey,
        coerceToString({
          init_date,
          links_overriden: lo_temp + overridesCount,
        })
      )
    }

    // prettier-ignore
    const lsLinkOverriden = JSON.parse(lsGetItem || JSON.stringify(betsyInit)).links_overriden

    betsyDebug(
      `noNewTabs: stripped ${overridesCount} links, ${lsLinkOverriden} in total`
    )
  })

  observer.observe($body, { childList: true, subtree: true })

  removeTargetAttributes()
}
/**
 * ======================================================================================================================
 * @name stickyHeader
 * @description Makes the header "stick" to the window
 * ======================================================================================================================
 */
const stickyHeader = () => {
  betsyFeatures("stickyHeader() init")

  const etsyHeader = _$("#gnav-header")
  const domObserver = document.createElement("betsy-dom-observer")

  // Fix horizontal scroll when user visits the Settings page
  $body.style["overflow-x"] = "hidden"

  const etsyHeaderStyleOverrides = {
    position: "sticky",
    top: "0",
    transition: "box-shadow ease 300ms",
  }

  const observerStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "40px",
  }

  etsyHeader.setAttribute(
    "style",
    Object.entries(etsyHeaderStyleOverrides)
      .map(([k, v]) => `${k}:${v} !important`)
      .join("; ")
  )

  Object.entries(observerStyles).forEach(([sk, sv]) => {
    domObserver.style[sk] = sv
  })

  const io = new IntersectionObserver(([entry]) => {
    !entry.isIntersecting
      ? (etsyHeader.style["box-shadow"] = "0 0 30px rgba(0, 0, 0, 0.5)")
      : (etsyHeader.style["box-shadow"] = "0 0 30px rgba(0, 0, 0, 0.0)")
  })

  io.observe(domObserver)

  $body.insertBefore(domObserver, etsyHeader)
}
/**
 * ======================================================================================================================
 * @name expandListingDetails
 * @description Automatically expand listing details (i.e. expands the sections "Description", "Meet your sellers", etc.)
 * ======================================================================================================================
 */
// TODO extract this code and add functionality for user reviews as well
const expandListingDetails = () => {
  betsyFeatures("expandListingDetails() init")

  const ListingInfoComponent = _$(".listing-info")

  if (!ListingInfoComponent) {
    betsyDebug("expandListingDetails: Listing element not found")
    return
  }

  const sections = _$$("[data-appears-component-name]", ListingInfoComponent)

  sections.forEach((section) => {
    const appearsComponentName = section.dataset.appearsComponentName

    const sectionsByAria = _$$(
      'div[aria-hidden="true"]:not([data-favorite-shops-removed-alert], [data-favorite-shops-alert])',
      section
    )
    const sectionsByButton = _$$("button", section)

    const isDescriptionExpanded =
      appearsComponentName == "listing_description" && sectionsByAria.length > 0

    if (sectionsByAria.length == 0) {
      betsyDebug(
        `expandListingDetails: ${appearsComponentName} is already expanded`
      )
      return
    }

    if (isDescriptionExpanded) {
      const readMoreButton = _$("button[data-read-more]", section)

      readMoreButton.click()
      betsyDebug(
        `expandListingDetails: ${appearsComponentName} has been expanded (⚡ click event called)`
      )
    }
  })
}
/**
 * ======================================================================================================================
 * @name removeTracking
 * @description Removes reference and click tracking by omitting ref and click queries
 * ======================================================================================================================
 */
const removeTracking = () => {
  betsyFeatures("removeTracking() init")

  const anchorTags = _$$("a")

  const mutatedQuery = Array.from(anchorTags).map((links) => {
    const fullPath = links.href.split("?").at(0)
    const querySplit = links.search.split("&")

    const queryFilterTracking = querySplit.filter(
      (q) => !(q.includes("ref") || q.includes("click"))
    )

    const appendToFilteredPath =
      queryFilterTracking.length == 0
        ? fullPath
        : `${fullPath}?${queryFilterTracking.join("&")}`

    return {
      target: links,
      originalPath: links.href,
      filteredPath: appendToFilteredPath,
    }
  })

  mutatedQuery.forEach((link) => {
    console.log(link)
  })
}
