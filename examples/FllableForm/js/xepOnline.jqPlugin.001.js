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

xepOnline.DEFAULTS = {
	pageWidth:"8.5in",
	pageHeight:"11in"
};

xepOnline.Formatter = {
	fix_tags: ['img', 'br'],
	fo_attributes: [
			'lineHeight', 
			'alignmentBaseline', 
            'backgroundImage', 'backgroundPosition', 'backgroundRepeat', 'backgroundColor',
            'baselineShift', 
            'border',
            'borderWidth', 'borderColor','borderStyle',
            'borderTop','borderLeft','borderRight','borderBotttom',
            'borderTopWidth','borderTopStyle','borderTopColor', 
            'borderBottomWidth','borderBottomStyle','borderBottomColor',
            'borderLeftWidth','borderLeftStyle','borderLeftColor',
            'borderRightWidth','borderRightStyle','borderRightColor',
            'borderCollapse',             
            'clear', 'color', 
            'display', 'direction', 'dominantBaseline', 
            'fill', 'float', 
            'fontStyle', 'fontVariant', 'fontWeight', 'fontSize', 'fontFamily', 
            'listStyleType', 'listStyleImage', 'letterSpacing', 
            'marginTop', 'marginBottom', 'marginLeft', 'marginRight','orphans', 
            'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
            'pageBreakAfter', 'pageBreakBefore', 
            'tableLayout', 
            'textAlign', 'textAnchor','textDecoration', 'textIndent', 'textTransform', 
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
	fixTags: function(elm) {
		for(var i=0; i<xepOnline.Formatter.fix_tags.length; i++) {
			$(elm).find(xepOnline.Formatter.fix_tags[i]).each(function(itt, tag) {
				var copy = $(tag).clone();
				$(tag).remove();
			});
		}
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
	getFormData: function(PrintCopy, Name, MimeType, FileName) {
		var data = xepOnline.Formatter.xsl_stylesheet_declaration + PrintCopy;
	    var blob = new Blob([data],
	    	{ type: xepOnline.Formatter.src_type.xml }
	    );
	    var chandraObj = new FormData();

	    chandraObj.append(Name,blob,FileName);
	    chandraObj.append('mimetype', MimeType);
	    return chandraObj;
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
		options = options || {};
		var container = $('<div class=\'xeponline-container\'></div>');
		var stylebuilder = '';
		var fostylebuilder = '';

		container.attr('page-width', options.pageWidth || xepOnline.DEFAULTS.pageWidth);
		stylebuilder += 'width: ' + (options.pageWidth || xepOnline.DEFAULTS.pageWidth) + '; ';
		container.attr('page-height', options.pageHeight || xepOnline.DEFAULTS.pageHeight);

		if(options && options.pageMargin) {
			container.attr('page-margin', options.pageMargin);
			stylebuilder += 'margin: ' + options.pageMargin + '; ';
		}
		if(options && options.pageMarginTop) {
			container.attr('page-margin-top', options.pageMarginTop);
			stylebuilder += 'margin-top: ' + options.pageMarginTop + '; ';
		}
		if(options && options.pageMarginRight) {
			container.attr('page-margin-right', options.pageMarginRight);
			stylebuilder += 'margin-right: ' + options.pageMarginRight + '; ';
		}
		if(options && options.pageMarginBottom) {
			container.attr('page-margin-bottom', options.pageMarginBottom);
			stylebuilder += 'margin-bottom: ' + options.pageMarginBottom + '; ';
		}
		if(options && options.pageMarginLeft) {
			container.attr('page-margin-left', options.pageMarginLeft);
			stylebuilder += 'margin-left: ' + options.pageMarginLeft + '; ';
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
		container.attr('fostyle', fostylebuilder);

    	var pathname = $(location).attr('pathname').substring(0, $(location).attr('pathname').lastIndexOf('/') + 1);
    	var base = $(location).attr('protocol') + '//' + $(location).attr('hostname') + pathname;
    	container.attr('base', base);

		return container;
	},
	// IE Hack!
	fixSVGDeclarations: function(data) {
		var builder = null;

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
	xep_chandra_service: 'http://local.renderx.webservice/Chandra.svc/format',	//'http://online.xep.com/RenderX.WebServices/Chandra.svc/format',
	xep_chandra_service_AS_PDF: 'http://local.renderx.webservice/Chandra.svc/format2', //'http://online.xep.com/RenderX.WebServices/Chandra.svc/format2',
	xsl_stylesheet_declaration: '<?xml-stylesheet type="text/xsl" href="http://www.xportability.com/XEPOnline/xeponline-fo-translate.xsl"?>',
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
	Format: function(ElementID, options) {
		options.render = (options && options.render === undefined) ? options.render = 'newwin' : options.render;
		if(xepOnline.IE()) {
			options.render = 'download';
		}

		xepOnline.Formatter.__elm = $('#' + ElementID)[0];
		xepOnline.Formatter.__clone = $(xepOnline.Formatter.__elm)[0].outerHTML;
		xepOnline.Formatter.__container = xepOnline.Formatter.getFOContainer(options);

		$('#' + ElementID).after($(xepOnline.Formatter.__container));
		$(xepOnline.Formatter.__elm).appendTo($(xepOnline.Formatter.__container));			

		xepOnline.Formatter.togglePrintMediaStyle();
		xepOnline.Formatter.flattenStyle($(xepOnline.Formatter.__container)[0]);
	

	    if(options.render === 'none') {
	    	return false;
	    }

	    if(options.render === 'embed') {
	    	xepOnline.Formatter.__container.attr('data-xeponline-embed-pending', 'true');
	    }

	    var printcopy = $(xepOnline.Formatter.__container)[0].outerHTML;
	    // fix broken image tags		
	    printcopy = printcopy.replace(/(<img("[^"]*"|[^\/">])*)>/g, "$1/>");
	    // fix IE double xmlns declerations in SVG
	    if(xepOnline.IE()) {
	    	printcopy = xepOnline.Formatter.fixSVGDeclarations(printcopy);
		}

	    xepOnline.Formatter.Clear();

		var data = xepOnline.Formatter.xsl_stylesheet_declaration + printcopy;
	    if(options.render === 'download') {
			$('body').append('<form style="width:0px; height:0px; overflow:hidden" enctype=\'multipart/form-data\' id=\'test_post\' method=\'POST\' action=\'' + xepOnline.Formatter.xep_chandra_service_AS_PDF + '\'></form>');		
			$('#temp_post').append('<input type=\'text\' name=\'mimetype\' value=\'' + xepOnline.Formatter.mime_type.pdf + '\'/>');
			$('#temp_post').append('<textarea name=\'xml\'>' + btoa(data) + '</textarea>');
			$('#temp_post').submit();
			$('#temp_post').remove();
	    } else {
		    $.ajax({
			    type: "POST",
			    url: xepOnline.Formatter.xep_chandra_service,
			    processData: false,
			    contentType: false,
			    data: xepOnline.Formatter.getFormData(printcopy, 'xml', xepOnline.Formatter.mime_type.pdf, 'document.xml'),
		    	success: xepOnline.Formatter.__postBackSuccess,
		    	error: xepOnline.Formatter.__postBackFailure
		    });
	    }
	    return false; 
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
			var win = window.open("","XEPOnline PDF Result","titlebar=yes");
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