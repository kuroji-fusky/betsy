import {
  $head,
  $body,
  _$,
  _$$,
  betsyDebug,
  betsyFeatures,
  betsyStyleInject,
} from "./utils"
/**
 * ======================================================================================================================
 * @name fadeOutSoldListings
 * @description WIP
 * @scope UI
 * ======================================================================================================================
 */
const fadeOutSoldListings = () => {
  betsyFeatures("fadeOutSoldListings() init")

  const listing = _$$(".v2-listing-card")

  $head.append(
    betsyStyleInject(
      "fo-sold-listings",
      `
				#betsy__sold-listing {
        	opacity: 0.5;
          transition: opacity 300ms ease;
  			}
        #betsy__sold-listing:hover {
        	opacity: 1;
  			}
			`
    )
  )

  // TODO: add any sold listings to prevent any repeated console logs
  let soldListings = []

  const findSoldListings = () => {
    const filteredListings = Array.from(listing).filter((e) => {
      const priceBadge =
        _$(".listing-card-price-badge", e) ||
        _$(".recs-listing-grid-price", e) ||
        _$(".n-listing-card__price", e)

      const hasSoldText = priceBadge!.textContent!.includes("Sold")

      if (!hasSoldText) return

      return e
    })

    filteredListings.forEach((listing) => {
      listing.setAttribute("id", "betsy__sold-listing")

      const listingId = listing.dataset.listingId

      betsyDebug(`fadeOutSoldListings: listing id ${listingId} is sold`)
    })
  }

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(({ type }) => {
      if (type === "childList") {
        findSoldListings()
      }
    })
  })

  observer.observe($body, { childList: true, subtree: true })
}
