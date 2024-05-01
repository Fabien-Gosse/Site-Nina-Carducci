/*
mauGallery = function (options) {
  var options = extend(mauGallery.defaults, options);
  var tagsCollection = [];
  return this.forEach(function () {
    mauGallery.methods.createRowWrapper(this);
    if (options.lightBox) {
      mauGallery.methods.createLightBox(
        this,
        options.lightboxId,
        options.navigation
      );
    }
    mauGallery.listeners(options);
    const galleryItem = document.querySelector(".gallery-item");

    this.children(galleryItem);
    this.forEach(function (index) {
      mauGallery.methods.responsiveImageItem(this);
      mauGallery.methods.moveItemInRowWrapper(this);
      mauGallery.methods.wrapItemInColumn(this, options.columns);
      var theTag = this.dataSet("gallery-tag");
      if (
        options.showTags &&
        theTag !== undefined &&
        tagsCollection.indexOf(theTag) === -1
      ) {
        tagsCollection.push(theTag);
      }
    });

    if (options.showTags) {
      mauGallery.methods.showItemTags(
        this,
        options.tagsPosition,
        tagsCollection
      );
    }

    this.fadeIn(500);
  });
};

mauGallery.defaults = {
  columns: 3,
  lightBox: true,
  lightboxId: null,
  showTags: true,
  tagsPosition: "bottom",
  navigation: true,
};

mauGallery.listeners = function (options) {
  const galleryItem = document.querySelector(".gallery-item");
  galleryItem.addEventListener(click, function () {
    if (options.lightBox && this.prop("tagName") === "IMG") {
      mauGallery.methods.openLightBox(this, options.lightboxId);
    } else {
      return;
    }
  });

  const gallery = document.querySelector(".gallery");
  const navLink = document.querySelector(".nav-link");
  const mgPrev = document.querySelector(".mg-prev");
  const mgNext = document.querySelector("mg-next");

  gallery.on("click", navLink, mauGallery.methods.filterByTag);
  gallery.on("click", mgPrev, () =>
    mauGallery.methods.prevImage(options.lightboxId)
  );
  gallery.on("click", mgNext, () =>
    $.fn.mauGallery.methods.nextImage(options.lightboxId)
  );
};
mauGallery.methods = {
  createRowWrapper(element) {
    if (!element.children().first().classList.contains("row")) {
      const divRow = document.createElement("div");
      divRow.classList.add("gallery-items-row row");
      element.appendChild(divRow);
    }
  },
  wrapItemInColumn(element, columns) {
    const wrapper = document.createElement("div");

    if (columns.constructor === Number) {
      // create wrapper container
      let columnClasses = `col-${Math.ceil(12 / columns)}`;

      wrapper.classList.add("item-column mb-4", columnClasses)

      // insert wrapper before element in the DOM tree
      element.parentNode.insertBefore(wrapper, element);

      // move element into wrapper
      wrapper.appendChild(element);
    } else if (columns.constructor === Object) {
      var columnClasses = "";
      if (columns.xs) {
        columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
      }
      if (columns.sm) {
        columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
      }
      if (columns.md) {
        columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
      }
      if (columns.lg) {
        columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
      }
      if (columns.xl) {
        columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
      }
      wrapper.classList.add("item-column mb-4", columnClasses)

      // insert wrapper before element in the DOM tree
      element.parentNode.insertBefore(wrapper, element);

      // move element into wrapper
      wrapper.appendChild(element);
    } else {
      console.error(
        `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
      );
    }
  },
  moveItemInRowWrapper(element) {
    galleryItemsRow = document.querySelectorAll(".gallery-items-row")
    galleryItemsRow.appendChild(element);
  },
  responsiveImageItem(element) {
    if (element.tagName === "IMG") {
      element.classList.add("img-fluid");
    }
  },
  openLightBox(element, lightboxId) {
    let lightBox = document.getElementById(`#${lightboxId}`)

    lightBox
      .document.querySelectorAll(".lightboxImage")
      .getAttribute("src", element.getAttribute("src"));
    lightBox.modal("toggle"); // a check
  },
  prevImage() {
    let activeImage = null;
    document.querySelectorAll("img.gallery-item").forEach(function () {
      lightBoxImage = document.querySelector(".lightboxImage")
      if (this.getAttribute("src") === lightBoxImage.getAttribute("src")) {
        activeImage = this;
      }
    });
    const tagsBar = document.querySelector(".tags-bar");
    const spanActiveTag = document.querySelector("span.active-tag");
    let activeTag = (tagsBar, spanActiveTag).dataset.images-toggle;
    let imagesCollection = [];

    if (activeTag === "all") {
      document.querySelectorAll(".item-column").forEach(function () {
        if (this.document.querySelectorAll("img").length) {
          imagesCollection.push(this.document.querySelectorAll("img"));
        }
      });
    } else {
      itemColumn.forEach(function () {
        if (this.document.querySelectorAll("img").dataset.gallery-tag === activeTag) {
          imagesCollection.push(this.document.querySelectorAll("img"));
        }
      });
    }
    let index = 0,
      next = null;

    imagesCollection.forEach(function (i) {
      if (activeImage.getAttribute("src") === this.getAttribute("src")) {
        index = i;
      }
    });
    next =
      imagesCollection[index - 1] ||
      imagesCollection[imagesCollection.length - 1];
      lightBoxImage.getAttribute("src", next.getAttribute("src"));
  },
  nextImage() {
    let activeImage = null;
    document.querySelectorAll("img.gallery-item").forEach(function () {
      lightBoxImage = document.querySelector(".lightboxImage")
      if (this.getAttribute("src") === lightBoxImage.getAttribute("src")) {
        activeImage = this;
      }
    });
    const tagsBar = document.querySelector(".tags-bar");
    const spanActiveTag = document.querySelector("span.active-tag");
    let activeTag = (tagsBar, spanActiveTag).dataset.images-toggle;
    let imagesCollection = [];

    if (activeTag === "all") {
      document.querySelectorAll(".item-column").forEach(function () {
        if (this.document.querySelectorAll("img").length) {
          imagesCollection.push(this.document.querySelectorAll("img"));
        }
      });
    } else {
      itemColumn.forEach(function () {
        if (this.document.querySelectorAll("img").dataset.gallery-tag === activeTag) {
          imagesCollection.push(this.document.querySelectorAll("img"));
        }
      });
    }
    let index = 0,
      next = null;

      imagesCollection.forEach(function (i) {
        if (activeImage.getAttribute("src") === this.getAttribute("src")) {
          index = i;
        }
    });
    next = imagesCollection[index + 1] || imagesCollection[0];
    lightBoxImage.getAttribute("src", next.getAttribute("src"));
  },
  createLightBox(gallery, lightboxId, navigation) {
    const modalLightBox = document.createElement("article");
    const modalDialog = document.createElement("div");
    const modalContent = document.createElement("div");
    const modalBody = document.createElement("div");
    const modalImg = document.createElement("img");
    const mgPrev = document.createElement("div");
    const spanPrev = document.createElement("span");
    const mgNext = document.createElement("div");
    const spanNext = document.createElement("span");

    modalLightBox.classList.add("modal fade");
    modalLightBox.id = "galleryLightbox";
    modalLightBox.tabIndex = "-1";
    modalLightBox.role = "dialog";
    modalLightBox.ariaHidden = "true";
    modalDialog.classList.add("modal-dialog");
    modalDialog.role = "document";
    modalContent.classList.add("modal-content");
    modalBody.classList.add("modal-body");
    modalImg.classList.add("lightboxImage img-fluid");
    modalImg.alt = "Contenu de l'image affichée dans la modale au clique";
    mgPrev.classList.add("mg-prev");
    mgPrev.style.cursor = "pointer";
    mgPrev.style.position = "absolute";
    mgPrev.style.top = "50%";
    mgPrev.style.left = "-15px";
    mgPrev.style.background = "white";
    spanPrev.style.display = "none";
    mgNext.classList.add("mg-prev");
    mgNext.style.cursor = "pointer";
    mgNext.style.position = "absolute";
    mgNext.style.top = "50%";
    mgNext.style.right = "-15px";
    mgNext.style.background = "white";
    spanNext.style.display = "none";

    modalLightBox.appendChild(modalDialog);
    modalDialog.appendChild(modalContent);
    modalContent.appendChild(modalBody)
    modalBody.appendChild(modalImg);
    modalBody.appendChild(mgPrev);
    modalBody.appendChild(mgNext);
    mgPrev.appendChild(spanPrev);
    mgNext.appendChild(spanNext);
  },
  showItemTags(gallery, position, tags) {
    var tagItems = document.createElement("li");
    const tagsRow = document.createElement("ul");
    const spanTagItems = document.createElement("span");

    tagItems.classList.add("nav-item");
    spanTagItems.classList.add("nav-link active active-tag")
    spanTagItems.data-images-toggle = "all";
    spanTagItems.innerText = "All";

    forEach(tags, function (index, value) {
      tagItems.classList.add("active");
      spanTagItems.classList.remove("active active-tag")
      spanTagItems.data-images-toggle = value;
      spanTagItems.innerText = value;
    });
    tagsRow.classList.add("my-4 tags-bar nav nav-pills")
    tagsRow.innerText = tagItems;

    if (position === "bottom") {
      gallery.appendChild(tagsRow);
    } else if (position === "top") {
      gallery.insertBefore(tagsRow, gallery.firstChild);
    } else {
      console.error(`Unknown tags position: ${position}`);
    }
  },
  filterByTag() {
    const activeTag = document.querySelectorAll(".active-tag");
    const imagesToggle = document.querySelectorAll(".images-toggle");
    const galleryItem = document.querySelectorAll(".gallery-item");
    const itemColumn = document.querySelector(".itemColumn");
    if (this.classList.contains("active-tag")) {
      return;
    }
    activeTag.removeClass("active active-tag");
    this.classList.add("active active-tag");

    var tag = this.dataset(imagesToggle);

    galleryItem.forEach(function () {
      this.parents(itemColumn).style.display = none;
      if (tag === "all") {
        this.parents(itemColumn).style.transitionDelay = "300ms";
        this.parents(itemColumn).style.display = block;
      } else if ($(this).data("gallery-tag") === tag) {
        this.parents(itemColumn).style.transitionDelay = "300ms";
        this.parents(itemColumn).style.display = block;
      }
    });
  },
}
*/

//
//
//
(function ($) {
  $.fn.mauGallery = function (options) {
    var options = $.extend($.fn.mauGallery.defaults, options);
    var tagsCollection = [];
    return this.each(function () {
      $.fn.mauGallery.methods.createRowWrapper($(this));
      if (options.lightBox) {
        $.fn.mauGallery.methods.createLightBox(
          $(this),
          options.lightboxId,
          options.navigation
        );
      }
      $.fn.mauGallery.listeners(options);

      $(this)
        .children(".gallery-item")
        .each(function (index) {
          $.fn.mauGallery.methods.responsiveImageItem($(this));
          $.fn.mauGallery.methods.moveItemInRowWrapper($(this));
          $.fn.mauGallery.methods.wrapItemInColumn($(this), options.columns);
          var theTag = $(this).data("gallery-tag");
          if (
            options.showTags &&
            theTag !== undefined &&
            tagsCollection.indexOf(theTag) === -1
          ) {
            tagsCollection.push(theTag);
          }
        });

      if (options.showTags) {
        $.fn.mauGallery.methods.showItemTags(
          $(this),
          options.tagsPosition,
          tagsCollection
        );
      }

      $(this).fadeIn(500);
    });
  };
  $.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: "bottom",
    navigation: true,
  };
  $.fn.mauGallery.listeners = function (options) {
    $(".gallery-item").on("click", function () {
      if (options.lightBox && $(this).prop("tagName") === "IMG") {
        $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
      } else {
        return;
      }
    });

    $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
    $(".gallery").on("click", ".mg-prev", () =>
      $.fn.mauGallery.methods.prevImage(options.lightboxId)
    );
    $(".gallery").on("click", ".mg-next", () =>
      $.fn.mauGallery.methods.nextImage(options.lightboxId)
    );
  };
  $.fn.mauGallery.methods = {
    createRowWrapper(element) {
      if (!element.children().first().hasClass("row")) {
        element.append('<div class="gallery-items-row row"></div>');
      }
    },
    wrapItemInColumn(element, columns) {
      if (columns.constructor === Number) {
        element.wrap(
          `<div class='item-column mb-4 col-${Math.ceil(12 / columns)}'></div>`
        );
      } else if (columns.constructor === Object) {
        var columnClasses = "";
        if (columns.xs) {
          columnClasses += ` col-${Math.ceil(12 / columns.xs)}`;
        }
        if (columns.sm) {
          columnClasses += ` col-sm-${Math.ceil(12 / columns.sm)}`;
        }
        if (columns.md) {
          columnClasses += ` col-md-${Math.ceil(12 / columns.md)}`;
        }
        if (columns.lg) {
          columnClasses += ` col-lg-${Math.ceil(12 / columns.lg)}`;
        }
        if (columns.xl) {
          columnClasses += ` col-xl-${Math.ceil(12 / columns.xl)}`;
        }
        element.wrap(`<div class='item-column mb-4${columnClasses}'></div>`);
      } else {
        console.error(
          `Columns should be defined as numbers or objects. ${typeof columns} is not supported.`
        );
      }
    },
    moveItemInRowWrapper(element) {
      element.appendTo(".gallery-items-row");
    },
    responsiveImageItem(element) {
      if (element.prop("tagName") === "IMG") {
        element.addClass("img-fluid");
      }
    },
    openLightBox(element, lightboxId) {
      $(`#${lightboxId}`)
        .find(".lightboxImage")
        .attr("src", element.attr("src"));
      $(`#${lightboxId}`).modal("toggle");
    },
    prevImage() {
      let activeImage = null;
      $("img.gallery-item").each(function () {
        if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
          activeImage = $(this);
        }
      });
      let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];
      if (activeTag === "all") {
        $(".item-column").each(function () {
          if ($(this).children("img").length) {
            imagesCollection.push($(this).children("img"));
          }
        });
      } else {
        $(".item-column").each(function () {
          if ($(this).children("img").data("gallery-tag") === activeTag) {
            imagesCollection.push($(this).children("img"));
          }
        });
      }
      let index = 0,
        next = null;

      $(imagesCollection).each(function (i) {
        if ($(activeImage).attr("src") === $(this).attr("src")) {
          index = i;
        }
      });
      next =
        imagesCollection[index - 1] ||
        imagesCollection[imagesCollection.length - 1];
      $(".lightboxImage").attr("src", $(next).attr("src"));
    },
    nextImage() {
      let activeImage = null;
      $("img.gallery-item").each(function () {
        if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
          activeImage = $(this);
        }
      });
      let activeTag = $(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];
      if (activeTag === "all") {
        $(".item-column").each(function () {
          if ($(this).children("img").length) {
            imagesCollection.push($(this).children("img"));
          }
        });
      } else {
        $(".item-column").each(function () {
          if ($(this).children("img").data("gallery-tag") === activeTag) {
            imagesCollection.push($(this).children("img"));
          }
        });
      }
      let index = 0,
        next = null;

      $(imagesCollection).each(function (i) {
        if ($(activeImage).attr("src") === $(this).attr("src")) {
          index = i;
        }
      });
      next = imagesCollection[index + 1] || imagesCollection[0];
      $(".lightboxImage").attr("src", $(next).attr("src"));
    },
    createLightBox(gallery, lightboxId, navigation) {
      gallery.append(`<div class="modal fade" id="${
        lightboxId ? lightboxId : "galleryLightbox"
      }" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${
                              navigation
                                ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                                : '<span style="display:none;" />'
                            }
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                            ${
                              navigation
                                ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                                : '<span style="display:none;" />'
                            }
                        </div>
                    </div>
                </div>
            </div>`);
    },
    showItemTags(gallery, position, tags) {
      var tagItems =
        '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">All</span></li>';
      $.each(tags, function (index, value) {
        tagItems += `<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${value}">${value}</span></li>`;
      });
      var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;

      if (position === "bottom") {
        gallery.append(tagsRow);
      } else if (position === "top") {
        gallery.prepend(tagsRow);
      } else {
        console.error(`Unknown tags position: ${position}`);
      }
    },
    filterByTag() {
      if ($(this).hasClass("active-tag")) {
        return;
      }
      $(".active-tag").removeClass("active active-tag");
      $(this).addClass("active active-tag");

      var tag = $(this).data("images-toggle");

      $(".gallery-item").each(function () {
        $(this).parents(".item-column").hide();
        if (tag === "all") {
          $(this).parents(".item-column").show(300);
        } else if ($(this).data("gallery-tag") === tag) {
          $(this).parents(".item-column").show(300);
        }
      });
    },
  };
})(jQuery);
