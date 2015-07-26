<!DOCTYPE html>
<!--
<script src="three.js/examples/js/controls/FirstPersonControls.js"></script>
        <script src="three.js/examples/js/controls/OrbitControls.js"></script>
        <script src="three.js/examples/js/controls/PointerLockControls.js"></script>
        <script src="machine/main.js"></script>
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title>Ripper</title>
        <style>
            html, body {
                width: 100%;
                height: 100%;
            }
            body {
                background-color: #ffffff;
                margin: 0;
                overflow: hidden;
                font-family: arial;
            }
            #blocker {
                position: absolute;
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,0.5);
            }
            #instructions {
                width: 100%;
                height: 100%;
                display: -webkit-box;
                -webkit-box-orient: horizontal;
                -webkit-box-pack: center;
                color: #ffffff;
                text-align: center;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
        <script src="three.js/build/three.min.js"></script>
        <script src="three.js/examples/js/controls/PointerLockControls.js"></script>
        <script src="machine/driver.js"></script>
        <script src="machine/fpcamera.js"></script>
        <script src="machine/world.js"></script>
        
        <div id="blocker">
            <div id="instructions">
                <span style="font-size: 40px">Click to Play</span>
                <br/>
                Arrows = move, Space = jump, Mouse = look
            </div>
        </div>
    </body>
</html>
