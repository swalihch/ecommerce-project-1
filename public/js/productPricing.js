document.addEventListener("DOMContentLoaded", function () {
      let cards = document.querySelectorAll(".card[data-price]");
      
      cards.forEach((card)=>{
        let originalPrice = Number(card.dataset.price);
        let discount = Number(card.dataset.discount);

        if(isNaN(originalPrice) || isNaN(discount)) return;
        
        let originalEl = card.querySelector(".originalPrice");
        let finalEl = card.querySelector(".finalPrice");
        let discountEl = card.querySelector(".discount-badge");
        let saveTextEl = card.querySelector(".saveText");

        if(!originalEl || !finalEl || !discountEl ||!saveTextEl) return;

        if(discount<=0){
          finalEl.innerHTML = "₹ " + originalPrice.toFixed(2);
          saveTextEl.style.display = "none";
          discountEl.style.display = "none";
          originalEl.style.display ="none";
          return;
        }
        let finalPrice = originalPrice-(originalPrice*discount/100);
        let savedAmount = originalPrice - finalPrice;

        originalEl.innerHTML = "₹ " + originalPrice.toFixed(2);
        finalEl.innerHTML = "₹ "+ finalPrice.toFixed(2);
        discountEl.innerHTML = discount + "% OFF";
        saveTextEl.innerHTML = "you save ₹ "+savedAmount.toFixed(2);
        
      })
      
    });