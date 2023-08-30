document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("imageInput");
    const editedImage = document.getElementById("editedImage");
    const filterSliders = document.querySelectorAll(".filter-slider");
    const applyFiltersButton = document.getElementById("applyFilters");
    const saveImageButton = document.getElementById("saveImage");

    let currentImage = null;

    imageInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        currentImage = URL.createObjectURL(file);
        editedImage.src = currentImage;
      } else {
        alert("Invalid file format. Please select a valid image (JPEG or PNG).");
      }
    });

    applyFiltersButton.addEventListener("click", applyFilters);

    filterSliders.forEach(slider => {
      slider.addEventListener("input", function() {
        applyFilters();
      });
    });

    saveImageButton.addEventListener("click", function() {
      if (currentImage) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = editedImage.naturalWidth;
        canvas.height = editedImage.naturalHeight;
        ctx.filter = getFilterValue();
        ctx.drawImage(editedImage, 0, 0, canvas.width, canvas.height);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "edited_image.jpg";
        link.click();
      }
    });

    function applyFilters() {
      if (currentImage) {
        const filterValue = getFilterValue();
        editedImage.style.filter = filterValue;
      }
    }

    function getFilterValue() {
      let filters = "";
      filterSliders.forEach(slider => {
        const filterName = slider.id;
        const filterValue = slider.value;
        filters += `${filterName}(${filterValue}${filterName === "temperature" ? "%" : ""}) `;
      });
      return filters;
    }
});
