<script>
  import { onMount } from 'svelte';
  import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
  
  let email = $state('');
  let status = $state('idle'); // idle, loading, success, error
  let errorMessage = $state('');
  
  // Sticker pop animation with random order
  const stickers = [1, 2, 3, 4, 5, 6, 7];
  let stickerDelays = $state([]);
  
  onMount(() => {
    // Shuffle and assign random delays (0 to 1.2s, staggered)
    const shuffled = [...stickers].sort(() => Math.random() - 0.5);
    stickerDelays = stickers.map(num => {
      const order = shuffled.indexOf(num);
      return order * 0.2 + 0.5; // 150ms between each pop
    });
  });

  async function handleSubmit() {
    if (!email) return;
    
    status = 'loading';
    errorMessage = '';
    
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.toLowerCase() })
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit');
      }
      
      status = 'success';
      email = '';
    } catch (err) {
      status = 'error';
      errorMessage = err.message;
    }
  }
</script>

<svelte:head>
  <title>Orchard</title>
</svelte:head>

<img src="/assets/hclogo.png" id="hclogo" alt="Hack Club logo" />

{#each stickers as num, i}
  <img 
    src="/assets/sticker{num}.png" 
    alt="sticker" 
    class="sticker sticker-{num}"
    style="animation-delay: {stickerDelays[i] ?? 0}s"
  />
{/each}

<main>
  <div id="landing">
    <div id="orchardlogobox">
      <svg width="817" height="180" viewBox="0 0 817 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_1496_405" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="-1" y="-1" width="818" height="182">
          <path id="path1" d="M50.0881 82.0846C27.966 83.8729 11.4167 102.622 8.29009 128.303C5.4151 151.744 18.4632 169.436 39.2516 169.436C64.4631 169.436 80.8284 147.764 81.9342 120.784C82.8188 94.9108 70.4342 81.8635 53.6265 81.8635C40.3573 81.8635 33.2804 91.8148 33.7227 103.978C34.1547 120.608 46.6267 139.28 72.7942 141.666" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path2" d="M517.597 98.5744C513.261 88.5975 504.046 81.8621 489.376 81.8621C465.05 81.8621 446.767 106.188 445.567 132.282C444.521 156.166 455.542 169.591 471.24 169.434C493.521 169.211 509.899 147.327 517.21 101.023C518.112 95.3099 519.047 89.3442 519.949 83.6312" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path3" d="M519.947 83.6305C519.033 89.4255 518.12 95.2205 517.207 101.015C513.213 126.361 511.37 136.361 511.568 142.896C512.03 158.155 517.518 168.549 532.026 168.549C552.079 168.549 568.48 144.672 576.769 121.116" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path4" d="M278.321 97.3481C273.951 88.9448 264.751 82.7528 250.721 82.7528C224.159 82.7528 211.1 105.752 211.1 128.308C211.1 152.855 227.2 170.988 254.52 170.988C289.872 170.988 291.312 142.018 317.604 128.308" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path5" d="M70.7275 142.018C97.0153 142.018 116.338 133.29 127.624 82.7528" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path6" d="M125.877 90.2629C153.3 91.5897 165.441 97.1274 165.441 110.175C165.441 119.242 161.018 133.174 159.691 143.346C157.259 161.037 163.785 170.768 177.826 170.768C194.9 170.768 206.715 159.425 211.324 147.902" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path7" d="M530.166 167.873C556.454 167.873 578.896 130.617 590.182 80.0798" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path8" d="M588.435 87.591C615.858 88.9178 627.999 94.4556 627.999 107.503C627.999 116.57 623.576 130.502 622.249 140.674C619.816 158.365 626.342 168.096 640.384 168.096C657.457 168.096 669.272 156.753 673.882 145.23" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path9" d="M746.176 99.9334C741.856 89.7609 732.919 82.021 717.66 82.021C693.333 82.021 675.481 106.347 673.795 132.441C672.304 156.325 683.076 169.814 698.775 169.593C720.888 169.372 736.952 147.513 745.759 102.145C751.445 72.8596 757.158 43.4157 762.844 14.1305" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path10" d="M762.845 14.131C758.333 37.4246 753.821 60.7182 749.309 84.0118C743.45 114.262 739.484 132.884 739.602 143.057C739.78 158.315 745.374 168.709 760.09 168.709C780.871 168.709 801.026 144.549 808.451 118.519" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path11" d="M353.539 87.6791C370.14 65.2043 378.26 44.997 378.704 28.8944C378.925 16.9531 373.175 7.8943 362.338 7.8943C350.396 7.8943 342.877 16.9531 338.233 37.7473C333.146 60.6003 329.387 86.8233 319.877 170.91" stroke="white" stroke-width="17" stroke-linecap="round"/>
          <path id="path12" d="M320.81 162.691C325.501 121.451 344.204 88.6437 367.868 88.6437C382.022 88.6437 391.017 99.922 388.463 116.065C387.025 125.574 384.427 136.631 382.943 147.467C381.137 161.178 386.296 171.793 402.243 171.793C424.753 171.793 438.925 149.938 445.056 124.059" stroke="white" stroke-width="17" stroke-linecap="round"/>
        </mask>
        <g mask="url(#mask0_1496_405)">
          <rect width="816.176" height="179.743" fill="url(#paint0_linear_1496_405)"/>
        </g>
        <defs>
          <linearGradient id="paint0_linear_1496_405" x1="0" y1="89.8717" x2="816.176" y2="89.8717" gradientUnits="userSpaceOnUse">
            <stop stop-color="#17A43C"/>
            <stop offset="0.25" stop-color="#F8A41A"/>
            <stop offset="0.5" stop-color="#EB5D2A"/>
            <stop offset="0.75" stop-color="#E84938"/>
            <stop offset="0.88" stop-color="#AB64A1"/>
            <stop offset="1" stop-color="#6DB7DE"/>
            <stop offset="1" stop-color="#737373"/>
          </linearGradient>
        </defs>
      </svg>
    </div>

    <p>submit for <a href="https://developer.apple.com/swift-student-challenge/" target="_blank">apple's swift student challenge</a>.<br>
    get prizes by hack club (like pins or apple gift cards), even if you don't win.</p>

    <p>orchard by hack club is for students aged 18 and below.<br/>rsvp to get notified when orchard is open for submissions!</p>

    <form class="rsvp-form" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <input 
        type="email" 
        bind:value={email}
        placeholder="yourname@email.com"
        disabled={status === 'loading'}
        required
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? '...' : 'rsvp! →'}
      </button>
    </form>
    {#if status === 'success'}
      <p class="success-msg">you're in! we'll email you when submissions for orchard are open.</p>
    {/if}
    {#if status === 'error'}
      <p class="error-msg">{errorMessage}</p>
    {/if}

</div>

<div class="model-container">
	<div class="text-left">
		<p>
			this year, hack club wants to encourage teenagers (≤18yo) to submit for the 
			<span class="underline">swift student challenge</span>.
		</p>
		<p class="mt">we believe that high schoolers have the potential to build, and we hope to encourage that potential.</p>
	</div>

	<div class="model-wrapper">
		<Canvas>
			<Scene />
		</Canvas>
	</div>

	<div class="text-right">
		<p>
			if you're under 18 and submit a project, hack club will send you unique prizes 
			for your efforts, even if you don't win the swift student challenge!
		</p>
	</div>
</div>

<footer>
  <p>made with &lt;3 by ara and tongyu<br/>
  <a href="https://hackclub.com/">hack club</a> •
    <a href="https://hackclub.com/slack/">slack</a> •
    <a href="https://hackclub.com/clubs/">clubs</a> •
    <a href="https://hackclub.com/hackathons/">hackathons</a></p>
  
</footer>

</main>
<style>
  #landing {
    position: relative;
  }
  

  a {
    display: inline-block;
    text-decoration: underline;
    color: white;
  }

  a:hover {
    font-style: italic;
  }

  .rsvp-form {
    display: flex;
    justify-content: center;
    align-items: stretch;
    max-width: 400px;
    margin: 0 auto;
  }

  .rsvp-form input {
    flex: 1;
    padding: 12px 16px;
    font-family: 'Hedvig Letters Serif';
    font-size: 16px;
    background: transparent;
    border: 2px solid white;
    border-right: none;
    border-radius: 4px 0 0 4px;
    color: white;
    outline: none;
  }

  .rsvp-form input::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .rsvp-form input:focus {
    border-color: white;
  }

  .rsvp-form button {
    padding: 12px 20px;
    font-family: 'Hedvig Letters Serif';
    font-size: 16px;
    background: white;
    color: black;
    border: 2px solid white;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, color 0.2s;
  }

  .rsvp-form button:hover:not(:disabled) {
    background: transparent;
    color: white;
  }

  .rsvp-form button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .success-msg {
    color: #4ade80;
    margin-top: 10px;
  }

  .error-msg {
    color: #f87171;
    margin-top: 10px;
  }

  footer {
    text-align: center;
    width: 100%;
    margin: 50px 0;
    margin-top: 20vh;
  }



  main {
    margin: 0 auto;
    margin-top: 20vh;
  }

  #hclogo {
    position: fixed;
    top: 30px;
    left: 0;
    width: 200px;
    height: auto;
    z-index: -1;
  }

  .sticker {
    position: absolute;
    width: auto;
    opacity: 0;
    transform: scale(0);
    animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    height: 15vh;
    z-index: -1;
  }

  .sticker-1 {
    top: 10%;
    left: 15%;
    /* height: 18vh; */
  }

  .sticker-2 {
    top: 10%;
    left: 35%;
    /* height: 12vh; */
  }

  .sticker-3 {
    top: 15%;
    right: 15%;
    /* height: 15vh; */
  }

  .sticker-4 {
    bottom: 70%;
    left: 10%;
    /* height: 20vh; */
  }

  .sticker-5 {
    bottom: 15%;
    left: 25%;
    /* height: 15vh; */
  }

  .sticker-6 {
    bottom: 50%;
    right: 10%;
    /* height: 15vh; */
  }

  .sticker-7 {
    bottom: 25%;
    right: 20%;
    /* height: 15vh; */
  }

  @keyframes pop {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  #orchardlogobox {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  svg {
    max-width: 100%;
    height: auto;
  }

  #mask0_1496_405 path {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw 2s ease-in-out forwards;
  }

  #path1 { animation-delay: 0s; }
  #path2 { animation-delay: 0.15s; }
  #path3 { animation-delay: 0.3s; }
  #path4 { animation-delay: 0.45s; }
  #path5 { animation-delay: 0.6s; }
  #path6 { animation-delay: 0.75s; }
  #path7 { animation-delay: 0.9s; }
  #path8 { animation-delay: 1.05s; }
  #path9 { animation-delay: 1.2s; }
  #path10 { animation-delay: 1.35s; }
  #path11 { animation-delay: 1.5s; }
  #path12 { animation-delay: 1.65s; }

  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  .model-container {
      width: 100vw;
      height: 100vh;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      overflow: hidden;
	}

	.text-left,
	.text-right {
		color: #fff;
		font-family: serif;
		font-size: 14px;
		line-height: 1.6;
		padding: 2rem;
	}

	.text-left {
		text-align: left;
	}

	.text-right {
		text-align: right;
	}

	.underline {
		text-decoration: underline;
	}

	.mt {
		margin-top: 2rem;
	}

	.model-wrapper {
		width: 100%;
		height: 100%;
	}


  @media (max-width: 800px) {

    .sticker {
      height: 10vh;
    }
    .sticker-1 {
      top: 10%;
      left: 10%;

    }

    .sticker-2 {
      top: 5%;
      left: 35%;

    }

    .sticker-3 {
      top: 10%;
      right: 10%;

    }

    .sticker-4 {
      bottom: 20%;
      left: 5%;

    }

    .sticker-5 {
      bottom: 12%;
      left: 25%;

    }

    .sticker-6 {
      bottom: 20%;
      right: 10%;

    }

    .sticker-7 {
      bottom: 10%;
      right: 20%;

    }
  }
</style>
