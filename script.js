const container = document.getElementById('container');//display palette
const backgroundColor = document.getElementById('background-color');//color picker for background
const paintbox = document.getElementById('paintbox');//set of colors
const layout = document.getElementById('layout');//select layout
const spacing = document.getElementById('spacing');//distance between colors / width of background
const numberOfColors = document.getElementById('color-amount');//how many colors
numberOfColors.min = 0;
function colorUpdate(colorElement){
    const swatchArr = Array.from(document.getElementsByClassName('swatch'));
    const paletteArr = Array.from(document.querySelectorAll('#paintbox input[type=color]'));
    swatchArr[paletteArr.indexOf(colorElement)].style.backgroundColor = colorElement.value;
}
function colorPickHandler(e) {
    colorUpdate(e.target);
};
function sizePickHandler(e) {
    const swatchArr = Array.from(document.getElementsByClassName('swatch'));
    const numArr = Array.from(document.querySelectorAll('#paintbox input[type=number]'));
    swatchArr[numArr.indexOf(e.target)].style.flexGrow = e.target.value;
};
function spacingHandler(){
    const swatches = document.getElementsByClassName('swatch');
    for (let i = 0; i < swatches.length; i++) {
        swatches[i].style.margin = `${spacing.value}rem`;
    }
};
function backgroundColorHandler(){
    container.style.backgroundColor = backgroundColor.value;
};
function layoutHandler(){
    switch (layout.value) {
        case 'columns':
            container.style.flexDirection = 'row';
            break;
        case 'rows':
            container.style.flexDirection = 'column';
            break;
    }
};
function colorNumberHandler(){
    while(document.querySelectorAll('.swatch').length > numberOfColors.value){
        document.getElementById('container').removeChild(document.getElementById('container').lastElementChild);
        document.getElementById('paintbox').removeChild(document.getElementById('paintbox').lastElementChild);
        document.getElementById('paintbox').removeChild(document.getElementById('paintbox').lastElementChild);
    }
    while (document.querySelectorAll('.swatch').length < numberOfColors.value) {
        const newColorPicker = document.createElement('input');
        newColorPicker.type = 'color';
        newColorPicker.value = '#a0a0a0';
        newColorPicker.name = 'color-picker'
        const newSwatch = document.createElement('div');
        newSwatch.classList = 'swatch';
        newSwatch.style.margin = `${spacing.value}rem`;
        const newSizePicker = document.createElement('input');
        newSizePicker.type = 'number';
        paintbox.appendChild(newColorPicker);
        paintbox.appendChild(newSizePicker);
        container.appendChild(newSwatch);
        //colorUpdate(newColorPicker);
        newColorPicker.addEventListener('change', colorPickHandler);
        newSizePicker.addEventListener('change', sizePickHandler);

    }}
backgroundColor.addEventListener('change', backgroundColorHandler);
layout.addEventListener('change', layoutHandler)
spacing.addEventListener('click', spacingHandler)
numberOfColors.addEventListener('change', colorNumberHandler);

const URLPalette = new URLSearchParams(location.search);
backgroundColor.value = URLPalette.get('background-color');
backgroundColorHandler();
numberOfColors.value = URLPalette.get('color-amount');
colorNumberHandler();
for (let i = 0; i < document.querySelectorAll('#paintbox input[type=color]').length; i ++){
    document.querySelectorAll('#paintbox input[type=color]')[i].value = URLPalette.getAll('color-picker')[i];
}
for (el of Array.from(document.querySelectorAll('#paintbox input[type=color]'))){
    colorUpdate(el);
}
layout.value = URLPalette.get('layout');
layoutHandler();
spacing.value = URLPalette.get('spacing');
spacingHandler();

