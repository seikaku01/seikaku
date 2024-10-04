// サムネイル1に対応する画像リスト
const imagesSet1 = [
    'assets/images/lookbook/18.png',
    'assets/images/lookbook/19.png',
    'assets/images/lookbook/目次.jpg.png',
    'assets/images/lookbook/21.png',
    'assets/images/lookbook/22.png',
    'assets/images/lookbook/23.png',
    'assets/images/lookbook/24.png',
    'assets/images/lookbook/25.png',
    'assets/images/lookbook/26.png',
    'assets/images/lookbook/27.png',
    'assets/images/lookbook/28.png',
    'assets/images/lookbook/改訂版.png',
    'assets/images/lookbook/会社概要ページ.png',
    'assets/images/lookbook/32.png'
];

// サムネイル2に対応する画像リスト
const imagesSet2 = [
    'assets/images/lookbook/5.jpg',
    'assets/images/lookbook/6.jpg',
    'assets/images/lookbook/7.jpg'
];

let currentImages = []; // 現在表示中の画像リスト
let currentIndex = 0;   // 現在表示中の画像のインデックス

function showLookbook(index, imageSet) {
    // 現在の画像リストを選択
    if (imageSet === 1) {
        currentImages = imagesSet1;
    } else if (imageSet === 2) {
        currentImages = imagesSet2;
    }

    currentIndex = index; // 初期インデックスを設定
    document.getElementById('lookbookImage').src = currentImages[currentIndex]; // 初期画像を表示
    document.getElementById('lookbookModal').style.display = 'flex'; // モーダルを表示
    updateArrows(); // 矢印の表示を更新
}

function closeLookbook() {
    document.getElementById('lookbookModal').style.display = 'none';
}

function changePage(direction) {
    currentIndex += direction;
    document.getElementById('lookbookImage').src = currentImages[currentIndex];
    updateArrows();
}

function updateArrows() {
    document.getElementById('prevArrow').style.display = currentIndex === 0 ? 'none' : 'block';
    document.getElementById('nextArrow').style.display = currentIndex === currentImages.length - 1 ? 'none' : 'block';
}
