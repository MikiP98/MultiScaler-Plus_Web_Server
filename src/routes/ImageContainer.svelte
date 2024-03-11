<script lang="ts">
    // import '../../static/styles.css';

    let image = "https://www.w3schools.com/w3images/lights.jpg";

    // if (window.FileReader) { 
 	// //then your code goes here 
    // } else { 
    //     alert('This browser does not support FileReader'); 
    // }
    // function handleFileSelect(evt) { 
    //     var files = evt.target.files; 
    //     var f = files[0]; 
    //     var reader = new FileReader();
    //     reader.onload = (
    //         function(theFile) { 
    //             return function(e) { 
    //                 document.getElementById('list').innerHTML = [
    //                     '<img src="', e.target.result,'" title="', theFile.name, '" width="50" />'
    //                     ].join(""); 
    //             }; 
    //         }
    //     )(f);
    //     reader.readAsDataURL(f); 
    // }
    // document.getElementById('file').addEventListener('change', handleFileSelect, false);
    // let imageUrl = "";
    function handleFileSelect(evt) {
        const files = evt.target.files;
        const file = files[0];

        const reader = new FileReader();

        reader.onload = (function (theFile) {
        return function (e) {
            $: imageUrl = e.target.result;
        };
        })(file);

        reader.readAsDataURL(file);
    }

    let imageUrl = "";

    function onFileInputChange(event) {
        handleFileSelect(event);
    }


    // setInterval(() => {
    //     image = "https://www.w3schools.com/w3images/lights.jpg";
    // }, 5000);
</script>

<div class="image-container" style="--css-image: url({imageUrl}); --css-size: 440px;">
    <div id="image">
        <div class="blur">
            <input type="file" id="file" accept="image/png" on:change="{onFileInputChange}" />
            <!-- <output id="list"></output> -->
            {#if imageUrl}
                <img src="{imageUrl}" alt="Selected Image" width="300px" />
            {/if}
            <!-- <img src={image} alt="Northern Lights" width="300px"> -->
        </div>
    </div>
    <div id="controls">
        <p>Controls</p>
    </div>
</div>

<style>
    .image-container {
        border: 2px solid black;

        --size: var(--css-size);
        height: var(--size);
		width: var(--size);

        box-shadow: 0 0 8px 8px rgba(0, 0, 0, 0.25);
    }

    #image {
        width: var(--size);
        height: calc(var(--size) * 0.9);

        background-image: var(--css-image);
        
        --gradient-radial: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 66.666%);
        -webkit-mask-image: var(--gradient-radial);
        mask-image: var(--gradient-radial);

        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        /* background-repeat: no-repeat; */
    }
    .blur {
        width: var(--size);
        height: calc(var(--size) * 0.9);

        backdrop-filter: blur(64px);
        /* background: rgb(0,0,0);
        background: radial-gradient(circle, rgba(0,0,0,0.333) 0%, rgba(0,0,0,1) 100%); */

        display: flex;
        justify-content: center;
        align-items: center;
    }
    .blur img {
        --gradient-um: linear-gradient(black, black);
        -webkit-mask-image: var(--gradient-um); 
        mask-image: var(--gradient-um);
    }

    #controls {
        width: var(--size);
        height: calc(var(--size) * 0.1);
    }
</style>