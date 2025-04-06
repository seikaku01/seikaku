// クーポンコード入力時の処理
function checkEnter(event) {
    if (event.key === "Enter") {
        applyCoupon(); // Enterキーが押された時にapplyCoupon()を呼び出す
    }
  }
  
  // クーポンコードを適用する関数
  function applyCoupon() {
    const correctCoupon = "DISCOUNT1500"; // 正しいクーポンコード
    const inputCode = document.getElementById("coupon-code").value;
    const priceElement = document.getElementById("price");
    const priceTextElement = document.getElementById("price-text");
    const messageElement = document.getElementById("coupon-message");
  
    if (inputCode === correctCoupon) {
        priceElement.textContent = "15,000"; // クーポン適用後の価格
        priceTextElement.textContent = "価格: ¥15,000 (税込)"; // ペイパルの表示も更新
        messageElement.textContent = "クーポンが適用されました！";
        messageElement.style.color = "green"; // 正しいクーポンコードが入力された場合
  
        // PayPalボタンの金額を変更
        updatePaypalAmount("15,000"); // PayPalの金額を15000円に更新
    } else {
        messageElement.textContent = "クーポンコードが誤っています";
        messageElement.style.color = "red"; // 誤ったクーポンコードが入力された場合
    }
  }
  
  // PayPalの金額を更新する関数
  function updatePaypalAmount(newAmount) {
    // ペイパルボタンがすでにある場合は新たにボタンを再描画しないように削除
    const existingButton = document.getElementById('paypal-button-container');
    if (existingButton) {
        existingButton.innerHTML = '';  // すでに表示されているボタンを削除
    }
  
    // 1回だけペイパルボタンを初期化して表示
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: newAmount // 新しい金額に変更
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('取引が完了しました。ありがとうございます ' + details.payer.name.given_name + '!');
            });
        }
    }).render('#paypal-button-container'); // ペイパルボタンを1回だけ表示
  }
  
