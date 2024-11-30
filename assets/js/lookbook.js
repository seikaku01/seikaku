// サムネイル1に対応する画像リスト
const imagesSet1 = [
    'assets/images/lookbook/18.png',
    'assets/images/lookbook/JP 2.png',
    'assets/images/lookbook/JP 3.png',
    'assets/images/lookbook/19.png',
    'assets/images/lookbook/目次.jpg.png',
    'assets/images/lookbook/21.png',
    'assets/images/lookbook/22.png',
    'assets/images/lookbook/23.png',
    'assets/images/lookbook/24.png',
    'assets/images/lookbook/10 copy.jpg',
    'assets/images/lookbook/26.png',
    'assets/images/lookbook/12 copy.jpg',
    'assets/images/lookbook/28.png',
    'assets/images/lookbook/改訂版.png',
    'assets/images/lookbook/company.png',
    'assets/images/lookbook/32.png'
];

// サムネイル2に対応する画像リスト
const imagesSet2 = [
    'assets/images/lookbook ENG/ENG 1.png',
    'assets/images/lookbook ENG/ENG 2.png',
    'assets/images/lookbook ENG/ENG 3.png',
    'assets/images/lookbook ENG/ENG 4.png',
    'assets/images/lookbook ENG/ENG 5.png',
    'assets/images/lookbook ENG/ENG 6.png',
    'assets/images/lookbook ENG/ENG 7.png',
    'assets/images/lookbook ENG/ENG 8.png',
    'assets/images/lookbook ENG/ENG 9.png',
    'assets/images/lookbook ENG/ENG 10.png',
    'assets/images/lookbook ENG/ENG 11.png',
    'assets/images/lookbook ENG/ENG 12.png',
    'assets/images/lookbook ENG/ENG 13.png',
    'assets/images/lookbook ENG/ENG 14.png',
    'assets/images/lookbook ENG/ENG 15.png',
    'assets/images/lookbook ENG/ENG 16.png',
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
