var mainArea = null;
var leftMenuArea = null;

function displayStatusWindow()
{
	window.mainArea.getSection(1).content.innerHTML = "<h1>TLD Status</h1>";
}

function displayWirelessWindow()
{
	window.mainArea.getSection(1).content.innerHTML = "<h1>Wireless</h1>";
}

function displayServiceWindow()
{
	window.mainArea.getSection(1).content.innerHTML = "<h1>Servicing</h1>";
}

function displayOtherWindow()
{
	window.mainArea.getSection(1).content.innerHTML = "<h1>Other</h1>";
}


$(window).bind("load", function() {

	LiteGUI.init();

	// var mainmenu = new LiteGUI.Menubar("mainmenubar");
	// LiteGUI.add( mainmenu );

	window.mainArea = new LiteGUI.Area("mainarea",{content_id:"canvasarea", height: "calc( 100% - 20px )", main:true, inmediateResize: true});
	LiteGUI.add( window.mainArea );

	console.log( window.mainArea );

	// Create left menu space
	window.mainArea.split("horizontal", ["15%", null], false );
	window.leftMenuArea = window.mainArea.getSection(0);
	console.log( "style" );
	// leftMenuArea.content.style.margin = '0px';
	console.log( window.leftMenuArea.content.style );
	window.leftMenuArea.content.style.setProperty( 'background-color', '#1A1A1A' );

	window.leftMenuArea.add( new LiteGUI.Button( "Status", { callback: function(v){ displayStatusWindow(); } } ) );
	window.leftMenuArea.add( new LiteGUI.Button( "Wireless", { callback: function(v){ displayWirelessWindow(); } } ) );
	window.leftMenuArea.add( new LiteGUI.Button( "Service", { callback: function(v){ displayServiceWindow(); } } ) );
	window.leftMenuArea.add( new LiteGUI.Button( "Other", { callback: function(v){ displayOtherWindow(); } } ) );

	window.mainArea.getSection(1).content.innerHTML = "<h1>The Inter UI font family</h1>";

	LiteGUI.alert("foo");

});
