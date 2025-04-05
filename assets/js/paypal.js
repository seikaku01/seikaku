let finalPrice = 16500; // 製品単価（初期は16500円）
let discountAmount = 0; // 割引額（初期は0）
let shippingFee = 0; // 送料（初期は0）

// 配送先による送料の設定
function updateShippingFee() {
    const shippingInfo = document.getElementById('shipping-info').value;
    const priceElement = document.getElementById('total-price');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const priceTextElement = document.getElementById('price-text');
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    const inquiryMessage = document.getElementById('inquiry-message');
    
    // 配送先によって金額を設定
    if (shippingInfo === "本州四国九州") {
        shippingFee = 500; // 本州・四国・九州の場合の送料
        finalPrice = 16500 + shippingFee;
    } else if (shippingInfo === "東北") {
        shippingFee = 650;
        finalPrice = 16500 + shippingFee;
    } else if (shippingInfo === "北海道") {
        shippingFee = 700;
        finalPrice = 16500 + shippingFee;
    } else if (shippingInfo === "その他") {
        shippingFee = 550;
        finalPrice = 16500 + shippingFee;
    } else if (shippingInfo === "沖縄" || shippingInfo === "離島" || shippingInfo === "海外") {
        shippingFeeElement.textContent = "配送はできません。";
        inquiryMessage.style.display = "block"; // お問い合わせフォームを表示
        paypalButtonContainer.style.display = "none"; // PayPalボタンを非表示
        return;  // 配送不可の場合は何も処理しない
    } else {
        shippingFee = 0;  // 配送先が選ばれていない場合、送料を0にする
        finalPrice = 16500;
    }

    // クーポンが適用されている場合、1500円割引
    finalPrice -= discountAmount;

    // 最終金額を更新
    priceElement.textContent = finalPrice.toLocaleString();
    priceTextElement.textContent = `価格: ¥${finalPrice.toLocaleString()} (税込)`;
    shippingFeeElement.textContent = `送料: ¥${shippingFee}`;

    // PayPalボタンを表示
    if (shippingInfo !== "沖縄" && shippingInfo !== "離島" && shippingInfo !== "海外") {
        paypalButtonContainer.style.display = "block"; // 配送先が選択された後に決済ボタンを表示
    }

    updatePaypalAmount(finalPrice); // PayPal金額を更新
}

// クーポンコードの処理
function applyCoupon() {
    const correctCoupon = "DISCOUNT1500"; // クーポンコード
    const inputCode = document.getElementById("coupon-code").value;
    const messageElement = document.getElementById("coupon-message");

    if (inputCode === correctCoupon) {
        discountAmount = 1500; // クーポン適用
        messageElement.textContent = "クーポンが適用されました！";
        messageElement.style.color = "green";  // クーポンが正しい場合
    } else {
        discountAmount = 0;  // クーポンが無効の場合
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
        existingButton.innerHTML = ''; // 既存のボタンを削除
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
