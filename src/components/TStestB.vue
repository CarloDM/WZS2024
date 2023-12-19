<script>
import {Game}  from 'phaser';
import {config} from '../js/TSTestB';
export default {
  name:'GameTestC',
  data(){
    return{
      config,
      phaserGame : null,
    }
  },
  methods:{

    initializeGame(){
      this.phaserGame = new Game(this.config);
      this.phaserGame.canvas.parentElement.removeChild(this.phaserGame.canvas); 
    },

    appendGame(){
      document.getElementById('gameContainer').appendChild(this.phaserGame.canvas);
    },

  toggleFullScreen() {
  if (this.phaserGame.scale.isFullscreen) {
    this.phaserGame.scale.stopFullscreen();
  } else {
    this.phaserGame.scale.startFullscreen();
    this.initializeGame();
  }
}

  },

  mounted(){
    this.initializeGame();
    this.appendGame();
  }
}

</script>
<template>
  <div id="gameContainer"></div>

  <!-- <div @click="toggleFullScreen"
  style="width: 30px; aspect-ratio: 1/1; background-color: bisque;">

  </div> -->
</template>
