/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Determines Normalized Device Coords => Window Coords
 */
glViewport(0,0,width,height);

/*
 * Eye Coord => Clip Coords
 */
glMatrixMode(GL_PROJECTION);
glLoadIdentity();

glFrustumf(-1, 1, -1, 1, 5, 10);

/*
 * Object Coords => Eye Coords
 */
glMatrixMode(GL_MODELVIEW);
glLoadIdentity();