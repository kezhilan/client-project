function toggleSection(element) {
    const content = element.nextElementSibling;
    content.classList.toggle("hidden");
}

function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function loadPosts() {
    const container = document.getElementById("myPosts");
    if (!container) return;

    container.innerHTML = "";

    var posts = JSON.parse(localStorage.getItem("myPosts")) || [];

    posts.forEach(function(post, index) {
        var div = document.createElement("div");
        div.classList.add("post");

        div.innerHTML =
            "<p><strong>User:</strong> " + post.username + "</p>" +
            "<p><strong>Description:</strong> " + post.description + "</p>" +
            "<p class='timestamp'>" + post.time + "</p>" +
            "<pre>" + escapeHTML(post.code) + "</pre>" +
            "<button class='btn delete-btn' onclick='deletePost(" + index + ")'>Delete</button>";

        container.appendChild(div);
    });
}

function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("myPosts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("myPosts", JSON.stringify(posts));
    loadPosts();
}

function loadCommunityPosts() {
    var container = document.getElementById("communityPosts");
    if (!container) return;

    container.innerHTML = "";

    var samplePosts = [
        {
            username: "User123",
            description: "Hello World in Java",
            code: 'public class Main { public static void main(String[] args) { System.out.println("Hello World"); }}'
        },
        {
            username: "CodeMaster",
            description: "For Loop Example",
            code: 'for(int i=0; i<5; i++) { System.out.println(i); }'
        }
    ];

    samplePosts.forEach(function(post) {
        var div = document.createElement("div");
        div.classList.add("post");

        div.innerHTML =
            "<p><strong>User:</strong> " + post.username + "</p>" +
            "<p><strong>Description:</strong> " + post.description + "</p>" +
            "<pre>" + post.code + "</pre>";

        container.appendChild(div);
    });
}

var form = document.getElementById("postForm");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        var username = document.getElementById("username").value;
        var description = document.getElementById("description").value;
        var code = document.getElementById("code").value;

        var post = {
            username: username,
            description: description,
            code: code,
            time: new Date().toLocaleString()
        };

        var posts = JSON.parse(localStorage.getItem("myPosts")) || [];
        posts.push(post);

        localStorage.setItem("myPosts", JSON.stringify(posts));

        form.reset();
        loadPosts();
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadPosts();
    loadCommunityPosts();
});


