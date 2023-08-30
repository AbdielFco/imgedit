document.addEventListener("DOMContentLoaded", function() {
    const imageInput = document.getElementById("imageInput");
    const editedImage = document.getElementById("editedImage");
    const filterSliders = document.querySelectorAll(".filter-slider");
    const saveImageButton = document.getElementById("saveImage");

    let currentImage = null;

    imageInput.addEventListener("change", function(e) {
      const file = e.target.files[0];
      currentImage = URL.createObjectURL(file);
      editedImage.src = currentImage;
    });

    filterSliders.forEach(slider => {
      slider.addEventListener("input", applyFilters);
    });

    saveImageButton.addEventListener("click", function() {
      if (currentImage) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = editedImage.width;
        canvas.height = editedImage.height;
        ctx.filter = editedImage.style.filter;
        ctx.drawImage(editedImage, 0, 0, canvas.width, canvas.height);

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/jpeg");
        link.download = "edited_image.jpg";
        link.click();
      }
    });

    function applyFilters() {
      if (currentImage) {
        let filters = "";
        filterSliders.forEach(slider => {
          const filterName = slider.id;
          const filterValue = slider.value;
          filters += `${filterName}(${filterValue}${filterName === "temperature" ? "%" : ""}) `;
        });

        editedImage.style.filter = filters;
      }
    }
});
