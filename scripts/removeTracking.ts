import { betsyFeatures, _$$, _$ } from "./utils"
/**
 * ======================================================================================================================
 * @name removeTracking
 * @description Removes reference and click tracking by omitting ref and click queries
 * ======================================================================================================================
 */
const removeTracking = () => {
  betsyFeatures("removeTracking() init")

  const anchorTags = _$$<HTMLAnchorElement>("a")

  const mutatedQuery = Array.from(anchorTags).map(
    (links: HTMLAnchorElement) => {
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
    }
  )

  mutatedQuery.forEach((link) => {
    console.log(link)
  })
}
