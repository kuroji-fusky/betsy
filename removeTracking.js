(function () {
  const anchorTags = document.getElementsByTagName("a");

  const mutatedQuery = Array.from(anchorTags).map((l) => {
    const fullPath = l.href.split("?").at(0);
    const querySplit = l.search.split("&");

    const queryFilterTracking = querySplit.filter(
      (q) => !(q.includes("ref") || q.includes("click"))
    );

    const appendToFilteredPath =
      queryFilterTracking.length == 0
        ? fullPath
        : `${fullPath}?${queryFilterTracking.join("&")}`;

    return {
      target: l,
      originalPath: l.href,
      filteredPath: appendToFilteredPath,
    };
  });

  mutatedQuery.forEach((link) => {
    console.log(link);
  });
})();
