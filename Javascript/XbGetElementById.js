// function: Browser
// Description: This function determines the type of browser the client uses to access this page.
function Browser()
{
    var b=navigator.appName;
    if (b=="Netscape") this.b="ns";
    else if ((b=="Opera") || (navigator.userAgent.indexOf("Opera")>0)) this.b = "opera";
    else if (b=="Microsoft Internet Explorer") this.b="ie";
    if (!b) alert('Unidentified browser./nThis browser is not supported,');
    this.version=navigator.appVersion;
    this.v=parseInt(this.version);
    this.ns=(this.b=="ns" && this.v>=4);
    this.ns4=(this.b=="ns" && this.v==4);
    this.ns6=(this.b=="ns" && this.v==5);
    this.ie=(this.b=="ie" && this.v>=4);
    this.ie4=(this.version.indexOf('MSIE 4')>0);
    this.ie5=(this.version.indexOf('MSIE 5')>0);
    this.ie55=(this.version.indexOf('MSIE 5.5')>0);
    this.opera=(this.b=="opera");
    this.dom=(document.createElement && document.appendChild && document.getElementsByTagName)?true:false;
    this.def=(this.ie||this.dom); // most used browsers, for faster if loops
    var ua=navigator.userAgent.toLowerCase();
    if (ua.indexOf("win")>-1) this.platform="win32";
    else if (ua.indexOf("mac")>-1) this.platform="mac";
    else this.platform="other";

    // For Netscape capture mouse events.
    if (!this.ie)
    {
        document.captureEvents(Event.MOUSEMOVE);
    }
}
is = new Browser();

function xbToInt(s)
{
  var i = parseInt(s, 10);
  if (isNaN(i))
    i = 0;

  return i;
}

function xbGetWindowWidth(windowRef)
{
  var width = 0;

  if (!windowRef)
  {
    windowRef = window;
  }

  if (typeof(windowRef.innerWidth) == 'number')
  {
    width = windowRef.innerWidth;
  }
  else if (windowRef.document.body && typeof(windowRef.document.body.clientWidth) == 'number')
  {
    width = windowRef.document.body.clientWidth;
  }

  return width;
}

function xbGetWindowHeight(windowRef)
{
  var height = 0;

  if (!windowRef)
  {
    windowRef = window;
  }

  if (typeof(windowRef.innerWidth) == 'number')
  {
    height = windowRef.innerHeight;
  }
  else if (windowRef.document.body && typeof(windowRef.document.body.clientWidth) == 'number')
  {
    height = windowRef.document.body.clientHeight;
  }
  return height;
}

function xbGetElementsByNameAndType(name, type, windowRef)
{
  if (!windowRef)
    windowRef = window;

  var elmlist = new Array();

  xbFindElementsByNameAndType(windowRef.document, name, type, elmlist);

  return elmlist;
}

function xbFindElementsByNameAndType(doc, name, type, elmlist)
{
  var i;
  var subdoc;

  for (i = 0; i < doc[type].length; ++i)
  {
    if (doc[type][i].name && name == doc[type][i].name)
    {
      elmlist[elmlist.length] = doc[type][i];
    }
  }

  if (doc.layers)
  {
    for (i = 0; i < doc.layers.length; ++i)
    {
      subdoc = doc.layers[i].document;
      xbFindElementsByNameAndType(subdoc, name, type, elmlist);
    }
  }
}

if (document.layers)
{
  nav4FindLayer = function (doc, id)
  {
    var i;
    var subdoc;
    var obj;

    for (i = 0; i < doc.layers.length; ++i)
    {
      if (doc.layers[i].id && id == doc.layers[i].id)
        return doc.layers[i];

      subdoc = doc.layers[i].document;
      obj    = nav4FindLayer(subdoc, id);
      if (obj != null)
        return obj;
    }
    return null;
  }

  nav4FindElementsByName = function (doc, name, elmlist)
  {
    var i;
    var j;
    var subdoc;

    for (i = 0; i < doc.images.length; ++i)
    {
      if (doc.images[i].name && name == doc.images[i].name)
      {
        elmlist[elmlist.length] = doc.images[i];
      }
    }

    for (i = 0; i < doc.forms.length; ++i)
    {
      for (j = 0; j < doc.forms[i].elements.length; j++)
      {
        if (doc.forms[i].elements[j].name && name == doc.forms[i].elements[j].name)
        {
          elmlist[elmlist.length] = doc.forms[i].elements[j];
        }
      }

      if (doc.forms[i].name && name == doc.forms[i].name)
      {
        elmlist[elmlist.length] = doc.forms[i];
      }
    }

    for (i = 0; i < doc.anchors.length; ++i)
    {
      if (doc.anchors[i].name && name == doc.anchors[i].name)
      {
        elmlist[elmlist.length] = doc.anchors[i];
      }
    }

    for (i = 0; i < doc.links.length; ++i)
    {
      if (doc.links[i].name && name == doc.links[i].name)
      {
        elmlist[elmlist.length] = doc.links[i];
      }
    }

    for (i = 0; i < doc.applets.length; ++i)
    {
      if (doc.applets[i].name && name == doc.applets[i].name)
      {
        elmlist[elmlist.length] = doc.applets[i];
      }
    }

    for (i = 0; i < doc.embeds.length; ++i)
    {
      if (doc.embeds[i].name && name == doc.embeds[i].name)
      {
        elmlist[elmlist.length] = doc.embeds[i];
      }
    }

    for (i = 0; i < doc.layers.length; ++i)
    {
      if (doc.layers[i].name && name == doc.layers[i].name)
      {
        elmlist[elmlist.length] = doc.layers[i];
      }

      subdoc = doc.layers[i].document;
      nav4FindElementsByName(subdoc, name, elmlist);
    }
  }

  xbGetElementById = function (id, windowRef)
  {
    if (!windowRef)
      windowRef = window;

    return nav4FindLayer(windowRef.document, id);
  };

  xbGetElementsByName = function (name, windowRef)
  {
    if (!windowRef)
      windowRef = window;

    var elmlist = new Array();

    nav4FindElementsByName(windowRef.document, name, elmlist);

    return elmlist;
  };

}
else if (document.all)
{
  xbGetElementById = function (id, windowRef)
  {
    if (!windowRef)
    {
      windowRef = window;
    }
    var elm = windowRef.document.all[id];
    if (!elm)
    {
      elm = null;
    }
    return elm;
  };

  xbGetElementsByName = function (name, windowRef)
  {
    if (!windowRef)
      windowRef = window;

    var i;
    var idnamelist = windowRef.document.all[name];
    var elmlist = new Array();

    if (!idnamelist.length || idnamelist.name == name)
    {
      if (idnamelist)
        elmlist[elmlist.length] = idnamelist;
    }
    else
    {
      for (i = 0; i < idnamelist.length; i++)
      {
        if (idnamelist[i].name == name)
          elmlist[elmlist.length] = idnamelist[i];
      }
    }

    return elmlist;
  }

}
else if (document.getElementById)
{
  xbGetElementById = function (id, windowRef)
  {
    if (!windowRef)
    {
      windowRef = window;
    }
    return windowRef.document.getElementById(id);
  };

  xbGetElementsByName = function (name, windowRef)
  {
    if (!windowRef)
    {
      windowRef = window;
    }
    return windowRef.document.getElementsByName(name);
  };
}
else
{
  xbGetElementById = function (id, windowRef)
  {
    return null;
  };

  xbGetElementsByName = function (name, windowRef)
  {
    return new Array();
  };
}

function xbGetPageScrollX(windowRef)
{
  if (!windowRef)
  {
    windowRef = window;
  }

  if (typeof(windowRef.pageXOffset) == 'number')
  {
    return windowRef.pageXOffset;
  }

  if (typeof(windowRef.document.body && windowRef.document.body.scrollLeft) == 'number')
  {
    return windowRef.document.body.scrollLeft;
  }

  return 0;
}

function xbGetPageScrollY(windowRef)
{
  if (!windowRef)
  {
    windowRef = window;
  }

  if (typeof(windowRef.pageYOffset) == 'number')
  {
    return windowRef.pageYOffset;
  }

  if (typeof(windowRef.document.body && windowRef.document.body.scrollTop) == 'number')
  {
    return windowRef.document.body.scrollTop;
  }

  return 0;
}

if (document.layers)
{
  xbSetInnerHTML = function (element, str)
  {
    element.document.write(str);
    element.document.close();
  };
}
else
{
  xbSetInnerHTML = function (element, str)
  {
    if (typeof(element.innerHTML) != 'undefined')
    {
      element.innerHTML = str;
    }
  };
}