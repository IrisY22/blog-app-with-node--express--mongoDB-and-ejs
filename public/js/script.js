document.addEventListener('DOMContentLoaded', function () {

  const allBtns = document.querySelectorAll('.search-btn');
  const searchBar = document.querySelector('.search-bar');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('search-close');

  for (var i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener('click', function () {
      searchBar.style.visibility = 'visible';
      searchBar.classList.add('open');
      this.setAttribute('aria-expanded', 'true');
      searchInput.focus();
    });
  }


  searchClose.addEventListener('click', function () {
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    this.setAttribute('aria-expanded', 'false');
  });

});
