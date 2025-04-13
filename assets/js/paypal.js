window.onload = function () {
    // 初期表示は通常価格のHosted Button
    paypal.HostedButtons({
      hostedButtonId: "VAUMG9SWYY592" // ← 通常価格のボタンID
    }).render("#paypal-button-container");
  };
  
  function applyCoupon() {
    const code = document.getElementById("coupon-code").value.trim();
    const message = document.getElementById("coupon-message");
    const priceDisplay = document.getElementById("price-display");
    const container = document.getElementById("paypal-button-container");
  
    // PayPalボタンの中身を一度クリア（ボタンの入れ替え準備）
    container.innerHTML = "";
  
    if (code === "DISCOUNT1500") {
      message.textContent = "クーポンコードが適用されました！¥1500引きです。";
      message.style.color = "green";
      priceDisplay.textContent = "¥15,000";
  
      // クーポン適用後のHosted Buttonを表示
      paypal.HostedButtons({
        hostedButtonId: "AN78AN3WTRU2W" // ← 割引価格のボタンID
      }).render("#paypal-button-container");
  
    } else {
      message.textContent = "無効なクーポンコードです。";
      message.style.color = "red";
      priceDisplay.textContent = "¥16,500";
  
      // 通常価格のボタンに戻す
      paypal.HostedButtons({
        hostedButtonId: "VAUMG9SWYY592"
      }).render("#paypal-button-container");
    }
  }
  
