import { circle } from './circle.js';
import { path } from './path.js';
import { rect } from './rect.js';
import { rhomb } from './rhomb.js';

/**
 * @param {Element} svg
 * @param {{position:Point, scale:number, cell:number}} canvasData
 * @returns {Record<number, ShapeType>}
 */
export function shapeTypeMap(svg, canvasData) {
	return {
		0: { create: shapeData => path(svg, canvasData, shapeData) },
		1: { create: shapeData => circle(svg, canvasData, shapeData), center: { x: 0, y: 0 } },
		2: { create: shapeData => rect(svg, canvasData, shapeData), center: { x: 48, y: 24 } },
		3: { create: shapeData => { /** @type {RectData} */(shapeData).t = true; return rect(svg, canvasData, shapeData); }, center: { x: 48, y: 24 } },
		4: { create: shapeData => rhomb(svg, canvasData, shapeData), center: { x: 48, y: 48 } }
	};
}

/** @typedef { {x:number, y:number} } Point */
/** @typedef {import('./rect.js').RectData} RectData */
/**
@typedef {{
create: (shapeData)=>SVGGraphicsElement
center?: Point
}} ShapeType
*/
