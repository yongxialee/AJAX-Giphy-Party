
console.log("Let's get this party started!");

const $gifArea = $("#gif-area");
const $searchInput = $("#search");

/* use ajax result to add a gif */

function addGif(res) {
  let numResults = res.data.length;
  if (numResults) {
    let randomIdx = Math.floor(Math.random() * numResults);
    let $newRow = $("<div>", { class: "row" });
    let $newGif = $("<img>", {
      src: res.data[randomIdx].images.original.url,
      class: "w-100"
    });
    $newRow.append($newGif);
    $gifArea.append($newRow);
  }
}

/* handle form submission: clear search box & make ajax call */

$("form").on("submit", async function(evt) {
  evt.preventDefault();

  let searchTerm = $searchInput.val();
  $searchInput.val("");

  const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
    params: {
      q: searchTerm,
      api_key: "vZ0CiXmnjxP7pEo1JguWF1OgDqeqcRKd"
    }
  });
  addGif(response.data);
});

/* remove gif */

$("#remove").on("click", function() {
  $gifArea.empty();
});