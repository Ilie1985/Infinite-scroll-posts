//bring all the elemets that i need to use

const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

//set up global variables
let limit = 3;
let page = 1;
//=====================================================

//create a function to fetch the post from API

const getPosts = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
};
//=============================================================

//create function to show posts in the DOM
//const posts =await getPosts()--> is the data
//loop through each post and for each post create a new element(<div>) with a new class(.post) to be displayed in the DOM
//populate postEl (<div>) with new posts taken in by id ,title,body
//append the new created element(postEl) to postsContainer(parent element) to be displayed in the DOM

const showPosts = async () => {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `<div class="number">${post.id}</div>
    <div class ="post-info">
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body}</p>
    </div>
    `;
    postsContainer.appendChild(postEl);
  });
};
showPosts();
//==================================================================