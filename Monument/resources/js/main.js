function displayPage(page) {
    window.location.href = page;
}
function displaySection(section) {
    window.location.href = "#" + section;
}
function changeFontWeight(target, element, weight, output) {
    let allMs = document.getElementsByClassName("interaction-M");
    for (var i=0; i<allMs.length; i++) {
        allMs[i].style.color = 'white';
    }
    target.style.color = '#e95925';

    element.style.fontWeight = weight;
    output.style.fontWeight = weight;
    output.innerText = getFontWeightLabel(weight);
}

function changeFontWeightOnly(target, weight) {
    target.style.fontWeight = weight;
}
function changeFontStyle(target, fontStyle) {
    if (target.style.fontStyle === fontStyle) {
        target.style.fontStyle = '';
    } else {
        target.style.fontStyle = fontStyle;
    }
}
function changeTextDecoration(target, textDecoration) {
    if (target.style.textDecoration == textDecoration) {
        target.style.textDecoration = '';
    } else {
        target.style.textDecoration = textDecoration;
    }
}
function changeFontSize(caller, target, size, output) {
    if (size && size.length != 0) {
        if (size > 240) size = 240;
        if (size < 10) size = 10;
        caller.value = size;

        target.style.fontSize = size + 'px';
        output.value = size;
    }
}

function getFontWeightLabel(fontWeight) {
    let fontWeightLabel = 'Non défini';

    if (fontWeight === 100) {
        fontWeightLabel = 'Thin';
    } else if (fontWeight === 200) {
        fontWeightLabel = 'Light';
    } else if (fontWeight === 300) {
        fontWeightLabel = 'Book';
    } else if (fontWeight === 400) {
        fontWeightLabel = 'Regular';
    } else if (fontWeight === 500) {
        fontWeightLabel = 'Medium';
    } else if (fontWeight === 700) {
        fontWeightLabel = 'Bold';
    } else if (fontWeight === 800) {
        fontWeightLabel = 'Black';
    } else if (fontWeight === 900) {
        fontWeightLabel = 'Heavy';
    }
    return fontWeightLabel;
}

function buildDiv(text, attrName, attrValue) {
    var div = document.createElement('div'); // <div></div>
    if (text) {
        var value = document.createTextNode(text);
        div.appendChild(value); // <div>text</div>
    }
    if (attrName && attrValue) {
        div.setAttribute(attrName, attrValue); // <div attrName=attrValue>text</div>
    }
    return div;
}
function buildGlyphTable(title, chars, targetId) {
    const mainDiv = buildDiv(null, 'class', 'glyph-table'); // <div class='glyph-table'></div>

    const titleDiv = buildDiv(title, 'class', 'glyph-title'); // <div class='glyph-title'>title</div>
    mainDiv.appendChild(titleDiv); // <div class='glyph-table'><div class='glyph-title'>title</div></div>

    const charsDiv = buildDiv(null, 'class', 'glyph-chars'); // <div class='glyph-chars'></div>
    mainDiv.appendChild(charsDiv); // <div class='glyph-table'><div class='glyph-title'>title</div><div class='glyph-chars'></div></div>

    for (var i = 0; i < chars.length; i++) {
        const charDiv = buildDiv(chars.charAt(i), 'class', 'glyph-char'); // <div class='glyph-char'>chars.charAt(i)</div>
        charsDiv.appendChild(charDiv);
    }

    document.getElementById(targetId).appendChild(mainDiv);
}
function buildGlyphTables() {
    let chars = 'AÁĂÂÄĀÅÆCÇĊDĎĐÉÊĖÈĘGĢHĦÍÎÏİĪĮJKLĽŁNŃŇŅŊÑOÓÖŐØPÞQRŘSŠŞȘTŦŤȚÛÙŰŪŲŮVẂŴẄẀXYÝŶŸỲZŹŽŻ';
    buildGlyphTable('Latin étendue - majuscule', chars, 'glyph-1');

    chars = 'aáăâäàāąåãæbcćčçċdďđeéěêëėèēęfgğģġhħiıíîïiìīįjkķlĺľļłmnńňņŋñoóôöòőōøõœpþqrŕřŗsśšşşßtŧťţţuúûüùűūųůvwẃŵẅẁxyýŷÿỳzźžż';
    buildGlyphTable('Latin étendue - minuscule', chars, 'glyph-2');

    chars = '0123456789';
    buildGlyphTable('Numéros', chars, 'glyph-3');

    chars = '.,:;…!¡?¿·•*#/\(){}[]-–—_‚„“”‘’«»‹›"\'';
    buildGlyphTable('Ponctuation', chars, 'glyph-4');

    chars = '¢¤$€£¥@&¶§©®™';
    buildGlyphTable('Devises et symboles', chars, 'glyph-5');

     chars = '+−×÷=≠><≥≤±≈~¬^∅∫∏%‰◊';
    buildGlyphTable('Symboles mathématique', chars, 'glyph-6');

    chars = '↑↗→↘↓↙←↖↔↕';
    buildGlyphTable('Flèches', chars, 'glyph-7');

    chars = 'AKRVWag';
    buildGlyphTable('Alternatives', chars, 'glyph-8');

    chars = 'ﬀﬁﬂﬃﬄﬅ';
    buildGlyphTable('Ligatures', chars, 'glyph-9');
}

function initMounumentPage() {
    buildGlyphTables();
    updateSelectedMenuFromPageLoad();
}
function initHistoirePage() {
    updateSelectedMenuFromPageLoad();
}

function updateSelectedMenuFromClick(currentAnchorId) {

    // Apply the selected style the corresponding menu item
    const meunItems = document.querySelectorAll('.menu li');
    if (meunItems && meunItems.length !== 0) {
        for (var i=1; i<= meunItems.length; i++) {
            if (i === currentAnchorId) {
                meunItems[i - 1].classList.add('selected');
                console.log('selected menu: ' + i);
            } else {
                meunItems[i - 1].classList.remove('selected');
            }
        }
    } else {
        alert('Erreur lors de la récupération du menu');
    }
}
function updateSelectedMenuFromPageLoad() {

    const anchorFromUrl = getAnchorFromUrl();
    if (anchorFromUrl) {
        updateSelectedMenuFromClick(parseInt(anchorFromUrl));
    }
}
function getAnchorFromUrl() {
    const currentUrl = document.URL,
    urlParts   = currentUrl.split('#');
    return (urlParts.length > 1) ? urlParts[1] : null;
}
