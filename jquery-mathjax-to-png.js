(function ( $ ) {
  "use strict";
  $.fn.toXml = function () {

    var data = [];
    $(this).each(function () {
      var svgData = new XMLSerializer().serializeToString(this);
      data.push(svgData);
    });

    if (data.length == 1)
      return data[0];
    else
      return data;
  };

  $.fn.toImage = function() {

    var i = (new Date()).getTime();

  	var $glyphs = $("#MathJax_SVG_glyphs").clone();	

    $glyphs.attr("id", "MathJax_SVG_glyphs-" + i).find("path").each(function(j, path) {
      $(path).attr("id", $(path).attr("id") + "-" + i);
    });

    $(this).prepend($glyphs);
    $(this).attr("id", "svg-"+i);

    $(this).find("use").each(function (j, use) {
      $(use).attr("href", $(use).attr("href") + "-" + i);
    });

    var $imgsvg = $("<img class='imgsvg'></img>");
    $imgsvg.attr("src", "data:image/svg+xml;base64," + window.btoa($(this).toXml()));

    var image = $imgsvg[0];

    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    var context = canvas.getContext("2d");
    context.drawImage(image, 0, 0);

    var $img = $("<img></img>");
    $img.attr("id", "img-"+i);
    $(this).after($img).remove();

  };
})( jQuery );