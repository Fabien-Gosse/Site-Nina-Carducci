/*document.addEventListener("DOMContentLoaded", function () {
  let gallery = document.querySelector(".gallery");

  gallery = {
    columns: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
    },
    lightBox: true,
    lightboxId: "myAwesomeLightbox",
    showTags: true,
    tagsPosition: "top",
  };
});*/

/*
$(document).ready(function () {
  $(".gallery").mauGallery({
    columns: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
    },
    lightBox: true,
    lightboxId: "myAwesomeLightbox",
    showTags: true,
    tagsPosition: "top",
  });
});
*/

document.addEventListener("DOMContentLoaded", function () {
  getFilters();
  filterGallery();
  buttonAll();
  let imgCollection = activeImg();
  openLightBox();
  prevModalImg(imgCollection);
  nextModalImg(imgCollection);

  function getFilters() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const ArrayGalleryItems = Array.from(galleryItems);
    const filterTags = ArrayGalleryItems.map(
      (ArrayGalleryItems) => ArrayGalleryItems.dataset.galleryTag
    );
    let uniqueFilterTags = [...new Set(filterTags)];

    for (i = 0; i < uniqueFilterTags.length; i++) {
      const galleryTags = uniqueFilterTags[i];

      //Création des élements
      const sectionFilters = document.querySelector(".filters");
      const btnFilters = document.createElement("input");

      //Attribution des propriétés aux boutons
      btnFilters.type = "button";
      btnFilters.value = galleryTags;
      btnFilters.name = galleryTags;
      btnFilters.classList.add(galleryTags);

      sectionFilters.appendChild(btnFilters);
    }
  }

  function filterGallery() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const ArrayGalleryItems = Array.from(galleryItems);
    const filterTags = ArrayGalleryItems.map(
      (ArrayGalleryItems) => ArrayGalleryItems.dataset.galleryTag
    );
    console.log(filterTags);
    let uniqueFilterTags = [...new Set(filterTags)];

    for (let i = 0; i < uniqueFilterTags.length; i++) {
      console.log(uniqueFilterTags[i]);
      const buttonFilters = document.querySelector("." + uniqueFilterTags[i]);
      console.log(buttonFilters);
      buttonFilters.addEventListener("click", function () {
        for (let i2 = 0; i2 < galleryItems.length; i2++) {
          const galleryItemsTags = galleryItems[i2].dataset.galleryTag;
          console.log(galleryItemsTags);
          console.log(buttonFilters.name);
          if (buttonFilters.name !== galleryItemsTags) {
            galleryItems[i2].classList.add("hide");
            galleryItems[i2].parentNode.classList.add("hide");
          } else {
            galleryItems[i2].classList.remove("hide");
            galleryItems[i2].parentNode.classList.remove("hide");
          }
        }
        highlightBtn(buttonFilters, uniqueFilterTags);
        activeImg();
      });
    }
  }

  function highlightBtn(buttonFilters, uniqueFilterTags) {
    console.log(buttonFilters);
    console.log(uniqueFilterTags);
    buttonFilters.classList.add("activeBtn");
    for (i3 = 0; i3 < uniqueFilterTags.length; i3++) {
      const tagFilters = document.querySelector("." + uniqueFilterTags[i3]);
      const allButton = document.querySelector(".filtersAll");
      console.log(buttonFilters);
      console.log(uniqueFilterTags);
      if (uniqueFilterTags[i3] !== buttonFilters.value) {
        tagFilters.classList.remove("activeBtn");
        allButton.classList.remove("activeBtn");
      }
    }
  }

  function buttonAll() {
    const allButton = document.querySelector(".filtersAll");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const inputFilter = document.querySelectorAll("input");

    allButton.addEventListener("click", function () {
      for (let i = 0; i < galleryItems.length; i++) {
        galleryItems[i].classList.remove("hide");
        galleryItems[i].parentNode.classList.remove("hide");
      }
      for (let i2 = 0; i2 < inputFilter.length; i2++) {
        inputFilter[i2].classList.remove("activeBtn");
      }
      allButton.classList.add("activeBtn");
    });
  }

  function openLightBox() {
    // Get the modal
    const lightBox = new bootstrap.Modal(
      document.getElementById("galleryLightbox")
    );
    const galleryItems = document.querySelectorAll(".gallery-item");
    const modalImg = document.querySelector(".lightboxImage");

    for (let i = 0; i < galleryItems.length; i++) {
      const img = galleryItems[i];

      img.onclick = function () {
        lightBox.show();
        modalImg.src = this.src;
        modalImg.alt = this.alt;
      };
    }
  }

  function activeImg() {
    const galleryItems = document.querySelectorAll(".gallery-item");
    const imagesCollection = [];
    for (let i = 0; i < galleryItems.length; i++) {
      const imgClass = galleryItems[i].classList;
      console.log(imgClass);
      if (imgClass.value !== "gallery-item img-fluid absolute hide") {
        imagesCollection.push(galleryItems[i]);
      }
    }
    console.log(imagesCollection);
    return imagesCollection;
  }

  function prevModalImg(imgCollection) {
    let modalImg = document.querySelector(".lightboxImage");
    const buttonPrev = document.querySelector(".mg-prev");

    buttonPrev.onclick = function () {
      imgCollection = activeImg();
      for (let i = 0; i < imgCollection.length; i++) {
        console.log(modalImg);
        console.log(imgCollection[i]);
        if (modalImg.src === imgCollection[i].src) {
          if (i === 0) {
            modalImg.src = imgCollection[imgCollection.length - 1].src;
            modalImg.alt = imgCollection[imgCollection.length - 1].alt;
            return;
          } else {
            index = imgCollection.indexOf(imgCollection[i]);
            modalImg.src = imgCollection[index - 1].src;
            modalImg.alt = imgCollection[index - 1].alt;
            console.log(modalImg);
          }
        }
      }
    };
  }

  function nextModalImg(imgCollection) {
    let modalImg = document.querySelector(".lightboxImage");
    const buttonNext = document.querySelector(".mg-next");

    buttonNext.onclick = function () {
      imgCollection = activeImg();
      for (let i = 0; i < imgCollection.length; i++) {
        console.log(modalImg);
        console.log(imgCollection[i]);
        if (modalImg.src === imgCollection[i].src) {
          if (i === imgCollection.length - 1) {
            modalImg.src = imgCollection[0].src;
            modalImg.alt = imgCollection[0].alt;
          } else {
            index = imgCollection.indexOf(imgCollection[i]);
            modalImg.src = imgCollection[index + 1].src;
            modalImg.alt = imgCollection[index + 1].alt;
            console.log(modalImg);
            return;
          }
        }
      }
    };
  }

  /*function buttonFilters(filters, projects) {
  const filtersId = filters.map((filters) => filters.id);

  for (let i = 0; i < filters.length; i++) {
    const buttonFilters = document.querySelector(".filters" + filtersId[i]);
    articleFilters(projects, buttonFilters);
  }
}

function articleFilters(projects, buttonFilters) {
  buttonFilters.addEventListener("click", function () {
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionGallery = document.querySelector(".gallery");
    // Suppression des fiches existantes
    sectionGallery.innerHTML = "";
    for (let i2 = 0; i2 < projects.length; i2++) {
      const categoryId = projects.map((projects) => projects.categoryId);
      const categoryCheck = categoryId[i2];*/
});
