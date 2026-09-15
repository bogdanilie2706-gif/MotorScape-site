document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const marcaFilter = document.getElementById("marca-filter");
  const pretFilter = document.getElementById("pret-filter");
  const sortFilter = document.getElementById("sort-filter");
  const carCards = Array.from(document.querySelectorAll(".car-card"));
  const carList = document.querySelector(".car-list");

  function filtreaza() {
    const searchText = searchInput.value.toLowerCase();
    const marca = marcaFilter.value;
    const pret = pretFilter.value;

    let masiniFiltrate = carCards.filter(card => {
      const titlu = card.querySelector("h3").textContent.toLowerCase();
      const cardMarca = card.getAttribute("data-marca");
      const cardPret = parseInt(card.getAttribute("data-pret"));

      let pretOk = true;
      if (pret === "sub20000") pretOk = cardPret < 20000;
      else if (pret === "20000-40000") pretOk = cardPret >= 20000 && cardPret <= 40000;
      else if (pret === "peste40000") pretOk = cardPret > 40000;

      return titlu.includes(searchText) &&
             (marca === "" || cardMarca === marca) &&
             pretOk;
    });

    const sortValue = sortFilter.value;
    if (sortValue === "crescator") {
      masiniFiltrate.sort((a, b) => parseInt(a.getAttribute("data-pret")) - parseInt(b.getAttribute("data-pret")));
    } else if (sortValue === "descrescator") {
      masiniFiltrate.sort((a, b) => parseInt(b.getAttribute("data-pret")) - parseInt(a.getAttribute("data-pret")));
    }

    carList.innerHTML = "";
    masiniFiltrate.forEach(card => carList.appendChild(card));
  }

  searchInput.addEventListener("input", filtreaza);
  marcaFilter.addEventListener("change", filtreaza);
  pretFilter.addEventListener("change", filtreaza);
  sortFilter.addEventListener("change", filtreaza);
});
