const container = document.getElementById('container');
const backgroundColor = document.getElementById('background-color');
const paintbox = document.getElementById('paintbox');
const layout = document.getElementById('layout');
const spacing = document.getElementById('spacing');
const numberOfColors = document.getElementById('color-amount');
function colorPickHandler(e) {
    const swatchArr = Array.from(document.getElementsByClassName('swatch'));
    const paletteArr = Array.from(document.querySelectorAll('#paintbox input[type=color]'));
    swatchArr[paletteArr.indexOf(e.target)].style.backgroundColor = e.target.value;
};
function sizePickHandler(e) {
    const swatchArr = Array.from(document.getElementsByClassName('swatch'));
    const numArr = Array.from(document.querySelectorAll('#paintbox input[type=number]'));
    swatchArr[numArr.indexOf(e.target)].style.flexGrow = e.target.value;
};
backgroundColor.addEventListener('change', (e) => {
    container.style.backgroundColor = e.target.value;
});
layout.addEventListener('change', (e) => {
    switch (e.target.value) {
        case 'columns':
            container.style.flexDirection = 'row';
            break;
        case 'rows':
            container.style.flexDirection = 'column';
            break;
    }
})
spacing.addEventListener('click', (e) => {
    const swatches = document.getElementsByClassName('swatch');
    for (let i = 0; i < swatches.length; i++) {
        swatches[i].style.margin = `${e.target.value}rem`;
    }

})
numberOfColors.addEventListener('change', (e) => {
    while(document.querySelectorAll('.swatch').length > numberOfColors.value){
        document.getElementById('container').removeChild(document.getElementById('container').lastElementChild);
        document.getElementById('paintbox').removeChild(document.getElementById('paintbox').lastElementChild);
        document.getElementById('paintbox').removeChild(document.getElementById('paintbox').lastElementChild);
    }
    while (document.querySelectorAll('.swatch').length < numberOfColors.value) {
        const newColorPicker = document.createElement('input');
        newColorPicker.type = 'color';
        newColorPicker.value = '#a0a0a0';
        const newSwatch = document.createElement('div');
        newSwatch.classList = 'swatch';
        newSwatch.style.margin = `${spacing.value}rem`;
        const newSizePicker = document.createElement('input');
        newSizePicker.type = 'number';
        paintbox.appendChild(newColorPicker);
        paintbox.appendChild(newSizePicker);
        container.appendChild(newSwatch);
        newColorPicker.addEventListener('change', colorPickHandler);
        newSizePicker.addEventListener('change', sizePickHandler);

    }

}
)