"use strict";

const NAV_LINK_SIZE = 94;

(function() {
  /**
   * Throttles events, by waiting for animation frames.
   * @param type Event type.
   * @param name New event name.
   * @param obj Object to originate new event from. Defaults to window.
   */
  const throttle = (type, name, obj = window) => {
    let running = false;
    obj.addEventListener(type, () => {
      if (running) return;
      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      })
    });
  };

  throttle("resize", "resize:optimized");
})();

/**
 * Attempts to retrieve the overflow link. If it's not found, a new one is created.
 * @return {Element} Overflow link.
 */
const getOrCreateOverflowLink = () => {
  let link = document.querySelector(".js-overflow-link");

  // Create link if it doesn't exist
  if (link === null) {
    const nav = document.querySelector(".header nav");
    link = document.createElement("div");
    link.classList.add("js-overflow-link");
    link.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" class="material-icons"><g id="Bounding_Boxes"><path fill="none" d="M0,0h24v24H0V0z"></path></g><g id="Rounded"><path d="M6,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S7.1,10,6,10z M18,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S19.1,10,18,10zM12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z"></path></g></svg>`;
    link.innerHTML += `<span>More</span>`;
    link.addEventListener("click", () => {
      const menu = getOrCreateOverflowMenu();
      if (menu.hasAttribute("active")) {
        menu.removeAttribute("active");
      } else {
        menu.setAttribute("active", "");
      }
    });
    nav.appendChild(link);
  }

  return link;
};

/**
 * Attempts to retrieve the overflow menu. If it's not found, a new one is created.
 * @return {Element} Overflow menu.
 */
const getOrCreateOverflowMenu = () => {
  let menu = document.querySelector(".js-overflow-menu");

  // Create menu if it doesn't exist
  if (menu === null) {
    const nav = document.querySelector(".header nav");
    menu = document.createElement("div");
    menu.classList.add("js-overflow-menu");
    nav.appendChild(menu);
  }

  return menu;
};

/**
 * Makes a link overflow into the overflow menu.
 * @param link Link to overflow.
 */
const enableOverflow = link => {
  const overflowMenu = getOrCreateOverflowMenu();

  if (overflowMenu.querySelector(`#overflow-${link.id}`) === null) {
    // Create link
    const overflowLink = document.createElement("a");
    overflowLink.setAttribute("href", link.getAttribute("href"));
    overflowLink.innerHTML = link.innerHTML;
    overflowLink.id = `overflow-${link.id}`;
    overflowMenu.appendChild(overflowLink);
  }

  if (!link.classList.contains("overflow")) link.classList.add("overflow");
};

/**
 * Removes a link from the overflow menu.
 * @param link Link to remove from overflow menu.
 */
const disableOverflow = link => {
  const overflowMenu = getOrCreateOverflowMenu();
  const overflowLink = overflowMenu.querySelector(`#overflow-${link.id}`);

  if (overflowLink !== null) {
    overflowMenu.removeChild(overflowLink);
  }

  if (link.classList.contains("overflow")) link.classList.remove("overflow");
};

/**
 * Updates the nav menu's overflow. Should be called when the window is resized, and when the DOM is ready.
 */
const updateOverflow = () => {
  if (window.innerWidth > 780) return;

  const windowSize = window.innerWidth;
  const links = document.querySelectorAll(".header nav > a");
  const isOverflowNeeded = links.length * NAV_LINK_SIZE > windowSize;
  const overflowLink = getOrCreateOverflowLink();
  const overflowMenu = getOrCreateOverflowMenu();

  // Enable or disable overflow link as neccessary
  if (isOverflowNeeded && !overflowLink.hasAttribute("active")) {
    overflowLink.setAttribute("active", "");
  } else if (!isOverflowNeeded && overflowLink.hasAttribute("active")) {
    overflowLink.removeAttribute("active");
  }

  // Hide overflow menu
  if (overflowMenu.hasAttribute("active")) {
    overflowMenu.removeAttribute("active");
  }

  let index = 0;
  const maxSize = isOverflowNeeded ? windowSize - NAV_LINK_SIZE : windowSize;
  links.forEach(link => {
    if ((index + 1) * NAV_LINK_SIZE <= maxSize) {
      disableOverflow(link);
    } else {
      enableOverflow(link);
    }
    index++;
  });
};

addEventListener("turbolinks:load", updateOverflow);
addEventListener("resize:optimized", updateOverflow);