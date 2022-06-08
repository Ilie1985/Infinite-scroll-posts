//bring all the elemets that i need to use

const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

//set up global variables
let limit = 4;
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

// showLoading FUNCTIONALITY

//add the class of show on the the loader element
//use setTimeout to make the loading dost dissapear after a certain amount of time which takes in a function and the time
//remove the class of show
//increment the page by 1 and call showPosts
//fetch the rest of the data

const showLoading = () => {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
};
//==================================================================

//filterPosts FUNCTIONSLITY

//pass in e parameter so that i can get what is typed
//capture e.target.value in a variable
//add toUppercase because its is going to be case sensitive when match it
//save all elements with the class of post in a variable to have access to the nodeList which is an array
//loop through each posts and get the innerText of the title and the body, save them in variables
//match it to the term (what i type)
//indexOf > - 1 means its a match in the title
//if there is a match set post.style.display ="flex"
//else set post.style.display ="none" so it doesnt show

const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

//==============================================================

//Event listeners

//add event listener on window which takes in an "scroll" event list. and a calback function
//pull out(destructure) the properties from the document.documentElement object
//create an if statement to adjust when and where to load new content on the page
//show the loader and fetche the rest of the post (invoke showLoading)

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

//add an input event list. and invoke filterPosts

filter.addEventListener("input", filterPosts);

//==========================================================================
