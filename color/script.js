
function calculateDecimal(bits) {
    let value = 0;
    bits.forEach((bit, index) => {
        if (bit.checked) {
            value += Math.pow(2, 7 - index);
        }
    });
    return value;
}

function updateColor() {
    const redValue = calculateDecimal(document.querySelectorAll('input[data-color="red"]'));
    const greenValue = calculateDecimal(document.querySelectorAll('input[data-color="green"]'));
    const blueValue = calculateDecimal(document.querySelectorAll('input[data-color="blue"]'));

    document.getElementById('red-value').textContent = redValue;
    document.getElementById('green-value').textContent = greenValue;
    document.getElementById('blue-value').textContent = blueValue;

    const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;

    document.getElementById('color-box').style.backgroundColor = color;
}

document.querySelectorAll('.bit').forEach(checkbox => {
    checkbox.addEventListener('change', updateColor)
});

document.addEventListener('load', updateColor);
