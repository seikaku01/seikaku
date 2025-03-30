let finalPrice = 0;  // 最終金額（初期値は0）
let discountAmount = 0;  // クーポン割引額
let productPrice = 16500; // 製品単価（16,500円）

// 配送先の金額を設定（ベタ打ち）
function updateShippingFee() {
    const shippingInfo = document.getElementById('shipping-info').value;
    const priceElement = document.getElementById('price');
    const priceTextElement = document.getElementById('price-text');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const inquiryElement = document.getElementById('inquiry-message');
    const paypalButtonContainer = document.getElementById('paypal-button-container'); // PayPalボタンコンテナ

    // 配送先によって金額をベタ打ちで設定
    if (shippingInfo === "東北") {
        finalPrice = 17150;  // 16,500 + 650
    } else if (shippingInfo === "北海道") {
        finalPrice = 17200;  // 16,500 + 700
    } else if (shippingInfo === "その他") {
        finalPrice = 17050;  // 16,500 + 550
    } else if (shippingInfo === "沖縄" || shippingInfo === "海外") {
        shippingFeeElement.textContent = "配送はできません。";
        priceTextElement.textContent = "購入手続きに進むことはできません。";
        inquiryElement.style.display = "block"; // お問い合わせフォームを表示
        paypalButtonContainer.style.display = "none"; // PayPalボタンを非表示
        return;  // 沖縄や海外の場合は決済不可
    } else {
        finalPrice = 16500;  // 送料が選択されていない場合、基本価格
    }

    // クーポンが適用されている場合、1,500円割引
    finalPrice -= discountAmount;

    // 最終金額を表示
    priceElement.textContent = finalPrice.toLocaleString();
    priceTextElement.textContent = `価格: ¥${finalPrice.toLocaleString()} (税込)`;

    // 送料表示（送料は配送先に応じて異なる）
    shippingFeeElement.textContent = `送料: ¥${finalPrice - 16500}`;

    // PayPalボタンを表示
    paypalButtonContainer.style.display = "block"; // PayPalボタンを表示
    updatePaypalAmount(finalPrice); // PayPal金額を更新
}

// クーポン適用後に金額を更新する
function applyCoupon() {
    const correctCoupon = "DISCOUNT1500"; // 正しいクーポンコード
    const inputCode = document.getElementById("coupon-code").value;
    const messageElement = document.getElementById("coupon-message");

    // クーポンが正しい場合、割引額を設定
    if (inputCode === correctCoupon) {
        discountAmount = 1500;  // クーポン適用後の割引額
        messageElement.textContent = "クーポンが適用されました！";
        messageElement.style.color = "green";  // クーポンコードが正しい場合
    } else {
        discountAmount = 0;  // クーポンが無効なら割引額はゼロ
        messageElement.textContent = "クーポンコードが誤っています";
        messageElement.style.color = "red"; // クーポンコードが誤っている場合
    }

    // 配送先エリアが選択されている場合、最終金額を再計算
    updateShippingFee();
}

// PayPalの金額を更新する
function updatePaypalAmount(newAmount) {
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
                        value: newAmount.toString() // 新しい金額を設定
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('取引が完了しました。ありがとうございます ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container'); // PayPalボタンを1回だけ表示
}
