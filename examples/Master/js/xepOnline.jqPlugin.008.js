String.prototype.toCamel = function(){
	return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};
String.prototype.fromCamel = function(){
	return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
};

var xepOnline = window.xepOnline || {};

xepOnline.IE = function() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    var trident = ua.indexOf('Trident/');

    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    if (trident > 0) {
        // IE 11 (or newer) => return version number
        var rv = ua.indexOf('rv:');
        //return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10) >= 11;
    }

    // other browser
    return false;
}

// TODO: better mobile check
xepOnline.detectmob1=function(){if( navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)|| navigator.userAgent.match(/iPad/i)|| navigator.userAgent.match(/iPod/i)|| navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){return true;}else {return false;}}
xepOnline.mobilecheck = function() {
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return xepOnline.detectmob1() || check;
}

xepOnline.DEFAULTS = {
	pageWidth:"8.5in",
	pageHeight:"11in",
	pageMargin:".25in"
};

xepOnline.Formatter = {
	clean_tags: ['img', 'br', 'input'],
	fo_attributes: [
			'lineHeight', 
			'alignmentBaseline', 
            'backgroundImage', 'backgroundPosition', 'backgroundRepeat', 'backgroundColor',
            'baselineShift', 
            'borderTopWidth','borderTopStyle','borderTopColor', 
            'borderBottomWidth','borderBottomStyle','borderBottomColor',
            'borderLeftWidth','borderLeftStyle','borderLeftColor',
            'borderRightWidth','borderRightStyle','borderRightColor',
            'borderCollapse',             
            'clear', 'color', 
            'display', 'direction', 'dominantBaseline', 
            'fill', 'float', 
            'fontStyle', 'fontVariant', 'fontWeight', 'fontSize', 'fontFamily', 
            'height',
            'listStyleType', 'listStyleImage', 'letterSpacing', 
            'marginTop', 'marginBottom', 'marginLeft', 'marginRight','orphans', 
            'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
            'pageBreakAfter', 'pageBreakBefore', 
            'tableLayout', 
            'textAlign', 'textAnchor','textDecoration', 'textIndent', 'textTransform', 'textShadow',
            'verticalAlign',
            'widows', 'wordSpacing', 'width'],            
	getRealStyle: function(elm) {
	    var returnObj = {};
	    for(var i=0; i<xepOnline.Formatter.fo_attributes.length; i++) {
	        returnObj[xepOnline.Formatter.fo_attributes[i]] = $(elm).css(xepOnline.Formatter.fo_attributes[i]);
	    }
	    return returnObj;
	},
	copyComputedStyle: function(elm, dest, parentStyle) {
	    parentStyle = parentStyle || {}; 
	    var s = xepOnline.Formatter.getRealStyle(elm);
	    for ( var i in s ) {
	        var currentCss = $(elm).css(i);
	        // ignore duplicate "inheritable" properties
	        if(parentStyle[i] && parentStyle[i] === currentCss) { } else { 
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
	},
	// NOTDONE: this is not done and probably wont work as the correction needs to happen
	// in the text print copy and not the DOM
	// properly close tags: img, br, 
	cleanTags: function(PrintCopy) {

	    var result = PrintCopy.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>");
		result = result.replace(/(<br("[^"]*"|[^\/">])*)>/g, "$1/>");
		result = result.replace(/(<input("[^"]*"|[^\/">])*)>/g, "$1/>");
		result = result.replace(/(<embed("[^"]*"|[^\/">])*)>/g, "$1/>");
		result = result.replace(/(<param("[^"]*"|[^\/">])*)>/g, "$1/>");
		return result;

		/*for(var i=0; i<xepOnline.Formatter.clean_tags.length; i++) {
			$(elm).find(xepOnline.Formatter.clean_tags[i]).each(function(itt, tag) {
				var copy = $(tag).clone();
				$(tag).remove();
			});
		}*/
	},
	flattenStyle: function(elm) {
	    // parent
	    xepOnline.Formatter.copyComputedStyle(elm, elm, xepOnline.Formatter.getRealStyle($('body')[0]));
	    // children
	    $(elm).find('*').each(function(index, elm2) {
	        var parentStyle = xepOnline.Formatter.getRealStyle($(elm2).parent()[0]);
	        xepOnline.Formatter.copyComputedStyle(elm2, elm2, parentStyle);
	    });
	},
	getFormTextData: function(PrintCopy) {
		var data = xepOnline.Formatter.entity_declaration + xepOnline.Formatter.xsl_stylesheet_declaration + PrintCopy;
		//DEBUG
		console.log(data);
		var encoded = encodeURIComponent(data);
		if(window.btoa) return btoa(encoded);
		return encoded;
	},
	getFormData: function(PrintCopy, Name, MimeType, FileName) {
		var data = xepOnline.Formatter.entity_declaration + xepOnline.Formatter.xsl_stylesheet_declaration + PrintCopy;
		//DEBUG
		console.log(data);
	    var blob;
	    try
	    {
		    blob = new Blob([data],{ type: xepOnline.Formatter.src_type.xml });
	    }
	    catch(e) 
	    {
	    	if(e.name === 'TypeError') {
	    		throw new Error('Blob undefined')
	    	}
	    }

	    if(blob === undefined) throw new Error('Blob undefined');

	    var obj = new FormData();

	    obj.append(Name,blob,FileName);
	    obj.append('mimetype', MimeType);
	    return obj;
	},
	togglePrintMediaStyle: function() {
		if($('head style[data-xeponline-formatting]').length > 0) {
			$('head style[data-xeponline-formatting]').remove();
			return;
		}
		var printrules = [];
		for(var x=0;x<document.styleSheets.length;x++) { 
			var rules=document.styleSheets[x].cssRules;
			var rule=[];
			for(var x2=0;x2<rules.length;x2++) {
				
				if(rules[x2].media && rules[x2].media && (rules[x2].media[0] === 'print' || 
					rules[x2].media && rules[x2].media.mediaText === 'print')) {
					for(var x3=0;x3<rules[x2].cssRules.length; x3++) {
						rule.push(rules[x2].cssRules[x3]);
					}
				}  else if (rules[x2].parentStyleSheet.media[0] && 
						rules[x2].parentStyleSheet.media[0] === 'print' ||
						(rules[x2].parentStyleSheet.media && 
							rules[x2].parentStyleSheet.media.mediaText === 'print')) {
					rule.push(rules[x2]);
				}
			}
			for(var x2=0;x2<rule.length;x2++) {
				printrules.push(rule[x2].cssText);	
			}
		}

		// write print media styles to head
		var html = '\n<style type="text/css" data-xeponline-formatting="true">\n';
		for(var x=0; x<printrules.length; x++) {
			html+='.xeponline-container ' + printrules[x] + '\n';
		}
		html += '</style>\n';
		$('head').append(html);
	},
	getFOContainer: function(options) {
		options 			= options || {};
		options.pageWidth 	= options.pageWidth || xepOnline.DEFAULTS.pageWidth;
		options.pageHeight 	= options.pageHeight || xepOnline.DEFAULTS.pageHeight;
		options.pageMargin 	= options.pageMargin || xepOnline.DEFAULTS.pageMargin;

		var container = $('<div class=\'xeponline-container\'></div>');
		var margincontainer = $('<div class=\'margin-container\'></div>');
		container.append(margincontainer);
		var stylebuilder = '';
		var stylebuildermargin = '';
		var fostylebuilder = '';
		
		stylebuilder += 'width: ' 			+ options.pageWidth + '; ';
		stylebuilder += 'height: ' 			+ options.pageHeight + '; ';
		stylebuildermargin += 'margin: ' 	+ options.pageMargin + '; ';

		if(options && options.pageMarginTop) {
			stylebuildermargin += 'margin-top: ' + options.pageMarginTop + '; ';
		}
		if(options && options.pageMarginRight) {
			stylebuildermargin += 'margin-right: ' + options.pageMarginRight + '; ';
		}
		if(options && options.pageMarginBottom) {
			stylebuildermargin += 'margin-bottom: ' + options.pageMarginBottom + '; ';
		}
		if(options && options.pageMarginLeft) {
			stylebuildermargin += 'margin-left: ' + options.pageMarginLeft + '; ';
		}
		if(options && options.cssStyle) {
			for(s in options.cssStyle) { 
				stylebuilder += s.fromCamel() + ': ' + options.cssStyle[s] + '; ';				
			}
		}
		if(options && options.foStyle) {
			for(s in options.foStyle) { 
				fostylebuilder += s.fromCamel() + ': ' + options.foStyle[s] + '; ';				
			}
		}
		container.attr('style', stylebuilder);
		margincontainer.attr('style', stylebuildermargin);
		container.attr('fostyle', fostylebuilder);
		return container;
	},
	getBase: function() {
	    var pathname = $(location).attr('pathname').substring(0, $(location).attr('pathname').lastIndexOf('/') + 1);
    	var base = $(location).attr('protocol') + '//' + $(location).attr('hostname') + pathname;
    	return base;
	},
	// IE Hack!
	cleanSVGDeclarations: function(data) {
		var builder = '';

		var regx = /<svg ("[^"]*"|[^\/">])*>/ig;
		var match = regx.exec(data);
		var startIdx = 0;
		var svgdec_text = 'xmlns="http://www.w3.org/2000/svg"';

		while(match != null) {

			builder = builder || '';
			builder += data.substring(startIdx, match.index);

			// hack for IE
			// build replacement opening svg tag, killing duplicate xmlns svg namespace decleration
			builder += '<svg';
			// add back name values
			var svgdec_flag = false;
			var namevalues;
			for(s in namevalues = match[0].match(/([^< =,]*)=("[^"]*"|[^,"]*)/ig)) {
				if(namevalues[s] === svgdec_text && svgdec_flag) { } else {
					builder += ' ' + namevalues[s];
				}
				svgdec_flag = namevalues[s] === svgdec_text || svgdec_flag;
			}
			builder += '>';

			data = data.substring(match.index + match[0].length);
			regx = /<svg ("[^"]*"|[^\/">])*>/ig;
			match = regx.exec(data);
		}

		return builder += (data || '');
	},
	xep_chandra_service: 'http://xep.cloudformatter.com/Chandra.svc/genpackage',
	xep_chandra_service_AS_PDF: 'http://xep.cloudformatter.com/Chandra.svc/genfile',
	entity_declaration:'<!DOCTYPE div [  <!ENTITY % winansi SYSTEM "http://xep.cloudformatter.com/doc/XSL/winansi.xml">  %winansi;]>',
	xsl_stylesheet_declaration: '<?xml-stylesheet type="text/xsl" href="http://xep.cloudformatter.com/Doc/XSL/xeponline-fo-translate-2.xsl"?>',
	src_type: { xml: 'text/xml'},
	mime_type: { pdf: 'application/pdf'},
	/* options	
		{
			pageWidth: "8.5in", 				// reserved for the FO region-body (next 7)
			pageHeight: "11in", 
			pageMargin: ".25in", 
			pageMarginTop: "1in",
			pageMarginRight: "1in",
			pageMarginBottom: "1in",
			pageMarginLeft: "1in",
			pageMediaResource: "name_of_css_stylesheet",
			render: ("none"|"newwin<default>"|embed"|"download<default IE>"),
			cssStyle: {							// puts css style attributes on the root, ex. fontSize:14px
						cssStyleName: 'value', ...
					},
			foStyle: {							// puts fo style attributes on the root, ex. fontSize:14px
						foStyleName: 'value', ...
					}			
		}
	*/
	__format: function(ElementIDs, options) {
		options = options || {};
		options.render = (options.render === undefined) ? 'newwin' : options.render;

		if(xepOnline.IE() || xepOnline.mobilecheck()) {
			options.render = 'download';
		}

         var printcopy = '';
        $(ElementIDs).each(function(index, ElementID){
           xepOnline.Formatter.__elm = $('#' + ElementID)[0];
		   xepOnline.Formatter.__clone = $(xepOnline.Formatter.__elm)[0].outerHTML;
		   xepOnline.Formatter.__container = xepOnline.Formatter.getFOContainer(options);
		   $('#' + ElementID).after($(xepOnline.Formatter.__container));
		   $(xepOnline.Formatter.__elm).appendTo($(xepOnline.Formatter.__container).children(1));			
           xepOnline.Formatter.togglePrintMediaStyle();
		   xepOnline.Formatter.flattenStyle($(xepOnline.Formatter.__container)[0]);
		   printcopy = printcopy + xepOnline.Formatter.cleanTags($(xepOnline.Formatter.__container)[0].outerHTML);
           xepOnline.Formatter.Clear();
	    });

	    if(options.render === 'none') {
	    	return false;
	    }
	    if(options.render === 'embed') {
	    	xepOnline.Formatter.__container.attr('data-xeponline-embed-pending', 'true');
	    }
	    // fix IE double xmlns declerations in SVG
	    if(xepOnline.IE()) {
	    	printcopy = xepOnline.Formatter.cleanSVGDeclarations(printcopy);
		}
	    //Kevin hack for now, stuff the whole thing in a document div
	    printcopy = '<div base="' + xepOnline.Formatter.getBase() + '" class="xeponline-document">' + printcopy + '</div>';

		var blob;
		if(options.render !== 'download') {
			try 
			{
				blob = xepOnline.Formatter.getFormData(printcopy, 'xml', xepOnline.Formatter.mime_type.pdf, 'document.xml');
			} catch(e) 
			{
				// switch render to download if blob undefined
				if(e.message === 'Blob undefined') {
					options.render = 'download';					
				} else {
					throw e;
				}
			}
		}

	    if(options.render === 'download') {
			$('body').append('<form style="width:0px; height:0px; overflow:hidden" enctype=\'multipart/form-data\' id=\'temp_post\' method=\'POST\' action=\'' + xepOnline.Formatter.xep_chandra_service_AS_PDF + '\'></form>');		
			$('#temp_post').append('<input type=\'text\' name=\'mimetype\' value=\'' + xepOnline.Formatter.mime_type.pdf + '\'/>');
			$('#temp_post').append('<textarea name=\'xml\'>' + xepOnline.Formatter.getFormTextData(printcopy) + '</textarea>');
			$('#temp_post').submit();
			$('#temp_post').remove();
	    } else {
		    $.ajax({
			    type: "POST",
			    url: xepOnline.Formatter.xep_chandra_service,
			    processData: false,
			    contentType: false,
			    data: blob,
		    	success: xepOnline.Formatter.__postBackSuccess,
		    	error: xepOnline.Formatter.__postBackFailure
		    });
	    }
	    return false; 
	},
	FormatGroup: function(ElementIDs, options)
	{
		return xepOnline.Formatter.__format(ElementIDs, options);
	},
	Format: function(ElementID, options) {
		return xepOnline.Formatter.__format([ElementID], options);
	},
	Clear: function() {
		if($(xepOnline.Formatter.__container).length===0 || 
			$(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending') === 'true')
			return;			

		$(xepOnline.Formatter.__container).after(xepOnline.Formatter.__clone);
		$(xepOnline.Formatter.__container).remove();
	    xepOnline.Formatter.togglePrintMediaStyle();
	},
	__postBackSuccess: function(Response) {
		var base64PDF = $(Response).find("Result").text();

		var objbuilder = '';
		objbuilder += ('<object width="100%" height="100%" data="data:application/pdf;base64,');
		objbuilder += (base64PDF);
		objbuilder += ('" type="application/pdf" class="internal">');
		objbuilder += ('<embed src="data:application/pdf;base64,');
		objbuilder += (base64PDF);
		objbuilder += ('" type="application/pdf" />');
		objbuilder += ('</object>');

		if($(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending') === 'true') {			
			$(xepOnline.Formatter.__elm).remove();
			$(xepOnline.Formatter.__container).append(objbuilder);
			$(xepOnline.Formatter.__container).attr('data-xeponline-embed-pending', null);
			$(xepOnline.Formatter.__container).attr('data-xeponline-embed', 'true');
		} else {
			// TODO: try catch window open "pop-up blocker"
			var win = window.open("","_blank","titlebar=yes");
			win.document.title = "XEPOnline PDF Result";
			win.document.write('<html><body>');
			win.document.write(objbuilder);
			win.document.write('</body></html>');
			layer = $(win.document);
		}

	},
	__postBackFailure: function (request, status, error){
		alert('Woops, an exception occurred.  Please try again.');
	}

}