<script>
  import { onDestroy } from "svelte";
  import Charity from "../components/Charity.svelte";
  import Header from "../components/Header.svelte";
  import Promo from "../components/Promo.svelte";
  import Welcome from "../components/Welcome.svelte";
  import Footer from "../components/Footer.svelte";

  onDestroy(function(){
    window.scrollTo(0,0);
  })
</script>

<style>
  h1 {
    font-size: 3em;
    color: violet;
  }
</style>

<Header />
<Welcome />
<Charity />
<Promo />
<Footer />
