
//-----------------------------------------------------------------
// Name: funShowPage()
// Description: Show a page within an iframe.
// Note:- to change the style of the Print & Close window text add the style into the iPage table as below
//-----------------------------------------------------------------

function funShowPage(divId, frameid, page, id, width, height) 
{ 	
	var iPage = ""; 	
	var iStyle = ""; 	
	var iHeader = "";
	var objref = xbGetElementById(divId); 	
	var txtPos = "";
	
	if (objref) 	
	{ 	
	 	iStyle = "STYLE='position:relative;width:" + width + "px;height:" + height + "px;'";
		iPage = "<table class='links' width='" + (width + 10) + "'><tr><td align='left'><a href='javascript:funPrintList(\"" + page + "\");'>Print List</a></td><td align='right'><a href='javascript:funClosePage();'>Close Window</a></td></tr></table>";
		iPage +="<IFRAME NAME='" + id + "' ID='" + id + "' " + iStyle + " SRC='" + page + "' FRAMEBORDER=0></IFRAME>"; 		
		objref.innerHTML = iPage; 	
		objref.style.visibility = 'visible';
		objref.style.display = 'block'; 	
	}
}

//-----------------------------------------------------------------
// Name: funClosePage(divId)
// Description: Close the Window
//-----------------------------------------------------------------

function funClosePage()
{
	var objref = xbGetElementById("dvEquineAffairs");
	if (objref)
	{
		objref.innerHTML = "";
		objref.style.visibility = 'hidden';
		objref.style.display = 'none';
	}	
}

//-----------------------------------------------------------------
// Name: funPrintList(pagetoload)
// Description: Prints List
//-----------------------------------------------------------------

function funPrintList(pagetoload)
{
	var winOptions ='directories=no,location=no,menubar=yes,titlebar=no,alwaysRaised=yes,dep endent=yes,scrollbars=yes,width=800,height=500, top=50,left=50';
	var w = window.open(pagetoload, 'PrintList', winOptions);
}

//-----------------------------------------------------------------
// Name: funGetWidthHeight(width, height, widthOfTable)
// Description: Retrieves the base position of the list depending
// on the type of browser and the screen resolution. The positioning
// is based on an 800 x 600 screen and we need to increase the positioning
// based on other screen resolutions.
//-----------------------------------------------------------------

function funGetWidthHeight(width,  height, widthOfTable)
{
	var theWidth = 0;
	var theHeight = 0;
	var posWidth = 0;
	var posHeight = 0;
	
	if (window.innerWidth)
	{
		theWidth = window.innerWidth;
		theHeight = window.innerHeight;
	}
	else if (document.documentElement &&
			 document.documentElement.clientWidth)
	{
		theWidth = document.documentElement.clientWidth;
		theHeight = document.documentElement.clientHeight;
	}
	else if (document.body)
	{
		theWidth = document.body.clientWidth;
		theHeight = document.body.clientHeight;
	}
	
	if (theWidth == 0)
	{
		posWidth = width;
		posHeight = height; 
	}
	else
	{
		posWidth = width + (theWidth - 800);
		posHeight = height + (theHeight - 600);
	}
	
	alert("theWidth = " + theWidth);
	alert("theHeight = " + theHeight);
	alert("posWidth = " + posWidth);
	alert("posHeight = " + posHeight);
	
	return "top:" + posHeight + "px;left:" + posWidth + "px;"
}