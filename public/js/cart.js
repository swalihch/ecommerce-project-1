// document.querySelectorAll(".add-to-cart-btn").forEach((button) => {

//   button.addEventListener("click", async function (event) {

//     event.preventDefault();

//     const productId = this.dataset.id;

//     const quantityInput = this.parentElement.querySelector("input[name='quantity']");
//     const quantity = quantityInput ? quantityInput.value : 1;

//     const response = await fetch(`/add-to-cart/${productId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ quantity }),
//     });

//     const data = await response.json();

//     // ❗ Show toast if error
//     if (data.error) {

//       const toastMessage = document.getElementById("toastMessage");
//       toastMessage.innerText = data.error;

//       const toastElement = document.getElementById("cartToast");
//       const toast = new bootstrap.Toast(toastElement);

//       toast.show();

//       return;
//     }

//     const badge = document.getElementById("cart-count");

//     if (badge) {
//       badge.innerText = data.cartCount;
//       badge.dataset.count = data.cartCount;
//     }

//   });

// });

document.addEventListener("DOMContentLoaded", () => {
  // ✅ ADD TO CART
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", async function (event) {
      event.preventDefault();

      const productId = this.dataset.id;

      const form = this.closest("form");
      const quantityInput = form.querySelector("input[name='quantity']");
      const quantity = quantityInput ? quantityInput.value : 1;

      try {
        const response = await fetch(`/add-to-cart/${productId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ quantity }),
        });

        const data = await response.json();

        if (data.error) {
          showToast(data.error, "danger");
          return;
        }

        const badge = document.getElementById("cart-count");

        if (badge) {
          badge.innerText = data.cartCount;
          badge.dataset.count = data.cartCount;
        }

        showToast("Added to cart!", "success");
      } catch (err) {
        console.error(err);
      }
    });
  });

  // ✅ REMOVE FROM CART
  document.querySelectorAll(".remove-from-cart-btn").forEach((btn) => {
    btn.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();

      const productId = this.dataset.id;

      try {
        const response = await fetch(`/remove-from-cart/${productId}`, {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
        });

        const data = await response.json();

        if (data.error) {
          showToast(data.error, "danger");
          return;
        }

        // remove row from UI
        // remove row from UI
        const row = this.closest("tr");
        if (row) row.remove();

        // update cart count
        const badge = document.getElementById("cart-count");
        if (badge) {
          badge.innerText = data.cartCount;
        }

        // ✅ UPDATE TOTAL
        if (data.total !== undefined) {
          const totalElement = document.getElementById("cart-total");
          if (totalElement) {
            totalElement.innerText = data.total;
          }
        }

        showToast("Item removed", "success");

        // reload if empty
        if (data.cartCount === 0) {
          location.reload();
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
});

// INCREASE QUANTITY
document.querySelectorAll(".increase-btn").forEach((btn) => {
  btn.addEventListener("click", async function () {
    const productId = this.dataset.id;
    const row = this.closest("tr");

    const quantityText = row.querySelector(".quantity-text");
    let currentQty = parseInt(quantityText.innerText);

    const newQty = currentQty + 1;

    const response = await fetch(`/update-cart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    const data = await response.json();

    if (data.error) {
      showToast(data.error, "danger");
      return;
    }

    quantityText.innerText = data.newQuantity;

    const badge = document.getElementById("cart-count");
    if (badge) badge.innerText = data.cartCount;
  });
});

// DECREASE QUANTITY
document.querySelectorAll(".decrease-btn").forEach((btn) => {
  btn.addEventListener("click", async function () {
    const productId = this.dataset.id;
    const row = this.closest("tr");

    const quantityText = row.querySelector(".quantity-text");
    let currentQty = parseInt(quantityText.innerText);

    const newQty = currentQty - 1;

    const response = await fetch(`/update-cart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    const data = await response.json();

    if (data.error) {
      showToast(data.error, "danger");
      return;
    }

    // if removed (qty = 0)
    if (newQty <= 0) {
      row.remove();
    } else {
      quantityText.innerText = data.newQuantity;
    }

    const badge = document.getElementById("cart-count");
    if (badge) badge.innerText = data.cartCount;

    if (data.cartCount === 0) {
      location.reload();
    }
  });
});

// ✅ TOAST FUNCTION (GLOBAL)
function showToast(message, type = "success") {
  const toastMessage = document.getElementById("toastMessage");
  const toastElement = document.getElementById("cartToast");

  if (!toastElement || !toastMessage) return;

  toastElement.classList.remove("text-bg-success", "text-bg-danger");

  if (type === "danger") {
    toastElement.classList.add("text-bg-danger");
  } else {
    toastElement.classList.add("text-bg-success");
  }

  toastMessage.innerText = message;

  const toast = new bootstrap.Toast(toastElement);
  toast.show();
}

/* CHANGED */

function openCheckoutModal() {
  const modal = new bootstrap.Modal(document.getElementById("checkoutModal"));
  modal.show();
}

document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmOrderBtn");

  if (confirmBtn) {
    confirmBtn.addEventListener("click", function () {
      this.innerHTML = `
  <span class="spinner-border spinner-border-sm"></span>
  Processing...
`;
      this.disabled = true;

      setTimeout(() => {
        window.location.href = "/checkout";
      }, 1000);
    });
  }
});
