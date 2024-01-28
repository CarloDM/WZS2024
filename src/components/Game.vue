<script >
import {Game}  from 'phaser';
import {config} from '../js/core';

export default {
  name:'WZS2024',
  data(){
    return{
      gameMounted : false,

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

      nextWave:'3:00',

      upgradeDecks :        [false,false,false,false],
      upgradeDecksWorking : [false,false,false,false],

      energy      : 0,
      tanksNumb   : 0,
      enemiesNumb : 0,
      gaisersNumb : 0,
      mgCost      : 0,
      cannonCost  : 0,
      rocketCost  : 0,

      tanksCoord : [],
      enemiesCoord : [],
      radarSize: 256,
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
      this.gameIsMounted();

    },

    gameIsMounted(){

      const scene = this.phaserGame.scene.scenes[0]
      if(scene && scene.mounted){
        this.tankFactory = this.phaserGame.scene.scenes[0].tankFactory;
        this.decksReadCountdown();
        this.gameMounted = true;
        console.log('scene mounted');
      }else{
        console.log('scene not mounted');
        setTimeout(() => {
          this.gameIsMounted();
        }, 500);
      }
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

    assignResearch(researchId, upGradeLevel){
      if(!this.tankFactory.upgradeTable.upgradeIdIsSearching[researchId - 1] && upGradeLevel < 10 ){
        let researchDeck;
        for (let i = 0; i < this.upgradeDecks.length; i++) {
          if(this.upgradeDecks[i]){
            researchDeck = i ;
            switch (i) {
              case 0:
              this.tankFactory.up1Cd = 'Start';
              break;
              case 1:
              this.tankFactory.up2Cd = 'Start';
              break;
              case 2:
              this.tankFactory.up3Cd = 'Start';
              break;
              case 3:
              this.tankFactory.up4Cd = 'Start';
              break;
            }
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
          this.tankFactory.tankFactoryIstance.rocketDamage(upgradeDeckID);
          break;
        case 16:
          console.log('case RocketRof');
          this.tankFactory.tankFactoryIstance.rocketRof(upgradeDeckID);
          break;
        case 17:
          console.log('case RocketHp');
          this.tankFactory.tankFactoryIstance.rocketHp(upgradeDeckID);
          break;
      }
    },

    decksReadCountdown(){

      this.deck1Cd    = this.tankFactory.deck1Cd ;
      this.deck2Cd    = this.tankFactory.deck2Cd ;
      this.deck3Cd    = this.tankFactory.deck3Cd ;
      this.deck4Cd    = this.tankFactory.deck4Cd ;
      this.up1Cd      = this.tankFactory.up1Cd ;
      this.up2Cd      = this.tankFactory.up2Cd ;
      this.up3Cd      = this.tankFactory.up3Cd ;
      this.up4Cd      = this.tankFactory.up4Cd ;
      this.energy     = this.tankFactory.statusCounts.energy;
      this.mgCost     = this.tankFactory.statusCounts.mgCost ;
      this.cannonCost = this.tankFactory.statusCounts.cannonCost ;
      this.rocketCost = this.tankFactory.statusCounts.rocketCost ;

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
              if(this.tankFactory.up1Cd === 'empty'){
                this.upgradeDecksWorking[0] = false;
              }
            }else{
              this.up1Cd = this.secondToMinAndSecond(this.tankFactory.up1Cd);
            }
          }, 1000);
            readUpCd1;

          let readUpCd2 = setInterval(() => {
            if(typeof this.tankFactory.up2Cd === 'string'){
              this.up2Cd = this.tankFactory.up2Cd ;
              if(this.tankFactory.up2Cd === 'empty'){
                this.upgradeDecksWorking[1] = false;
              }
            }else{
              this.up2Cd = this.secondToMinAndSecond(this.tankFactory.up2Cd);
            }
          }, 1000);
            readUpCd2;

          let readUpCd3 = setInterval(() => {
            if(typeof this.tankFactory.up3Cd === 'string'){
              this.up3Cd = this.tankFactory.up3Cd ;
              if(this.tankFactory.up3Cd === 'empty'){
                this.upgradeDecksWorking[2] = false;
              }
            }else{
              this.up3Cd = this.secondToMinAndSecond(this.tankFactory.up3Cd);
            }
          }, 1000);
            readUpCd3;

          let readUpCd4 = setInterval(() => {
            if(typeof this.tankFactory.up4Cd === 'string'){
              this.up4Cd = this.tankFactory.up4Cd ;
              if(this.tankFactory.up4Cd === 'empty'){
                this.upgradeDecksWorking[3] = false;
              }
            }else{
              this.up4Cd = this.secondToMinAndSecond(this.tankFactory.up4Cd);
            }
          }, 1000);
            readUpCd4;
          
          let readEnergy = setInterval(() => {
            this.energy =     this.tankFactory.statusCounts.energy;
            this.mgCost =     this.tankFactory.statusCounts.mgCost ;
            this.cannonCost = this.tankFactory.statusCounts.cannonCost ;
            this.rocketCost = this.tankFactory.statusCounts.rocketCost ;
          }, 3000);
          readEnergy;

          let readInfo = setInterval(() => {
            this.nextWave = this.secondToMinAndSecond(this.tankFactory.waveCd);
            this.tanksNumb = this.phaserGame.scene.scenes[0].tanksGrp1.length;
            this.enemiesNumb = this.phaserGame.scene.scenes[0].enemiesGrp.length;
            let activeGaiser =  this.phaserGame.scene.scenes[0].gaiserGrp.filter(gaiser => (!gaiser.exploited));
            activeGaiser = (activeGaiser.length * - 1 ) + 39;
            this.gaisersNumb = activeGaiser;
          }, 1000);
          readInfo;

          let upgradeRadar = setInterval(() => {
          const radar = this.phaserGame.scene.scenes[0].radarObj;
          this.tanksCoord = radar.tanks;
          this.enemiesCoord = radar.enemies;
          }, 2500);
          upgradeRadar;
    },

    secondToMinAndSecond(seconds){
      const min = Math.floor(seconds / 60);
      let secondRemain = Math.floor(seconds % 60);
      secondRemain = secondRemain < 10 ? '0' + secondRemain : secondRemain;
      return min + ':' + secondRemain ;
    },

    resizeRadar(event){
      console.log('resize',event.deltaY);

      if(event.deltaY < 0 ){
        if((this.radarSize - 8 ) > 120){
          this.radarSize -= 8;
        }
      }else if(event.deltaY > 0 ){
        if((this.radarSize + 8) < 264){
          this.radarSize += 8;
        }
      }
    },
    resetRadarSize(){
      this.radarSize = 256;
    }

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
    <div v-if="this.gameMounted">
      
      <div class="right_bar ">

        <section class="top"></section>

        <section class="mid ">

          <p class="mb_1"> {{ this.nextWave }} Next         </p>

          <p class="mb_1"> {{ this.enemiesNumb }} Enemies   </p>

          <p class="mb_1"> {{ this.gaisersNumb }}/39 Gaisers</p>

          <p class="mb_1"> {{ this.tanksNumb }} Tanks       </p>

          <p class="mb_1"> {{ this.mgCost }} Mg Cost       </p>

          <p class="mb_1"> {{ this.cannonCost }} Cannon Cost       </p>

          <p class="mb_1"> {{ this.rocketCost }} Rocket Cost       </p>
        </section>

        
      </div>
      
      <section class="radar "
      @wheel="resizeRadar"
      @click ="resetRadarSize"
      :style="{width: this.radarSize + 'px' , height: this.radarSize + 'px'}">

        <div v-if="this.tanksCoord.length > 0">
          <div class="radar_tile tanks_point"
          v-for="(tank,index) in this.tanksCoord" :key="index"
          :style="{ top: Math.floor((tank[1] / 128) * 100) + '%', left: Math.floor((tank[0] / 128) * 100) + '%' }"
          ></div>
        </div>

        <div v-if="this.enemiesCoord.length > 0">
          <div class="radar_tile enemy_point"
          v-for="(enemy,index) in this.enemiesCoord" :key="index"
          :style="{ top: Math.floor((enemy[1] / 128 ) * 100) + '%', left: Math.floor((enemy[0] / 128) * 100) + '%' }"
          ></div>
        </div>

      </section>

      <div class="left_bar">

            <div class="btn ">btn</div>
            <div class="btn ">btn</div>
            <div class="btn ">btn</div>
            <div class="btn ">btn</div>

      </div>

      <div class="bottom_bar">

        <section class="buttons ">

            <div @click="openUpgradesModal(0)"
          class="btn"
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

            <div @click="openUpgradesModal(1)"
          class="btn"
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

            <div @click="openUpgradesModal(2)" 
          class="btn"
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

            <div @click="openUpgradesModal(3)"
          class="btn"
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


            <div @click="changeProduction(1)"
          class="btn"
          :class="{
            'empty_deck' :  this.deck1 === 0,
            'mg_deck' :     this.deck1 === 1,
            'cannon_deck' : this.deck1 === 2,
            'rocket_deck' : this.deck1 === 3,
            }">
                <span>{{ this.deck1Cd }}</span>
            </div>

            <div @click="changeProduction(2)"
          class="btn empty_deck"
          :class="{
            'empty_deck' :  this.deck2 === 0,
            'mg_deck' :     this.deck2 === 1,
            'cannon_deck' : this.deck2 === 2,
            'rocket_deck' : this.deck2 === 3,
            }">
                <span>{{ this.deck2Cd }}</span>
            </div>

            <div @click="changeProduction(3)"
          class="btn empty_deck"
          :class="{
            'empty_deck' :  this.deck3 === 0,
            'mg_deck' :     this.deck3 === 1,
            'cannon_deck' : this.deck3 === 2,
            'rocket_deck' : this.deck3 === 3,
            }">
                <span>{{ this.deck3Cd }}</span>
            </div>

            <div @click="changeProduction(4)"
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

      <div class="upgrades_modal"
      v-if="this.upgradeDecks.includes(true)">

        <div @click="assignResearch(1, this.tankFactory.upgradeTable.researchSpeedLevel )"
        class="btn upResSpeed"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[0],
                    'endSearching' : this.tankFactory.upgradeTable.researchSpeedLevel === 10,}">
          <p>Lv.{{ this.tankFactory.upgradeTable.researchSpeedLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.researchSpeed[this.tankFactory.upgradeTable.  researchSpeedLevel + 1].cost }}</p>
        </div>

        <div @click="assignResearch(2,this.tankFactory.upgradeTable.energyEfficiencyLevel)"
        class="btn upEnergy"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[1],
                    'endSearching' : this.tankFactory.upgradeTable.energyEfficiencyLevel === 10,}">
          <p>Lv.{{ this.tankFactory.upgradeTable.energyEfficiencyLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.energyEfficiency[this.tankFactory.upgradeTable. energyEfficiencyLevel + 1].cost }}</p>
        </div>

        <div @click="assignResearch(3,this.tankFactory.upgradeTable.engineerEfficiencyLevel)"
        class="btn upEngineering"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[2],
                    'endSearching' : this.tankFactory.upgradeTable.engineerEfficiencyLevel === 10,}">
          <p>Lv.{{ this.tankFactory.upgradeTable.engineerEfficiencyLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.engineerEfficiency[this.tankFactory.upgradeTable. engineerEfficiencyLevel + 1].cost }}</p>
        </div>

        <div @click="assignResearch(4,this.tankFactory.upgradeTable.buildingsArmorLevel )"
        class="btn upBuildings"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[3],
                    'endSearching' : this.tankFactory.upgradeTable.buildingsArmorLevel === 10,}">
          <p>Lv.{{ this.tankFactory.upgradeTable.buildingsArmorLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.buildingsArmor[this.tankFactory.upgradeTable. buildingsArmorLevel + 1].cost }}</p>
        </div>


        <div @click="assignResearch(5,this.tankFactory.upgradeTable.boostSpeedLevel)"
        class="btn upBoost"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[4],
                    'endSearching' : this.tankFactory.upgradeTable.boostSpeedLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.boostSpeedLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.boostSpeed[this.tankFactory.upgradeTable. boostSpeedLevel + 1].cost }}</p>
        </div>

        <div @click="assignResearch(6,this.tankFactory.upgradeTable.tanksProductionSpeedLevel)"
        class="btn upProduction"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[5],
                    'endSearching' : this.tankFactory.upgradeTable.tanksProductionSpeedLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.tanksProductionSpeedLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.tanksProductionSpeed[this.tankFactory.upgradeTable. tanksProductionSpeedLevel + 1].cost }}</p>
        </div>

        <div @click="assignResearch(7,this.tankFactory.upgradeTable.tanksSpeedTractionLevel)"
        class="btn upSpeedTraction"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[6],
                    'endSearching' : this.tankFactory.upgradeTable.tanksSpeedTractionLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.tanksSpeedTractionLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.tanksSpeedTraction[this.tankFactory.upgradeTable. tanksSpeedTractionLevel + 1].cost }}</p>
        </div>

        <div @click="assignResearch(8,this.tankFactory.upgradeTable.tanksRangeOfViewLevel )"
        class="btn upRangeOfView"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[7],
                    'endSearching' : this.tankFactory.upgradeTable.tanksRangeOfViewLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.tanksRangeOfViewLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.tanksRangeOfView[this.tankFactory.upgradeTable. tanksRangeOfViewLevel + 1].cost }}</p>
        </div>


        <div @click="assignResearch(9,this.tankFactory.upgradeTable.mgDamageLevel)"
        class="btn upMgDmg"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[8],
                    'endSearching' : this.tankFactory.upgradeTable.mgDamageLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.mgDamageLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.mgDamage[this.tankFactory.upgradeTable.mgDamageLevel +  1].cost }}</p>
        </div>

        <div @click="assignResearch(10,this.tankFactory.upgradeTable.mgRofLevel)"
        class="btn upMgRof"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[9],
                    'endSearching' : this.tankFactory.upgradeTable.mgRofLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.mgRofLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.mgRof[this.tankFactory.upgradeTable.mgRofLevel + 1].  cost }}</p>
        </div>

        <div @click="assignResearch(11,this.tankFactory.upgradeTable.mgHpLevel )"
        class="btn upMgHp"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[10],
                    'endSearching' : this.tankFactory.upgradeTable.mgHpLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.mgHpLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.mgHp[this.tankFactory.upgradeTable.mgHpLevel + 1].  cost }}</p>
        </div>


        <div class="btn-empty"></div>

        <div @click="assignResearch(12,this.tankFactory.upgradeTable.cannonDamageLevel)"
        class="btn upCannonDmg"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[11],
                    'endSearching' : this.tankFactory.upgradeTable.cannonDamageLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.cannonDamageLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.cannonDamage[this.tankFactory.upgradeTable. cannonDamageLevel + 1].cost }}</p>
        </div>

        <div @click="assignResearch(13,this.tankFactory.upgradeTable.cannonRofLevel )"
        class="btn upCannonRof"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[12],
                    'endSearching' : this.tankFactory.upgradeTable.cannonRofLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.cannonRofLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.cannonRof[this.tankFactory.upgradeTable.cannonRofLevel  + 1].cost }}</p>
        </div>

        <div @click="assignResearch(14,this.tankFactory.upgradeTable.cannonHpLevel)"
        class="btn upCannonHp"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[13],
                    'endSearching' : this.tankFactory.upgradeTable.cannonHpLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.cannonHpLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.cannonHp[this.tankFactory.upgradeTable.cannonHpLevel +  1].cost }}</p>
        </div>


        <div class="btn-empty"></div>

        <div @click="assignResearch(15,this.tankFactory.upgradeTable.RocketDamageLevel)"
        class="btn upBRocketDmg"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[14],
                    'endSearching' : this.tankFactory.upgradeTable.RocketDamageLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.RocketDamageLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.RocketDamage[this.tankFactory.upgradeTable. RocketDamageLevel + 1].cost }}</p>
        </div>

        <div @click="assignResearch(16,this.tankFactory.upgradeTable.RocketRofLevel)"
        class="btn upRocketRof"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[15],
                    'endSearching' : this.tankFactory.upgradeTable.RocketRofLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.RocketRofLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.RocketRof[this.tankFactory.upgradeTable.RocketRofLevel  + 1].cost }}</p>
        </div>

        <div @click="assignResearch(17,this.tankFactory.upgradeTable.RocketHpLevel)"
        class="btn upRocketHp"
        :class="{'alradySearching' : this.tankFactory.upgradeTable.upgradeIdIsSearching[16],
                    'endSearching' : this.tankFactory.upgradeTable.RocketHpLevel === 10,}">
          <p>Lv.  {{ this.tankFactory.upgradeTable.RocketHpLevel }}/10</p>
          <p>Cost: {{ this.tankFactory.upgradeTable.RocketHp[this.tankFactory.upgradeTable.RocketHpLevel +  1].cost }}</p>
        </div>


        <div class="btn-empty"></div>

      </div>

    </div>

  </div>
</template>
