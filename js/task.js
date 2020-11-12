import gallery from "./gallery-items.js";

const wrapperRef = document.querySelector(".js-gallery");

const getImageFromGallery = gallery.map((el) => createGallery(el));

wrapperRef.append(...getImageFromGallery);

const mainRefs = {
  boxImageRef: document.querySelector(".lightbox__image"),
  backDropWrapper: document.querySelector(".lightbox"),
  onCloseBtnRef: document.querySelector('button[data-action="close-lightbox"]'),
  backDrop: document.querySelector(".lightbox__overlay"),
};

wrapperRef.addEventListener("click", onOpenModal);
mainRefs.backDrop.addEventListener("click", onOverlayCloseModal);
mainRefs.onCloseBtnRef.addEventListener("click", onCloseModal);
window.addEventListener("keydown", onCloseModalByEsc);

function createGallery(image) {
  const refs = {
    createListRef: document.createElement("li"),
    createImageRef: document.createElement("img"),
    createLinkRef: document.createElement("a"),
  };

  refs.createListRef.classList.add("gallery__item");
  refs.createImageRef.classList.add("gallery__image");
  refs.createLinkRef.classList.add("gallery__link");

  refs.createLinkRef.setAttribute("href", image.original);
  refs.createImageRef.setAttribute("src", image.preview);
  refs.createImageRef.setAttribute("alt", image.description);
  refs.createImageRef.setAttribute("data-source", image.original);

  refs.createLinkRef.append(refs.createImageRef);
  refs.createListRef.append(refs.createLinkRef);

  return refs.createListRef;
}

function onOpenModal(event) {
  event.preventDefault();

  const getImg = event.target;

  if (getImg.nodeName !== "IMG") {
    return;
  }

  mainRefs.backDropWrapper.classList.add("is-open");
  mainRefs.boxImageRef.setAttribute("src", getImg.dataset.source);
  mainRefs.boxImageRef.setAttribute("alt", getImg.alt);
}

function onCloseModal() {
  mainRefs.boxImageRef.setAttribute("src", "");
  mainRefs.boxImageRef.setAttribute("alt", "");
  mainRefs.backDropWrapper.classList.toggle("is-open");
}

function onOverlayCloseModal(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onCloseModalByEsc(event) {
  if (event.key !== "Escape") {
    return;
  }

  //   console.log(event);
  onCloseModal();
}
