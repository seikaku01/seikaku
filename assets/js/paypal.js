// ペイパルボタンをレンダリング
function renderPaypalButton(finalPrice) {
    const paypalButtonContainer = document.getElementById('paypal-button-container');
    if (document.getElementById('shipping-info').value !== "沖縄" && document.getElementById('shipping-info').value !== "海外") {
        paypalButtonContainer.style.display = "block"; // 配送エリアが沖縄・海外以外ならボタンを表示
    } else {
        paypalButtonContainer.style.display = "none"; // 沖縄・海外の場合は非表示
    }

    // 既存のPayPalボタンを削除して新しいボタンを追加
    paypalButtonContainer.innerHTML = '';

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: finalPrice.toString() // 新しい金額を設定
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('取引が完了しました。ありがとうございます ' + details.payer.name.given_name);
            });
        }
    }).render('#paypal-button-container');
}
