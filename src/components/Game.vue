<script >
import {Game}  from 'phaser';
import {config} from '../js/core';

export default {
  name:'WZS2024',
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
      up1Cd : 0,
      up2Cd : 0,
      up3Cd : 0,
      up4Cd : 0,

      nextWave:0,

      upgradeDecks : [false,false,false,false],
      upgradeDecksWorking : [false,false,false,false],

      energy: 0,
    }
  },

  /** 
    l'oggeto game se reso reattivo produce un drastico calo delle prestazioni
    usare variabili reattive solo se necessario
  */

  phaserGame: null,
  tankFactory: null,

  methods:{

    initializeGame(){
      this.phaserGame = new Game(config);
      this.phaserGame.canvas.parentElement.removeChild(this.phaserGame.canvas); 
      document.getElementById('gameContainer').appendChild(this.phaserGame.canvas);

      setTimeout(() => {
        this.tankFactory = this.phaserGame.scene.scenes[0].tankFactory;
        this.decksReadCountdown();
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

    openUpgradesModal(deck){
      if(!this.upgradeDecksWorking[deck]){
        this.upgradeDecks = [false,false,false,false];
        this.upgradeDecks[deck] = true;
      }
    },

    deactivateModal(){
      this.upgradeDecks = [false,false,false,false];
    },

    assignResearch(researchId){
      if(!this.tankFactory.upgradeTable.upgradeIdIsSearching[researchId - 1]){
        let researchDeck;
        for (let i = 0; i < this.upgradeDecks.length; i++) {
          if(this.upgradeDecks[i]){
            researchDeck = i ;
          }
          this.upgradeDecksWorking[researchDeck] = researchId;
        }
        this.makeUpgrade(researchId,researchDeck + 1)
        this.deactivateModal();
      }

    },

    makeUpgrade(choice, upgradeDeckID){

      switch (choice) {
        case 1:
          console.log('case researchSpeed');
          this.tankFactory.tankFactoryIstance.researchSpeed(upgradeDeckID);
          break;
        case 2:
          console.log('case energyEfficiency');
          this.tankFactory.tankFactoryIstance.energyEfficiency(upgradeDeckID);
          break;
        case 3:
          console.log('case engineerEfficiency');
          this.tankFactory.tankFactoryIstance.engineerEfficiency(upgradeDeckID);
          break;
        case 4:
          console.log('case buildingsArmor');
          this.tankFactory.tankFactoryIstance.buildingsArmor(upgradeDeckID);
          break;
        case 5:
          console.log('case boostSpeed');
          this.tankFactory.tankFactoryIstance.boostSpeed(upgradeDeckID);
          break;
        case 6:
          console.log('case tanksProductionSpeed');
          this.tankFactory.tankFactoryIstance.tanksProductionSpeed(upgradeDeckID);
          break;
        case 7:
          console.log('case tanksSpeedTraction');
          this.tankFactory.tankFactoryIstance.tanksSpeedTraction(upgradeDeckID);
          break;
        case 8:
          console.log('case tanksRangeOfView');
          this.tankFactory.tankFactoryIstance.tanksRangeOfView(upgradeDeckID);
          break;
        case 9:
          console.log('case mgDamage');
          this.tankFactory.tankFactoryIstance.mgDamage(upgradeDeckID);
          break;
        case 10:
          console.log('case mgRof');
          this.tankFactory.tankFactoryIstance.mgRof(upgradeDeckID);
          break;
        case 11:
          console.log('case mgHp');
          this.tankFactory.tankFactoryIstance.mgHp(upgradeDeckID);
          break;
        case 12:
          console.log('case cannonDamage');
          this.tankFactory.tankFactoryIstance.cannonDamage(upgradeDeckID);
          break;
        case 13:
          console.log('case cannonRof');
          this.tankFactory.tankFactoryIstance.cannonRof(upgradeDeckID);
          break;
        case 14:
          console.log('case cannonHp');
          this.tankFactory.tankFactoryIstance.cannonHp(upgradeDeckID);
          break;
        case 15:
          console.log('case RocketDamage');
          this.tankFactory.tankFactoryIstance.RocketDamage(upgradeDeckID);
          break;
        case 16:
          console.log('case RocketRof');
          this.tankFactory.tankFactoryIstance.RocketRof(upgradeDeckID);
          break;
        case 17:
          console.log('case RocketHp');
          this.tankFactory.tankFactoryIstance.RocketHp(upgradeDeckID);
          break;
      }
    },

    decksReadCountdown(){

          let readCd1 = setInterval(() => {
            if(typeof this.tankFactory.deck1Cd === 'string'){
              this.deck1Cd = this.tankFactory.deck1Cd ;
            }else{
              this.deck1Cd = this.secondToMinAndSecond(this.tankFactory.deck1Cd);
            }
          }, 1000);
            readCd1;

          let readCd2 = setInterval(() => {
            if(typeof this.tankFactory.deck2Cd === 'string'){
              this.deck2Cd = this.tankFactory.deck2Cd ;
            }else{
              this.deck2Cd = this.secondToMinAndSecond(this.tankFactory.deck2Cd);
            }
          }, 1000);
            readCd2;
            
            let readCd3 = setInterval(() => {
            if(typeof this.tankFactory.deck3Cd === 'string'){
              this.deck3Cd = this.tankFactory.deck3Cd ;
            }else{
              this.deck3Cd = this.secondToMinAndSecond(this.tankFactory.deck3Cd);
            }
          }, 1000);
            readCd3;

          let readCd4 = setInterval(() => {
            if(typeof this.tankFactory.deck4Cd === 'string'){
              this.deck4Cd = this.tankFactory.deck4Cd ;
            }else{
              this.deck4Cd = this.secondToMinAndSecond(this.tankFactory.deck4Cd);
            }
          }, 1000);
            readCd4;

          let readUpCd1 = setInterval(() => {
            if(typeof this.tankFactory.up1Cd === 'string'){
              this.up1Cd = this.tankFactory.up1Cd ;

            }else{
              this.up1Cd = this.secondToMinAndSecond(this.tankFactory.up1Cd);
              if(this.tankFactory.up1Cd <= 1.5){
                this.upgradeDecksWorking[0] = false;
              }
            }
          }, 1000);
            readUpCd1;

          let readUpCd2 = setInterval(() => {
            if(typeof this.tankFactory.up2Cd === 'string'){
              this.up2Cd = this.tankFactory.up2Cd ;

            }else{
              this.up2Cd = this.secondToMinAndSecond(this.tankFactory.up2Cd);
              if(this.tankFactory.up2Cd <= 1.5){
                this.upgradeDecksWorking[1] = false;
              }
            }
          }, 1000);
            readUpCd2;

          let readUpCd3 = setInterval(() => {
            if(typeof this.tankFactory.up3Cd === 'string'){
              this.up3Cd = this.tankFactory.up3Cd ;

            }else{
              this.up3Cd = this.secondToMinAndSecond(this.tankFactory.up3Cd);
              if(this.tankFactory.up3Cd <= 1.5){
                this.upgradeDecksWorking[2] = false;
              }
            }
          }, 1000);
            readUpCd3;

          let readUpCd4 = setInterval(() => {
            if(typeof this.tankFactory.up4Cd === 'string'){
              this.up4Cd = this.tankFactory.up4Cd ;

            }else{
              this.up4Cd = this.secondToMinAndSecond(this.tankFactory.up4Cd);
              if(this.tankFactory.up4Cd <= 1.5){
                this.upgradeDecksWorking[3] = false;
              }
            }
          }, 1000);
            readUpCd4;
          
          let readEnergy = setInterval(() => {
            this.energy = this.tankFactory.statusCounts.energy;
          }, 3000);
          readEnergy;

          let readInfo = setInterval(() => {
            this.nextWave = this.tankFactory.waveCd;
          }, 1000);
          readInfo;
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

  }
}

</script>
<template>
  <div class="game_container">

    <div @click="deactivateModal" id="gameContainer"></div>

    
    <!-- controll surface -->
    <div class="right_bar">
      <section class="top debug"></section>
      <section class="mid debug">
        <p>Next Wave : {{ this.nextWave }}</p>
      </section>
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

          <div class="btn"
          @click="openUpgradesModal(0)"
          :class="{
            'empty_upgrade' :  !this.upgradeDecksWorking[0],
            'upResSpeed' :      this.upgradeDecksWorking[0] === 1,
            'upEnergy' :        this.upgradeDecksWorking[0] === 2,
            'upEngineering' :   this.upgradeDecksWorking[0] === 3,
            'upBuildings' :     this.upgradeDecksWorking[0] === 4,
            'upBoost' :         this.upgradeDecksWorking[0] === 5,
            'upProduction' :    this.upgradeDecksWorking[0] === 6,
            'upSpeedTraction' : this.upgradeDecksWorking[0] === 7,
            'upRangeOfView' :   this.upgradeDecksWorking[0] === 8,
            'upMgDmg' :         this.upgradeDecksWorking[0] === 9,
            'upMgRof' :         this.upgradeDecksWorking[0] === 10,
            'upMgHp' :          this.upgradeDecksWorking[0] === 11,
            'upCannonDmg' :     this.upgradeDecksWorking[0] === 12,
            'upCannonRof' :     this.upgradeDecksWorking[0] === 13,
            'upCannonHp' :      this.upgradeDecksWorking[0] === 14,
            'upBRocketDmg' :    this.upgradeDecksWorking[0] === 15,
            'upRocketRof' :     this.upgradeDecksWorking[0] === 16,
            'upRocketHp' :      this.upgradeDecksWorking[0] === 17,
            }">
              <span>{{ this.up1Cd }}</span>
          </div>

          <div class="btn"
          @click="openUpgradesModal(1)"
          :class="{
            'empty_upgrade' :  !this.upgradeDecksWorking[1],
            'upResSpeed' :      this.upgradeDecksWorking[1] === 1,
            'upEnergy' :        this.upgradeDecksWorking[1] === 2,
            'upEngineering' :   this.upgradeDecksWorking[1] === 3,
            'upBuildings' :     this.upgradeDecksWorking[1] === 4,
            'upBoost' :         this.upgradeDecksWorking[1] === 5,
            'upProduction' :    this.upgradeDecksWorking[1] === 6,
            'upSpeedTraction' : this.upgradeDecksWorking[1] === 7,
            'upRangeOfView' :   this.upgradeDecksWorking[1] === 8,
            'upMgDmg' :         this.upgradeDecksWorking[1] === 9,
            'upMgRof' :         this.upgradeDecksWorking[1] === 10,
            'upMgHp' :          this.upgradeDecksWorking[1] === 11,
            'upCannonDmg' :     this.upgradeDecksWorking[1] === 12,
            'upCannonRof' :     this.upgradeDecksWorking[1] === 13,
            'upCannonHp' :      this.upgradeDecksWorking[1] === 14,
            'upBRocketDmg' :    this.upgradeDecksWorking[1] === 15,
            'upRocketRof' :     this.upgradeDecksWorking[1] === 16,
            'upRocketHp' :      this.upgradeDecksWorking[1] === 17,
            }">
              <span>{{ this.up2Cd }}</span>
            </div>

          <div class="btn"
          @click="openUpgradesModal(2)"
          :class="{
            'empty_upgrade' :  !this.upgradeDecksWorking[2],
            'upResSpeed' :      this.upgradeDecksWorking[2] === 1,
            'upEnergy' :        this.upgradeDecksWorking[2] === 2,
            'upEngineering' :   this.upgradeDecksWorking[2] === 3,
            'upBuildings' :     this.upgradeDecksWorking[2] === 4,
            'upBoost' :         this.upgradeDecksWorking[2] === 5,
            'upProduction' :    this.upgradeDecksWorking[2] === 6,
            'upSpeedTraction' : this.upgradeDecksWorking[2] === 7,
            'upRangeOfView' :   this.upgradeDecksWorking[2] === 8,
            'upMgDmg' :         this.upgradeDecksWorking[2] === 9,
            'upMgRof' :         this.upgradeDecksWorking[2] === 10,
            'upMgHp' :          this.upgradeDecksWorking[2] === 11,
            'upCannonDmg' :     this.upgradeDecksWorking[2] === 12,
            'upCannonRof' :     this.upgradeDecksWorking[2] === 13,
            'upCannonHp' :      this.upgradeDecksWorking[2] === 14,
            'upBRocketDmg' :    this.upgradeDecksWorking[2] === 15,
            'upRocketRof' :     this.upgradeDecksWorking[2] === 16,
            'upRocketHp' :      this.upgradeDecksWorking[2] === 17,
            }">
              <span>{{ this.up3Cd }}</span>
            </div>

          <div class="btn"
          @click="openUpgradesModal(3)"
          :class="{
            'empty_upgrade' :  !this.upgradeDecksWorking[3],
            'upResSpeed' :      this.upgradeDecksWorking[3] === 1,
            'upEnergy' :        this.upgradeDecksWorking[3] === 2,
            'upEngineering' :   this.upgradeDecksWorking[3] === 3,
            'upBuildings' :     this.upgradeDecksWorking[3] === 4,
            'upBoost' :         this.upgradeDecksWorking[3] === 5,
            'upProduction' :    this.upgradeDecksWorking[3] === 6,
            'upSpeedTraction' : this.upgradeDecksWorking[3] === 7,
            'upRangeOfView' :   this.upgradeDecksWorking[3] === 8,
            'upMgDmg' :         this.upgradeDecksWorking[3] === 9,
            'upMgRof' :         this.upgradeDecksWorking[3] === 10,
            'upMgHp' :          this.upgradeDecksWorking[3] === 11,
            'upCannonDmg' :     this.upgradeDecksWorking[3] === 12,
            'upCannonRof' :     this.upgradeDecksWorking[3] === 13,
            'upCannonHp' :      this.upgradeDecksWorking[3] === 14,
            'upBRocketDmg' :    this.upgradeDecksWorking[3] === 15,
            'upRocketRof' :     this.upgradeDecksWorking[3] === 16,
            'upRocketHp' :      this.upgradeDecksWorking[3] === 17,
            }">
              <span>{{ this.up4Cd }}</span>
            </div>


          <div 
          @click="changeProduction(1)"
          class="btn"
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

    <section class="energy_bar debug">
      <div class="energy_filling" :style="{ width: `${this.energy / 20}%` }"></div>
      <span> energy: {{ this.energy }}</span>
    </section>
      
    </div>

    <div class="upgrades_modal debug"
    v-if="this.upgradeDecks.includes(true)">
    
      <div @click="assignResearch(1)"
      class="btn upResSpeed"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[0]}"
      ></div>
      <div @click="assignResearch(2)"
      class="btn upEnergy"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[1]}"
      ></div>
      <div @click="assignResearch(3)"
      class="btn upEngineering"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[2]}"
      ></div>
      <div @click="assignResearch(4)"
      class="btn upBuildings"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[3]}"
      ></div>

      <div @click="assignResearch(5)"
      class="btn upBoost"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[4]}"
      ></div>
      <div @click="assignResearch(6)"
      class="btn upProduction"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[5]}"
      ></div>
      <div @click="assignResearch(7)"
      class="btn upSpeedTraction"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[6]}"
      ></div>
      <div @click="assignResearch(8)"
      class="btn upRangeOfView"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[7]}"
      ></div>

      <div @click="assignResearch(9)"
      class="btn upMgDmg"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[8]}"
      ></div>
      <div @click="assignResearch(10)"
      class="btn upMgRof"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[9]}"
      ></div>
      <div @click="assignResearch(11)"
      class="btn upMgHp"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[10]}"
      ></div>

      <div class="btn"></div>

      <div @click="assignResearch(12)"
      class="btn upCannonDmg"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[11]}"
      ></div>
      <div @click="assignResearch(13)"
      class="btn upCannonRof"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[12]}"
      ></div>
      <div @click="assignResearch(14)"
      class="btn upCannonHp"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[13]}"
      ></div>

      <div class="btn"></div>

      <div @click="assignResearch(15)"
      class="btn upBRocketDmg"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[14]}"
      ></div>
      <div @click="assignResearch(16)"
      class="btn upRocketRof"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[15]}"
      ></div>
      <div @click="assignResearch(17)"
      class="btn upRocketHp"
      :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[16]}"
      ></div>

      <div class="btn"></div>

    </div>
    <!-- <button @click="test" style="position:fixed; top: 100px;">TEST</button> -->

  </div>
</template>
