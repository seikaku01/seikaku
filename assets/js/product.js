// 配送先による送料の設定
function updateShippingFee() {
    const shippingInfo = document.getElementById('shipping-info').value;
    const priceElement = document.getElementById('total-price');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const priceTextElement = document.getElementById('price-text');
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    
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
