<script>
  import Charity from "../components/Charity.svelte";
  import CharityList from "../components/Charity.svelte";
  import Header from "../components/Header.svelte";
  import Promo from "../components/Promo.svelte";
  import Welcome from "../components/Welcome.svelte";
  import Footer from "../components/Footer.svelte";
  import Loader from "../components/Loader.svelte";
  // import { charities } from "../data/charities.js";

  let title = "Share the Bowl";

  let data = getData();

  async function getData() {
    const res = await fetch("https://charity-api-bwa.herokuapp.com/charities");
    data = await res.json();

    return data;
  }
</script>

<style>
  h1 {
    font-size: 3em;
    color: violet;
  }
</style>

<Header />
<Welcome />
{#await data}
  <Loader />
{:then charities}
  <Charity {charities} />
{/await}
<Promo />
<Footer />
