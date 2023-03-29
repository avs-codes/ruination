const mainContainer = document.getElementById('main-content')

for (let i = 1; i < 51; i++) {
  let currentPost = document.createElement('article');

  currentPost.innerHTML = `
    <img src='/media/${i}.png'>
    <p>${i}</p>
  `
  if (i > 10) {
    currentPost.classList.add('half-width')
  }
  mainContainer.appendChild(currentPost);
}