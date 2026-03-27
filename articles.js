// ===== Modal Handling =====
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const closeLogin = document.getElementById("closeLogin");
const closeRegister = document.getElementById("closeRegister");

loginBtn.onclick = () => {
  loginModal.style.display = "block";
  registerModal.style.display = "none";
};
registerBtn.onclick = () => {
  registerModal.style.display = "block";
  loginModal.style.display = "none";
};
closeLogin.onclick = () => (loginModal.style.display = "none");
closeRegister.onclick = () => (registerModal.style.display = "none");
window.onclick = (event) => {
  if (event.target === loginModal) loginModal.style.display = "none";
  if (event.target === registerModal) registerModal.style.display = "none";
};

// ===== Article Search & Category Filter =====
const searchInput = document.getElementById("pageSearchInput");
const articleGrid = document.getElementById("articleGrid");
const categoryButtons = document.querySelectorAll(".category-btn");

function filterArticles() {
  const searchValue = searchInput.value.toLowerCase();
  const activeCategory = document.querySelector(".category-btn.active").dataset.category;
  const articles = articleGrid.querySelectorAll(".article-card");

  articles.forEach((article) => {
    const title = article.querySelector("h3").innerText.toLowerCase();
    const text = article.querySelector("p").innerText.toLowerCase();
    const category = article.dataset.category;

    const matchesSearch = title.includes(searchValue) || text.includes(searchValue);
    const matchesCategory = activeCategory === "all" || category === activeCategory;

    if (matchesSearch && matchesCategory) {
      article.style.display = "block";
    } else {
      article.style.display = "none";
    }
  });
}

// Search input filter
searchInput.addEventListener("input", filterArticles);

// Category button filter
categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterArticles();
  });
});

// Filter by category
function filterCategory(category) {
  const articles = document.querySelectorAll(".article-card");
  const buttons = document.querySelectorAll(".category");

  buttons.forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  articles.forEach(article => {
    const match = category === "all" || article.dataset.category === category;
    article.style.display = match ? "block" : "none";
  });
}

// Search filter
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase();
  const articles = document.querySelectorAll(".article-card");

  articles.forEach(article => {
    const text = article.textContent.toLowerCase();
    article.style.display = text.includes(filter) ? "block" : "none";
  });
});


// search box

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("articleSearch");
  const articles = document.querySelectorAll(".post-card");

  searchInput.addEventListener("keyup", (e) => {
    const term = e.target.value.toLowerCase();

    articles.forEach(article => {
      const title = article.querySelector("h3").innerText.toLowerCase();
      const excerpt = article.querySelector("p").innerText.toLowerCase();

      if (title.includes(term) || excerpt.includes(term)) {
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    });
  });
});
