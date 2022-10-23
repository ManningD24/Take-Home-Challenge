//fetch User API
fetch('https://jsonplaceholder.typicode.com/users')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    appendData(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});
// Display Users
function appendData(data) {
let mainContainer = document.getElementById("users");
for (let i = 0; i < data.length; i++) {
    let li = document.createElement("li");
    li.innerHTML =  data[i].username;
    li.classList.add('item');
    li.dataset.userId = data[i].id;
    li.addEventListener('click', (event) => getPosts(event))
    mainContainer.appendChild(li);
}

}

function cleanPosts() {
let users = document.querySelectorAll('.item ul');
for(let i = 0; i < users.length; i++) {
    if(users[i]) {
        users[i].style.display = 'none';
    }
}
}

function getPosts(event) {

let userId = event.target.dataset.userId;
// Fetch Users Posts API
fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => response.json())
    .then(json => renderPosts(json, event.target))
}
// Display Users Posts
function renderPosts(posts, target) {
let postsList = target.childNodes[1];

cleanPosts();

if(postsList){
    postsList.style.display = 'block';
} else {
    let list = document.createElement("ul");

    for (let i = 0; i < posts.length; i++) {

        let item = document.createElement("li");
        let liTitle = document.createElement("strong");
        let liBody = document.createElement("p");

        liTitle.innerHTML = posts[i].title;
        liBody.innerHTML = posts[i].body;

        item.appendChild(liTitle);
        item.appendChild(liBody);
        list.appendChild(item);
    }

    target.appendChild(list);
}

}