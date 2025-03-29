// ペイパルボタンの初期化と表示を1回だけ行う
let paypalButtonRendered = false;


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

        // 価格を更新
        updatePaypalAmount("15000");
    } else {
        messageElement.textContent = "クーポンコードが誤っています";
        messageElement.style.color = "red"; // 誤ったクーポンコードが入力された場合
    }
}

// PayPalの金額を更新する関数
function updatePaypalAmount(newAmount) {
    const existingButton = document.getElementById('paypal-button-container');
    if (existingButton) {
        existingButton.innerHTML = ''; // ボタンを削除
    }

    // ペイパルボタンを再描画
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: newAmount // 新しい金額を設定
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert('取引が完了しました。ありがとうございます ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');
}

// 配送先情報を取得し、PayPal決済に追加
function updateShippingFee() {
    const shippingInfo = document.getElementById('shipping-info').value;
    const priceElement = document.getElementById('price');
    const priceTextElement = document.getElementById('price-text');
    const shippingFeeElement = document.getElementById('shipping-fee');
    const shippingErrorElement = document.getElementById('shipping-error');
    const paypalButtonContainer = document.getElementById('paypal-button-container');

    let shippingFee = 0;
    let totalPrice = 16500; // 初期価格（税抜き）

    // 送料設定
    if (shippingInfo === "東北") {
        shippingFee = 650;
    } else if (shippingInfo === "北海道") {
        shippingFee = 700;
    } else if (shippingInfo === "沖縄" || shippingInfo === "海外") {
        shippingFeeElement.textContent = "配送はできません。お問い合わせフォームにてご確認ください。";
        priceTextElement.textContent = "購入手続きに進むことはできません。";
        shippingErrorElement.textContent = "指定されたエリアは別途送料がかかるため、お問い合わせをしてください。";
        shippingFeeElement.innerHTML += '<br><a href="https://docs.google.com/forms/d/1VQV09aAstmCxjR7aLlYc8M_Ea5KYn0tc9U9eQxD2JNc/edit" target="_blank">こちらからお問い合わせください</a>';
        paypalButtonContainer.style.display = "none";  // 沖縄、海外の場合は決済ボタンを非表示
        return; // 沖縄や海外には決済を進めない
    } else if (shippingInfo === "その他") {
        shippingFee = 550;
    } else {
        shippingErrorElement.textContent = ""; // エラーメッセージを消去
        paypalButtonContainer.style.display = "none";  // 配送エリアが選択されていない場合は決済ボタンを非表示
        return;
    }

    // 最終的な価格を表示
    const finalPrice = totalPrice + shippingFee;
    shippingFeeElement.textContent = `送料: ¥${shippingFee}`;
    priceElement.textContent = finalPrice.toLocaleString();
    priceTextElement.textContent = `価格: ¥${finalPrice.toLocaleString()} (税込)`;

    // PayPalの金額を更新
    updatePaypalAmount(finalPrice.toString());

    // 沖縄、海外以外の場合にペイパルボタンを表示
    if (shippingInfo !== "沖縄" && shippingInfo !== "海外" && shippingInfo !== "") {
        paypalButtonContainer.style.display = "block"; // ペイパルボタンを表示
    }
}

// ペイパルボタンを初期化して表示する
paypal.Buttons({
    createOrder: function (data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '16500' // 初期価格 (税込み)
                }
            }]
        });
    },
    onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
            alert('取引が完了しました。ありがとうございます ' + details.payer.name.given_name);
        });
    }
}).render('#paypal-button-container');  // 初期化時のボタンを表示
