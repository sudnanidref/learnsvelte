<script>
    import CharityList from "../components/Charity.svelte";
    let title = "Hanrys";
    setTimeout(() => {
      title = "Kurniawan";
    }, 5000);

    let charities = ['One','Two','Three'];
  </script>
  
  <style>
    h1 {
      font-size: 3em;
      color: violet;
    }
  </style>
  
  <h1>{title}</h1>
  <CharityList {charities} />
  