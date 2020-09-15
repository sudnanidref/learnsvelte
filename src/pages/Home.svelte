<script>
  import { onMount } from "svelte";
  import Charity from "../components/Charity.svelte";

  import CharityList from "../components/Charity.svelte";
  import Header from "../components/Header.svelte";
  import Promo from "../components/Promo.svelte";
  import Welcome from "../components/Welcome.svelte";
  import Footer from "../components/Footer.svelte";
  // import { charities } from "../data/charities.js";


  let title = "Share the Bowl";
  let charities = [];

  onMount(async function(){
    const res = await fetch('https://charity-api-bwa.herokuapp.com/charities');
    charities = await res.json();
  });

</script>

<style>
  h1 {
    font-size: 3em;
    color: violet;
  }
</style>

<Header />
<Welcome />
<Charity {charities} />
<Promo />
<Footer />
