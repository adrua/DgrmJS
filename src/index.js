import { moveEvtMobileFix } from './infrastructure/move-evt-mobile-fix.js';
import { CanvasSmbl } from './infrastructure/canvas-smbl.js';
import { moveScaleApplay } from './infrastructure/move-scale-applay.js';
import { evtRouteApplay } from './infrastructure/evt-route-applay.js';
import { copyPastApplay, groupSelectApplay } from './diagram/group-select-applay.js';
import { shapeTypeMap } from './shapes/shape-type-map.js';
import { clickForAll, evtTargetAttr } from './infrastructure/util.js';
import { deserialize, serialize } from './diagram/dgrm-serialization.js';

import './ui/menu.js';
import './ui/shape-menu.js';
import { tipShow } from './ui/ui.js';

export { tipShow, uiDisable } from './ui/ui.js';
export { srvGet } from './diagram/dgrm-srv.js';
export { deserialize, serialize } from './diagram/dgrm-serialization.js';

export class DgrmJsComponent extends HTMLElement {
	/** @param {(cms:string)=>void} cmdHandler */
	constructor(cmdHandler) {
		super();
		/** @private */
		this._cmdHandler = cmdHandler;
	}

	serialize() {
		return serialize(this.canvas);
	}

	/**
	 * @param {import("./diagram/dgrm-serialization.js").DiagramSerialized} data
	 */
	deserialize(data) {
		tipShow(this.canvas, false);
		return deserialize(this.canvas, data);
	}

	connectedCallback() {
		//--const shadow = this.attachShadow({ mode: 'closed' });
		this.innerHTML = `
		<link rel="icon" type="image/png"
		href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAN5JREFUSEvNlc0RgyAQRtk2xEsqyaQEtYCYyoIFxFpSQg6BczrYDEZn+BdXnAk3D7zHt6wLsIMXHMxn/y+oRiUYwzMANrKpn25FdiWY4dcZ+gHAiyshC/jj3SPA3TmxJyELNNhJsLhequWn5WOzYIIiour4LSyBQbVVTxJYJ0YmfIkN15LsBMFyGBJ9J7KrBamLIrX+sQxJ6KddTZCET0S/LKYoKdgLT95BCXhUUAoeFJSEe4LS8IBAYvx9SHdLbJ/VRdUYE9DgmQno8AzBPvimWUR9u1dHBRVMGtcU2RcViIEZF5cYswAAAABJRU5ErkJggg==">
	<style>
		html,
		body,
		#diagram {
			height: 100%;
			width: 100%;
			margin: 0;
			user-select: none;
			font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
			font-size: 16px;
			color: rgb(73, 80, 87);
			outline: none; 
			z-index: 1
		}

		a {
			color: #0d6efd;
			text-decoration: underline;
		}

		@media only screen and (max-width: 700px) {
			.links {
				display: none;
			}	
		}
		#menu-shape {
			height: 100%;
			width: 10%;
			z-index: 10
		}
		#tip {
			z-index: 10;
			left: 50%; 
			top: 30%; 
			min-width: 290px; 
			position: relative;
		}
	</style>
		<ap-menu-shape id="menu-shape"></ap-menu-shape>
		<div id="tip">
			<svg viewBox="0 0 24 24" width="24" height="24">
				<path fill="none" d="M0 0h24v24H0z" />
				<path
					d="M10 3h4a8 8 0 1 1 0 16v3.5c-5-2-12-5-12-11.5a8 8 0 0 1 8-8zm2 14h2a6 6 0 1 0 0-12h-4a6 6 0 0 0-6 6c0 3.61 2.462 5.966 8 8.48V17z"
					fill="rgb(230,126,34)" />
			</svg>Tip
			<ul>
				<li>drag diagram image here to open</li>
				<li>to select multiple shapes use long press</li>
			</ul>
			<a href="/tip/" style="margin-left: 24px; line-height: 25px;">View tips and tricks</a>
		</div>
	
		<svg id="diagram" tabindex="0" style="width: 100%; height: 100%; touch-action: none; background-color: #fff; display:block; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none;">
		<style type="text/css">
			text {
				white-space: pre-wrap;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 16px;
				color: rgb(73, 80, 87);
			}

			textarea {
				text-align: center;
				border: none;;
				padding: 10px;
				padding-top: 0.8em;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				font-size: 16px;
				background-color: transparent;
				color: transparent;
				outline: none;
				overflow: hidden;
				resize: none;
				line-height: 1em;
				caret-color: #fff;
			}	

			[data-connect] { display: none; }

			.select path[data-key="selected"],
			.select .path-end,
			.select [data-connect],
			.highlight-e [data-key="end"] .path-end,
			.highlight-s [data-key="start"] .path-end,
			.hover [data-connect] {
				display: unset;
				opacity: 0.51;
				stroke: rgb(108 187 247);
				fill: rgb(108 187 247);
			}
			[data-connect].hover { stroke-width: 25px; }

			.select path[data-key="selected"] { fill:none; }

			.highlight [data-key="main"]{
				paint-order: stroke;
				stroke-width: 10px;
				stroke: rgb(108 187 247 / 51%);
			}
			
			.shpath [data-key="end"] .path,
			.shpath [data-key="start"] .path { display: none;}
			.shpath.arw-e [data-key="end"] .path,
			.shpath.arw-s [data-key="start"] .path { display: unset;}
			.shpath.dash [data-key="path"] { stroke-dasharray:5; }

			@media (pointer: coarse) {
				circle.path-end { r: 20px; }
				.ative-elem {
					stroke: rgb(108 187 247 / 51%);
					stroke-width: 70px;
				}
	
				[data-connect] { stroke-width: 15px; }
				[data-connect].hover { stroke-width: 70px; }
			}


			/* rect, text shape */
			.shrect.ta-1 text, .shtxt.ta-1 text { text-anchor: start; }
			.shrect.ta-2 text, .shtxt.ta-2 text { text-anchor: middle; }
			.shrect.ta-3 text, .shtxt.ta-3 text { text-anchor: end; }
			.shrect.ta-1 textarea, .shtxt.ta-1 textarea { text-align: left; }
			.shrect.ta-2 textarea, .shtxt.ta-2 textarea { text-align: center; }
			.shrect.ta-3 textarea, .shtxt.ta-3 textarea { text-align: right; }
			.shtxt textarea { caret-color: rgb(73, 80, 87); }
			.shtxt text { fill:rgb(73, 80, 87); }
			.shtxt [data-key="main"] { fill: transparent; stroke: transparent; }
			.shtxt.select [data-key="main"], .shtxt.highlight [data-key="main"] { stroke: rgb(108 187 247 / 51%); stroke-width: 2px; }

			/* rhomb shape */
			.shrhomb.highlight [data-key="border"] { stroke-width: 28px; stroke: rgb(108 187 247 / 51%); }
			.shrhomb.highlight [data-key="main"] { stroke-width:18px; stroke:#1D809F; }

			/* shape settings styles */
			.cl-red [data-key="main"] { fill: #E74C3C; } .cl-red .path { stroke: #E74C3C;}
			.cl-orange [data-key="main"] { fill: #ff6600;} .cl-orange .path { stroke: #ff6600;}
			.cl-green [data-key="main"] { fill: #19bc9b;} .cl-green .path { stroke: #19bc9b;}
			.cl-blue [data-key="main"] { fill: #1aaee5;} .cl-blue .path { stroke: #1aaee5;}
			.cl-dblue [data-key="main"] { fill: #1D809F;} .cl-dblue .path { stroke: #1D809F;}
			.cl-dgray [data-key="main"] { fill: #495057;} .cl-dgray .path { stroke: #495057;}

			.shtxt.cl-red [data-key="main"] { fill: transparent; } .shtxt.cl-red text { fill: #E74C3C; }
			.shtxt.cl-orange [data-key="main"] { fill: transparent; } .shtxt.cl-orange text { fill: #ff6600; }
			.shtxt.cl-green [data-key="main"] { fill: transparent; } .shtxt.cl-green text { fill: #19bc9b; }
			.shtxt.cl-blue [data-key="main"] { fill: transparent; } .shtxt.cl-blue text { fill: #1aaee5; }
			.shtxt.cl-dblue [data-key="main"] { fill: transparent; } .shtxt.cl-dblue text { fill: #1D809F; }
			.shtxt.cl-dgray [data-key="main"] { fill: transparent; } .shtxt.cl-dgray text { fill: #495057; }

			.shrhomb.cl-red [data-key="main"] { stroke-width:18px; stroke:#E74C3C; }
			.shrhomb.cl-orange [data-key="main"] { stroke-width:18px; stroke:#ff6600; }
			.shrhomb.cl-green [data-key="main"] { stroke-width:18px; stroke:#19bc9b; }
			.shrhomb.cl-blue [data-key="main"] { stroke-width:18px; stroke:#1aaee5; }
			.shrhomb.cl-dblue [data-key="main"] { stroke-width:18px; stroke:#1D809F; }
			.shrhomb.cl-dgray [data-key="main"] { stroke-width:18px; stroke:#495057; }
		</style>
		<g id="canvas"></g>
	</svg>`;

		clickForAll(this, '[data-cmd]',
			evt => this._cmdHandler(evtTargetAttr(evt, 'data-cmd')));

		// @ts-ignore
		/** @type {import('./infrastructure/canvas-smbl.js').CanvasElement} */ this.canvas = this.querySelector('#canvas');

		this.canvas[CanvasSmbl] = {
			data: {
				position: { x: 0, y: 0 },
				scale: 1,
				cell: 24
			},
			shapeMap: shapeTypeMap(this.canvas)
		};

		moveEvtMobileFix(this.canvas.ownerSVGElement);
		evtRouteApplay(this.canvas.ownerSVGElement);
		copyPastApplay(this.canvas);
		groupSelectApplay(this.canvas); // groupSelectApplay must go before moveScaleApplay
		moveScaleApplay(this.canvas);
		/** @type { import('./ui/shape-menu').ShapeMenu } */(this.querySelector('#menu-shape')).init(this.canvas);
	}
}
customElements.define('ap-dgrmjs', DgrmJsComponent);
