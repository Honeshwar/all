//update whatsapp image in share option
const images = document.querySelectorAll(".footer_logo");
images.forEach((image) => {
  const iframe = document.createElement("iframe");
  iframe.src =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.983938710257!2d77.03599067423146!3d28.419741493714227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229e71ef44dd%3A0x9931b80f30d32dd3!2sJMD%20Megapolis!5e0!3m2!1sen!2sin!4v1681758189341!5m2!1sen!2sin";
  iframe.className = "footer_logo";
  iframe.frameBorder = "0";
  image.parentNode.replaceChild(iframe, image);
});

//swap "Join our panel" and "Our work" section in navbar
const nav = document.getElementById("navbarTogglerDemo03");
const ul = nav.querySelector("ul");
// const li2 = ul.children[2];
// const li3 = ul.children[3];
// ul.insertBefore(li3, li2);

//nav bar our-work  drop down
const dropdownTrigger = nav.querySelector("ul").children[3];
// console.log("here", dropdownTrigger);
// const dropdownContent = document.createElement("ul");
// dropdownContent.classList.add("dropdown-content");
// dropdownContent.innerHTML = `
//   <li><a href="https://dhruvresearch.com/our_work/our_categories/politics/politics_category.html">Politics</a></li>
//   <li><a href="https://dhruvresearch.com/our_work/our_categories/economy/economy_category.html">Economy</a></li>
//   <li><a href="https://dhruvresearch.com/our_work/our_categories/sports/sports_category.html">Sports</a></li>
//   <li><a href="https://dhruvresearch.com/our_work/our_categories/entertainment/entertainment_category.html">Lifestyle & Entertainment</a></li>
//   <li><a href="https://dhruvresearch.com/our_work/our_categories/didyouknow/didyouknow_category.html">Did you know !</a></li>
//   <li><a href="https://dhruvresearch.com/our_work/our_categories/governance/governance_category.html">Governance</a></li>
// `;

dropdownTrigger.classList.add("dropdown");
dropdownTrigger.classList.add("d-flex");
dropdownTrigger.classList.add("justify-content-center");
// const dropdown = `<div class="dropdown-menu" aria-labelledby="navbarDropdown">
// <a class="dropdown-item d-block" href="https://dhruvresearch.com/our_work/our_categories/politics/politics_category.html">Politics</a>
// <a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/economy/economy_category.html">Economy</a>
// <a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/sports/sports_category.html">Sports</a>
// <a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/entertainment/entertainment_category.html">Lifestyle & Entertainment</a>
// <a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/didyouknow/didyouknow_category.html">Did you know !</a>
// <a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/governance/governance_category.html">Governance</a>
// </div>`;

// const currentOrigin = document.location.hostname;
// console.log(currentOrigin);
const dropdown = `<div class="dropdown-menu" aria-labelledby="navbarDropdown">
<a class="dropdown-item d-block" href="https://dhruvresearch.com/articles?category=politics">Politics</a>
<a class="dropdown-item" href="https://dhruvresearch.com/articles?category=economy">Economy</a>
<a class="dropdown-item" href="https://dhruvresearch.com/articles?category=sports">Sports</a>
<a class="dropdown-item" href="https://dhruvresearch.com/articles?category=entertainment">Lifestyle & Entertainment</a>
<a class="dropdown-item" href="https://dhruvresearch.com/articles?category=didyouknow">Did you know !</a>
<a class="dropdown-item" href="https://dhruvresearch.com/articles?category=governance">Governance</a>
</div>`;
dropdownTrigger.querySelector("a").insertAdjacentHTML("beforeend", dropdown);

// dropdownTrigger.innerHTML = ` <a href="#our_work" class="nav-link"  id="navbarDropdown" style="scroll-behavior: smooth">
// 																<div class="d-flex flex-column align-items-center">
// 																		Our Work
// 																		<img alt="image" src="./images/Star 1.png" style="margin: auto" width="10px" />
// 																</div>
// 											 			  </a>
// 											 				<div class="dropdown-menu" aria-labelledby="navbarDropdown">
// 																	<a class="dropdown-item d-block" href="https://dhruvresearch.com/our_work/our_categories/politics/politics_category.html">Politics</a>
// 																	<a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/economy/economy_category.html">Economy</a>
// 																	<a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/sports/sports_category.html">Sports</a>
// 																	<a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/entertainment/entertainment_category.html">Lifestyle & Entertainment</a>
// 																	<a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/didyouknow/didyouknow_category.html">Did you know !</a>
// 																	<a class="dropdown-item" href="https://dhruvresearch.com/our_work/our_categories/governance/governance_category.html">Governance</a>
// 															</div>`;

// let timeoutID; // Initialize timeoutID variable

// dropdownTrigger.addEventListener("mouseenter", function () {
// 	// Add dropdown content to the DOM
// 	// dropdownTrigger.appendChild(dropdownContent);

// 	// Calculate position of dropdown
// 	const triggerRect = dropdownTrigger.getBoundingClientRect();
// 	dropdownContent.style.top = triggerRect.bottom + "px";
// 	dropdownContent.style.left = triggerRect.right + "px";

// 	// Show dropdown content
// 	dropdownContent.style.display = "block";
// 	dropdownContent.style.position = "absolute";
// 	dropdownContent.style.left = "52%";

// 	// Clear any existing timeout
// 	clearTimeout(timeoutID);
// });

// dropdownTrigger.addEventListener("mouseleave", function () {
// 	// Set a timeout to remove the dropdown content after 500ms
// 	timeoutID = setTimeout(function () {
// 		// Remove dropdown content from the DOM
// 		dropdownTrigger.removeChild(dropdownContent);
// 		// Hide dropdown content
// 		dropdownContent.style.display = "none";
// 	}, 500);
// });

function openTab(evt, tabName) {
  //fucntion to toggle spotlight and ourwork tiles in index page
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}
