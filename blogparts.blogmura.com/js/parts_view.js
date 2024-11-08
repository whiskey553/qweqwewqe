function blogmuraBlogparts(elem, chid, size, oldCatid, oldSubCatid, type, catid) {
  if (elem != null) {
    var height = "382";

    var width = "200";
    if (size != null && size != "") {
      width = size;
    } else if (elem.clientWidth != null) {
      width = elem.clientWidth;
    }

    var query = "&oldCatId=" + oldCatid;
    query += "&oldSubCatId=" + oldSubCatid;
    query += "&type=" + type;
    query += "&catId=" + catid;

    var imgSrc = "https://blogparts.blogmura.com/pts/pvcount.GIF?chid=" + chid;
    var iframeSrc = "https://blogmura.com/blogmura_parts.html?chid=" + chid + query;

    var source = '<img src="' + imgSrc + '" border="0" width="0" height="0" alt="blogmura_pvcount">';
    source += '<iframe id="parts_frame" src="' + iframeSrc + '" width="' + width + '" height="' + height + '" scrolling="no" style="border:none;"></iframe>';

    elem.innerHTML = source;
  }
}

var partsDomain = "blogparts.blogmura.com";
function currentScriptSrc() {
  if (document.currentScript) {
    return document.currentScript.src;
  } else {
    var scripts = document.getElementsByTagName('script');
    for ( var i = scripts.length-1; i > 0; i--) {
      var script = scripts[i];
      if(script.src && script.src.indexOf(partsDomain) > -1) {
        return script.src;
      }
    }
    return false;
  }
}

function getJsParam() {
  var src = currentScriptSrc();
  if(src) {
    var query = src.substring( src.indexOf( '?' ) + 1 );
    var params = query.split( '&' );
    var result = new Object();
    for ( var i = 0; i < params.length; i++) {
      var elem = params[i].split('=');
      var name = decodeURIComponent( elem[ 0 ] );
      var val = decodeURIComponent( elem[ 1 ] );
      result[name] = val;
    }
    return result;
  }
  return false;
}

var elemBlogmura = null;
var chidBlogmura = null;
var typeBlogmura = null;
var categoryBlogmura = null;

if (document.getElementsByClassName('blogmura-blogparts').length) {
  elemBlogmura = document.getElementsByClassName('blogmura-blogparts')[0];
  chidBlogmura = elemBlogmura.dataset.chid;
  typeBlogmura = elemBlogmura.dataset.type;
  if (typeBlogmura == null) {
    typeBlogmura = "";
  }
  categoryBlogmura = elemBlogmura.dataset.category;
  if (categoryBlogmura == null) {
    categoryBlogmura = "";
  }
} else if (document.getElementById('inner_space')) {
  elemBlogmura = document.getElementById('inner_space');
}

if (chidBlogmura != null) {
  blogmuraBlogparts(elemBlogmura, chidBlogmura, "", "", "", typeBlogmura, categoryBlogmura);
}

function parts(chid, bgcolor, size, link, time, catid, subcatid, select, host, border, dspSize, bgcolor2, link2) {
  if (chidBlogmura == null) {
    blogmuraBlogparts(elemBlogmura, chid, size, catid, subcatid, select, "");
  }
}

var p = getJsParam();
if (p && p.chid != null && p.chid != "") {
  parts(p.chid, p.bgcolor, p.size, p.link, p.time, p.catid, p.subcatid, p.select, p.host, p.border, p.dspsize, p.bgcolor2, p.link2);
}
