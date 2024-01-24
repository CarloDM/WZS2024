<script >
import {Game}  from 'phaser';
import {config} from '../js/TSTestB';

export default {
  name:'GameTestC',
  data(){
    return{
      deck1 : 0,
      deck1Cd : 0,
      deck2 : 0,
      deck2Cd : 0,
      deck3 : 0,
      deck3Cd : 0,
      deck4 : 0,
      deck4Cd : 0,
    }
  },

  /** 
    l'oggeto game se reso reattivo produce un drastico calo delle prestazioni
    usare variabili reattive solo se necessario
  */

  phaserGame: null,
  tankFactory: null,

  watch:{},

  methods:{

    initializeGame(){
      this.phaserGame = new Game(config);
      this.phaserGame.canvas.parentElement.removeChild(this.phaserGame.canvas); 
      document.getElementById('gameContainer').appendChild(this.phaserGame.canvas);

      setTimeout(() => {
        this.tankFactory = this.phaserGame.scene.scenes[0].tankFactory;
      }, 2000);
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
      const core = this.phaserGame.scene.scenes[0];
      core.tankFactory.tankFactoryIstance.createMgTank([-100,0]);
    },

    changeProduction(deck){

      switch (deck) {
        case 1:

          if(this.deck1 >= 3){
            this.deck1 = 0;
            this.tankFactory.statusCounts.btnDeck1 = 0;
            this.tankFactory.tankFactoryIstance.deck1Production(); 
          }else{
            this.deck1 ++;
            const d1 = JSON.parse(JSON.stringify(this.deck1));
            console.log(this.deck1);
            this.tankFactory.statusCounts.btnDeck1 = d1;
            this.tankFactory.tankFactoryIstance.deck1Production(); 
            this.deck1Cd = this.tankFactory.deck1Cd;
          }
          
          break;
        case 2:

          if(this.deck2 >= 3){
            this.deck2 = 0;
            this.tankFactory.statusCounts.btnDeck2 = 0;
            this.tankFactory.tankFactoryIstance.deck2Production(); 
          }else{
            this.deck2 ++;
            const d2 = JSON.parse(JSON.stringify(this.deck2));
            console.log(this.deck2);
            this.tankFactory.statusCounts.btnDeck2 = d2;
            this.tankFactory.tankFactoryIstance.deck2Production(); 
            this.deck2Cd = this.tankFactory.deck2Cd;
          }

          break;
        case 3:

          if(this.deck3 >= 3){
            this.deck3 = 0;
            this.tankFactory.statusCounts.btnDeck3 = 0;
            this.tankFactory.tankFactoryIstance.deck3Production(); 
          }else{
            this.deck3 ++;
            const d3 = JSON.parse(JSON.stringify(this.deck3));
            console.log(this.deck3);
            this.tankFactory.statusCounts.btnDeck3 = d3;
            this.tankFactory.tankFactoryIstance.deck3Production(); 
            this.deck3Cd = this.tankFactory.deck3Cd;
          }

          break;
        case 4:
// 
          if(this.deck4 >= 3){
            this.deck4 = 0;
            this.tankFactory.statusCounts.btnDeck4 = 0;
            this.tankFactory.tankFactoryIstance.deck4Production(); 
          }else{
            this.deck4 ++;
            const d4 = JSON.parse(JSON.stringify(this.deck4));
            console.log(this.deck4);
            this.tankFactory.statusCounts.btnDeck4 = d4;
            this.tankFactory.tankFactoryIstance.deck4Production(); 
            this.deck4Cd = this.tankFactory.deck4Cd;
          }

          break;

      }

    },

    decksReadCountdown(){

          let readCd1 = setInterval(() => {
            this.deck1Cd = this.secondToMinAndSecond(this.tankFactory.deck1Cd);}, 1000);
            readCd1;
          let readCd2 = setInterval(() => {
            this.deck2Cd = this.secondToMinAndSecond(this.tankFactory.deck2Cd);}, 1000);
            readCd2;
          let readCd3 = setInterval(() => {
            this.deck3Cd = this.secondToMinAndSecond(this.tankFactory.deck3Cd);}, 1000);
            readCd3;
          let readCd4 = setInterval(() => {
            this.deck4Cd = this.secondToMinAndSecond(this.tankFactory.deck4Cd);}, 1000);
            readCd4;
      },

    secondToMinAndSecond(seconds){
      const min = Math.floor(seconds / 60);
      let secondRemain = seconds % 60;
      secondRemain = secondRemain < 10 ? '0' + secondRemain : secondRemain;
      return min + ':' + secondRemain ;
    },

  },

  mounted(){
    this.initializeGame();

    this.decksReadCountdown();
  }
}

</script>
<template>
  <div class="game_container">

    <div id="gameContainer"></div>

    
    <!-- controll surface -->
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

          <div class="btn empty_upgrade">btn</div>
          <div class="btn empty_upgrade">btn</div>
          <div class="btn empty_upgrade">btn</div>
          <div class="btn empty_upgrade">btn</div>

          
          <div 
          @click="changeProduction(1)"
          class="btn "
          :class="{
            'empty_deck' :  this.deck1 === 0,
            'mg_deck' :     this.deck1 === 1,
            'cannon_deck' : this.deck1 === 2,
            'rocket_deck' : this.deck1 === 3,
            }">
                <span>{{ this.deck1Cd }}</span>
            </div>

          <div 
          @click="changeProduction(2)"
          class="btn empty_deck"
          :class="{
            'empty_deck' :  this.deck2 === 0,
            'mg_deck' :     this.deck2 === 1,
            'cannon_deck' : this.deck2 === 2,
            'rocket_deck' : this.deck2 === 3,
            }">
                <span>{{ this.deck2Cd }}</span>
            </div>

          <div 
          @click="changeProduction(3)"
          class="btn empty_deck"
          :class="{
            'empty_deck' :  this.deck3 === 0,
            'mg_deck' :     this.deck3 === 1,
            'cannon_deck' : this.deck3 === 2,
            'rocket_deck' : this.deck3 === 3,
            }">
                <span>{{ this.deck3Cd }}</span>
            </div>

          <div 
          @click="changeProduction(4)"
          class="btn empty_deck"
          :class="{
            'empty_deck' :  this.deck4 === 0,
            'mg_deck' :     this.deck4 === 1,
            'cannon_deck' : this.deck4 === 2,
            'rocket_deck' : this.deck4 === 3,
            }">
                <span>{{ this.deck4Cd }}</span>
            </div>

          
      </section>
      <section class="energy_bar debug"></section>
    </div>

    <!-- <button @click="test" style="position:fixed; top: 100px;">TEST</button> -->

  </div>
</template>
