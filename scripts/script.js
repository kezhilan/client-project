// Show/hide the expandable section
function toggleSection(element) {
    const content = element.nextElementSibling;
    content.classList.toggle("hidden");
}
// Prevents user code from breaking the page (replaces < and >) AKA anti inject
function escapeHTML(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
// loads user inputs locally
function loadPosts() {
    const container = document.getElementById("myPosts");
    if (!container) return;

    container.innerHTML = "";

    var posts = JSON.parse(localStorage.getItem("myPosts")) || [];
    // loop through each post and display
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
//delete and reload post
function deletePost(index) {
    var posts = JSON.parse(localStorage.getItem("myPosts")) || [];
    posts.splice(index, 1);
    localStorage.setItem("myPosts", JSON.stringify(posts));
    loadPosts();
}
//loads sample posts on community page
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

    //display sample posts
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
// get form
var form = document.getElementById("postForm");

//run if form is submitted
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        var username = document.getElementById("username").value;
        var description = document.getElementById("description").value;
        var code = document.getElementById("code").value;

        //create post object
        var post = {
            username: username,
            description: description,
            code: code,
            time: new Date().toLocaleString()
        };

        var posts = JSON.parse(localStorage.getItem("myPosts")) || [];
        posts.push(post);

        localStorage.setItem("myPosts", JSON.stringify(posts));
        //clear
        form.reset();
        //update
        loadPosts();
    });
}
//run when page opens
document.addEventListener("DOMContentLoaded", function() {
    loadPosts();
    loadCommunityPosts();
});
//jquery for account create pop up box
$(function () {

    //box setup
    $("#accountDialog").dialog({
        autoOpen: false,
        modal: true,
        width: 400
    });

    //open when button clicked
    $("#createAccountBtn").click(function () {
        $("#accountDialog").dialog("open");
    });

    //handle form when submited
    $("#accountForm").submit(function (e) {
        e.preventDefault();

        var username = $("#newUsername").val();

        localStorage.setItem("username", username);

        $("#accountDialog").dialog("close");

        $("#welcomeMessage").text("Welcome, " + username + "!");
    });

});


