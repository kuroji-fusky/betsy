// Still WIP
(function () {
  const ListingInfoComponent = document.querySelector(".listing-info");

  if (!!ListingInfoComponent) {
    console.log(
      ListingInfoComponent.querySelectorAll("[data-appears-component-name]")
    );
  } else {
    console.log("Listing element not found");
  }
})();
