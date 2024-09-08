// サムネイル1に対応する画像リスト
const imagesSet1 = [
    'assets/images/lookbook/2.jpg',
    'assets/images/lookbook/3.jpg',
    'assets/images/lookbook/4.jpg'
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
