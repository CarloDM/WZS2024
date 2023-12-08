<script>
import {Game}  from 'phaser';
import {config} from '../js/gameTestE';
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

  },

  mounted(){
    this.initializeGame(),
    this.appendGame()
  }
}

</script>
<template>
  <div id="gameContainer"></div>
</template>
