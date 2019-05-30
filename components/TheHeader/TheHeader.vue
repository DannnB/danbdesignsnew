<template>
  <header class="main-header">
    <b-container>
        <b-row>
          <b-col>
            <img class="header-logo" src="/logo/logo-danb-designs-landscape.jpg"/>
          </b-col>
          <b-col>
            <nav class="main-nav">
              <ul class="nav-links">
                <nuxt-link to="/" tag="li" class="nav-link"><a>Home</a></nuxt-link>
                <nuxt-link to="/portfolio" tag="li" class="nav-link"><a>Portfolio</a></nuxt-link>
                <nuxt-link to="/blog" tag="li" class="nav-link"><a>Blog</a></nuxt-link>
                <!-- <nuxt-link to="/" tag="li" class="nav-link"><a>Freelance Me</a></nuxt-link> -->
                <!-- <nuxt-link to="/about" tag="li" class="nav-link"><a>About</a></nuxt-link> -->
                <!-- <nuxt-link to="/about" tag="li" class="nav-link"><a>My Profile</a></nuxt-link> -->

                <!-- <a>Logout</a> -->
                <!-- <a>LOGIN?: {{ loggedInUser.username }}</a> -->
                <!-- <nuxt-link to="/register" tag="li" class="nav-link"><a>Register</a></nuxt-link> -->
                <!-- <nuxt-link to="/login" tag="li" class="nav-link"><a>Log in</a></nuxt-link> -->
              </ul>
            </nav>
          </b-col>
        </b-row>
    </b-container>
  </header>
</template>

<style scoped>
  .main-header {
    position:fixed;
    z-index: 100;
    width: 100%;
    background-color: #fff;
  }
  .header-logo {
    max-width: 190px;
  }

  .main-nav {
    height: 100%;
  }

  .nav-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .nav-link {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1rem;
    padding: 0.3rem;
  }

  /* .nav-link.nuxt-link-active {
    border-bottom: 3px solid #424242;
  } */
  .nav-link.nuxt-link-exact-active {
    /* border-bottom: 3px solid #424242; */
  }

  .nav-link a {
    display: block;
    text-decoration: none;
    color: 424242;
  }

  .nav-link a:hover,
  .nav-link a:active,
  .nav-link.nuxt-link-active a {
    color: #999999;
  }
</style>

