let productPrice = 16500;  // 初期製品単価（クーポン適用前）
let discountedPrice = 15000;  // クーポン適用後の価格
let shippingFee = 0;  // 送料
let finalPrice = productPrice;  // 最終金額（初期は製品単価）

// 配送先の送料設定
function updateShippingFee() {
    const shippingInfo = document.getElementById('shipping-info').value;
    const priceElement = document.getElementById('price');
    const priceTextElement = document.getElementById('price-text');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const paypalButtonContainer = document.getElementById('paypal-button-container'); // ペイパルボタンコンテナ

    // 配送エリアごとの送料を設定
    if (shippingInfo === "東北") {
        shippingFee = 650;
    } else if (shippingInfo === "北海道") {
        shippingFee = 700;
    } else if (shippingInfo === "沖縄" || shippingInfo === "海外") {
        shippingFeeElement.textContent = "配送はできません。";
        priceTextElement.textContent = "購入手続きに進むことはできません。";
        paypalButtonContainer.style.display = 'none'; // 沖縄や海外の場合、決済ボタン非表示
        return;
    } else if (shippingInfo === "その他") {
        shippingFee = 550;
    } else {
        shippingFee = 0;  // 配送エリアが選ばれていない場合、送料はゼロ
    }

    // 最終的な価格を再計算
    finalPrice = (discountedPrice || productPrice) + shippingFee;  // クーポン適用後または適用前の製品金額
    shippingFeeElement.textContent = `送料: ¥${shippingFee}`;
    priceElement.textContent = finalPrice.toLocaleString();
    priceTextElement.textContent = `価格: ¥${finalPrice.toLocaleString()} (税込)`;

    // 配送エリアが選ばれたら決済ボタンを表示
    paypalButtonContainer.style.display = 'block';
}

// クーポン適用後に金額を更新する
function applyCoupon() {
    const correctCoupon = "DISCOUNT1500"; // 正しいクーポンコード
    const inputCode = document.getElementById("coupon-code").value;
    const priceElement = document.getElementById("price");
    const priceTextElement = document.getElementById("price-text");
    const messageElement = document.getElementById("coupon-message");

    // クーポンが正しい場合、製品価格を15000に設定
    if (inputCode === correctCoupon) {
        discountedPrice = 15000;  // クーポン適用後の価格（製品単価）
        messageElement.textContent = "クーポンが適用されました！";
        messageElement.style.color = "green";  // クーポンコードが正しい場合
    } else {
        discountedPrice = 16500;  // クーポンが無効なら元の価格
        messageElement.textContent = "クーポンコードが誤っています";
        messageElement.style.color = "red"; // クーポンコードが誤っている場合
    }

    // 最終的な価格を再計算
    finalPrice = discountedPrice + shippingFee;
    priceElement.textContent = finalPrice.toLocaleString();
    priceTextElement.textContent = `価格: ¥${finalPrice.toLocaleString()} (税込)`;

    // PayPal金額を更新
    updatePaypalAmount(finalPrice);
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
