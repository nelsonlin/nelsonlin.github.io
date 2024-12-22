/**
 * Copyright 2010 BQ Luan. All Rights Reserved.
 *
 * This file is part of JsXiangqi.
 *
 * JsXiangqi is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * JsXiangqi is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with JsXiangqi.  If not, see http://www.gnu.org/license.
 */

/**
 * @fileoverview Chesspiece
 */

goog.provide('bq.Chesspiece');

goog.require('goog.ui.Control');
goog.require('bq.ChesspieceRenderer');

/**
 * Class representing a chesspiece.
 *
 * @param {bq.Chesspiece.Face} face Text caption or DOM structure to
 *     display as the content of the item (use to add icons or styling to
 *     menus).
 * @param {bq.Chesspiece.Color} color The color of this piece.
 * @param {bq.ChesspieceRenderer=} opt_renderer Optional renderer.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper used for
 *     document interactions.
 * @constructor
 * @extends {goog.ui.Control}
 */
bq.Chesspiece = function(face, color, opt_renderer, opt_domHelper) {
    goog.ui.Control.call(this, undefined, opt_renderer ||
        bq.ChesspieceRenderer.getInstance(), opt_domHelper);
    this.setFace(face);
    this.setColor(color);
    this.setSupportedState(goog.ui.Component.State.SELECTED, true);
};
goog.inherits(bq.Chesspiece, goog.ui.Control);

/**
 * @enum {number}
 */
bq.Chesspiece.Color = {
  RED: 0,
  BLACK: 1
};

bq.Chesspiece.Face = {
  CHE: 0,
  MA: 1,
  XIANG: 2,
  SHI: 3,
  JIANG: 4,
  PAO: 5,
  BING: 6
};
//將是帥，士是仕，象是相，車是車，馬是馬，炮是炮，卒是兵
//4,3,2,0,1,6,5

/**
 * @type {number} The color of this piece.
 */
bq.Chesspiece.prototype.color_ = undefined;

bq.Chesspiece.prototype.face_ = undefined;

bq.Chesspiece.prototype.setColor = function(color) {
  if(this.isInDocument())
    this.getRenderer().setColor(color);
  this.color_ = color;
};

bq.Chesspiece.prototype.getColor = function() {
  return this.color_;
};

bq.Chesspiece.prototype.setFace = function(face) {
  if(this.isInDocument())
    this.getRenderer().setFace(face);
  this.face_ = face;
};

bq.Chesspiece.prototype.getFace = function() {
  return this.face_;
};

bq.Chesspiece.prototype.getWidth = function() {
  return bq.ChesspieceRenderer.Width;
};

/**
 * @param {number} left
 * @param {number} top
 */
bq.Chesspiece.prototype.setPosition = function(left, top) {
  if(this.isInDocument())
    this.getRenderer().setPosition(this.getElement(), left, top);
};

// Hotkey mapping for selecting pieces
document.addEventListener('keydown', function(event) {
  switch(event.key.toLowerCase()) {
    case 'c':
      selectPiece(bq.Chesspiece.Face.CHE);
      break;
    case 'm':
      selectPiece(bq.Chesspiece.Face.MA);
      break;
    case 'x':
      selectPiece(bq.Chesspiece.Face.XIANG);
      break;
    case 's':
      selectPiece(bq.Chesspiece.Face.SHI);
      break;
    case 'j':
      selectPiece(bq.Chesspiece.Face.JIANG);
      break;
    case 'p':
      selectPiece(bq.Chesspiece.Face.PAO);
      break;
    case 'b':
      selectPiece(bq.Chesspiece.Face.BING);
      break;
  }
});

/**
 * Selects a chess piece based on the given face type.
 * @param {number} face The face type of the chess piece.
 */
function selectPiece(face) {
  // Implement the logic to select the piece based on the face type
  console.log('Selected piece:', face);
  // Add your selection logic here
}
