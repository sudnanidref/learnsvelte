<script>
  import router from "page";
  import Header from "../components/Header.svelte";
  import Footer from "../components/Footer.svelte";
  import Loader from "../components/Loader.svelte";

  export let params;
  let amount, name, email;
  let agree = false;
  let charities = getCharity(params.id);

  async function getCharity(id) {
    const res = await fetch(
      `https://charity-api-bwa.herokuapp.com/charities/${id}`
    );
    const resData = await res.json();
    return resData;
  }

  async function handleForm(event) {
    let data = await getCharity(params.id);
    data.pledged = parseInt(data.pledged) + parseInt(amount);
    console.log('sop');
    console.log(data);
    console.log('end sop');
    
    try {
      const res = await fetch(
        `https://charity-api-bwa.herokuapp.com/charities/${params.id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resMid = await fetch("/.netlify/functions/payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: params.id,
          name: name,
          amount: parseInt(amount),
          email: email,
        }),
      });
      const midtransData = await resMid.json();
      console.log(midtransData);
      window.location.href = midtransData.url;
    } catch (err) {
      console.log('masuk sini');
      
      console.log(err);
    }
  }
</script>

<style>
  #xs-input-checkbox {
    display: flex;
    align-items: center;
  }
  #xs-donate-agree {
    width: 35px;
  }
  label[for="xs-donate-agree"] {
    margin: 0px;
    margin-left: 10px;
  }
  .xs-donation-form-images {
    text-align: center;
  }
</style>

<Header />

{#await charities}
  <Loader />
{:then charities}
  <!-- welcome section -->
  <!--breadcumb start here-->
  <section
    class="xs-banner-inner-section parallax-window"
    style="background-image:url('/assets/images/about_bg.png')">
    <div class="xs-black-overlay" />
    <div class="container">
      <div class="color-white xs-inner-banner-content">
        <h2>Donate Now</h2>
        <p>{charities.title}</p>
        <ul class="xs-breadcumb">
          <li class="badge badge-pill badge-primary">
            <a href="index.html" class="color-white">Home /</a> Donate
          </li>
        </ul>
      </div>
    </div>
  </section>
  <!--breadcumb end here-->
  <!-- End welcome section -->
  <main class="xs-main">
    <!-- donation form section -->
    <section class="xs-section-padding bg-gray">
      <div class="container">
        <div class="row">
          <div class="col-lg-6">
            <div class="xs-donation-form-images">
              <img
                src={charities.thumbnail}
                class="img-responsive"
                alt="Family Images" />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="xs-donation-form-wraper">
              <div class="xs-heading xs-mb-30">
                <h2 class="xs-title">{charities.title}</h2>
                <p class="small">
                  To learn more about make donate charity with us visit our "<span
                    class="color-green">Contact us</span>" site. By calling <span
                    class="color-green">+44(0) 800 883 8450</span>.
                </p><span class="xs-separetor v2" />
              </div>
              <!-- .xs-heading end -->
              <form
                on:submit|preventDefault={handleForm}
                action="#"
                method="post"
                id="xs-donation-form"
                class="xs-donation-form"
                name="xs-donation-form">
                <div class="xs-input-group">
                  <label for="xs-donate-name">Donation Amount <span class="color-light-red">**</span></label>
                  <input
                    type="text"
                    name="amount"
                    id="xs-donate-name"
                    class="form-control"
                    required="true"
                    placeholder="Your Donation"
                    bind:value={amount} />
                </div>
                <div class="xs-input-group">
                  <label for="xs-donate-name">Your Name<span class="color-light-red">**</span></label>
                  <input
                    type="text"
                    name="name"
                    id="xs-donate-name"
                    class="form-control"
                    placeholder="Your Name"
                    required="true"
                    bind:value={name} />
                </div>
                <div class="xs-input-group">
                  <label for="xs-donate-email">Email <span class="color-light-red">**</span></label>
                  <input
                    type="text"
                    name="email"
                    id="xs-donate-email"
                    class="form-control"
                    required="true"
                    placeholder="Email" />
                </div>
                <!-- .xs-input-group END -->
                <div class="xs-input-group" id="xs-input-checkbox">
                  <input
                    type="checkbox"
                    name="agree"
                    id="xs-donate-agree"
                    bind:checked={agree} />
                  <label for="xs-donate-agree">I Agree <span class="color-light-red">**</span></label>
                </div>
                <!-- .xs-input-group END -->
                <button
                  type="submit"
                  class="btn btn-warning"
                  disabled={!agree}><span class="badge"><i
                      class="fa fa-heart" /></span> Donate now</button>
              </form>
              <!-- .xs-donation-form #xs-donation-form END -->
            </div>
          </div>
        </div>
        <!-- .row end -->
      </div>
      <!-- .container end -->
    </section>
    <!-- End donation form section -->
  </main>
  <!-- footer section start -->
{/await}
<Footer />
