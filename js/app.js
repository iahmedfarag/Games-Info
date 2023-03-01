let cards_element = document.querySelector(".cards .container");
let single_game_container = document.querySelector(".single");
let single_game_element = document.querySelector(".single .container .wrapper");
let close_single_game = document.querySelector(".single .container .exit");
let navbar_links_array = [
  "MMORPG",
  "SHOOTER",
  "SAILING",
  "PERMADEATH",
  "SUPERHERO",
  "PIXEL",
];
let navbar_links_wrapper = document.querySelector("nav .links");

// print navbar links and set first one has active class
navbar_links_array.map((el, index) => {
  navbar_links_wrapper.innerHTML += `
  <a href="#${el.toLocaleLowerCase()}" class="link ${
    index == 0 ? "active" : ""
  }">${el}</a>
  `;
});
let loading_element = document.querySelector(".loading");
let navbar_links = Array.from(document.querySelectorAll("nav .links a"));
let navbar_burger_btn = document.querySelector("nav .wrapper .burger");
let navbar = document.querySelector("nav");

// when click burger btn  for (responsive)
navbar_burger_btn.addEventListener("click", toggleActiveNavbar);

// function to toggle active classes for navbar (responsive)
function toggleActiveNavbar() {
  navbar_links_wrapper.classList.toggle("active");
  navbar_burger_btn.classList.toggle("active");
}

// add click event on navbar links
navbar_links.map((link) => {
  link.addEventListener("click", (e) => {
    navbar_links.map((el) => {
      el.classList.remove("active");
    });
    link.classList.add("active");
    getData(link.innerHTML.toLowerCase());
    // close the navbar after click on link
    toggleActiveNavbar();
  });
});

// get games from the api
async function getData(genre) {
  loading_element.classList.add("active");
  // cards_element.style.display = "none";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ac7c6868efmshdf58e1ddc921308p1fe068jsnf491fc64ff58",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  let url = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genre}`,
    options
  );
  let res = await url.json();
  let box = "";
  // print games
  res.map((el) => {
    let check_desc = el.short_description.length > 50;
    let el_desc = check_desc
      ? el.short_description.slice(0, 50)
      : el.short_description;
    box += `
    <div class="card" data-id="${el.id}">
    <div class="thumbnail">
      <img src="${el.thumbnail}" alt="" />
    </div>
    <div class="mid">
      <a href="#" class="title">${el.title}</a>
      <p class="desc">${el_desc}</p>
    </div>
    <div class="footer">
    <p class="platform">${el.platform}</p>
    <p class="genre">${el.genre}</p>

    </div>
  </div>
    `;
  });
  cards_element.innerHTML = box;

  let cards = Array.from(document.querySelectorAll(".cards .container .card"));

  // add click event on each link i click to open single game page
  cards.map((el) => {
    el.addEventListener("click", (e) => {
      let link = e.target.classList.contains("title");
      if (link) {
        let id = e.target.parentElement.parentElement.dataset.id;
        getSingleGame(id);
      }
    });
  });

  remove_loading_element();
  // cards_element.style.display = "flex";
}

function remove_loading_element() {
  setTimeout(() => {
    loading_element.classList.remove("active");
  }, 100);
}

// single game page
async function getSingleGame(id) {
  loading_element.classList.add("active");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ac7c6868efmshdf58e1ddc921308p1fe068jsnf491fc64ff58",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };
  let url = await fetch(
    `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
    options
  );
  let res = await url.json();

  cards_element.style.display = "none";
  document.querySelector("nav").style.display = "none";
  // show the single game page
  single_game_container.classList.remove("none");
  single_game_container.classList.add("active");

  // print the element

  single_game_element.innerHTML = `
    
    <div class="left">
    <img src="${res.thumbnail}" alt="" />
  </div>
  <div class="right">
    <h2>${res.title}</h2>
    <h3>category: <span>${res.genre}</span></h3>
    <h3>platform: <span>${res.platform}</span></h3>
    <h3>Status: <span>${res.status}</span></h3>
    <p>${res.description}</p>
    <a href="${res.game_url}" target="_blank">
    <button>show game</button>
    </a>
  </div>
    
    `;

  // close single game page
  close_single_game.addEventListener("click", (e) => {
    single_game_container.classList.remove("active");
    single_game_container.classList.add("none");
    cards_element.style.display = "flex";
    document.querySelector("nav").style.display = "block";
  });
  remove_loading_element();
}

// trigger function as default
getData("mmorpg");

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// sticky navbar
// Get the offset position of the navbar
var sticky = navbar.offsetTop;
// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
