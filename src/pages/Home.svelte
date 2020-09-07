<script>
    import CharityList from "../components/Charity.svelte";
    import { charities } from "../data/charities.js";

    let title = "Share the Bowl";
  </script>
  
  <style>
    h1 {
      font-size: 3em;
      color: violet;
    }
  </style>
  
  <h1>{title}</h1>
  <CharityList { charities } />
  