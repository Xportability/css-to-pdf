css2pdf is a simple to use Javascript for CSS to PDF rendering that can easily be plugged-in to your website.

Here are the basics...

Include the library:

    <script src="xepOnline.jqPlugin.js"></script>

Use it:

Then you include a print button element like this in your HTML:

    <a href="#" onclick="return xepOnline.Formatter.Format('Usage');">
        <img src="button-print.png">
    </a>

Where "Usage" is the ID of the element to print.

A number of options can be passed to achieve various effects on the print output, including page media sizing and margins, as well as instruct the rendering engine to return an embedded PDF in a new window or a downloadable PDF. All the options are described below.

Example: For A4 letter size (216mm x 279mm) output, one would write the "Format" as:

    <a href="#" onclick="return xepOnline.Formatter.Format('Usage',{pageWidth:'216mm', pageHeight:'279mm'});">
        <img src="button-print.png">
    </a>

Example: Force the PDF to download rather than embedded in a new window:

    <a href="#" onclick="return xepOnline.Formatter.Format('Usage',{render:'download'});">
        <img src="button-print.png">
    </a>

Options
  * pageWidth - [default 8.5in] Printed Media Page Width
  * pageHeight - [default 11in] Printed Media Page Height
  * pageMargin - [default 0.5in] Printed Media Page Margin Dimensions (short-hand)
  * pageMarginTop - Printed Media Page Margin Top Dimension
  * pageMarginRight - Printed Media Page Margin Right Dimension
  * pageMarginBottom - Printed Media Page Margin Bottom Dimension
  * pageMarginLeft - Printed Media Page Margin Left Dimension
  * pageMediaResource - A fully qualified URL to your own stylesheet
  * cssStyle - CSS styles to place directly on the container element (to override computed styles)
  * foStyle - FO styles to place directly on the container element (to override cssStyles during XSL-FO rendering)
  * render - options to control the result of the rendering
  * none - Runs the client-side HTML+CSS and media styling without PDF rendering
  * newwin - [default on Firefox and Chrome] Embeds the rendered PDF into a new window client must enable pop-up's for this to work
  * download - [default and only option on Internet Explorer and Safari as well as all mobile browsers] After PDF rendering the user is prompted to download and save the PDF result

All options are optional and will defer to their default values when not specified
