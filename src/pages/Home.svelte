<script>
  import Charity from "../components/Charity.svelte";

  import CharityList from "../components/Charity.svelte";
  import Header from "../components/Header.svelte";
  import Promo from "../components/Promo.svelte";
  import Welcome from "../components/Welcome.svelte";
  import Footer from "../components/Footer.svelte";
  import { charities } from "../data/charities.js";

  let title = "Share the Bowl";
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
<!-- <CharityList { charities } /> -->
