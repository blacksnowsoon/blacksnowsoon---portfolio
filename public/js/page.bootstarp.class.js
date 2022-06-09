// get all the sections in the page to populate the main boot starp classes

const sections = document.querySelectorAll(["section"]);
const header = document.querySelector("header");
const nav = header.querySelector("nav");
const ulDivContainer = document.getElementById("navbarNav");
const navUl = ulDivContainer.querySelector("ul");

// check the width of the screen and adjust the class
header.classList.add("container-fluid");

// fire the buildAnd Style function for the nav bar
buildAndStyle();
//------------------------------------------------------------------------
// set eventListener to the navbar links
linksEventListener();
//------------------------------------------------------------------------


function buildAndStyle() {
    const elementsList = document.createDocumentFragment();
    for (const sec of sections) {
        // add the class to the sections
        sec.classList.add("container", "p-1", "rounded", "pt-5", "mt-6");
        // set the id attr to the section to connected with the navigation links
        sec.setAttribute("id", "sec" + Array.from(sections).indexOf(sec));
        // create li item and a link
        const liItem = document.createElement("li");
        const aLink = document.createElement("a");

        liItem.classList.add("nav-item");
        aLink.classList.add("nav-link", "rounded-pill");
        // set the active section
        if (Array.from(sections).indexOf(sec) === 0) {
            liItem.classList.add("active")
            aLink.innerHTML = `<span class="sr-only">(current)</span>`
            sec.classList.add("active")
            sec.scrollIntoView({ "behavior": "smooth" })
        } // end if Array

        let aInnerText = null;
        for (const child of sec.children) {
            const h1 = child.querySelector("div h1");
            if (h1 !== null) {
                h1.classList.add("col", "rounded-pill", "bg-default", "p-3", "d-flex", "align-items-end")
                aInnerText = h1.innerText;
            }

            if (aInnerText !== null) {
                aLink.textContent = aInnerText
                aLink.setAttribute("aria-current", "page");
                aLink.href = sec.getAttribute("id");
                // aLink.classList.add("text-warning")
                liItem.append(aLink);
                elementsList.appendChild(liItem);
            } // end if aInnerContent
        } // end of childer loop
    } // end of sections loop

    nav.classList.add("navbar", "navbar-expand-md", "navbar-dark", "container");
    // create a ele to append the nav brand and the button
    const brandLink = document.createElement("a");
    const menuBtn = document.createElement("button");

    // setup the a link for the brand
    setAttributes(brandLink, {
        "href": "index.html",
        "target": "_self"
    });
    brandLink.classList.add("navbar-brand", "text-default");
    brandLink.innerText = "GK-Portfolio"
        // setup the  button
    menuBtn.classList.add("navbar-toggler");
    setAttributes(menuBtn, {
        "type": "button",
        "data-toggle": "collapse",
        "data-target": "#navbarNav",
        "aria-controls": "navbarNav",
        "aria-expanded": "false",
        "aria-label": "Toggle navigation"
    });
    menuBtn.innerHTML = `<span class="navbar-toggler-icon "></span>`

    // append the brand link and the button to the div brand
    brandLink.append(menuBtn);
    // get the container of the ul
    nav.prepend(menuBtn);
    nav.prepend(brandLink);

    ulDivContainer.classList.add("collapse", "navbar-collapse");

    navUl.classList.add("navbar-nav");

    navUl.appendChild(elementsList);
} //
//-------------------------------------------------------------------------
// function for setting a punch of attributes to an element
function setAttributes(ele, attrs) {
    for (const key in attrs) {
        ele.setAttribute(key, attrs[key]);
    }
} // end of setAttributes
//-------------------------------------------------------------------------
// add event listener to the nav links
function linksEventListener() {
    Array.from(navUl.childNodes).forEach(li => {
            li.addEventListener("click", (e) => {
                e.preventDefault();
                if (li.textContent === e.target.innerHTML) {
                    const secLink = e.target.getAttribute("href");
                    document.getElementById(secLink).scrollIntoView({ "behavior": "smooth" });
                    toggleActive(e.target.innerHTML);
                } // end if li.textContent
            });
        }) // linksEventListener
    function toggleActive(target) {
        const liList = navUl.querySelectorAll(["li"]);
        liList.forEach(li => {
            if (li.textContent === target) {
                li.classList.add("active");
            } else {
                li.classList.remove("active");
            }
        });
    }
}
// -----------------------------------------------------------------------
// toggle colors panel listener
const _toggleColorsPanel = document.getElementById("toggle-colors-panel");
_toggleColorsPanel.addEventListener("click", () => {
    const colorsDiv = document.getElementById("colors-palette");
    if (_toggleColorsPanel.classList.contains("collapsed")) {
        colorsDiv.style.left = 0;
        _toggleColorsPanel.style.opacity = 1;
    } else {
        colorsDiv.style.left = "-3rem"
        _toggleColorsPanel.style.opacity = .5;
    }
    _toggleColorsPanel.classList.toggle("collapsed");
});
// -----------------------------------------------------------------------
// add eventlistener to themes buttons
const themeBtns = document.querySelectorAll(["#colors-palette [data-theme]"]);
// store the default class
const defaultTheme = localStorage.getItem("defaultTheme");
if (defaultTheme !== null) {
    changeTheme(defaultTheme);
} else {
    localStorage.setItem("defaultTheme", "warning");
    changeTheme("warning");
}


for (const btn of themeBtns) {
    btn.addEventListener("click", e => {
        e.preventDefault();
        let color = null;
        if (e.target.classList.contains("bg-warning")) {
            color = "warning";
        } else if (e.target.classList.contains("bg-primary")) {
            color = "primary";
        } else if (e.target.classList.contains("bg-success")) {
            color = "success";
        } else if (e.target.classList.contains("bg-danger")) {
            color = "danger";
        }
        changeTheme(color);
    });
}

function changeTheme(themeColor) {
    const allElements = document.querySelectorAll(["body *"]);
    const defaultTheme = localStorage.getItem("defaultTheme");
    for (const elem of allElements) {
        if (elem.parentElement.getAttribute("id") !== "colors-palette") {

            if (elem.classList.contains("text-" + defaultTheme) || elem.classList.contains("text-default")) {
                elem.classList.remove("text-" + defaultTheme);
                elem.classList.add("text-" + themeColor);
            }
            if (elem.classList.contains("btn-" + defaultTheme) || elem.classList.contains("btn-default")) {
                elem.classList.remove("btn-" + defaultTheme);
                elem.classList.add("btn-" + themeColor);

            }
            if (elem.classList.contains("bg-" + defaultTheme) || elem.classList.contains("bg-default")) {
                elem.classList.remove("bg-" + defaultTheme);
                elem.classList.add("bg-" + themeColor);

            }
            if (elem.classList.contains("border-" + defaultTheme) || elem.classList.contains("border-default")) {
                elem.classList.remove("border-" + defaultTheme);
                elem.classList.add("border-" + themeColor);

            }

            if (elem.classList.contains("hero-img")) {
                console.log("filter-animation-" + themeColor)
                elem.style.cssText = "animation-name: filter-animation-" + themeColor + "!important";
            }

        }
    }
    localStorage.setItem("defaultTheme", themeColor);
}

// adding event listener to the moon and sun icon in the colors pannel
const toggletheme = document.getElementById("toggle-theme");

toggletheme.addEventListener("click", e => {
    e.preventDefault();
    const body = document.body
    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
    } else {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
    }
    toggletheme.classList.toggle("collapsed");
})
const barsElement = document.querySelector(".bars");
const fragment = document.createDocumentFragment();
const numberOfBars = 11;
for (let i = 0; i < numberOfBars; i++) {
    const elem = document.createElement('div');
    elem.classList.add('img-bar');
    fragment.appendChild(elem);

}
barsElement.appendChild(fragment);

const barsAnimation = () => {
    anime.timeline({
            targets: '.bars div',
            easing: 'easeInOutSine',
            delay: 'anime.stagger(50)',
            loop: true,
            autoplay: true,
            duration: 600,
            // loopComplete: (a) => 
        })
        .add({
            scale: anime.stagger([0, 0], {
                from: 'center',
                grid: [5, 5]
            }),
            translateX: anime.stagger([-50, 50]),
            rotate: anime.stagger([-45, 45]),
            easing: 'easeInOutCirc',
            delay: anime.stagger(100, { from: 'last', direction: 'reverse' })
        })

    // .add({
    //     translateX: 0,
    //     translateY: 0,
    //     scale: 1,
    //     rotate: 360,
    //     duration: 2000,
    //     delay: 0,
    // });
}

barsAnimation();
/*.add({
translateY: anime.stagger([-240, 240]),
		rotate: () => anime.random(-100, 100),
		scale: anime.stagger([1, 3], { from: 'center' }),
		delay: anime.stagger(10, { from: 0 }),
}) 
.add({
			translateX: anime.stagger([25, -25], { from: 'first' }),
			translateY: 0,
			rotate: anime.stagger([40, -40], { from: 'first' }),
			delay: anime.stagger(10, { from: 'first' }),
	})
		.add({
						translateX: anime.stagger('1rem', { grid: [9, 9], from: 'center', axis: 'x' }),
						//translateY: anime.stagger('1rem', {grid: [9, 9], from: 'center', axis: 'y'}),
						delay: anime.stagger(200, { grid: [9, 9], from: 'center', direction: 'reverse' })
				})
	.add({
						scale: anime.stagger([2.5, 1], { from: 'center', easing: 'easeInOutCirc' }),
						translateX: anime.stagger([-200, 200]),
						translateY: anime.stagger([-200, 200]),
						rotate: 0,
						delay: anime.stagger(1, { from: 'last' })
				}).add({
						rotate: anime.stagger(2, { from: 'center', direction: 'reverse', easing: 'easeInSine' }),
						translateX: 0,
						translateY: 0,
						delay: anime.stagger(10, { from: 'center' })
				})
				.add({
						scale: anime.stagger([2, 1], { grid: [9, 9], axis: 'y' }),
						translateY: anime.stagger([-100, 200], { grid: [9, 9], axis: 'y' }),
						rotate: 0,
						delay: anime.stagger(1, { from: 'last' })
				})
				.add({
						translateX: () => anime.random(-100, 100),
						translateY: () => anime.random(-100, 100),
						scale: anime.stagger([1.5, .5], { from: 'center' }),
						rotate: anime.stagger([10, -10], { from: 'last' }),
						delay: anime.stagger(50, { from: 'center', grid: [9, 9] }),
				})
				.add({
						translateX: () => anime.random(-100, 100),
						translateY: () => anime.random(-100, 100),
						rotate: anime.stagger([-10, 10], { from: 'last' }),
						scale: 1,
						delay: anime.stagger(50, { from: 'center', grid: [9, 9] }),
				})
				.add({
						translateX: 0,
						translateY: anime.stagger(6, { from: 'center', direction: 'reverse' }),
						rotate: 0,
						delay: anime.stagger(50, { from: 'center', grid: [9, 9] }),
				})
*/