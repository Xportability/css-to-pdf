$(document).ready(function(){

});


//function demoCopy

var realStyle = function(_elem, _style) {
    var computedStyle;
    if ( typeof _elem.currentStyle != 'undefined' ) {
        computedStyle = _elem.currentStyle;
    } else {
        computedStyle = document.defaultView.getComputedStyle(_elem, null);
    }

    return _style ? computedStyle[_style] : computedStyle;
};

var fo_attributes = ['alignmentBaseline', 'backgroundImage', 'backgroundColor', 'baselineShift', 'border', 
            'borderCollapse', 'clear', 'color', 'direction', 'dominantBaseline', 'float', 'fontStyle', 'fontVariant', 
            'fontWeight', 'fontSize', 'lineHeight', 'fontFamily', 'letterSpacing', 'margin', 'orphans', 'padding', 
            'pageBreakAfter', 'pageBreakBefore', 'tableLayout', 'textAlign', 'textDecoration', 'textIndent', 
            'textTransform', 'widows', 'wordSpacing'];
var copyComputedStyle = function(src, dest) {
    var s = realStyle(src);
    for ( var i in s ) {
        // Do not use `hasOwnProperty`, nothing will get copied
        if ( typeof i == "string" && i != "cssText" && !/\d/.test(i) ) {
            // keep only the valid fo attributes TODO: convert and map others
            if($.inArray(i, fo_attributes) > -1) {             
                // The try is for setter only properties
                try {
                    dest.style[i] = s[i];
                    // `fontSize` comes before `font` If `font` is empty, `fontSize` gets
                    // overwritten.  So make sure to reset this property. (hackyhackhack)
                    // Other properties may need similar treatment
                    if ( i == "font" ) {
                        dest.style.fontSize = s.fontSize;
                    }
                } catch (e) {}
            }
        }
    }
};

function foconvert2(src){

    copyComputedStyle(src, src);
    $(src).find('*').each(function(index, obj) {
        copyComputedStyle(obj, obj);
    });
/*
var printObj = function(obj) {
    var arr = [];
    $.each(obj, function(key, val) {
        var next = key + ": ";
        next += $.isPlainObject(val) ? printObj(val) : val;
        arr.push( next );
    });
    return "{ " +  arr.join(", ") + " }";
};*/
}

function foconvert(){
   
   $('#report').find('*').each(function(){ 
       $('#messages').append("tag: " + $(this)[0].tagName + "<br/>");
       $('#messages').append("style: " + JSON.stringify(css($(this))) + "<br/>");
   }); 
}

/*function css(a) {
    var sheets = document.styleSheets, o = {};
    for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
            if (a.is(rules[r].selectorText)) {
                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
            }
        }
    }
    return o;
}
*/
/*function css2json(css) {
    var s = {};
    if (!css) return s;
    if (css instanceof CSSStyleDeclaration) {
        for (var i in css) {
            if ((css[i]).toLowerCase) {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } else if (typeof css == "string") {
        css = css.split("; ");
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        }
    }
    return s;
}*/

function anysvg2pdf(width, height) {
$('#spinner').show();
//$('#messages').html('<p></p>');
//get SVG from "container"
var container = $.parseHTML($('#container').html());
var svgtext = '<?xml-stylesheet type="text/xsl" href="http://www.xportability.com/XEPOnline/svg2pdf.xsl"?>' + container[1].outerHTML;
var SVGDocument = new Blob([svgtext],{type: "text/xml"});
var mimetype = 'application/pdf';
var chandraObj = new FormData();
chandraObj.append('xml',SVGDocument,"document.xml");
chandraObj.append('mimetype',mimetype);
$.ajax({
type: "POST",
url: "http://online.xep.com/RenderX.WebServices/Chandra.svc/format",
processData: false,
contentType: false,
data: chandraObj,
success: function( msg ) {
	var base64PDF = $(msg).find("Result").text();
//	$(msg).find("a\\:anyType, anyType").each(function(){
//	   $('#messages').append($(this).text() + "<br/>");        
//	});
	$('#pdfresult').html('<object width="' + width + '" height="' + height + '" data="data:application/pdf;base64,' + base64PDF + '" type="application/pdf" class="internal">' + 
		'<embed src="data:application/pdf;base64,' + base64PDF + '" type="application/pdf" />' +
		'</object>');
	$('#spinner').hide();
},
error: function (request, status, error){
    console.log('error: ' + request.responseText);
    $('#spinner').hide();
}
});
}
