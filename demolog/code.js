var mainarea = null;

var charts = {};
var chartsPanel = null;
var chartsToggles = null;
var globalCpt = 0;

function addChart( chartName, chartType )
{
	var objToPush = {
						type: chartType,
						chartObject: new LiteGUI.Chart( "achart", { height: 250, title: chartName, maxElems: 250 })
					};
	window.charts.set( chartName, objToPush );
	window.chartsPanel.add( objToPush.chartObject );
	window.chartsToggles.addCheckbox( chartName, true, { 	name_width: 200, 
															callback:
		function(value)
		{ 
			toggleChart( chartName, value );
		}
 
	});
}

function pushData( chartName, ts, value )
{
	myChart = window.charts.get( chartName );
	// Create the entry if it does not exists
	if( typeof myChart == "undefined" )
	{
		console.log( "creating chart !" );
		addChart( chartName, "line" );
	}
	myChart.chartObject.pushData( ts, value );
}

function updateChart()
{
	pushData( "gyro_x", globalCpt, Math.random() );
	pushData( "gyro_y", globalCpt, Math.random() );
	pushData( "gyro_z", globalCpt, Math.random() );
	globalCpt++;
}

$(window).bind("load", function() { 

	LiteGUI.init(); 

	var mainmenu = new LiteGUI.Menubar("mainmenubar");
	LiteGUI.add( mainmenu );

	mainarea = new LiteGUI.Area("mainarea",{content_id:"canvasarea", height: "calc( 100% - 20px )", main:true, inmediateResize: true});
	LiteGUI.add( mainarea );
	
	//split mainarea
	createSidePanel();

	mainarea.getSection(0).split("vertical",[null,"300px"],true);

	// Split console
	createBottomConsole();

	// Add stuff to the main area
	window.chartsPanel = new LiteGUI.Panel( "mainpanel", { scroll: true } );

	window.charts = new Map();  

	// addChart( "gyro_x", "line" );
	// addChart( "popo2", "line" );  

	mainarea.getSection(0).add( window.chartsPanel );
/*
	mainarea.getSection(0).add( new LiteGUI.Chart() );
	mainarea.getSection(0).add( new LiteGUI.Chart() );
*/

	setInterval(function(){updateChart()}, 1);

});

function toggleChart( chartName, value )
{
	// Retrieve chart to toggle
	myChart = window.charts.get( chartName );
	if( myChart != null )
	{
		if( value )
			myChart.chartObject.show();
		else
			myChart.chartObject.hide();
	}
	else
	{
		console.log( "nope" );
	}
}

function createBottomConsole()
{
	var docked_bottom = new LiteGUI.Panel("bottom_panel", {title:'CONSOLE LOG',hide:true});
	mainarea.getSection(0).getSection(1).add( docked_bottom );
	$(docked_bottom).trigger("closed",function() { LiteGUI.mainarea.getSection(0).merge() });
	var console = new LiteGUI.Console();
	docked_bottom.add( console );
}

function createSidePanel()
{
	mainarea.split("horizontal",[null,240],true);
	var docked = new LiteGUI.Panel("right_panel", {title:'Inputs', close: true});
	mainarea.getSection(1).add( docked );
	$(docked).bind("closed", function() { mainarea.merge(); });
	window.sidepanel = docked;
	updateSidePanel( docked );
	
	window.chartsToggles =  new LiteGUI.Inspector();

	window.sidepanel.add( window.chartsToggles );
}

function updateSidePanel( root )
{
	root = root || window.sidepanel;
	$(root.content).empty();
}
