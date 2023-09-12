import { betsyFeatures, betsyDebug, _$$, _$ } from "./utils"
/**
 * ======================================================================================================================
 * @name expandListingDetails
 * @description Automatically expand listing details (i.e. expands the sections "Description", "Meet your sellers", etc.)
 * TODO extract this code and add functionality for user reviews as well
 * ======================================================================================================================
 */
const expandListingDetails = () => {
  betsyFeatures("expandListingDetails() init")

  const listingInfo = _$(".listing-info")

  if (!listingInfo) {
    betsyDebug("expandListingDetails: Listing element not found")
    return
  }

  const listingSections = _$$("[data-appears-component-name]", listingInfo)

  listingSections.forEach((section) => {
    const appearsComponentName = section.dataset.appearsComponentName

    const sectionsByAria = _$$(
      'div[aria-hidden="true"]:not([data-favorite-shops-removed-alert], [data-favorite-shops-alert])',
      section
    )

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

      readMoreButton!.click()
      betsyDebug(
        `expandListingDetails: ${appearsComponentName} has been expanded (⚡ click event called)`
      )
    }
  })
}
