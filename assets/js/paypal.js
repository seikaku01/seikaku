let productPrice = 16500; // 製品単価（16,500円）
let shippingFee = 0; // 初期送料
let finalPrice = productPrice; // 初期合計金額

let discountAmount = 0; // 割引額（クーポン）

function updateShippingFee() {
    const shippingInfo = document.getElementById('shipping-info').value;
    const shippingFeeElement = document.getElementById('shipping-fee');
    const totalPriceElement = document.getElementById('total-price');
    const inquiryElement = document.getElementById('inquiry-message');
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    // 配送先によって送料を設定
    if (shippingInfo === "東北") {
        shippingFee = 650; // 東北の場合
    } else if (shippingInfo === "北海道") {
        shippingFee = 700; // 北海道の場合
    } else if (shippingInfo === "その他") {
        shippingFee = 550; // その他の場合
    } else if (shippingInfo === "沖縄" || shippingInfo === "海外") {
        shippingFeeElement.textContent = "配送はできません。";
        totalPriceElement.textContent = "購入手続きに進むことはできません。";
        inquiryElement.style.display = "block"; // お問い合わせフォームを表示
        paypalButtonContainer.style.display = "none"; // ペイパルボタンを非表示
        return;  // 沖縄や海外の場合は処理終了
    } else {
        shippingFee = 0; // 配送先が選ばれていない場合、送料はゼロ
    }

    // クーポンが適用されている場合、1,500円割引
    finalPrice = productPrice + shippingFee - discountAmount;

    // 送料と合計金額を表示
    shippingFeeElement.textContent = `¥${shippingFee}`;
    totalPriceElement.textContent = `¥${finalPrice}`;

    updatePaypalAmount(finalPrice); // PayPal金額を更新
    paypalButtonContainer.style.display = "block"; // 配送先が選ばれていればペイパルボタンを表示
}

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
                        value: newAmount.toString() // 新しい金額に変更
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
