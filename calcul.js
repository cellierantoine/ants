function cosinus(x1, y1, x2, y2){
    return (x2 - x1)/Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5);
}

function sinus(x1, y1, x2, y2){
    return (y2 - y1)/Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5);
}

function distance(x1, y1, x2, y2){
    return Math.pow(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2), 0.5)
}