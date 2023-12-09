<script>
export default {
  name:'collider generator',
  data(){
    return{
    }
  },
  methods:{
    createArray(){
      const img = new Image();
      img.src = '/src/assets/collision-mappoint-test.png';

      // Aspetta che l'immagine sia caricata
      img.onload = function() {
        // Crea un elemento canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
      
        // Ottieni il contesto 2D del canvas
        const ctx = canvas.getContext('2d');
      
        // Disegna l'immagine sul canvas
        ctx.drawImage(img, 0, 0);
      
        // Ottieni i dati dell'immagine (array di pixel)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixelData = imageData.data;
      
        // Crea un array di pixel bianchi (valori RGB = 255)
        const whitePixels = [];
      
        // Itera attraverso i dati dei pixel (ogni pixel ha 4 valori: R, G, B, A)
        for (let i = 0; i < pixelData.length; i += 4) {
          const red = pixelData[i];
          const green = pixelData[i + 1];
          const blue = pixelData[i + 2];
          const alpha = pixelData[i + 3];
        
          // Se il pixel è bianco, aggiungi le coordinate all'array
          if (red === 255 && green === 255 && blue === 255) {
            const x = (i / 4) % canvas.width;
            const y = Math.floor(i / 4 / canvas.width);
            whitePixels.push({ x, y });
        }
      }

      // Ora l'array `whitePixels` contiene le coordinate dei pixel bianchi nell'immagine
      console.log(whitePixels);
      };
    }


  },

  mounted(){
    this.createArray();
  }
}

</script>
<template>

</template>
