css2pdf is a simple to use Javascript for CSS to PDF rendering that can easily be plugged-in to your website.

# Instructions

The basic method is to include a print button in your website with a click handler that calls the xepOnline.Formatter method "Format". The "Format" method takes a single element by ID or an array of element IDs. The resulting PDF is a single set of pages for each element ID (and children). PDF is produced from a hosted PDF rendering service. PDF is returned to the client browser as either an embeddable PDF or as a download. Certain features (like embedding PDFs) are not available on all browsers. Safari and Internet Explorer only support download. Chrome and Firefox support both download or embed.

All HTML, CSS, and CSS media styling will be applied to the print selection(s) including print media CSS rules. Note: some framework's1 do have undesirable print media rules, therefore we have chosen to eliminate these by default2.

## Go get it:

You can either just include the one from this website or download.

## Include the library:

    <script src="xepOnline.jqPlugin.js"></script>

## Use it:

Then you include a print button element like this in your HTML:

    <a href="#" onclick="return xepOnline.Formatter.Format('Usage');">
        <img src="button-print.png">
    </a>

Where "Usage" is the ID of the element to print.

A number of options can be passed to achieve various effects on the print output, including page media sizing and margins, as well as instruct the rendering engine to return an embedded PDF in a new window or a downloadable PDF. All the options are described below.

Example: For A4 letter size (216mm x 279mm) output, one would write the "Format" as:

    <a href="#" onclick="return xepOnline.Formatter.Format('Usage',
                {pageWidth:'216mm', pageHeight:'279mm'});">
        <img src="button-print.png">
    </a>
Example: Force the PDF to download rather than embedded in a new window:

    <a href="#" onclick="return xepOnline.Formatter.Format('Usage',{render:'download'});">
        <img src="button-print.png">
    </a>

# Options

* **pageWidth** - [default 8.5in] Printed Media Page Width
* **pageHeight** - [default 11in] Printed Media Page Height
* **pageMargin** - [default 0.5in] Printed Media Page Margin Dimensions (short-hand)
* **pageMarginTop** - Printed Media Page Margin Top Dimension
* **pageMarginRight** - Printed Media Page Margin Right Dimension
* **pageMarginBottom** - Printed Media Page Margin Bottom Dimension
* **pageMarginLeft** - Printed Media Page Margin Left Dimension
* **pageMediaResource** - A fully qualified URL to your own stylesheet
* **cssStyle** - CSS styles to place directly on the container element (to override computed styles)
* **foStyle** - FO styles to place directly on the container element (to override cssStyles during XSL-FO rendering)
* **render** - options to control the result of the rendering
* **none** - Runs the client-side HTML+CSS and media styling without PDF rendering
* **newwin** - [default on Firefox and Chrome] Embeds the rendered PDF into a new window. Client must enable pop-up's for this to work!
* **download** - [default and only option on Internet Explorer and Safari as well as all mobile browsers] After PDF rendering the user is prompted to download and save the PDF result
* **filename** - [default 'document'] Optionally used to name the downloaded file, the server will add the appropriate extension based on the mimetype of the requested document
* **mimeType** - [default 'application/pdf'] Optionally used control the formatter to create the type of result:

* **application/pdf** for PDF documents
* **image/svg+xml** for SVG documents
* **image/png** for PNG page images
* **image/jpg** for JPG page images
* **image/gif** for GIF page images
* **application/vnd.ms-xpsdocument** for XPS documents You must ensure that you use only Truetype Fonts from the @cloudformatter server. XPS documents require Truetype fonts.
* **application/postscript** for Postscript documents
* **application/xep** for RenderX XEP (structure tree) documents which is an XML file
* **resolution** - [default '120'] Resolution for image output (applies to image mimetypes image/png, image/jpg and image/gif)

*All options are optional and will defer to their default values when not specified*

# Behind the Scenes

This plugin computes the CSS style for each element within the selected print container(s), including all internal, external, and print media CSS rules puts the style directly on the element. The "computed" html source is then sent to the @cloudformatter XEPOnline  rendering engine. @cloudformatter is capable of receiving any XML document with an embedded XSL Stylesheet reference for formatting. The rendering engine translates the "computed" XHTML3 source to XSL-FO4 and then Renders the PDF.

# Google Fonts

@cloudformatter rendering service is configured with many fonts including the 50 most popular Google Fonts . To try out these fonts visit our demo page. Feel free to use any of these fonts your web applications and they will be used perfectly in your PDF rendering! Refer to Google Fonts for more information on this Open Source service.

