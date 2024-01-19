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

    },

    test(){
      console.log('TEST', this.phaserGame.scene.scenes[0].tankFactory.tankFactoryIstance);
      const scena = this.phaserGame.scene.scenes[0];
      scena.tankFactory.tankFactoryIstance.createMgTank([-100,0]);
    }

  },

  mounted(){
    this.initializeGame();
    this.appendGame();
  }
}

</script>
<template>
  <div class="game_container">

    <div id="gameContainer"></div>

    <div class="right_bar">

      <section class="top debug"></section>
      <section class="mid debug"></section>
      <section class="radar debug"></section>

    </div>

    <div class="left_bar">

          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          <div class="btn ">btn</div>

    </div>

    <div class="bottom_bar">
      <section class="buttons debug">

          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          <div class="btn ">btn</div>
          
      </section>
      <section class="energy_bar debug"></section>
    </div>

    <!-- <button @click="test" style="position:fixed; top: 100px;">TEST</button> -->

  </div>
</template>
