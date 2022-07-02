const config = {
    type: Phaser.AUTO, // Which renderer to use
    width: 800, // Canvas width in pixels
    height: 600, // Canvas height in pixels
    parent: "game-container", // ID of the DOM element to add the canvas to
    scene: {
      preload: preload,
      create: create,
      update: update,
      tilemapSceneP: preload, // Update scene configuration later. Scene name (scene #2) is 'tilemapScene'
      tilemapSceneC: create,
      tilemapSceneU: update, 
    }
};
  
const game = new Phaser.Game(config);

function preload() {
    // Runs once, loads up assets like images and audio
    this.load.image("repeating-background", "escheresque_dark.png")
    this.load.image("mario-tiles", "assets/mario-tiles.png");
    this.load.tilemapCSV("map", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/catastrophi_level3.csv")
}

function create() {
    // Runs once, after all assets in preload are loaded
    const { width, height } = this.sys.game.config;
    const bg = this.add.tileSprite(0, 0, width, height, "repeating-background");
    bg.setOrigin(0, 0);

    this.add
        .text(width / 2, height / 2, "hello\nphaser 3\ntemplate", {
        font: "100px monospace",
        color: "white"
    })
        .setOrigin(0.5, 0.5)
        .setShadow(5, 5, "#5588EE", 0, true, true);

    // Load map from 2D array of tile indices
    const level = [
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   1,   2,   3,   0,   0,   0,   1,   2,   3,   0 ],
        [  0,   5,   6,   7,   0,   0,   0,   5,   6,   7,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,  14,  13,  14,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0 ],
        [  0,   0,  14,  14,  14,  14,  14,   0,   0,   0,  15 ],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,  15,  15 ],
        [ 35,  36,  37,   0,   0,   0,   0,   0,  15,  15,  15 ],
        [ 39,  39,  39,  39,  39,  39,  39,  39,  39,  39,  39 ],
    ];

    const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 }); // tilemap
    const tiles = map.addTilesetImage("mario-tiles"); // tileset
    const layer = map.createLayer(0, tiles, 0, 0); // tilemaplayer
}

function update(time, delta) {
    // Runs once per frame for the duration of the scene
}

tilemapScene.preload = function() {
   // Runs once, loads up assets like images and audio
   this.load.image("repeating-background", "escheresque_dark.png")
   this.load.image("mario-tiles", "assets/mario-tiles.png");
   this.load.tilemapCSV("map", "https://mikewesthad.github.io/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/catastrophi_level3.csv")
   this.load.image("tiles", "assets/tilesets/tuxmon-sample-32px-extruded.png");
   this.load.tilemapTiledJSON("map", "assets/tilemaps/tuxemon-town.jpg");
}

tilemapScene.create = function() {
    const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage("tiles");
    const layer = map.createLayer( 0, tileset, 0, 0 );

    const camera = this.cameras.main; // Access the default camera

    // User arrow input will control the camera
    const cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5,
    });

    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels); // Constrain camera from moving beyond the world/scene [view] boundaries

    this.add.text(16, 16, "Arrow keys to scroll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000",
    })
    .setScrollFactor(0);
}

tilemapScene.update = function(time, delta) {
    controls.update(delta); // Apply the controls to the camera each update tick of the game
}