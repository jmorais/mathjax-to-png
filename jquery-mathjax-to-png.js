$.fn.toXml = function () {
  data = [];
  $(this).each(function () {
    var svg$ = $(this);
    var svgData = new XMLSerializer().serializeToString(this);

    data.push(svgData);
  })

  if (data.length == 1)
    return data[0];
  else
    return data;
}

$.fn.toImage = function() {

  var i = (new Date).getTime();

	$glyphs = $("#MathJax_SVG_glyphs").clone();	

  $glyphs.attr("id", "MathJax_SVG_glyphs-" + i).find("path").each(function(j, path) {
    $(path).attr("id", $(path).attr("id") + "-" + i);
  });

  $(this).prepend($glyphs);
  $(this).attr("id", "svg-"+i);

  $(this).find("use").each(function (j, use) {
    $(use).attr("href", $(use).attr("href") + "-" + i);
  });

  $imgsvg = $("<img class='imgsvg'></img>");
  $imgsvg.attr("src", 'data:image/svg+xml;base64,' + window.btoa($(this).toXml()));

  image = $imgsvg[0];

  var canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  var context = canvas.getContext('2d');
  context.drawImage(image, 0, 0);

  $img = $("<img></img>");
  $img.attr("id", "img-"+i);
  $(this).after($img).remove();

}